const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require("cors");
const { json, urlencoded } = require("express");
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

// app.js에서 정의된 라우터들을 가져오기
const { indexRouter, productsRouter, categoriesRouter, cartsRouter, ordersRouter } = require('./path/to/app.js');

// 정의된 라우터들을 사용
app.use('/', indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/carts", cartsRouter);
app.use("/orders", ordersRouter);

// 정적 파일 서빙 설정
app.use(express.static('js'));
app.use(express.static('css'));

const indexRouter = require("../index");

// CSS 폴더 내의 모든 CSS 파일에 대한 경로를 가져옴
const cssFolder = path.join(__dirname, 'css');
const cssFiles = fs.readdirSync(cssFolder);
// 루트 경로에 대한 GET 요청 처리
app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/page/main.html');
});

cssFiles.forEach(file => {
  app.get('/css/' + file, (req, res) => {
    res.sendFile(path.join(__dirname, 'css', file));
  });
});

const jsFolder = path.join(__dirname, 'js');
const jsFiles = fs.readdirSync(jsFolder);

// 각 JS 파일에 대한 경로를 이용하여 서비스
jsFiles.forEach(file => {
  app.get('/js/' + file, (req, res) => {
    res.sendFile(path.join(__dirname, 'js', file));
  });
});

// 각 img 파일에 대한 경로를 이용하여 서비스
const imgFolder = path.join(__dirname, 'img');
const imgFiles = fs.readdirSync(imgFolder);

// 각 이미지 파일에 대한 경로를 이용하여 서비스
imgFiles.forEach(file => {
  // 파일 확장자를 체크하여 유효한 이미지 파일인지 확인
  const ext = path.extname(file).toLowerCase();
  if (ext === '.webp' || ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
    app.get('/img/' + file, (req, res) => {
      res.sendFile(path.join(__dirname, 'img', file));
    });
  }
});



// Express 애플리케이션 리스닝
app.listen(5001, () => {
  console.log('서버가 5001번 포트에서 실행 중입니다.');
});

