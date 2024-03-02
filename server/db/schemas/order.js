const { Schema } = require("mongoose");

const OrderSchema = new Schema({
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
  totalPrice: {
    type: Number,
    required: true,
  },
  //유저 아이디 -> 상품 조회용
  userId: {
    type: String,
    required: true, 
  },
  // 주문 상품 정보 -> 그 시점의 값이 저장되도록 참조 X
  productInformation: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      option: {
        type: String,
        required: true,
      },
      categoryName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    }
  ],
  // 주문자 관련 정보 -> 그 시점의 값이 저장되도록 참조 X
  recipientInformation: {
      // 받는 분 성함
      recipientName: {
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
  },
});
module.exports = OrderSchema;
