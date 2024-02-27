const { Router } = require("express");
const Cart = require("../db").Cart;
const asyncHandler = require("../utils/asyncHandler");
const router = Router();

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const found = await Cart.findOne({ userId });
    const carts = found ? found : null;

    res.json(carts);
  })
);

router.post(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const found = await Cart.create({ userId, productId, quantity });

    res.json(found);
  })
);

router.put(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const found = await Cart.findOneAndUpdate(
      { userId, productId },
      { quantity },
      { new: true }
    );

    res.json(found);
  })
);

// 선택삭제
router.delete(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    await Cart.findOneAndDelete({ userId, productId });

    res.send("삭제 완료");
  })
);

// 전체삭제
router.delete(
  "/all/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    await Cart.deleteMany({ userId });

    res.send("전체삭제 완료");
  })
);

module.exports = router;
