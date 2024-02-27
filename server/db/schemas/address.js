const { Schema } = require("mongoose");

const AddressSchema = new Schema({
  // 회원 고유번호
  id: {
    type: Number,
    required: true,
  },
  // 기본 배송지 여부
  isDefault: {
    type: Boolean,
    required: true,
  },
  // 받는분 성함
  name: {
    type: String,
    required: true,
  },
  // 받는 분 전화번호
  tel: {
    type: String,
    required: true,
  },
  // 우편번호
  zipCode: {
    type: String,
    required: true,
  },
  // 주소
  address: {
    // type: String,
    // required: true
  },
  // 상세 주소
  addressDetail: {
    // type: String,
    // required: true
  },
  // 배송 요청사항
  request: {
    type: String,
    required: false,
  },
});

module.exports = AddressSchema;
