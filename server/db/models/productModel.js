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
    stock,
    categoryName,
  }) {
    const opt = { returnOriginal: false };
    const updatedProduct = await Product.findOneAndUpdate(
      { _id }, {
        name,
        categoryId,
        price,
        image,
        stock,
        categoryName,
      },
      opt
    );
    return updatedProduct;
  }
  async delete(_id) {
    const result = await Product.deleteOne({ _id });
    return result;
  }

  // 장바구니용 상품 id 조회(상품 금액, 이미지, 브랜드, 옵션, 상품 이름 리턴)
  async findByIdForCart (_id) {
    const product = await Product.findOne({ _id })
    .select("name price image categoryName");
    return product;
  }
}

const productModel = new ProductModel();

module.exports = productModel;
