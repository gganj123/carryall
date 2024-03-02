const userService = require("../service/userService");
const passport = require("passport");
const { validationResult } = require("express-validator");

class UserController {
  // 로그인
  async login(req, res, next) {
    try {
      passport.authenticate("local", (err, user, info) => {
        // 세션 생성코드 실행
        if (err) return res.status(500).json(err); // 서버 에러
        if (!user) return res.status(404).json({ message: info.message }); // 유저없음

        req.logIn(user, (err) => {
          // 세션 만들기 시작
          if (err) return next(err);
          req.session.username = user.username;

          res.json({
            message: "로그인 성공",
            username: user.username,
            name: user.name,
          });
        });
      })(req, res, next); // 아이디/비번 DB 비교하는 코드 실행
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 로그인 세션
  async loggedIn(req, res) {
    if (req.user) {
      res.send({ logIn: true, user: req.user });
    } else {
      res.send({ logIn: false });
    }
  }

  // 로그아웃
  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        // 세션삭제 후 리다이렉트
        if (err) {
          console.error(`에러 발생 : ${err}`);
          return res.status(500).json({ err: "서버 오류" });
        }
        res.clearCookie("connect.sid").redirect("/"); // 로그아웃 시 쿠키삭제하고 메인으로 리다이렉트하기!
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 회원가입
  async joinUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
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
      } = req.body;

      if (password !== passwordReconfirm) {
        return res
          .status(400)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      const newUser = await userService.createUser({
        username,
        password,
        name,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
        telSubscription,
        emailSubscription,
      });

      if (newUser.err) {
        res.status(400).json(newUser.err);
      } else {
        res
          .status(200)
          .json({ message: "회원가입이 완료되었습니다.", newUser });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 회원정보 수정
  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        username,
        password,
        passwordReconfirm,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
        telSubscription,
        emailSubscription,
      } = req.body;

      if (!password || password !== passwordReconfirm) {
        return res
          .status(400)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      await userService.editUser({
        username,
        password,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
        telSubscription,
        emailSubscription,
      });
      res.status(200).json({ message: "회원정보가 수정되었습니다" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 회원 탈퇴
  async deleteUser(req, res) {
    try {
      const { username } = req.session;
      await userService.deleteUser(username);
      res.status(200).json({ message: "회원탈퇴가 완료되었습니다" });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 비밀번호 찾기
  async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const result = await userService.resetPassword(email);
      res.json(result);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 마이페이지
  async confirmUser(req, res) {
    try {
      const user = await userService.confirmUser(req.session.username);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "로그인해주세요" });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  // 비밀번호 확인
  async confirmPassword(req, res) {
    try {
      const { password } = req.body;
      const user = await userService.confirmPassword(
        req.session.username,
        password
      );
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "비밀번호가 틀렸습니다" });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

}

const userController = new UserController();
module.exports = userController;