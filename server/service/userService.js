const userModel = require("../db/models/userModel");
const hashedPassword = require("../utils/hashPassword");
const generateRandomPassword = require("../utils/getRandomPassword");
const sendMail = require("../utils/sendMail");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 로그인
  async login(username, password) {
    const user = await this.userModel.findByUsername({ username });
    if(!user || user.password !== password) {
      throw new Error('로그인정보가 일치하지 않습니다.')
    }
    return user;
  }

  // 회원가입
  async createUser(userData) {
    const {
      username,
      password,
      name,
      email,
      tel,
      zipCode,
      address,
      addressDetail,
    } = userData;

    const foundUser = await this.userModel.findByUser(username, email);

    if (foundUser && foundUser.username == username) {
      throw new Error("중복된 아이디입니다.");
    } else if (foundUser && foundUser.email == email) {
      throw new Error("중복된 이메일입니다.");
    }

    const hashPassword = hashedPassword(password);

    const newUser = {
      username,
      password: hashPassword,
      name,
      email,
      tel,
      zipCode,
      address,
      addressDetail,
    };

    const joinNewUser = await this.userModel.join(newUser);

    return joinNewUser;
  }

  // 회원정보 수정
  async editUser(username, update) {
    const { password, name, email, tel, zipCode, address, addressDetail } =
      update;

    const hashPassword = hashedPassword(password);

    const foundUser = await this.userModel.update(
      { username },
      {
        password: hashPassword,
        name,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
      }
    );

    return foundUser;
  }

  // 회원탈퇴
  async deleteUser(username) {
    const deleteUser = await this.userModel.withdrawal(username);
    return deleteUser;
  }

  // 비밀번호 찾기
  async resetPassword(email) {
    const user = await userModel.findByEmail(email);

    if (!user) {
      throw new Error("해당하는 사용자가 존재하지 않습니다.");
    }

    // Generate a random password
    const randomPassword = generateRandomPassword();
    await userModel.resetPassword(email, randomPassword);

    // Send the password via email
    await sendMail(email, "임시 비밀번호를 발송합니다.", randomPassword);

    return "발송 완료";
  }

  // 마이페이지
  async mypage(username) {
    const user = await userModel.findByUser(username, null);
    return user;
  }
}

const userService = new UserService(userModel);
module.exports = userService;