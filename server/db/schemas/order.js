//주문 스키마
const { Schema } = require("mongoose");
const OrderSchema = new Schema(
  {
    // 주문 고유번호 
    id: Schema.Types.ObjectId,
    //MR1 - 구매이력 알기 위해서 주문 날짜 자동 생성 X 수동으로
    date: {
      type: Date,
      required: true
    },
    // 주문 현황
    status: {
      type: String,
      required: true,
    },
    //받는 분 성함
    recipientName: { //MR1_변수명 rcp 모두 recipient로 통일
      type: String,
      required: true,
    },
    // 받는 분 우편번호
    recipientZipCode: {
      type: String,
      required: true,
    },
    // 받는 분 주소
    recipientAddress: {
      type: String,
      required: true,
    },
    // 받는 분 상세주소
    recipientAddressDetail: {
      type: String,
      required: true,
    },
    // 받는 분 전화번호
    recipientTel: {
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
  }
);
module.exports = OrderSchema;
