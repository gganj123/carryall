const Router = require("express");
const productController = require("../controller/productController");
const ProductService = require("../service/productService");

const ProductRouter = Router();

ProductRouter.get("/", productController.getProduct);
ProductRouter.post("/", productController.createProduct);
ProductRouter.put("/:_id", productController.updateProduct);
ProductRouter.delete("/:_id", productController.deleteProduct);
ProductRouter.get("/cartInformation/:_id", productController.getProductInformation);
ProductRouter.get("/detail/:_id", productController.getProductInformation);

ProductRouter.get('/api/products/filter', async (req, res) => {
  try {
    // 요청으로부터 카테고리 이름과 정렬 방식을 가져옵니다.
    const categoryName = req.query.categoryName;
    const sortOrder = req.query.sortOrder;

    // 상품 목록을 가져옵니다.
    let products = await ProductService.getProductList();

    // 카테고리 이름이 주어졌다면 해당 카테고리로 상품을 필터링합니다.
    if (categoryName) {
      products = products.filter(p => p.categoryName === categoryName);
    }

    // 정렬 방식에 따라 상품을 정렬합니다.
    if (sortOrder == 'asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOrder == 'desc') {
      products.sort((a, b) => b.price - a.price);
    }

    // 정렬된 상품 목록을 클라이언트에게 응답합니다.
    res.status(200).json(products);
  } catch (err) {
    // 오류 발생 시 오류 메시지를 클라이언트에게 응답합니다.
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});
module.exports = ProductRouter;