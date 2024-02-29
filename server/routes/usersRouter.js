const express = require("express");
const { MONGODB_PASSWORD } = process.env;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { body } = require("express-validator");
const hashedPassword = require("../utils/hashPassword");
const User = require("../db").User;
const userController = require("../controller/userController");

const userRouter = express.Router(); //백에서는 router -> userRouter 변경했으나 아직 프론트는 코드가 그대로인 상태!

// express-session
userRouter.use(passport.initialize());
userRouter.use(
  session({
    // name: "connect.sid" 명시하지않아도 기본적으로 사용 중
    secret: "password", // 암호화에 사용되는 비밀 키를 설정
    resave: false, // 세션 정보를 갱신할지? false가 일반적
    saveUninitialized: false, // 로그인 안해도 세션 만들건지? false가 좋음
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`,
      dbName: "test", // 해당 db에 세션 저장해줌
    }),
  })
);

userRouter.use(passport.session());

passport.use(
  new LocalStrategy(async (userId, password, done) => {
    let foundUser = await User.findOne({ username: userId });

    if (!foundUser || foundUser.password !== hashedPassword(password)) {
      return done(null, false, { message: "로그인 정보가 다릅니다." });
    }
    if (foundUser.password == hashedPassword(password)) {
      return done(null, foundUser);
    }
  })
);

// 세션생성
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    // 특정코드 비동기적으로 만들어줌
    done(null, { username: user.username, name: user.name }); // 세션에 저장 비밀번호는 저장X
  });
});

// 쿠키분석
passport.deserializeUser(async (user, done) => {
  let foundUser = await User.findOne({ username: user.username });

  process.nextTick(() => {
    return done(null, foundUser);
  });
});

// 로그인
userRouter.post('/login', userController.login);
// 로그아웃
userRouter.post("/logout", userController.logout);
// 회원가입
userRouter.post("/join",[
  body("username").trim().isLength({ min: 3, max: 20 }).withMessage('아이디는 3글자 이상 20글자 이하로 입력해주세요.'),
  body("password").trim().isLength({ min: 8, max: 72 }).withMessage('비밀번호는 10글자 이상 72글자 이하로 입력해주세요.')
], userController.joinUser);
// 회원정보 수정
userRouter.put("/user", userController.updateUser);
// 회원 탈퇴
userRouter.delete("/withdrawal", userController.deleteUser);
// 회원정보
userRouter.get('/mypage', userController.mypage);
// 비밀번호 초기화
userRouter.post("/reset-password", userController.resetPassword);
// 회원 비밀번호 확인
userRouter.post("/confirm-password", userController.confirmPassword);

module.exports = userRouter;
