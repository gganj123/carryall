// 회원 스키마
const { Schema } = require("mongoose");
const UserSchema = new Schema(
  {
    // 회원 고유번호(아이디)
    // id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
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
  },
  {
    versionKey: false,
  }
);

module.exports = UserSchema;
