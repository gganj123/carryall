const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.redirect('/'); // 기본적으로 로그인 비로그인 동일하게 메인화면
});

module.exports = router;