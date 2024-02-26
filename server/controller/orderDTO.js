// orderDTO.js

class OrderDTO {
  constructor({
    date,
    status,
    recipientName,
    recipientZipCode,
    recipientAddress,
    recipientAddressDetail,
    recipientTel,
    request,
    productId,
  }) {
    this.date = date;
    this.status = status;
    this.recipientName = recipientName;
    this.recipientZipCode = recipientZipCode;
    this.recipientAddress = recipientAddress;
    this.recipientAddressDetail = recipientAddressDetail;
    this.recipientTel = recipientTel;
    this.request = request;
    this.productId = productId;
  }

  static fromModel(order) {
    return new OrderDTO({
      date: order.date,
      status: order.status,
      recipientName: order.recipientName,
      recipientZipCode: order.recipientZipCode,
      recipientAddress: order.recipientAddress,
      recipientAddressDetail: order.recipientAddressDetail,
      recipientTel: order.recipientTel,
      request: order.request,
      productId: order.productId,
    });
  }
}

module.exports = OrderDTO;
