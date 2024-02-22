const { Router } = require("express");
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

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ productId: Number(id) }).populate(
      "categoryId"
    );
    res.json(product);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    // 등록하기
    const { id, categoryId, name, price, image, option, stock, brand } = req.body;

    if (!name || !price || !image || !option || !stock || !brand) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const product = await Product.create({
      id,
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
  "/:id",
  asyncHandler(async (req, res) => {
    // 수정하기
    const { id } = req.params;
    const { name, price, image, option, stock, brand } = req.body;
    if (!name || !price || !image || !option || !stock || !brand) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const updateProduct = await Product.findOneAndUpdate(
      { productId },
      { productName, price, productImage, option, stock, brand }
    );
    res.json(updateProduct);
  })
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.deleteOne({ id });
  res.json({ result: "success" });
});

module.exports = router;
