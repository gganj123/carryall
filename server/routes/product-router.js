const Router = require("express");
const productController = require("../controller/product-controller");
const ProductRouter = Router();
ProductRouter.get("/", productController.getProduct);
ProductRouter.get("/:_id", productController.getProductById);
ProductRouter.post("/", productController.createProduct);
ProductRouter.put("/:_id", productController.updateProduct);
ProductRouter.delete("/:_id",productController.deleteProduct)

module.exports = ProductRouter;
