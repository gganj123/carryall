const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const hashedPassword = require("../utils/hashPassword");
const User = require("../models").User;
const router = express.Router();

// express-session
router.use(passport.initialize());
router.use(
  session({
    secret: "password", // 암호화해서 유저에게 보냄
    resave: false, // 세션 정보를 갱신할지? false가 일반적
    saveUninitialized: false, // 로그인 안해도 세션 만들건지? false가 좋음
  })
);

router.use(passport.session());

passport.use(
  new LocalStrategy(async (userId, password, done) => {
    let foundUser = await User.findOne({ username: userId });
    if (!foundUser) {
      return done(null, false, { message: "회원이 아닙니다." });
    }
    if (foundUser.password == hashedPassword(password)) {
      return done(null, foundUser);
    } else {
      return done(null, false, { message: "비밀번호가 틀렸습니다." });
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
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // 세션 생성코드 실행
    if (err) return res.status(500).json(err); // 서버 에러
    if (!user) return res.status(401).json(info.message); // 유저없음
    req.logIn(user, (err) => {
      // 세션 만들기 시작
      if (err) return next(err);
      res.json({ username: user.username, name: user.name });
    });
  })(req, res, next); // 아이디/비번 DB 비교하는 코드 실행
});

// 회원가입
router.get("/register", async (req, res) => {

});

router.post("/join", async (req, res) => {
  const {
    username,
    password,
    name,
    email,
    gender,
    tel,
    birthday,
    telSubscription,
    emailSubscription,
  } = req.body;

  const hashPassword = hashedPassword(password);

  const member = await User.findOne({ username: username }); // 회원정보 찾기
  if (member) {
    res.send("이미 회원");
  } else {
    const newMember = await User.create({
      username,
      password : hashPassword,
      name,
      email,
      gender,
      tel,
      birthday,
      telSubscription,
      emailSubscription,
    });
    res.json(newMember);
  }
});

module.exports = router;
