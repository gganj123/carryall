const { Router } = require("express");
const { Order } = require("../db");
const asyncHandler = require("../utils/asyncHandler");
// const OrderDTO = require("../controller/orderDTO.js");
const mongoose = require('mongoose');


const router = Router();

// 주문 목록 전체 조회 -> productId의 요소들 중 detail은 빼고 가져옴
router.get(
  "/",
  asyncHandler(async (req, res) => {
    // 전체 보기
    const order = await Order.find().populate(
      "productId",
      "name categoryId price image option stock brand"
    );
    res.json(order);
  })
);

// 하나의 주문 조회  -> productId의 요소들 중 detail은 빼고 가져옴
router.get(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const order = await Order.findOne({ _id }).populate(
      "productId",
      "name categoryId price image option stock brand"
    );
    res.json(order);
  })
);

// // 주문 추가 -> productId 여러 개 추가 가능
// router.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const {
//       date,
//       status,
//       recipientName,
//       recipientZipCode,
//       recipientAddress,
//       recipientAddressDetail,
//       recipientTel,
//       request,
//       productId,
//     } = req.body;

//     if (
//       !date ||
//       !status ||
//       !recipientName ||
//       !recipientZipCode ||
//       !recipientAddress ||
//       !recipientAddressDetail ||
//       !recipientTel ||
//       !request ||
//       !productId
//     ) {
//       throw new Error("모든 요소를 입력해주세요.");
//     }

//     const order = await Order.create({
//       date,
//       status,
//       recipientName,
//       recipientZipCode,
//       recipientAddress,
//       recipientAddressDetail,
//       recipientTel,
//       request,
//       productId,
//     });
//     res.json(order);
//   })
// );

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
      const orderDTO = new OrderDTO(req.body);

      // 등록하기
      if (
        !orderDTO.date ||
        !orderDTO.status ||
        !orderDTO.recipientName ||
        !orderDTO.recipientZipCode ||
        !orderDTO.recipientAddress ||
        !orderDTO.recipientAddressDetail ||
        !orderDTO.recipientTel ||
        !orderDTO.request ||
        !orderDTO.productId
      ) {
        const error = new Error("모든 요소를 입력해주세요.");
        error.status = 400; // Bad Request
        throw error;
      }


      // OrderDTO에서 필요한 정보 추출하여 Order 모델로 생성
      const order = await Order.create({
        date: orderDTO.date,
        status: orderDTO.status,
        recipientName: orderDTO.recipientName,
        recipientZipCode: orderDTO.recipientZipCode,
        recipientAddress: orderDTO.recipientAddress,
        recipientAddressDetail: orderDTO.recipientAddressDetail,
        recipientTel: orderDTO.recipientTel,
        request: orderDTO.request,
        productId: orderDTO.productId.map(id => new mongoose.Types.ObjectId(id)),
      });
      
      res.json(order);
      
    res.json(order);
  })
);


//주문 수정 -> 테스트 시 실제 있는 주문 아이디, 상품 아이디 주의해야합니다!
router.put(
  "/:_id",
  asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const {
      date,
      status,
      recipientName,
      recipientZipCode,
      recipientAddress,
      recipientAddressDetail,
      recipientTel,
      request,
      productId,
    } = req.body;
    if (
      !date ||
      !status ||
      !recipientName ||
      !recipientZipCode ||
      !recipientAddress ||
      !recipientAddressDetail ||
      !recipientTel ||
      !request ||
      !productId
    ) {
      throw new Error("모든 요소를 입력해주세요.");
    }

    const order = await Order.findOneAndUpdate(
      { _id },
      {
        date,
        status,
        recipientName,
        recipientZipCode,
        recipientAddress,
        recipientAddressDetail,
        recipientTel,
        request,
        productId,
      },
      { new: true }
    );
    res.json(order);
  })
);

// 주문 삭제
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  await Order.deleteOne({ _id });
  res.json({ result: "success" });
});

module.exports = router;
