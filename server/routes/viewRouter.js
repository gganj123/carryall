const express = require('express');
const viewRouter = express.Router();
const path = require('path');
const adminVerification = require("../middlewares/adminVerification");

viewRouter.use('/',serveStatic('main'));
viewRouter.use('/product',serveStatic('product'));
viewRouter.use('/admin', adminVerification, serveStatic('admin'));
viewRouter.use('/admin/Product', adminVerification, serveStatic('adminProduct'));
viewRouter.use('/admin/order', serveStatic('adminOrder'));
viewRouter.use('/cart',serveStatic('cart'));
viewRouter.use('/cartTest',serveStatic('cartTest'));
viewRouter.use('/detail',serveStatic('detail'))
viewRouter.use('/joinAgree',serveStatic('joinAgree'));
viewRouter.use('/joinFinished',serveStatic('joinFinished'));
viewRouter.use('/joinForm',serveStatic('joinForm'));
viewRouter.use('/join',serveStatic('join'));
viewRouter.use('/logincheckPwd',serveStatic('logincheckPwd'));
viewRouter.use('/loginMember',serveStatic('loginMember'));
viewRouter.use('/loginnonMember',serveStatic('loginnonMember'));
viewRouter.use('/order',serveStatic('order'));
viewRouter.use('/practice',serveStatic('practice'));
viewRouter.use('/mypage',serveStatic('mypage'));
viewRouter.use('/orderResult',serveStatic('orderResult'))
viewRouter.use('/loginWithdraw',serveStatic('loginWithdraw'));
viewRouter.use('/loginChange',serveStatic('loginChange'));



function serveStatic (resource) {
    const pathName = path.join(__dirname, '../../client/page');
    const option = {index: `${resource}.html`};

    return express.static(pathName, option);
}

module.exports = viewRouter;
