const express = require('express');
const viewRouter = express.Router();
const path = require('path');

viewRouter.use('/',serveStatic('main'));
viewRouter.use('/product',serveStatic('product'));
viewRouter.use('/admin',serveStatic('admin'));
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
viewRouter.use('/mypageTest',serveStatic('mypageTest'))


function serveStatic (resource) {
    const pathName = path.join(__dirname, '../../client/page');
    const option = {index: `${resource}.html`};

    return express.static(pathName, option);
}

module.exports = viewRouter;