//주문 스키마
const { Schema } = require("mongoose");
const orderSchema = new Schema({
  // 주문 고유번호
  orderId: {
    type: String,
    required: true,
  },
  // 주문 날짜
  orderDate: {
    type: Date,
    required: true,
  },
  // 배송지
  deliveryFee: {
    type: String,
    required: true
  },
  // 주문 현황
  status: {
    type: String,
    required: true
  }, 
  //받는 분성함
  name: {
    type: String,
    required: true
  }, 
  // 받는 분 우편번호
  addrNum: {
    type: String,
    required: true
  }, 
  // 받는 분 주소
  addr: {
    type: String,
    required: true
  }, 
  // 받는 분 상세주소
  addrDatail: {
    type: String,
    required: true
  }, 
  // 받는 분 전화번호
  tel: {
    type: String,
    required: true
  }, 
  // 배송 요청사항
  req: {
    type: String,
    required: true
  }, 
  // 주문 상품 개수
  orderCount: {
    type: Number,
    required: true
  }, 
  //대표 상품
  itemName: {
    type: String,
    required: true
  }, 
  // 대표 이미지
  itemImg: {
    type: String,
    required: true
  }
});
