// 정보들은 controller로부터 받아 검증 후 model을 통해 동작
const Product = require("../db/models/productModel");

class ProductService {
  async createProduct(newProduct) {
    if (!newProduct) throw new Error("상품 추가를 위한 데이터가 필요합니다.");
    const product = await Product.create(newProduct);
    return product;
  }
  // 삭제 로직 서비스
  async deleteProduct(_id) {
    if (!_id) throw new Error("제품을 삭제하기 위한 id가 필요합니다.");
    await Product.delete(_id);
  }
  // 상품수정 로직
  async updateProduct(_id, {
    name,
    categoryId,
    price,
    image,
    option,
    stock,
    brand,
    detail,
  }) {
    if (!_id) throw Error("업데이트에 필요한 PRODUCT ID가 없습니다");
    const updateProduct = await Product.update({ _id},{
      name,
      categoryId,
      price,
      image,
      option,
      stock,
      brand,
      detail,     
    });
    if (!updateProduct) throw new Error("제품을 찾지 못했습니다.");
    return updateProduct;
  }
  async getProductList() {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      throw err;
    }
  }
  async getProductById(_id) {
    if (!_id) throw Error("특정상품을 가져오기 위한 id가 없습니다.");
    const product = await Product.findById(_id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "상품을 찾을 수 없습니다." });
    }
    return product;
  }
}
const productService = new ProductService();
module.exports = productService;