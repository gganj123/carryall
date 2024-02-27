const express = require('express');
const viewRouter = express.Router();
const path = require('path');

viewRouter.use('/',serveStatic('main'));
viewRouter.use('/join',serveStatic('join'));
viewRouter.use('/joinForm',serveStatic('join_form'));
viewRouter.use('/product',serveStatic('product'));
viewRouter.use('/admin',serveStatic('admin'))


function serveStatic (resource) {
    const pathName = path.join(__dirname, '../../client/page');
    const option = {index: `${resource}.html`};

    return express.static(pathName, option);
}

module.exports = viewRouter;