//주문상세 스키마
const { Schema } = require("mongoose");
const orderDatailSchema = new Schema({
  // 주문상세 고유번호
  orderDetailId: {
    type: String,
    required: true,
  },
  // 개수
  count: {
    type: String,
    required: true,
  }
});