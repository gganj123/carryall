const { Schema } = require("mongoose");

const AdminSchema = new Schema({
  // 유저 ID
  id: { //MR1_admin 스키마 따로 만들었으므로 id와 password로 수정
    type:String,
    required: true,
  },
  // 관리자 패스워드
  password: {
    type: String,
    required: true,
  }
})

module.exports = AdminSchema;