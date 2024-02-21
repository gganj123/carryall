const { Router } = require("express");
const Category = require("../models").Category;
const asyncHandler = require("../utils/asyncHandler");
// 카테고리 수정 한 화면에서 진행하는 경우인가 확인
const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // 전체 보기
    if (req.query.write) {
      res.render("category/edit");
      return;
    } // 목록에서 글 페이지로 이동 가능

    const categories = await Category.find({});
    res.render("/", { categories }); // api 명세서 주소 여기로 맞추면 되는지
  })
);

// router.get('/:categoryId', asyncHandler(async (req, res) => { 카테고리에 따라서 리스트 보여주기 가능?
//   const { categoryId } = req.params;
//   const category = await Category.findOne({ categoryId })
//   // 카테고리 목록 보이도록

//   if (req.query.edit) {
//     res.render('category/edit', { category });
//     return;
//   } // 세부페이지에서 수정페이지 이동 가능
//   res.render('category/view', { category });
// })); 보류

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    // 등록하기
    const { categoryName } = req.body;
    if (!categoryName) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    await Category.create({ categoryName });
    res.redirect(`/`);
  })
);

router.put(
  "/",
  asyncHandler(async (req, res, next) => {
    // 수정하기
    const { categoryId, categoryName } = req.body;
    if (!categoryName) {
      throw new Error("모든 요소를 입력해주세요.");
    }
    await Category.findOneAndUpdate({ categoryId }, { categoryName });
    res.redirect(`/`);
  })
);

router.delete("/", async (req, res) => {
  const { categoryId } = req.body;
  await Category.deleteOne({ categoryId });
  console.log("res");
});

module.exports = router;
