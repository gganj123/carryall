const { Router } = require("express");
const session = require("express-session");

const orderRouter = Router();

const orderController = require('../controller/orderController.js');
const bodyChecker = require("../middlewares/bodyChecker.js");

orderRouter.get("/", orderController.getOrders); // 전체 주문 조회 
orderRouter.get("/:_id", orderController.getOrder); //하나의 주문 조회
orderRouter.post("/", orderController.addOrder); // 주문 추가
orderRouter.put("/:_id", bodyChecker, orderController.editOrder); // 주문 수정
orderRouter.delete("/:_id", orderController.removeOrder); // 주문 삭제
orderRouter.get("/:userId", orderController.getOrderById); //아이디에 해당하는 주문 전부 조회

module.exports = orderRouter;