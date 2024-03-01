const express = require('express');
const viewRouter = express.Router();
const path = require('path');
const adminVerification = require("../middlewares/adminVerification");

viewRouter.use('/',serveStatic('main'));
viewRouter.use('/product',serveStatic('product'));
viewRouter.use('/admin', adminVerification, serveStatic('admin'));
viewRouter.use('/adminTest', adminVerification, serveStatic('adminTest'));
// 지은 {
viewRouter.use('/admin/order', serveStatic('adminOrder'));
// }
viewRouter.use('/cart',serveStatic('cart'));
viewRouter.use('/cartTest',serveStatic('cartTest'));
viewRouter.use('/detail',serveStatic('detail'))
viewRouter.use('/joinagree',serveStatic('joinagree'));
viewRouter.use('/joinfinished',serveStatic('joinfinished'));
viewRouter.use('/joinform',serveStatic('joinform'));
viewRouter.use('/join',serveStatic('join'));
viewRouter.use('/logincheckPwd',serveStatic('logincheckPwd'));
viewRouter.use('/loginMember',serveStatic('loginMember'));
viewRouter.use('/loginnonMember',serveStatic('loginnonMember'));
viewRouter.use('/order',serveStatic('order'));
viewRouter.use('/practice',serveStatic('practice'));
viewRouter.use('/test',serveStatic('test'));
viewRouter.use('/mypage',serveStatic('mypage'));
<<<<<<< HEAD
viewRouter.use('/admin/order',serveStatic('adminOrder'));
viewRouter.use('/mypageTest',serveStatic('mypageTest'))
viewRouter.use('/orderResult',serveStatic('orderResult'))
=======
viewRouter.use('/loginWithdraw',serveStatic('loginWithdraw'));
viewRouter.use('/loginChange',serveStatic('loginChange'));

>>>>>>> 07b7479805c9a1fea711ac3cf530286a19d5a1bf


function serveStatic (resource) {
    const pathName = path.join(__dirname, '../../client/page');
    const option = {index: `${resource}.html`};

    return express.static(pathName, option);
}

module.exports = viewRouter;