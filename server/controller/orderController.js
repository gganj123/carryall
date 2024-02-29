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
    const { date, status, productInformation, recipientInformation } = req.body;
    if (
      !date ||
      !status ||
      !productInformation ||
      !productInformation[0].name ||
      !productInformation[0].price ||
      !productInformation[0].image ||
      !productInformation[0].option ||
      !productInformation[0].brand ||
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
  async getOrder(req, res, next) {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json("에러 : 주문 정보를 찾을 수 없습니다.");
    }
    try {
      const order = await orderService.getOrder(_id);
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

  //관리자용 API 주문 상태만 수정
  async editOrderStatus(req, res, next) {
    try {
      // 요청에서 주문 ID와 업데이트된 상태 가져오기
      const { orderId, updatedStatus } = req.body;
  
      // orderService를 사용하여 주문 상태를 수정하고 업데이트된 주문을 받아옴
      const updatedOrder = await orderService.updateStatus(orderId, updatedStatus);
  
      // 업데이트된 주문을 클라이언트에 응답으로 전송
      res.json(updatedOrder);
    } catch (error) {
      // 오류가 발생한 경우 다음 미들웨어로 전달
      next(error);
    }
  }
}

const orderController = new OrderController();

module.exports = orderController;
