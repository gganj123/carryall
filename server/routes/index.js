const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler.js");
const { User } = require("../models");
const getHash = require("../utils/hash-password.js");
const router = Router();

router.post(
  "/join",
  asyncHandler(async (req, res) => {
    const { email, name, password, gender, tel, birthday, telSubscription, emailSubscription } = req.body;
    const hashedPassword = getHash(password); // 비번 해쉬값 생성
    await User.create({ email, name, password: hashedPassword, gender, tel, birthday, telSubscription, emailSubscription });
  })
);

module.exports = router;
