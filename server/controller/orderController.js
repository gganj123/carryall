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

  // 주문 추가
  async addOrder(req, res, next) {
    const { userId, totalPrice, productInformation, recipientInformation } = req.body;

    if (
      !userId ||
      !totalPrice ||
      !productInformation ||
      !productInformation[0].name ||
      !productInformation[0].price ||
      !productInformation[0].image ||
      !productInformation[0].option ||
      !productInformation[0].categoryName ||
      !productInformation[0].quantity ||
      !recipientInformation ||
      !recipientInformation.recipientName ||
      !recipientInformation.recipientZipCode ||
      !recipientInformation.recipientAddress ||
      !recipientInformation.recipientAddressDetail ||
      !recipientInformation.recipientTel
    ) {
      return res.status(400).json("모든 요소를 입력해주세요.");
    }
    try {
      const newOrder = await orderService.addOrder(req.body);
      return res.status(200).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
  // 주문 상세(주문 하나) 조회
  async getOrderById(req, res, next) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json("에러 : 해당 아이디를 찾을 수 없습니다.");
    }
    try {
      const order = await orderService.getOrderById(userId);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
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
    } catch (error) {
      next(error);
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

    // 주문 상세(주문 하나) 조회
  async getOrderById(req, res, next) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json("에러 : 해당 아이디를 찾을 수 없습니다.");
    }
    try {
      const order = await orderService.getOrderById(userId);
      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }  

  // 관리자가 배송 상태 변경
  async editOrderStatus(req, res, next) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ error: "에러: 해당 주문 정보를 수정할 수 없습니다." });
    }
    try {
      const updatedOrder = await orderService.editOrderStatus(_id, req.body);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }

}  

const orderController = new OrderController();

module.exports = orderController;
