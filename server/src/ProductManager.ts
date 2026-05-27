export type Product = ProductCreateDTO & {
  id: number;
};

export type ProductCreateDTO = {
  name: string;
  price: number;
  quantity: number;
  imgUrl?: string;
};

class ProductManager {
  private products: Product[];
  private id: number;

  constructor() {
    this.products = [];
    this.id = 1;
  }

  private validateProductName(name: string) {
    if (name.length > 100) {
      throw new Error('상품명은 100자를 초과할 수 없습니다.');
    }
  }

  private validateProductPrice(price: number) {
    if (price <= 0 || Number.isNaN(Number(price))) {
      throw new Error('가격은 0보다 큰 숫자여야 합니다.');
    }
  }

  addProduct(product: ProductCreateDTO) {
    this.validateProductName(product.name);
    this.validateProductPrice(product.price);
    this.products.push({ ...product, id: this.id++ });
  }

  getProducts() {
    return [...this.products];
  }
}

export default ProductManager;
