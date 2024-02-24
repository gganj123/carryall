const mongoose = require("mongoose");
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
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const productId = new mongoose.Types.ObjectId(id);

    const product = await Product.findOne(productId).populate("categoryId");
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

//상품 수정
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { name, categoryId, price, image, option, stock, brand, detail } = req.body;

    if (!categoryId || !name || !price || !image || !option || !stock || !brand || !detail) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const productId = new mongoose.Types.ObjectId(id);

    const product = await Product.findOneAndUpdate(
      productId ,
      {name, categoryId, price, image, option, stock, brand, detail },{ new: true }
    );
    res.json(product);
  })
);

//상품 삭제 
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const productId = new mongoose.Types.ObjectId(id);
  
  await Product.deleteOne(productId);
  res.json({ result: "success" });
});

module.exports = router;
