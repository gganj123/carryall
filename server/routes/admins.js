const { Router } = require("express");
const Admin = require("../models").Admin;
const asyncHandler = require("../utils/asyncHandler");
const router = Router();

// POST 요청을 처리하는 라우터 - 관리자 추가
router.post('/add', async (req, res) => {
  try {
    const { adminId, adminPassword } = req.body;
    const createdAdmin = await Admin.create({ adminId, adminPassword }); //새로운 관리자
    res.status(201).json(createdAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET 요청 처리하는 라우터 - 관리자 조회
router.get('/', async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

// Delete 요청 처리하는 라우터 - 관리자 삭제
// 이거 찐 아이디로 고정하는 걸로 바꾸고 싶음 
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  await Admin.deleteOne({ _id });
  res.send("ok");
});


module.exports = router;
