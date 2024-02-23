<<<<<<< HEAD
//주문 스키마
const { Schema } = require("mongoose");
const shortId = require("../models/schemas/types/short-id")
=======
const { Router } = require("express");
const Order = require("../models").Order;
const asyncHandler = require("../utils/asyncHandler");
>>>>>>> ba3ae439131c75f195fd0f475a5d29f010b738c5

const router = Router();


// 주문 조회
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
  })
);

// 주문 추가
router.post(
  "/add",
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

// 주문 수정
router.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
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
    const order = await Order.findOneAndUpdate({ _id }, {
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
    }, { new: true });
    res.json(order);
  })
);

// 주문 취소
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  await Order.deleteOne({ _id });
  res.send("ok");
});


module.exports = router;


