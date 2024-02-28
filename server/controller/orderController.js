const orderService = require("../service/orderService");

class OrderController {
  // 주문 조회
  async getOrders(req, res, next) {
    try {
      const orders = await orderService.getOrders();
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // 주문 추가
  async addOrder(req, res, next) {
    let {
      date,
      status,
      userId,
      productId,
    } = req.body;
    if (
      !date ||
      !status ||
      !userId ||
      !productId
    ) {
      return res.status(400).json("모든 요소를 입력해주세요.");
    }
    try {
      const newOrder = await orderService.addOrder({
        date,
        status,
        userId,
        productId,
      });
      return res.status(200).json(newOrder);
    } catch (e) {
      next(e);
    }
  }

  // 주문 상세(주문 하나) 조회
  async getOrder(req, res, next) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json("에러 : 주문 정보를 찾을 수 없습니다.");
    }
    try {
      const order = await orderService.getOrder(_id);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }

  // 주문 수정
  async editOrder(req, res, next) {
    const { _id } = req.params;
    if (!_id) {
      return res
        .status(400)
        .json("에러 : 해당 주문 정보를 수정할 수 없습니다.");
    }
    try {
      const order = await orderService.editOrder(_id, req.body);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }

  // 주문 취소
  async removeOrder(req, res, next) {
    const { _id } = req.params;
    try {
      await orderService.removeOrder(_id);
      return res.status(200).json(`주문 삭제 완료(ID : ${_id})`);
    } catch (error) {
      next(error);
    }
  }
}

const orderController = new OrderController();

module.exports = orderController;