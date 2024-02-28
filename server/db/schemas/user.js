// 회원 스키마
const { Schema } = require("mongoose");
const UserSchema = new Schema(
  {
    // 회원 고유번호
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    // 아이디
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
    // 휴대폰 수신 동의
    telSubscription: {
      type: Boolean,
      default: false,
    },
    // 이메일 수신 동의
    emailSubscription: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
