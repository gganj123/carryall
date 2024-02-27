const ProductService = require("../service/productService");

class ProductController {
  async getProduct(req, res) {
    try {
      const products = await ProductService.getProductList();
      res.status(200).json(products);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { _id } = req.params
      const product = await ProductService.getProductById(_id);

      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
  // 카테고리별 상품조회 추가 가능

  async createProduct(req, res) {
    try {
      const {
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        brand,
        detail,
      } = req.body;

      const product = await ProductService.createProduct({
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        brand,
        detail,
      });

      res.status(201).json({ success: true, data: product });
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async deleteProduct(req, res) {
    try {
      const { _id } = req.params;

      await ProductService.deleteProduct(_id);
      res.status(204).json({ success: true, message: "ok" });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  // 상품수정, 요청처리, 수정할 책 id와 수정할 내용 추출, 추출한 정보 service에 전달, 상품 수정
  async updateProduct(req, res) {
    try {
      const { _id } = req.params;
      const {
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        brand,
        detail,
      } = req.body

      const updateProduct = await ProductService.updateProduct({_id}, {
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        brand,
        detail,
      });

      res.status(200).json({ success: true, data: updateProduct });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}
const productController = new ProductController();
module.exports = productController;
