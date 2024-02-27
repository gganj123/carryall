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
    // 성별
    gender: {
      type: String,
      enum: ['M', 'F'],
    },
    // 전화번호
    tel: {
      type: String,
      required: true,
    },
    // 생일
    birthday: {
      type: Date,
    },
    // 관리자 or 회원
    role: {
      type: String,
      required:false,
      default:'user',
      enum: ['admin', 'user']
    }
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
