const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");
const app = express();
require("dotenv").config();
const { PORT, MONGODB_PASSWORD } = process.env;
const { connect, ObjectId } = require("mongoose");

// mongoDB 연결
connect(
  `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const fetch = require('node-fetch')
async function test() {//크롤링 코드, 추후 삭제
  const response = await fetch("https://api-display.wconcept.co.kr/display/api/v1/category/products/M33439436/004", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json; charset=UTF-8",
      "cust_no": "",
      "display-api-key": "VWmkUPgs6g2fviPZ5JQFQ3pERP4tIXv/J2jppLqSRBk=",
      "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "wck-cust-birthdate": ""
    },
    "referrer": "https://display.wconcept.co.kr/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"custNo\":\"\",\"gender\":\"Women\",\"sort\":\"NEW\",\"pageNo\":null,\"pageSize\":60,\"bcds\":[],\"colors\":[],\"benefits\":[],\"discounts\":[],\"status\":[\"01\"],\"shopCds\":[],\"domainType\":\"m\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "omit"
  });;

  const category = [
  { categoryId:"65e08a335a29d582c152f71c", categoryName:"STUSSY", origin: "중국", detail: "소재 특성 주의" },
  { categoryId:"65e08a475a29d582c152f71e", categoryName:"SUPREME", origin: "베트남", detail: "드라이 클리닝 권장" }, 
  { categoryId:"65e08a555a29d582c152f720", categoryName:"BARE", origin: "인도", detail: "세탁기 사용 불가능" }
];


  const data = await response.json();
  const list = [];
  data.data.productList.content.map((item) => {
    const index = Math.floor(Math.random() * category.length)
    list.push({
      name: item.itemName,
      categoryId: category[index].categoryId,
      price: item.customerPrice,
      image: item.imageUrlMobile,
      option: ["black", "white", "brown"],
      stock: 50,
      categoryName: category[index].categoryName,
      createdAt: new Date(),
      updatedAt: new Date(),
      detail: category[index].detail,
      origin: category[index].origin,
    });
  });

  function suffle(list) {
    list.sort(() => Math.random() - 0.5);
    return list;
  }

  return suffle(list);
}

const { MongoClient } = require('mongodb');

// main() -> 크롤링 함수
async function main() {
  try {
      // MongoDB에 연결
      const client = new MongoClient(`mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`);
      await client.connect();
      const db = client.db('test');

      // test 함수를 호출하여 데이터를 가져옴
      const list = await test();

      // 컬렉션에 데이터 삽입
      await db.collection('products').insertMany(list);
      console.log('저장완료');
  } catch (error) { 
      console.error("Error inserting documents:", error);
  }
}

// 메인 함수 호출
//  main().catch(console.error);

const productsRouter = require("./server/routes/productRouter.js");
const categoriesRouter = require("./server/routes/categoryRouter.js");
const ordersRouter = require("./server/routes/orderRouter.js");
const usersRouter = require("./server/routes/usersRouter.js");
const viewRouter = require("./server/routes/viewRouter.js");
const errorHandler = require("./server/middlewares/errorHandler.js");
// const adminRouter = require("./server/routes/admins.js");

app.use(express.static('client'));
app.use(viewRouter);


app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api", usersRouter);
// app.use("/users", usersRouter); 삭제해도 되는지 지은님이 봐주세요!
// app.use("/api/admins", adminRouter);
app.use(errorHandler);

app.get("/",(req, res)=> {
  res.send("접속 성공");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
