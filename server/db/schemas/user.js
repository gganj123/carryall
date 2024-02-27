// 회원 스키마
const { Schema } = require("mongoose");
const UserSchema = new Schema(
  {
    // 유저 아이디
    username: {
      type: String,
      required: true,
    },
    // 비밀번호
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // 이메일
    email: {
      type: String,
    },
    // 전화번호
    tel: {
      type: String,
      required: true,
    },
    // 받는 분 우편번호
    zipCode: {
      type: String,
      required: true,
    },
    // 받는 분 주소
    address: {
      type: String,
      required: true,
    },
    // 받는 분 상세주소
    addressDetail: {
      type: String,
      required: true,
    },
    // 관리자 or 회원
    role: {
      type: String,
      required: false,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
