const ProductService = require("../service/productService");

class ProductController {
  async getProduct(req, res) {
    try {
      var params = req.query;
      var categoryName = params.categoryName;
      var products = await ProductService.getProductList();
      const sortOrder = params.sortOrder;

      if(categoryName != null){
        products = products.filter(p => p._doc.categoryName == categoryName)
      }

      const filterProducts = [...products];

      if (sortOrder == 'asc') {
        filterProducts.sort((a, b) => a.price - b.price);
      } else if (sortOrder == 'desc') {
        filterProducts.sort((a, b) => b.price - a.price);
      }

      res.status(200).json(filterProducts);
  
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async getProductById(req, res) {
    try {
      const { _id } = req.params;

      const product = await ProductService.getProductById(_id);
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  // 장바구니용 상품 id 조회(상품 금액, 이미지, 브랜드, 상품 이름 리턴)
  async getProductInformation(req, res) {
    try {
      const { _id } = req.params;
      const product = await ProductService.getProductInformation(_id);
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
        categoryName,
      } = req.body;

      const product = await ProductService.createProduct({
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        categoryName,
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
        categoryName,
      } = req.body

      const updateProduct = await ProductService.updateProduct({_id}, {
        name,
        categoryId,
        price,
        image,
        option,
        stock,
        categoryName,
      });

      res.status(200).json({ success: true, data: updateProduct });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getProductsSortedByPrice(req, res) {
    try {
      const { sortOrder } = req.query;

      // 상품 목록을 불러옵니다.
      let products = await ProductService.getProductList();

      // sortOrder에 따라 가격을 정렬합니다.
      if (sortOrder === "asc") {
        products.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        products.sort((a, b) => b.price - a.price);
      }

      res.status(200).json(products);
    } catch (err) {
      res
        .status(err.statusCode || 500)
        .json({ success: false, message: err.message });
    }
  }
  async getFilteredProducts(req, res, categoryName, sortOrder) {
    try {
        // 상품 목록을 불러옵니다.
        let products = await ProductService.getProductList();

        // 카테고리에 따라 필터링합니다.
        products = products.filter(p => p.categoryName === categoryName);

        // 정렬 순서에 따라 정렬합니다.
        if (sortOrder === "asc") {
            products.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            products.sort((a, b) => b.price - a.price);
        }else 

        res.status(200).json(products);
    } catch (err) {
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
}


}




// const Product = require("../models/Product");

// async function getProductsByCategoryName(categoryName) {
//     try {
//         // 해당 카테고리 이름에 해당하는 제품을 조회하는 MongoDB 쿼리
//         const products = await Product.find({ categoryName: categoryName });npm 
//         return products;
//     } catch (error) {
//         throw new Error("Error fetching products by category name");
//     }
// }

// module.exports = {
//     getProductsByCategoryName
// };



const productController = new ProductController();
module.exports = productController;

