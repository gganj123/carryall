const Router = require("express");
const categoryController = require("../controller/categoryController");
const { body } = require("express-validator");

const categoryRouter = Router();
// 주소와 카테고리 가져오기 중간에 미들웨어 넣어서 관리자 권한 분기
categoryRouter.get("/", categoryController.getCategory);
categoryRouter.post(
  "/",
  [body("name").trim().isLength({ min: 1 })],
  categoryController.createCategory
);
categoryRouter.put("/:_id", categoryController.updateCategory);
categoryRouter.delete("/:_id", categoryController.deleteCategory);
module.exports = categoryRouter;
