const mongoose = require("mongoose");
const orderSchema = require("../schemas/order");
const Order = mongoose.model("orders", orderSchema);

class OrderModel {
  // 주문 내역 전체 조회
  async findOrders() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (err) {
      const error = new Error("모든 주문 정보를 불러오는데 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  // 주문 내역 하나 조회
  async findOrder(_id) {
    try {
      const order = await Order.findOne({ _id });
      return order;
    } catch (err) {
      const error = new Error("개별 주문 정보를 불러들이는데 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }

  // 주문 수정
  async update(_id, orderInfo) {
    try {
      const order = await Order.findOneAndUpdate({ _id }, orderInfo, {
        new: true,
      });
      return order;
    } catch (err) {
      const error = new Error("주문 수정 중 실패했습니다");
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

  //관리자용 API 주문 상태만 수정
  async updateStatus(_id, updatedStatus) {
    try {
      // 업데이트할 속성만 포함된 객체 생성
      const orderInfo = { status: updatedStatus };
  
      // findOneAndUpdate 메서드에 새로운 orderInfo 객체 전달
      const order = await Order.findOneAndUpdate({ _id }, orderInfo, {
        new: true,
      });
      return order;
    } catch (err) {
      const error = new Error("배송 상태 수정 중 실패했습니다");
      error.statusCode = 400;
      throw error;
    }
  }
}

const orderModel = new OrderModel();

module.exports = orderModel;
