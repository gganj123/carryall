const { Router } = require("express");
const { Category } = require("../db");
const asyncHandler = require("../utils/asyncHandler");
const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    // 등록하기
    const { name } = req.body;
    if (!name) {
      throw new Error("이름을 입력해주세요.");
    }

    const category = await Category.create({ name });
    res.json(category);
  })
);

router.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { name } = req.body;
    if (!name) {
      throw new Error("이름을 입력해주세요.");
    }

    const category = await Category.findOneupdate({ _id }, { name });
    res.json(category)
  })
);

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  await Category.deleteOne({_id});
  res.json("OK"); //MR1 - res.json으로 수정
});


module.exports = router;
