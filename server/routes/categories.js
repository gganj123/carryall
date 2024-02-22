const { Router } = require("express");
const Category = require("../models").Category;
const asyncHandler = require("../utils/asyncHandler");
// 카테고리 수정 한 화면에서 진행하는 경우인가 확인
const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
// 등록할 때 세이브가 ㅜ머지
    const categories = await Category.find({});
    res.json(categories);
  })
);


router.post(
  "/",
  asyncHandler(async (req, res) => {
    // 등록하기
    const { name } = req.body;
    if (!name) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const category = await Category.create({ name });
    res.json(category)
  })
);

router.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { name } = req.body;
    if (!name) {
      throw new Error("모든 요소를 입력해주세요.");
    }
    const category = await Category.findOneAndUpdate({ _id }, { name },{ new: true });
    res.json(category)
  })
);

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  await Category.deleteOne({ _id });
  res.send("ok")
});

module.exports = router;
