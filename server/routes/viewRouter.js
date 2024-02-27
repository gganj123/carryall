const express = require('express');
const viewRouter = express.Router();
const path = require('path');

viewRouter.use('/',serveStatic('main'));
viewRouter.use('/product',serveStatic('product'));
viewRouter.use('/admin',serveStatic('admin'));
viewRouter.use('/cart',serveStatic('cart'));
viewRouter.use('/cartTest',serveStatic('cartTest'));
viewRouter.use('/detail',serveStatic('detail'))
viewRouter.use('/join_agree',serveStatic('join_agree'));
viewRouter.use('/join_finished',serveStatic('join_finished'));
viewRouter.use('/join_form',serveStatic('join_form'));
viewRouter.use('/join',serveStatic('join'));
viewRouter.use('/login_checkPwd',serveStatic('login_checkPwd'));
viewRouter.use('/login_member',serveStatic('login_member'));
viewRouter.use('/login_nonMember',serveStatic('login_nonMember'));
viewRouter.use('/order',serveStatic('order'));
viewRouter.use('/practice',serveStatic('practice'));
viewRouter.use('/test_ver2',serveStatic('test_ver2'));
viewRouter.use('/test',serveStatic('test'));








function serveStatic (resource) {
    const pathName = path.join(__dirname, '../../client/page');
    const option = {index: `${resource}.html`};

    return express.static(pathName, option);
}

module.exports = viewRouter;