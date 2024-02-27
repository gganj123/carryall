const orderModel = require('../db/models/orderModel');
// const userModel = require('../db/models/userModel'); //-> 쓰일지 안쓰일지 모름

class OrderService {
  // 전체 주문 불러오기
  async getOrders() {
    const orders = await orderModel.findOrders();
    return orders;
  }

  // id에 해당하는 주문 불러오기
  async getOrder(_id) {
    if(_id){
      const order = await orderModel.findOrder(_id);
      return order;
    }
  }

  // 주문 추가
  async addOrder(orderInfo) {
    const { date, status, recipientName, recipientZipCode, recipientAddress, recipientAddressDetail, recipientTel, request, productId } = orderInfo;

    // 여기서 유효성 검사, 권한 확인 등의 비즈니스 로직 수행하려고 비워둔 곳

    // 주문 생성 및 저장
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
}


const orderService = new OrderService(orderModel);

module.exports = orderService;