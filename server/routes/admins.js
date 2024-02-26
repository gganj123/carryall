const { Router } = require("express");
const Admin = require("../models").Admin;
const asyncHandler = require("../utils/asyncHandler");
const router = Router();

// POST 요청을 처리하는 라우터 - 관리자 추가
router.post('/', async (req, res) => { //MR1 - 굳이 add 사용할 필요 없을 것 같아 기본 경로로 수정
  try {
    const { id, password } = req.body; //MR1 - 스키마 수정으로 변수명 수정
    const createdAdmin = await Admin.create({ id, password }); //새로운 관리자
    res.status(200).json(createdAdmin); //MR1 - status code 너무 상세하게 나눌 필요는 없다는 피드백 받아 200으로 리턴. 
  } catch (error) {
    res.status(500).json({ message: error.message }); //MR1 - 에러 500으로 리턴하기로 변경. 잡힐 수 있는 에러는 DB에러인데, DB에러 코드가 500
  }
});

// GET 요청 처리하는 라우터 - 관리자 조회
router.get('/', async (req, res) => {
  const admins = await Admin.find({});
  res.json(admins);
});

// Delete 요청 처리하는 라우터 - 관리자 삭제
// MR1 - 자동생성 아이디 말고 만들어진 아이디로 삭제하는 것으로 변경
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Admin.deleteOne({ id });
  res.json("ok"); //MR1 - json 형식으로 응답 전송하므로 res.send() -> res.json()으로 수정
});


module.exports = router;
