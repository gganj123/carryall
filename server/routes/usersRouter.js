const express = require("express");
const { MONGODB_PASSWORD } = process.env;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const hashedPassword = require("../utils/hashPassword");
const User = require("../db").User;
const userController = require("../controller/userController");

const router = express.Router();

// express-session
router.use(passport.initialize());
router.use(
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

router.use(passport.session());

passport.use(
  new LocalStrategy(async (userId, password, done) => {
    let foundUser = await User.findOne({ username: userId });

    if (!foundUser) {
      return done(null, false, { message: "로그인 정보가 다릅니다." });
    } else if (foundUser.password !== hashedPassword(password)) {
      return done(null, false, { message: "비밀번호 정보가 다릅니다." });
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
router.post('/login', userController.login);

// 로그인
// router.post(
//   "/login",
//   async (req, res, next) => {
//     try {
//       passport.authenticate("local", (err, user, info) => {
//         // 세션 생성코드 실행
//         if (err) return res.status(500).json(err); // 서버 에러
//         if (!user) return res.status(404).json(info.message); // 유저없음
//         req.logIn(user, (err) => {
//           // 세션 만들기 시작
//           if (err) return next(err);
//           req.session.username = user.username;

//           res.json({
//             message: "로그인 성공",
//             username: user.username,
//             name: user.name,
//           });
//         });
//       })(req, res, next); // 아이디/비번 DB 비교하는 코드 실행
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

// 로그아웃
router.post("/logout", userController.logout);
// 회원가입
router.post("/join", userController.joinUser);
// 회원정보 수정
router.put("/user", userController.updateUser);
// 회원 탈퇴
router.delete("/withdrawal", userController.deleteUser);
// 회원정보
router.get('/mypage', userController.mypage);
// 비밀번호 초기화
router.post("/reset-password", userController.resetPassword);

module.exports = router;
