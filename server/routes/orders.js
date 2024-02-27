const { Router } = require("express");
const { Order } = require("../db");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require('mongoose');
const router = Router();

// 주문 신버전 추가된 코드
const orderController = require('../controller/orderController');
const bodyChecker = require("../middlewares/bodyChecker.js");

// 주문 목록 전체 조회 -> productId의 요소들 중 detail은 빼고 가져옴
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     // 전체 보기
//     const order = await Order.find().populate( //이거 지금 모델로 옮김
//       "productId",
//       "name categoryId price image option stock brand"
//     );
//     res.json(order);
//   })
// );


router.get("/", orderController.getOrders)//전체 주문 조회 신버전
router.get("/:_id", orderController.getOrder); //하나의 주문 조회 신버전
router.post("/", orderController.addOrder); // 주문 추가 신버전
router.put("/:_id", bodyChecker, orderController.editOrder); // 주문 수정 신버전
router.delete("/:_id", orderController.removeOrder); // 주문 삭제 신버전

module.exports = router;
