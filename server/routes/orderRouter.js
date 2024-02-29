const { Router } = require("express");

const router = Router();

const orderController = require('../controller/orderController.js');
const bodyChecker = require("../middlewares/bodyChecker.js");

router.get("/", orderController.getOrders); // 전체 주문 조회 
router.get("/:_id", orderController.getOrder); //하나의 주문 조회
router.post("/", orderController.addOrder); // 주문 추가
router.put("/:_id", bodyChecker, orderController.editOrder); // 주문 수정
router.delete("/:_id", orderController.removeOrder); // 주문 삭제

module.exports = router;