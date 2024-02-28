//주문 스키마
const { Schema } = require("mongoose");
const OrderSchema = new Schema({
  // 주문 고유번호 -> 어차피 _id 자동 생성
  // id: Schema.Types.ObjectId,
  // 주문 날짜
  date: {
    type: Date,
    required: true,
  },
  // 주문 현황
  status: {
    type: String,
    required: true,
  },
  // 받는 분 정보(user와 연결, id)
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
});
module.exports = OrderSchema;