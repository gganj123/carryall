const userService = require("../service/user");
const generateRandomPassword = require("../utils/getRandomPassword");

class UserController {
  // 로그인
  // async login(req, res) {
  //   try {
  //     passport.authenticate("local", (err, user, info) => {
  //       // 세션 생성코드 실행
  //       if (err) return res.status(500).json(err); // 서버 에러
  //       if (!user) return res.status(404).json(info.message); // 유저없음
  //       req.logIn(user, (err) => {
  //         // 세션 만들기 시작
  //         if (err) return next(err);
  //         req.session.username = user.username;

  //         res.json({
  //           message: "로그인 성공",
  //           username: user.username,
  //           name: user.name,
  //         });
  //       });
  //     })(req, res, next); // 아이디/비번 DB 비교하는 코드 실행
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }

  // 로그아웃
  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        // 세션삭제 후 리다이렉트
        if (err) {
          console.error(`에러 발생 : ${err}`);
          return res.status(500).json({ message: "서버 오류" });
        }
        res.clearCookie("connect.sid").redirect("/"); // 로그아웃 시 쿠키삭제하고 메인으로 리다이렉트하기!
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 회원가입
  async joinUser(req, res) {
    try {
      const {
        username,
        password,
        name,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
      } = req.body;

      const newUser = await userService.createUser({
        username,
        password,
        name,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
      });

      res.status(200).json({ message: "회원가입이 완료되었습니다.", newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  }

  // 회원정보 수정
  async updateUser(req, res) {
    try {
      const { password, name, email, tel, zipCode, address, addressDetail } =
        req.body;
        console.log(req.body)
      await userService.editUser(req.session.username, {
        password,
        name,
        email,
        tel,
        zipCode,
        address,
        addressDetail,
      });
      res.status(200).json({ message: "회원정보가 수정되었습니다" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 회원 탈퇴
  async deleteUser(req, res) {
    try {
      const { username } = req.session;
      await userService.deleteUser(username);
      res.status(200).json({ message: "회원탈퇴가 완료되었습니다" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 비밀번호 찾기
  async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const result = await userService.resetPassword(email);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 마이페이지
  async mypage(req, res) {
    try {
      const user = await userService.mypage(req.session.username);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "로그인해주세요" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async register(req, res) {
    try {

    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const userController = new UserController();
module.exports = userController;