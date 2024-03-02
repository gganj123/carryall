const userModel = require("../db/models/userModel");
const hashedPassword = require("../utils/hashPassword");
const generateRandomPassword = require("../utils/getRandomPassword");
const sendMail = require("../utils/sendMail");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 회원가입
  async createUser(userData) {
    const {
      username,
      password,
      passwordReconfirm,
      name,
      email,
      tel,
      zipCode,
      address,
      addressDetail,
      telSubscription,
      emailSubscription,
    } = userData;

    const foundUser = await this.userModel.findByUser(username, email);

    if (foundUser && foundUser.username == username) {
      return { err: "중복된 아이디입니다." };
    } else if (foundUser && foundUser.email == email) {
      return { err: "중복된 이메일입니다." };
    } else if (password !== passwordReconfirm) {
      return { err: "비밀번호를 확인해주세요." };
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
        telSubscription,
        emailSubscription,
      };

      const joinNewUser = await this.userModel.join(newUser);

      return joinNewUser;
  }

  // 회원정보 수정
  async editUser(update) {
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

    const hashPassword = hashedPassword(password);

    const foundUser = await this.userModel.update({
      username,
      password: hashPassword,
      email,
      tel,
      zipCode,
      address,
      addressDetail,
      telSubscription,
      emailSubscription,
    });

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
      return { err: "해당 사용자가 존재하지 않습니다." };
    }

    // Generate a random password
    const randomPassword = generateRandomPassword();
    await userModel.resetPassword(email, randomPassword);

    // Send the password via email
    await sendMail(email, "임시 비밀번호를 발송합니다.", randomPassword);

    return "발송 완료";
  }

  // 마이페이지
  async confirmUser(username) {
    const user = await userModel.findByUser(username, null);
    return user;
  }

  // 비밀번호확인
  async confirmPassword(username, password) {
    const hashPassword = hashedPassword(password);
    const user = await userModel.confirmPassword(username, hashPassword);

    return user;
  }
}

const userService = new UserService(userModel);
module.exports = userService;
