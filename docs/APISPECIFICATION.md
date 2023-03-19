# API Specification

## 주문 목록 불러오기

### Request

#### URL

- GET /mock/order

#### Parameter

| Name     | type    | Description                                   |
| -------- | ------- | --------------------------------------------- |
| `offset` | integer | 주문 목록의 오프셋/건너뛰기 (페이지 번호 - 1) |
| `limit`  | integer | 반환된 주문 목록 수 제한                      |
| `date`   | string  | 날짜별 필터링 (yyyy-mm-dd)                    |

### Response

| Name         | type    | Description  |
| ------------ | ------- | ------------ |
| `order`      | order[] | 주문 목록    |
| `orderCount` | integer | 총 주문 수량 |

### Sample

```
# Request
GET http://localhost:3000/mock/order
params: {
    offset: 0,
    limit: 50,
    date: '2023-03-08'
}

# Response 200 OK
{
    "order": [
        {
            "id": 2,
            "transaction_time": "2023-03-08 06:59:37",
            "status": true,
            "customer_id": 16,
            "customer_name": "Cynthia Terrell",
            "currency": "$10.99"
        },
        ...
        {
            "id": 107,
            "transaction_time": "2023-03-08 13:59:12",
            "status": false,
            "customer_id": 121,
            "customer_name": "Ralph Dennis",
            "currency": "$50.25"
        }
    ],
    "orderCount": 500
}
```
