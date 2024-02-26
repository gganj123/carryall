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
    throw new Error('해당 메일로 가입된 사용자가 없음');
  }
  
  // 랜덤 패스워드 생성
  const randomPassword = generateRandomPassword();
  await User.updateOne({ email }, {
    password: getHash(randomPassword),
  });

  // 패스워드 발송하기
   await sendMail(email, "임시 비밀번호를 발송합니다.", randomPassword);
   res.json('발송 완료')
}));

module.exports = router;
