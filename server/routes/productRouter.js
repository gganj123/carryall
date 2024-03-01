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
module.exports = ProductRouter;