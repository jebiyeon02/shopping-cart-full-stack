import { HttpResponse, delay, http } from "msw";
export const API_BASE_URL =
  "https://shopping-cart-full-stack-production-0cf6.up.railway.app";

type MockProduct = {
  id: number;
  name: string;
  price: number;
  imgUrl: string | undefined;
  quantity: number;
};

type MockCartItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string | undefined;
  itemCount: number;
};

const initialMockProducts: MockProduct[] = [
  {
    id: 1,
    name: "테스트 상품 1",
    price: 10000,
    imgUrl: undefined,
    quantity: 10,
  },
  {
    id: 2,
    name: "테스트 상품 2",
    price: 20000,
    imgUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    quantity: 5,
  },
];

const initialMockCartItems: MockCartItem[] = [
  {
    id: 1,
    name: "테스트 상품 1",
    price: 10000,
    imgUrl: undefined,
    itemCount: 1,
  },
  {
    id: 2,
    name: "테스트 상품 2",
    price: 10000,
    imgUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    itemCount: 2,
  },
];

export let mockProducts = structuredClone(initialMockProducts);
export let mockCartItems = structuredClone(initialMockCartItems);
let mockCartId = 1;

export const resetMockData = () => {
  mockProducts = structuredClone(initialMockProducts);
  mockCartItems = structuredClone(initialMockCartItems);
  mockCartId = 1;
};

const createSuccessResponse = <T>(result: T, status = 200) => {
  return HttpResponse.json(
    {
      code: status,
      message: "요청에 성공했습니다.",
      result,
    },
    { status },
  );
};

export const handlers = [
  http.get(`${API_BASE_URL}/products`, () => {
    return createSuccessResponse({
      products: mockProducts,
    });
  }),

  http.post(`${API_BASE_URL}/products`, async ({ request }) => {
    const product = (await request.json()) as Omit<MockProduct, "id">;
    const nextProduct = {
      id: Math.max(0, ...mockProducts.map(({ id }) => id)) + 1,
      ...product,
    };

    mockProducts.push(nextProduct);

    return createSuccessResponse({ id: nextProduct.id }, 201);
  }),

  http.delete(`${API_BASE_URL}/products/:productId`, ({ params }) => {
    const productId = Number(params.productId);
    mockProducts = mockProducts.filter(({ id }) => id !== productId);
    mockCartItems = mockCartItems.filter(({ id }) => id !== productId);

    return new HttpResponse(null, { status: 204 });
  }),

  http.post(`${API_BASE_URL}/carts`, () => {
    mockCartId += 1;

    return createSuccessResponse({ id: mockCartId }, 201);
  }),

  http.get(`${API_BASE_URL}/carts/:cartId/items`, () => {
    return createSuccessResponse({
      cartItems: mockCartItems,
    });
  }),

  http.post(`${API_BASE_URL}/carts/:cartId/items`, async ({ request }) => {
    const { productId, itemCount } = (await request.json()) as {
      productId: number;
      itemCount: number;
    };
    const product = mockProducts.find(({ id }) => id === productId);

    if (!product) {
      return HttpResponse.json(
        {
          code: "PRODUCT_NOT_EXIST",
          message: "상품이 존재하지 않습니다.",
        },
        { status: 404 },
      );
    }

    const existingCartItem = mockCartItems.find(({ id }) => id === productId);

    if (existingCartItem) {
      existingCartItem.itemCount += itemCount;
    } else {
      mockCartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imgUrl: product.imgUrl,
        itemCount,
      });
    }

    return createSuccessResponse({ productId }, 201);
  }),

  http.patch(
    `${API_BASE_URL}/carts/:cartId/items/:productId`,
    async ({ params, request }) => {
      const productId = Number(params.productId);
      const { itemCount } = (await request.json()) as { itemCount: number };
      const cartItem = mockCartItems.find(({ id }) => id === productId);

      if (!cartItem) {
        return HttpResponse.json(
          {
            code: "PRODUCT_NOT_EXIST_IN_CART",
            message: "해당 상품이 장바구니에 존재하지 않습니다.",
          },
          { status: 404 },
        );
      }

      cartItem.itemCount = itemCount;

      return createSuccessResponse({
        id: productId,
        itemCount,
      });
    },
  ),

  http.delete(
    `${API_BASE_URL}/carts/:cartId/items/:productId`,
    async ({ params }) => {
      const productId = Number(params.productId);
      mockCartItems = mockCartItems.filter(({ id }) => id !== productId);

      return new HttpResponse(null, { status: 204 });
    },
  ),
];
