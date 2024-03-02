const express = require("express");
const { body } = require("express-validator");
const userController = require("../controller/userController");
const adminVerification = require("../middlewares/adminVerification");

const userRouter = express.Router(); //백에서는 router -> userRouter 변경했으나 아직 프론트는 코드가 그대로인 상태!

// 로그인
userRouter.post("/login", userController.login);
// 로그아웃
userRouter.post("/logout", userController.logout);
// 회원가입
userRouter.post(
  "/join",
  [
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("아이디는 3글자 이상 20글자 이하로 입력해주세요."),
    body("password")
      .trim()
      .isLength({ min: 8, max: 72 })
      .withMessage("비밀번호는 10글자 이상 72글자 이하로 입력해주세요."),
  ],
  userController.joinUser
);
// 회원정보 수정
userRouter.put(
  "/user",
  [
    body("password")
      .trim()
      .isLength({ min: 8, max: 72 })
      .withMessage("비밀번호는 10글자 이상 72글자 이하로 입력해주세요."),
  ],
  userController.updateUser
);
// 회원 탈퇴
userRouter.delete("/withdrawal", userController.deleteUser);
// 회원정보
userRouter.get("/mypage", userController.confirmUser);
// 회원정보수정 페이지
userRouter.get("/userEdit", userController.confirmUser);
// 비밀번호 초기화
userRouter.post("/reset-password", userController.resetPassword);
// 회원 비밀번호 확인
userRouter.post("/confirm-password", userController.confirmPassword);
// 주문페이지 이동
userRouter.post("/order", userController.confirmUser);
// 주문페이지 이동
userRouter.get("/admin", adminVerification, userController.confirmUser);
// 로그인 확인 유뮤
userRouter.get("/get-session", userController.loggedIn);

module.exports = userRouter;
