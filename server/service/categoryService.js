// 정보들은 controller로부터 받아 검증 후 model을 통해 동작
const Category = require("../db/models/categoryModel");

class CategorService {
  async getCategoryList() {
    try {
      const categories = await Category.find();
      return categories;
    } catch (err) {
      throw err;
    }
  }
  async createCategory(name) {
    if (!name) throw new Error("카테고리를 만들기 위해서는 이름이 필요합니다.");
    const category = Category.create(name);
    return category;
  }
  async deleteCategory(_id) {
    if (!_id) throw new Error("삭제하기 위한 카테고리ID가 필요합니다.");
    await Category.delete(_id);
  }
  async updateCategory(_id, { name}) {
    if (!name ) throw new Error("수정을 위한 데이터 정보가 일부 없습니다.");
    if (!_id) throw new Error("수정을 위한 카테고리 ID가 없습니다.");

    const updatedCategory = await Category.update(_id, { name });
    return updatedCategory;
  }
}
const categorService = new CategorService();
module.exports = categorService;