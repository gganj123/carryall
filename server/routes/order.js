const { Router } = require("express");
const Order = require("../models").Order;
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    // 등록하기
    const {
      createdDate,
      status,
      rcpName,
      rcpZipCode,
      rcpAddress,
      rcpAddressDetail,
      rcpTel,
      request,
      product,
      representativeProduct,
    } = req.body;
    if (
      !createdDate ||
      !status ||
      !rcpName ||
      !rcpZipCode ||
      !rcpAddress ||
      !rcpAddressDetail ||
      !rcpTel ||
      !request ||
      !product ||
      !representativeProduct
    ) {
      throw new Error("모든 요소를 입력해주세요.");
    }
    const order = await Order.create({
      createdDate,
      status,
      rcpName,
      rcpZipCode,
      rcpAddress,
      rcpAddressDetail,
      rcpTel,
      request,
      product,
      representativeProduct,
    });
    res.json(order);
  })
);

module.exports = router;


// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
// // 등록할 때 세이브가 ㅜ머지
//     const categories = await Category.find({});
//     res.json(categories);
//   })
// );

//구동되면 이 부분 지워
// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     // 등록하기
//     const { name } = req.body;
//     // if (!name) { -> 에러 처리 나중에 해볼 것
//     //   throw new Error("모든 요소를 입력해주세요.");
//     // }
//     const category = await Category.create({ name });
//     res.json(category)
//   })
// );


// router.put(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     if (!name) {
//       throw new Error("모든 요소를 입력해주세요.");
//     }
//     const category = await Category.updateOne({ id }, { name });
//     res.json(category)
//   })
// );
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   await Category.deleteOne({ id });
//   res.send("ok")
// });
module.exports = router;