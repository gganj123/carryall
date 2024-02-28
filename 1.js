// const fetch = require('node-fetch')

// async function test() {
//     const response = await 
//     fetch("https://kream.co.kr/api/se/products/?keyword=%EB%9F%AD%EC%85%94%EB%A6%AC&shop_category_id=9&typed_string=%EB%9F%AD%EC%85%94%EB%A6%AC&cursor=2&request_key=2b2c37f1-8a94-45d8-951b-f74074df44ca", {
//       "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
//         "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"Windows\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-kream-api-version": "29",
//         "x-kream-client-datetime": "20240228154453+0900",
//         "x-kream-device-id": "web;3ecb2ef6-eab5-43bd-8c57-fb704c0fc4dd",
//         "x-kream-web-build-version": "5.2.1",
//         "x-kream-web-request-secret": "kream-djscjsghdkd"
//       },
//       "referrer": "https://kream.co.kr/search?keyword=%EB%9F%AD%EC%85%94%EB%A6%AC&shop_category_id=9",
//       "referrerPolicy": "strict-origin-when-cross-origin",
//       "body": null,
//       "method": "GET",
//       "mode": "cors",
//       "credentials": "include"
//     });
//     const brand = ['STUSSY','SUPREME','BARE']
//     const category = ['토트백','크로스백','백팩']

//     const data = await response.json();
//     const list=[]
//     data.items.map((item,index) => {
//         list.push({
//           _id:index,
//           name:item.product.release.name,
//           categoryId:category[Math.floor(Math.random() * category.length)],
//           price:item.product.market.market_price,
//           image:item.product.release.image_urls[0],
//           option:['black', 'white', 'brown'],
//           stock:50,
//           brand:brand[Math.floor(Math.random() * brand.length)],
//           createdAt:new Date(),
//           updatedAt:new Date()
//         })
//     })
//     console.log(list)
// }

// test();
const fetch = require("node-fetch");

async function test() {
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
      body: '{"custNo":"","gender":"Women","sort":"NEW","pageNo":1,"pageSize":60,"bcds":[],"colors":[],"benefits":[],"discounts":[],"status":["01"],"shopCds":[],"domainType":"pc"}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  );
  const brand = ["STUSSY", "SUPREME", "BARE"];
  const category = ["토트백", "크로스백", "백팩"];

  const data = await response.json();
  const list = [];
  data.items.map((item, index) => {
    list.push({
      _id: index,
      name: item.productList.content.itemName,
      categoryId: category[Math.floor(Math.random() * category.length)],
      price: item.productList.content.itemName,
      image: item.productList.content.customerPrice,
      option: ["black", "white", "brown"],
      stock: 50,
      brand: brand[Math.floor(Math.random() * brand.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
  console.log(list);
}

test();