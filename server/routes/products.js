const { Router } = require("express");
const mongoose = require("mongoose");
const { Product } = require("../models");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    // 전체 보기
    const products = await Product.find({});
    res.json(products);
  })
);

// 이거 문제 ㅠ
router.get( 
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id }).populate("categoryId");
    res.json(product);
  })
)

router.post(
  "/",
  asyncHandler(async (req, res) => {
    // 등록하기
    const { _id, categoryId, name, price, image, option, stock, brand } = req.body;

    if (!name || !price || !image || !option || !stock || !brand) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const product = await Product.create({
      _id,
      categoryId,
      name,
      price,
      image,
      option,
      stock,
      brand,
    });
    res.json(product);
  })
); // date 나중에 추가

router.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    // 수정하기
    const { _id } = req.params;
    const { name, price, image, option, stock, brand } = req.body;
    if (!name || !price || !image || !option || !stock || !brand) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const product = await Product.findOneAndUpdate(
      { _id },
      { name, price, image, option, stock, brand },{ new: true }
    );
    res.json(product);
  })
);

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  await Product.deleteOne({ _id });
  res.json({ result: "success" });
});

module.exports = router;
