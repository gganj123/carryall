const express = require("express");
const { MONGODB_PASSWORD } = process.env;
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const asyncHandler = require("../utils/asyncHandler");
const hashedPassword = require("../utils/hashPassword");
const User = require("../models").User;
const router = express.Router();

// express-session
router.use(passport.initialize());
router.use(
  session({
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
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      // 세션 생성코드 실행
      if (err) return res.status(500).json(err); // 서버 에러
      if (!user) return res.status(401).json(info.message); // 유저없음
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
  })
);

// 회원가입 페이지
router.get(
  "/register",
  asyncHandler(async (req, res) => {
    const loginUser = await User.findOne({ username: req.session.username });

    if (loginUser) {
      res.send("이미 로그인 되어있습니다.");
    }
  })
);

// 회원가입 요청
router.post(
  "/join",
  asyncHandler(async (req, res) => {
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

    const memberId = await User.findOne({ username: username }); // 회원id 중복 찾기
    const memberEmail = await User.findOne({ email: email }); // 회원이메일 중복 찾기

    if (memberId) {
      res.send("중복된 아이디입니다.");
    } else if (memberEmail) {
      res.send("중복된 이메일입니다.");
    } else {
      const newMember = await User.create({
        username,
        password: hashPassword, // 비밀번호는 해싱한 비밀번호로 저장
        name,
        email,
        gender,
        tel,
        birthday,
        telSubscription,
        emailSubscription,
      });
      res.json({ message: "회원가입이 완료되었습니다.", user: newMember });
    }
  })
);

// 회원정보 수정
router.put(
  "/user",
  asyncHandler(async (req, res) => {
    const {
      password, // 비밀번호는 해싱한 비밀번호로 저장
      name,
      email,
      tel,
      telSubscription,
      emailSubscription,
    } = req.body;
    const hashPassword = hashedPassword(password);
    await User.findOneAndUpdate(
      { username: req.session.username },
      {
        password: hashPassword,
        name,
        email,
        tel,
        telSubscription,
        emailSubscription,
      }
    );
    res.send("회원정보가 수정되었습니다");
  })
);

// 회원 탈퇴
router.delete(
  "/withdrawal",
  asyncHandler(async (req, res) => {
    const foundUser = await User.findOneAndDelete({
      username: req.session.username,
    });
    res.json({ message: "회원탈퇴가 완료되었습니다.", deletedUser: foundUser });
  })
);

// 로그아웃
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    // post말고 get사용시 오류가 발생할 수 있음
    req.session.destroy((err) => {
      // 세션삭제 후 리다이렉트
      if (err) {
        console.error(`에러 발생 : ${err}`);
        return res.status(500).send("서버 오류");
      } else {
        res.send('로그아웃 되었습니다.');
      }
    });
  })
);

// 회원정보
router.get(
  "/mypage",
  asyncHandler(async (req, res) => {
    if (req.session.username) {
      res.json({ user: req.session.username });
    } else {
      res.send("로그인해주세요.");
    }
  })
);

module.exports = router;
