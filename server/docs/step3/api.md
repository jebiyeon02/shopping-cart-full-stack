# API 명세서

---

## 쿠폰 (Coupon)

### 1. 쿠폰 조회

- **Method**: `GET`
- **Path**: `/coupons`

**Request Body**

```json
{
  "orderedProducts": {
    "product": [
      { "price": 1000, "quantity": 2 },
      { "price": 20000, "quantity": 4 }
    ],
    "shippingFee": 3000
  }
}
```

**Response `200`**

```json
{
  "code": 200,
  "message": "요청에 성공했습니다.",
  "result": {
    "coupons": [
      {
        "id": 1,
        "name": "5,000원 할인 쿠폰",
        "type": "FIXED5000",
        "expiryDate": "2026-11-30",
        "minAmount": 100000,
        "startTime": null,
        "endTime": null,
        "isAvailable": true
      },
      {
        "id": 2,
        "name": "2+1 쿠폰",
        "type": "BOGO",
        "expiryDate": "2026-06-30",
        "minAmount": null,
        "startTime": null,
        "endTime": null,
        "isAvailable": true
      },
      {
        "id": 3,
        "name": "무료 배송 쿠폰",
        "type": "FREESHIPPING",
        "expiryDate": "2026-08-31",
        "minAmount": 50000,
        "startTime": null,
        "endTime": null,
        "isAvailable": false
      },
      {
        "id": 4,
        "name": "30% 시간제 할인 쿠폰",
        "type": "MIRACLESALE",
        "expiryDate": "2026-07-31",
        "minAmount": null,
        "startTime": "04:00",
        "endTime": "07:00",
        "isAvailable": true
      }
    ]
  }
}
```

API 근거: 전체 쿠폰 리스트를 받는다. 각 쿠폰마다 필드가 다른데 응답 DTO 통일시키기 위해서 사용하지 않는 필드는 null로 채워서 보내준다.
request body에 상품 정보와 배송비를 보내는 이유는 현재 사용자가 사용할 수 있는 쿠폰인지 아닌지 확인하기 위함(isAvailable)

---

### 2. 할인 금액 계산

- **Method**: `GET`
- **Path**: `/coupons/discount`

**Request Body**

```json
{
  "type": ["FIXED5000", "BOGO"],
  "orderedProductIds": [1, 2, 3],
  "isRemoteArea": true
}
```

**Response `200`**

```json
{
  "message": "성공적으로 생성되었습니다.",
  "result": {
    "discountAmount": 12000
  }
}
```

**Response `400`**

```json
{
  "code": "INVALID_COUPON_TYPE",
  "message": "존재하지 않는 쿠폰 타입입니다."
}
```

API 근거: 쿠폰 목록 모달에서 쿠폰을 선택할 때마다 아래쪽 버튼에 총 할인 금액을 표시하기 위해서 해당 API를 생성했다. request body에는 선택된 쿠폰의 type과 장바구니에 담은 상품 id, 제주도 및 도서산간 지역 여부를 보낸다.
coupon type만 보내는 이유는 type을 받아 계산하는 것이 DB까지 가지않고 백엔드에서 처리할 수 있으므로, type만 보내 빠르게 처리하기 위함이다.

### 3. 쿠폰 유효성 검증 (결제할 때)

- **Method**: `GET`
- **Path**: `/coupons/validation`

**Request Body**

```json
{
  "id": [1, 2]
}
```

**Response `200`**

```json
{
  "message": "올바른 쿠폰입니다."
}
```

**Response `400`**

```json
{
  "code": "NOT_FOUND_COUPON",
  "message": "해당 쿠폰이 존재하지 않습니다."
}
```

```json
{
  "code": "EXPIRED_COUPON",
  "message": "만료된 쿠폰이 존재합니다."
}
```

```json
{
  "code": "TOO_MANY_COUPONS",
  "message": "사용 가능한 쿠폰 수량을 초과했습니다."
}
```

API 근거: 해당 API는 "결제하기" 버튼을 클릭했을 때 사용된다. 유효한 쿠폰인지 검증하는 것을 결제할 때 하는 이유는 결제 시점을 기준으로 해당 쿠폰을 사용하기 위함이다.

---

### 4. 최대 할인 쿠폰 자동 적용

- **Method**: `GET`
- **Path**: `/coupons/auto-discount`

**Request Body**

```json
{
  "orderedProducts": {
    "product": [
      { "price": 1000, "quantity": 2 },
      { "price": 20000, "quantity": 4 }
    ],
    "shippingFee": 3000
  },
  "availableCouponTypes": ["FIXED5000", "BOGO", "FREESHIPPING"]
}
```

**Response `200`**

```json
{
  "code": 200,
  "message": "요청에 성공했습니다.",
  "result": {
    "maxDiscountCouponTypes": ["FIXED5000", "BOGO"]
  }
}
```

**Response `400`**

```json
{
  "code": "INVALID_COUPON_TYPE",
  "message": "존재하지 않는 쿠폰 타입입니다."
}
```

API 근거: 클라이언트에서 사용가능한 쿠폰 type과 상품정보를 보내서 최대할인 쿠폰을 계산한다.
마찬가지로 type만 보내는 이유는 DB까지 가지 않고 백엔드 자체적으로 처리하기 위함이다.
쿠폰 타입은 최대 2개까지만 받을 수 있다. -> 최대 적용 가능 쿠폰 수가 2개이기 때문.

---
