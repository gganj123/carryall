const mongoose = require("mongoose");
const UserSchema = require("../schemas/user");

const User = mongoose.model("users", UserSchema);

class UserModel {
  // 아이디 중복검사
  async findByUser(username, email) {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    }); // id 또는 email 중복 찾기
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // 회원가입
  async join(userData) {
    const user = await User.create(userData);
    return user;
  }

  // 회원정보 수정
  async update(username, update) {
    const { password, name, email, tel, zipCode, address, addressDetail } =
      update;

    const user = await User.findOneAndUpdate(username, {
      password,
      name,
      email,
      tel,
      zipCode,
      address,
      addressDetail,
    });
    return user;
  }

  // 회원탈퇴
  async withdrawal(username) {
    const user = await User.findOneAndDelete({ username });
    return user;
  }

  // 비밀번호 수정
  async resetPassword(email, password) {
    const user = await User.updateOne({ email: email }, { password });
    return user;
  }
}

const userModel = new UserModel();

module.exports = userModel;