const { Schema } = require("mongoose");

const AdressSchema = new Schema({
  // 회원 고유번호
  custId: {
    type: Number,
    required: true,
  },
  // 기본 배송지 여부
  isAddDefault: {
    type: Boolean,
    required: true,
  },
  // 받는분 성함
  rcpName: {
    type: String,
    required: true,
  },
  // 받는 분 전화번호
  rcpTel: {
    type: String,
    required: true,
  },
  // 우편번호
  zipcode: {
    type: String,
    required: true,
  },
  // 주소
  add: {
    // type: String,
    // required: true
  },
  // 상세 주소
  detailAdd: {
    // type: String,
    // required: true
  },
  // 배송 요청사항
  deliveryRequest: {
    type: String,
    required: false,
  },
});

module.exports = AdressSchema;
