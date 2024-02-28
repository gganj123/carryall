const { Router } = require("express");
const cartController = require("../controller/cartController");
const Cart = require("../db").Cart;
const router = Router();

// 장바구니 조회
router.get("/", async (req, res) => {
  try {
    const { username } = req.body;
    const found = await Cart.findOne({ username });
    const carts = found ? found : null;

    res.json(carts);
  } catch (err) {
    console.error(err);
  }
});

// 상품추가
router.post("/", async (req, res) => {
  try {
    const { username, productId, option, quantity } = req.body;

    const cart = await Cart.findOne({ username });

    if (!cart) {
      await Cart.create({
        username,
        products: [{ productId, option, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, option, quantity });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (err) {
    console.error(err);
  }
});

// 장바구니 전체삭제
router.delete("/deleteAll", async (req, res) => {
  try {
    const { username } = req.body;
    await Cart.findOneAndDelete(username);

    res.json({ message: "삭제되었습니다" });
  } catch (err) {
    console.error(err);
  }
});

// 장바구니 선택삭제
router.delete("/delete", async (req, res) => {
  try {
    const { username, productId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { username },
      { $pull: { products: { productId } } },
      { new: true } // 옵션: 업데이트 후의 문서를 반환합니다.
    );

    res.json({ message: "삭제되었습니다", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 장바구니 옵션변경
router.put("/editOption", async (req, res) => {
  try {
    const { username, productId, option } = req.body;
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: "장바구니를 찾을 수 없습니다." });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );
    if (productIndex == -1) {
      return res.status(404).json({ message: "해당 상품이 장바구니에 없습니다." });
    }

    cart.products[productIndex].option = option;
    await cart.save();

    res.json({ message: "상품 옵션이 변경되었습니다", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 장바구니 수량변경
router.put("/editQuantity", async (req, res) => {
  try {
    const { username, productId, quantity } = req.body;
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: "장바구니를 찾을 수 없습니다." });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );
    if (productIndex == -1) {
      return res.status(404).json({ message: "해당 상품이 장바구니에 없습니다." });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.json({ message: "상품 옵션이 변경되었습니다", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
});



module.exports = router;
