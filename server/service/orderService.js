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

    const { date, status, name, price, image, option, brand, quantity, recipientName, recipientZipCode, recipientAddress, recipientAddressDetail, recipientTel } = orderInfo; //주석처리 해도 되는지 확인
  
    // 주문 생성 및 저장
    const newOrder = await orderModel.create(orderInfo);
    return newOrder;
  }

  // id로 주문 수정 -> 이 부분 확인안해봄
  async editOrder(orderId, orderInfo) {
    const updatedNewOrder = await orderModel.update(orderId, orderInfo);
    return updatedNewOrder;
  }

  // id로 주문 취소
  async removeOrder(orderId) {
    await orderModel.delete(orderId);
  }
}

const orderService = new OrderService(orderModel);

module.exports = orderService;
