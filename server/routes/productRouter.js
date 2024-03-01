const Router = require("express");
const productController = require("../controller/productController");
const ProductService = require("../service/productService");

const ProductRouter = Router();

ProductRouter.get("/", productController.getProduct);
ProductRouter.post("/", productController.createProduct);
ProductRouter.put("/:_id", productController.updateProduct);
ProductRouter.delete("/:_id",productController.deleteProduct)
ProductRouter.get("/cartInformation/:_id", productController.getProductInformation); // 장바구니용 상품 id 조회(상품 금액, 이미지, 브랜드, 옵션, 상품 이름 리턴)


module.exports = ProductRouter;
