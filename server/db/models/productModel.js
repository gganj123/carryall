const mongoose = require("mongoose");
const productSchema = require("../schemas/product");
const Product = mongoose.model("products", productSchema);

class ProductModel {
  async find() {
    const products = await Product.find({});
    return products;
  }
  async findById(_id) {
    const product = await Product.findOne({ _id });
    return product;
  }
  async create(productInfo) {
    const createdNewProduct = await Product.create(productInfo);
    return createdNewProduct;
  }
  async update({ _id}, {
    name,
    categoryId,
    price,
    image,
    option,
    stock,
    brand,
    detail,
  }) {
    const opt = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate(
      { _id }, {
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        brand,
        detail,
      },
      opt
    );
    return updatedProduct;
  }
  async delete(_id) {
    const result = await Product.deleteOne({ _id });
    return result;
  }
}
const productModel = new ProductModel();

module.exports = productModel;