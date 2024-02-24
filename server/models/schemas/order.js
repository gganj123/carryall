//주문 스키마
const { Schema } = require("mongoose");
const OrderSchema = new Schema(
  {
    // 주문 고유번호 -> 내가 만들지 않아도 됨
    id: Schema.Types.ObjectId,
    // 주문 현황
    status: {
      type: String,
      required: true,
    },
    //받는 분 성함
    rcpName: {
      type: String,
      required: true,
    },
    // 받는 분 우편번호
    rcpZipCode: {
      type: String,
      required: true,
    },
    // 받는 분 주소
    rcpAddress: {
      type: String,
      required: true,
    },
    // 받는 분 상세주소
    rcpAddressDetail: {
      type: String,
      required: true,
    },
    // 받는 분 전화번호
    rcpTel: {
      type: String,
      required: true,
    },
    // 배송 요청사항
    request: {
      type: String,
      required: true,
    },
    // 주문 상품
    productId: [
      {
        //상품 ID
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  // 주문 날짜 - 자동으로 생성되게
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = OrderSchema;
