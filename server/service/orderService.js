const orderModel = require('../db/models/orderModel');
const productModel = require('../db/models/product-Model');

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

  // 주문 추가 -> 배열 중 하나만 됨
  // async addOrder(orderInfo) {
  //   const { date, status, recipientName, recipientZipCode, recipientAddress, recipientAddressDetail, recipientTel, request, productId } = orderInfo;

  //   // 주문 생성 및 저장
  //   const newOrder = await orderModel.create(orderInfo);

  //   try{
  //     const product = await Product.findById(productId);
  //     if (product) {
  //       product.stock -= 1 ;
  //       await product.save();
  //     } else {
  //       throw new Error ('상품을 찾을 수 없습니다.');
  //     }

  //   } catch (err) {
  //     throw new Error ('상품 재고 업데이트 중 오류가 발생했습니다.' + error.message);
  //   }
  //   return newOrder;
  // }

  async addOrder(orderInfo) {
    const { date, status, recipientName, recipientZipCode, recipientAddress, recipientAddressDetail, recipientTel, request, productId } = orderInfo;
  
    const newOrder = await orderModel.create(orderInfo);

    try {
      for (const id of productId) { 
        const product = await productModel.findById(id);
        
        if (product) {
          product.stock -= 1;
          await product.save();
        } else {
          throw new Error(`상품을 찾을 수 없습니다. (상품 ID: ${id})`);
        }
      }
    } catch (err) {
      throw new Error(`상품 재고 업데이트 중 오류가 발생했습니다: ${err.message}`); // 에러 객체의 메시지를 추가합니다.
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