const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler.js");
const { User } = require("../models");
const getHash = require("../utils/hashPassword.js");
const router = Router();
const generateRandomPassword = require('../utils/getRandomPassword')
const sendMail = require("../utils/sendMail.js");

router.post('/reset-password', asyncHandler(async (req, res) => { // 비밀번호 리셋하려고 이메일 입력받는 곳
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('해당 메일로 가입된 사용자가 없습니다.');
  }
  
  // 랜덤 패스워드 생성하기
  const randomPassword = generateRandomPassword();
  await User.updateOne({ email }, {
    password: hashPassword(randomPassword),
    passwordReset: true 
  }); // 비밀번호 초기화 시 사용자의 passwordReset을 true로 설정
  
  // 패스워드 발송하기
   await sendMail(email, "임시 비밀번호를 발송합니다.", randomPassword);
  res.render('user/reset-password-confirmed');
}));

router.get('/change-password', (req, res, next) => {
  res.render('user/change-password');
});

// 임시번호 받은걸로 로그인하고 바로 변경하러 가긔~
router.post('/change-password', asyncHandler(async (req, res) => {
  const { currentPassword, password } = req.body;
  const user = await User.findOne({ name: req.user.name });
  
  if (user.password !== getHash(currentPassword)) {
    throw new Error('임시 비밀번호가 일치하지 않습니다.');
  }
  
  await User.updateOne({ shortId: user.shortId }, {
    password: getHash(password),
    passwordReset: false,
  });
  
  res.redirect('/logout');
}));

module.exports = router;
