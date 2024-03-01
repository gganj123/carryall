const mongoose = require("mongoose");
const UserSchema = require("../schemas/user");
const User = mongoose.model("users", UserSchema);

class UserModel {
  // 아이디 또는 이메일 중복검사
  async findByUser(username, email) {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    }); // id 또는 email 중복 찾기
    return user;
  }

  // 아이디 중복찾기
  async findByUsername(username) {
    const user = await User.findOne({ username });
    return user;
  }

  // 이메일 중복찾기
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
  async update(update) {
    const {
      username,
      password,
      email,
      tel,
      zipCode,
      address,
      addressDetail,
      telSubscription,
      emailSubscription,
    } = update;

    const user = await User.findOneAndUpdate(
      { username },
      {
        password,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
        telSubscription,
        emailSubscription,
      }
    );
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

  // 관리자 회원관리
  async findAllUsers() {
    const user = await User.find({});
    return user;
  }

  // 비밀번호 확인
  async confirmPassword(username, password) {
    const user = await User.findOne({ username });
    if (user.password == password) {
      return user;
    }
  }
}

const userModel = new UserModel();

module.exports = userModel;
