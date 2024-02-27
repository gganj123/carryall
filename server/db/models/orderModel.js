//모델 -> 어플리케이션에서 사용되는 데이터와 그 데이터를 처리
const mongoose = require("mongoose");
const orderSchema = require("../schemas/order");
const Order = mongoose.model("orders", orderSchema);

class OrderModel {
  // 주문 조회
  async findOrders() {
    try {
      const orders = await Order.find()
      .populate(
        "productId",
        "name categoryId price image option stock brand")
        .populate(
          "userId",
          "tel zipCode address addressDetail"
        );
        
      return orders;
    } catch (err) {
      const error = new Error("모든 주문 정보를 불러오는데 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  //주문 상세 조회(주문 하나 조회)
  async findOrder(_id) { 
    try {
      const order = await Order.findOne({ _id })
      .populate(
        "productId",
        "name categoryId price image option stock brand"
      )
      .populate(
        "userId",
        "tel zipCode address addressDetail"
      );
      return order
    } catch (err) {
      const error = new Error ("주문 정보를 불러들이는데 실패했습니다.");
      error.statusCode = 400;
      throw error
    }
  }

  // 주문 수정
   async update(_id, orderInfo) {
    try {
      const order = await Order.findOneAndUpdate(
      { _id },
        orderInfo,
        { new:true }
      )
      return order;
    } catch (err) {
      const error = new Error("에러 : 주문 수정중 실패");
      error.statusCode = 400;
      throw error;
    }
  }

  // 주문 추가(=생성)
  async create(orderInfo) {
    const newOrder = await Order.create(orderInfo);
      return newOrder;
  }

  // 주문 삭제
  async delete(_id) {
    try {
      await Order.deleteOne({ _id });
    } catch (err) {
      const error = new Error("주문 삭제 중 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
}


const orderModel = new OrderModel();

module.exports = orderModel;