const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler.js");
const { User } = require("../models");
const getHash = require("../utils/hashPassword.js");
const router = Router();
const generateRandomPassword = require('../utils/getRandomPassword')
const sendMail = require("../utils/sendMail.js");

router.post('/reset-password', asyncHandler(async (req, res) => { 
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('해당하는 사용자가 존재하지 않습니다.');
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
