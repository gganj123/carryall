const fetch = require("node-fetch");

async function test() {
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
  const brand = ["STUSSY", "SUPREME", "BARE"];
  const category = ["토트백", "크로스백", "백팩"];

  const data = await response.json();
  const list = [];
  data.data.productList.content.map((item, index) => {
    list.push({
      _id: index,
      name: item.itemName,
      categoryId: category[Math.floor(Math.random() * category.length)],
      price: item.customerPrice,
      image: item.imageUrlMobile,
      option: ["black", "white", "brown"],
      stock: 50,
      brand: brand[Math.floor(Math.random() * brand.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  function suffle(list) {
    list.sort(() => Math.random() - 0.5);
    return list;
  }

  console.log(suffle(list));
}

test();
