const express = require("express");
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const { json, urlencoded } = require("express");
const app = express();
require("dotenv").config();
const { PORT, MONGODB_PASSWORD } = process.env;
const { connect } = require("mongoose");

connect(
  `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const indexRouter = require('./server/routes');
const productsRouter = require("./server/routes/products.js");
const categoriesRouter = require("./server/routes/categories.js");
const cartsRouter = require("./server/routes/carts.js");
const ordersRouter = require("./server/routes/orders.js");

app.use('/', indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);

// 정적 파일 서빙 설정: client 폴더를 정적 파일 경로로 지정
app.use(express.static(path.join(__dirname, 'client')));

// HTML 파일 내의 모든 페이지에 대한 경로를 가져옴
const pageFolder = path.join(__dirname, 'client', 'page');
const pageFiles = fs.readdirSync(pageFolder);
pageFiles.forEach(file => {
  // 파일 확장자를 체크하여 유효한 HTML 파일인지 확인
  const ext = path.extname(file).toLowerCase();
  if (ext === '.html') {
    app.get('/' + path.parse(file).name, (req, res) => {
      res.sendFile(path.join(pageFolder, file));
    });
  }
});

// CSS 폴더 내의 모든 CSS 파일에 대한 경로를 가져옴
const cssFolder = path.join(__dirname, 'client', 'css');
const cssFiles = fs.readdirSync(cssFolder);
cssFiles.forEach(file => {
  app.get('/css/' + file, (req, res) => {
    res.sendFile(path.join(cssFolder, file));
  });
});

// JS 폴더 내의 모든 JS 파일에 대한 경로를 가져옴
const jsFolder = path.join(__dirname, 'client', 'js');
const jsFiles = fs.readdirSync(jsFolder);
jsFiles.forEach(file => {
  app.get('/js/' + file, (req, res) => {
    res.sendFile(path.join(jsFolder, file));
  });
});

// 이미지 폴더 내의 모든 이미지 파일에 대한 경로를 가져옴
const imgFolder = path.join(__dirname, 'client', 'img');
const imgFiles = fs.readdirSync(imgFolder);
imgFiles.forEach(file => {
  // 파일 확장자를 체크하여 유효한 이미지 파일인지 확인
  const ext = path.extname(file).toLowerCase();
  if (ext === '.webp' || ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
    app.get('/img/' + file, (req, res) => {
      res.sendFile(path.join(imgFolder, file));
    });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});