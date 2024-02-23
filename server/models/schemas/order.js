//주문 스키마
const { Schema } = require("mongoose");
const shortId = require("./types/short-id.js");
const OrderSchema = new Schema({
  // 주문 고유번호 -> 스키마 등록할 때 만들어주면 내가 만들지 않아도 됨
  orderId: shortId,
  // 주문 날짜
  createdDate: {
    type: Date,
    required: true,
  },
  // 주문 현황
  status: {
    type: String,
    required: true
  }, 
  //받는 분 성함
  rcpName: {
    type: String,
    required: true
  }, 
  // 받는 분 우편번호
  rcpZipCode: {
    type: String,
    required: true
  }, 
  // 받는 분 주소
  rcpAddress: {
    type: String,
    required: true
  }, 
  // 받는 분 상세주소
  rcpAddressDetail: {
    type: String,
    required: true
  }, 
  // 받는 분 전화번호
  rcpTel: {
    type: String,
    required: true
  }, 
  // 배송 요청사항
  request: {
    type: String,
    required: true
  }, 
  // 주문 상품
  product: {
    type: { //변수명 item될 수도
      productName: String,
      productId: String,
      price: Number, 
      productImage: String,
      productOption: String, //스트링 맞는지 확인
      productQuantity: Number
    }, 
    required: true
  },
  // 대표 상품(주문 화면에서 대표로 표시될 상품 이미지, 상품)
  representativeProduct: {
    type: {
      img: String, 
      itemName: String
    },
    required: true
  }
});
module.exports = OrderSchema;