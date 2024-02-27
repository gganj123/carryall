const { Router } = require("express");

const axios = require("axios");
const cheerio = require("cheerio");

const router = Router();

router.get("/", function (request, response) {
  axios
    .get("https://www.inflearn.com/")
    .then((html) => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      response.json(html)
      const $productList = $(".item.rows.admSortTable li");

      $productList.each(function (i, elem) {
        ulList[i] = {
          name: $(this).find(".subject a").text(),
          image_url: $(this).find(".image img").attr("src"),
        }
      });

      // 응답을 보낼 때 ulList 배열을 JSON 형태로 응답합니다.
      // response.json($productList);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

module.exports = router;
