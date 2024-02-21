const { Router } = require('express');
const { Product, Category } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(async (req, res) => { // 전체 보기
  if (req.query.write) {
    res.render('product/edit');
    return;
  } // 목록에서 글 페이지로 이동 가능
  
  const products = await Product.find({});
  res.render('product/list', { products });
}));


router.get('/:productId', asyncHandler(async (req, res) => { // 하나 보기
  const { productId } = req.params;
  const product = await Product.findOne({ productId }).populate('categoryId');
  // 카테고리 목록 보이도록

  if (req.query.edit) {
    res.render('product/edit', { product });
    return;
  } // 세부페이지에서 수정페이지 이동 가능
  res.render('product/view', { product });
}));

router.post('/', asyncHandler(async (req, res) => { // 등록하기
  const { productName, price, productImage, option, stock, brand } = req.body;
  try {
    if (!productName || !price || !productImage || !option || !stock || !brand) {
      throw new Error('모든 요소를 입력해주세요.');
    }
    
    const post = await Product.create({ productName, price, productImage, option, stock, brand });
    res.redirect(`/products/${post.shortId}`);
  } catch (err) {
    next(err);
  }
}));

router.put('/:productId', asyncHandler(async (req, res) => { // 수정하기
  const { productId } = req.params;
  const { productName, price, productImage, option, stock, brand } = req.body;
  try {
    if (!productName || !price || !productImage || !option || !stock || !brand) {
      throw new Error('모든 요소를 입력해주세요.');
    }
    
    await Post.findOneAndUpdate({ productId }, { productName, price, productImage, option, stock, brand });
    res.redirect(`/products/${productId}`);
  } catch (err) {
    next(err);
  }
}));

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  await Post.deleteOne({ productId });
  res.send('OK');
});

module.exports = router;

// 관리자 페이지에서 권한 판단해야하나? 관리자 권한 없으면 api 사용 불가같이...