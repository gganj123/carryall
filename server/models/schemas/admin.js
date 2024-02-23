const { Schema } = require("mongoose");

const AdminSchema = new Schema({
  // 유저 ID
  adminId: {
    type:String,
    required: true,
  },
  // 관리자 패스워드
  adminPassword: {
    type: String,
    required: true,
  }
})

module.exports = AdminSchema;
