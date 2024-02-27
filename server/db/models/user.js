const mongoose = require("mongoose");
const UserSchema = require("../schemas/user");

const User = mongoose.model("users", UserSchema);

class UserModel {
  // 아이디 중복검사
  async findByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
  }

  // 이메일 중복검사
  async findByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  // 회원가입
  async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  // 회원정보 수정
  async update({ username, update }) {
    const user = await User.findOneAndUpdate(
      { username: username },
      { update },
      { new: true }
    );
    return user;
  }

  // 회원탈퇴
  async withdrawal(username) {
    const user = await User.deleteOne(username);
    return user
  }
}

const userModel = new UserModel();

module.exports = userModel;
