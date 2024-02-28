const orderModel = require('../db/models/orderModel');
const productModel = require('../db/models/productModel');
const userModel = require('../db/models/userModel');


class OrderService {
  // 전체 주문 내역 불러오기
  async getOrders() {
    const orders = await orderModel.findOrders();
    return orders;
  }

  // _id에 해당하는 주문 내역 불러오기
  async getOrder(_id) {
    if(_id){
      const order = await orderModel.findOrder(_id);
      return order;
    }
  }

  async addOrder(orderInfo) {
    const { date, status, userId, productId } = orderInfo;
  
    // 주문 생성 및 저장
    const newOrder = await orderModel.create(orderInfo);
  
    try {
      // productId가 배열인 경우
      if (Array.isArray(productId)) {
        for (const id of productId) {
          const product = await productModel.findById(id);
          if (product) {
            product.stock -= 1;
            await product.save();
          } else {
            throw new Error('상품을 찾을 수 없습니다.');
          }
        }
      } else { // productId가 배열이 아닌 경우
        const product = await productModel.findById(productId);
        if (product) {
          product.stock -= 1;
          await product.save();
        } else {
          throw new Error('상품을 찾을 수 없습니다.');
        }
      }
    } catch (error) {
      throw new Error('상품 재고 업데이트 중 오류가 발생했습니다.' + error.message);
    }
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