const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");
const app = express();
require("dotenv").config();
const { PORT, MONGODB_PASSWORD } = process.env;
const { connect } = require("mongoose");
// 지은 {
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./server/db").User;
const hashedPassword = require("./server/utils/hashPassword.js");
// }

connect(
  `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
)
  .then(() => console.log("connected"))
  .catch(() => console.log("failed"));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const fetch = require("node-fetch");
async function test() {
  //크롤링 코드, 추후 삭제
  const response = await fetch(
    "https://api-display.wconcept.co.kr/display/api/v1/category/products/M33439436/004",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json; charset=UTF-8",
        cust_no: "",
        "display-api-key": "VWmkUPgs6g2fviPZ5JQFQ3pERP4tIXv/J2jppLqSRBk=",
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "wck-cust-birthdate": "",
      },
      referrer: "https://display.wconcept.co.kr/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"custNo":"","gender":"Women","sort":"NEW","pageNo":null,"pageSize":60,"bcds":[],"colors":[],"benefits":[],"discounts":[],"status":["01"],"shopCds":[],"domainType":"m"}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  );

  const category = [
    {
      _id: "65e16de577fdbfc4bd159a6d",
      name: "STUSSY",
      origin: "중국",
      detail: "소재 특성 주의",
    },
    {
      _id: "65e16e5a77fdbfc4bd159a74",
      name: "SUPREME",
      origin: "베트남",
      detail: "드라이 클리닝 권장",
    },
    {
      _id: "65e16e6f77fdbfc4bd159a77",
      name: "BARE",
      origin: "인도",
      detail: "세탁기 사용 불가능",
    },
  ];
  //

  const data = await response.json();
  const list = [];
  data.data.productList.content.map((item) => {
    const index = Math.floor(Math.random() * category.length);
    list.push({
      name: item.itemName,
      categoryId: category[index]._id,
      price: item.customerPrice,
      image: item.imageUrlMobile,
      option: ["black", "white", "brown"],
      stock: 50,
      categoryName: category[index].name,
      createdAt: new Date(),
      updatedAt: new Date(),
      categoryDetail: category[index].detail,
      categoryOrigin: category[index].origin,
    });
  });

  function suffle(list) {
    list.sort(() => Math.random() - 0.5);
    return list;
  }

  return suffle(list);
}

const { MongoClient } = require("mongodb");

// main() -> 크롤링 함수
async function main() {
  try {
    // MongoDB에 연결
    const client = new MongoClient(
      `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`
    );
    await client.connect();
    const db = client.db("test");

    // test 함수를 호출하여 데이터를 가져옴
    const list = await test();

    // 컬렉션에 데이터 삽입
    await db.collection("products").insertMany(list);
    console.log("저장완료");
  } catch (error) {
    console.error("Error inserting documents:", error);
  }
}

// 메인 함수 호출
// main().catch(console.error);

// 지은 {
// express-session
app.use(passport.initialize());
app.use(
  session({
    // name: "connect.sid" 명시하지않아도 기본적으로 사용 중
    secret: "password", // 암호화에 사용되는 비밀 키를 설정
    resave: false, // 세션 정보를 갱신할지? false가 일반적
    saveUninitialized: false, // 로그인 안해도 세션 만들건지? false가 좋음
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://carryall:${MONGODB_PASSWORD}@cluster0.lobzfqe.mongodb.net/`,
      dbName: "test", // 해당 db에 세션 저장해줌
    }),
  })
);

app.use(passport.session());

passport.use(
  new LocalStrategy(async (userId, password, done) => {
    let foundUser = await User.findOne({ username: userId });

    if (!foundUser || foundUser.password !== hashedPassword(password)) {
      return done(null, false, { message: "로그인 정보가 다릅니다." });
    }
    if (foundUser.password == hashedPassword(password)) {
      return done(null, foundUser);
    }
  })
);

// 세션생성
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    // 특정코드 비동기적으로 만들어줌
    done(null, { username: user.username, name: user.name }); // 세션에 저장 비밀번호는 저장X
  });
});

// 쿠키분석
passport.deserializeUser(async (user, done) => {
  let foundUser = await User.findOne({ username: user.username });

  process.nextTick(() => {
    return done(null, foundUser);
  });
});
//}

const productsRouter = require("./server/routes/productRouter.js");
const categoriesRouter = require("./server/routes/categoryRouter.js");
const ordersRouter = require("./server/routes/orderRouter.js");
const usersRouter = require("./server/routes/usersRouter.js");
const viewRouter = require("./server/routes/viewRouter.js");
const errorHandler = require("./server/middlewares/errorHandler.js");
// const adminRouter = require("./server/routes/admins.js");

app.use(express.static("client"));
app.use(viewRouter);

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api", usersRouter);

app.get('/api', (req, res)=>{
  
})
// app.use("/users", usersRouter); 삭제해도 되는지 지은님이 봐주세요!
// app.use("/api/admins", adminRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("접속 성공");
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
