const orderModel = require("../db/models/orderModel");

class OrderService {
  // 전체 주문 내역 불러오기
  async getOrders() {
    const orders = await orderModel.findOrders();
    return orders;
  }

  // _id에 해당하는 주문 내역 불러오기
  async getOrder(_id) {
    if (_id) {
      const order = await orderModel.findOrder(_id);
      return order;
    }
  }

  async addOrder(orderInfo) {
    // 주문 생성 및 저장
    const date = new Date();
    const status = "결제완료";
    orderInfo.date = date;
    orderInfo.status = status;
    const newOrder = await orderModel.create(orderInfo);
    return newOrder;
  }

  // id로 주문 수정
  async editOrder(orderId, orderInfo) {
    const updatedNewOrder = await orderModel.update(orderId, orderInfo);
    return updatedNewOrder;
  }

  // id로 주문 취소
  async removeOrder(orderId) {
    await orderModel.delete(orderId);
  }

  // user id에 해당하는 주문 내역 불러오기
  async getOrderById(userId) {
    if (userId) {
      const order = await orderModel.findOrder(userId);
      return order;
    }
  }

  // 관리자가 배송 상태 수정
  async editOrderStatus(orderId, orderInfo) {
    try {
      const updatedOrder = await orderModel.updateOrder(
        orderId,
        orderInfo.status
      );
      return updatedOrder;
    } catch (error) {
      console.error("주문 수정 중 오류 발생:", error);
      throw error;
    }
  }
}

const orderService = new OrderService(orderModel);

module.exports = orderService;