const { Router } = require("express");
const { Product } = require("../models");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

// 주문 목록 전체 조회
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // 전체 보기
    const products = await Product.find({});
    res.json(products);
  })
);

//상품 상세조회
router.get( 
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const product = await Product.findOne({ _id }).populate("categoryId");
    res.json(product);
  })
)

// 상품 등록
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, categoryId, price, image, option, stock, brand, detail } = req.body;

    if (!categoryId || !name || !price || !image || !option || !stock || !brand || !detail) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const product = await Product.create({
      categoryId,
      name,
      price,
      image,
      option,
      stock,
      brand,
      detail
    });
    res.json(product);
  })
); //date 나중에 추가

// 상품 수정
router.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;

    const { name, categoryId, price, image, option, stock, brand, detail } = req.body;

    if (!categoryId || !name || !price || !image || !option || !stock || !brand || !detail) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const product = await Product.findOneAndUpdate(
      { _id } ,
      {name, categoryId, price, image, option, stock, brand, detail },{ new: true }
    );
    res.json(product);
  })
);

//상품 삭제 
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  
  await Product.deleteOne( { _id });
  res.json({ result: "success" });
});

module.exports = router;