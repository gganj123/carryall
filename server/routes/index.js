const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');


router.get("/", async (req, res) => {
  await fetch("https://kream.co.kr/api/se/products/?keyword=%EB%9F%AD%EC%85%94%EB%A6%AC&shop_category_id=9&typed_string=%EB%9F%AD%EC%85%94%EB%A6%AC&cursor=2&request_key=0a3a5e46-c290-44f4-8b51-9da684d485bf", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "ko,ko-KR;q=0.9,en;q=0.8",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzA5MDg5OTAzLCJqdGkiOiJjYzAxOTBiMy04YjEzLTRiYjAtOGE3Zi0zZTQ0ZDllOGU3MTUiLCJ0eXBlIjoiYWNjZXNzIiwiaWRlbnRpdHkiOjQ2OTQxNSwibmJmIjoxNzA5MDg5OTAzLCJjc3JmIjoiMzk3Yzc4ZWUtMTRlZS00MTAyLWE0MWQtMjBmNDhjYmUyYWJmIiwiZXhwIjoxNzA5MDk3MTAzLCJ1YyI6eyJzYWZlIjp0cnVlfX0.KC7kZEYMOFmMo2KLIdJdYHIbTuUXaEyaEgMD8TPFey4",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-kream-api-version": "29",
        "x-kream-client-datetime": "20240228121427+0900",
        "x-kream-device-id": "web;14664df6-8097-4f73-b572-1628a12828c5",
        "x-kream-web-build-version": "5.2.1",
        "x-kream-web-request-secret": "kream-djscjsghdkd",
        "cookie": "i18n_redirected=kr; ab180ClientId=33bf4c2b-8b4a-439f-a679-20cec1bcf600; _fwb=248KQz12QoX2JUUnU61LrqH.1708346430085; airbridge_device_alias=%7B%22amplitude_device_id%22%3A%22e90a2c00-bff8-45f8-9207-18971c61243d%22%7D; afUserId=03ef4574-bef5-45cf-8a2c-c7281c98ad78-p; _fbp=fb.2.1708390814844.1664890128; ab.storage.deviceId.a45e842b-5d46-46bf-8f41-2f75d6fd4b37=%7B%22g%22%3A%2268a24c14-4f39-fdf7-c9cd-b3dc172a1d23%22%2C%22c%22%3A1704014232343%2C%22l%22%3A1708573101813%7D; ab.storage.userId.a45e842b-5d46-46bf-8f41-2f75d6fd4b37=%7B%22g%22%3A%227fca1f71-936c-41a9-8267-4f2bb68d2288%22%2C%22c%22%3A1704014232341%2C%22l%22%3A1708573101813%7D; did=14664df6-8097-4f73-b572-1628a12828c5; _gid=GA1.3.1116982179.1709089898; AF_SYNC=1709089898702; AMP_MKTG_487619ef1d=JTdCJTIycmVmZXJyZXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRm5pZC5uYXZlci5jb20lMkYlMjIlMkMlMjJyZWZlcnJpbmdfZG9tYWluJTIyJTNBJTIybmlkLm5hdmVyLmNvbSUyMiU3RA==; _token.social_naver=false; _refresh_token.social_naver=false; refresh_token_cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTA4OTkwMywianRpIjoiY2YzMjJlZGUtNjA5YS00YWE4LTkwNmMtODE5YTc2MjE3MmM5IiwidHlwZSI6InJlZnJlc2giLCJpZGVudGl0eSI6NDY5NDE1LCJuYmYiOjE3MDkwODk5MDMsImNzcmYiOiI2NWNmNjkxMS0xZGEzLTRjOWUtOTVlZS1iNjE2MzczYWZhNGIiLCJleHAiOjE3MDkxNzYzMDMsInVjIjp7InNhZmUiOnRydWV9fQ.1DfuHXNd-Vbu4pL95onY0fI8lQ-PGax7i3_b7795MbY; csrf_refresh_token=65cf6911-1da3-4c9e-95ee-b616373afa4b; login_type=social; _token.local=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzA5MDg5OTAzLCJqdGkiOiJjYzAxOTBiMy04YjEzLTRiYjAtOGE3Zi0zZTQ0ZDllOGU3MTUiLCJ0eXBlIjoiYWNjZXNzIiwiaWRlbnRpdHkiOjQ2OTQxNSwibmJmIjoxNzA5MDg5OTAzLCJjc3JmIjoiMzk3Yzc4ZWUtMTRlZS00MTAyLWE0MWQtMjBmNDhjYmUyYWJmIiwiZXhwIjoxNzA5MDk3MTAzLCJ1YyI6eyJzYWZlIjp0cnVlfX0.KC7kZEYMOFmMo2KLIdJdYHIbTuUXaEyaEgMD8TPFey4; _refresh_token.local=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTA4OTkwMywianRpIjoiY2YzMjJlZGUtNjA5YS00YWE4LTkwNmMtODE5YTc2MjE3MmM5IiwidHlwZSI6InJlZnJlc2giLCJpZGVudGl0eSI6NDY5NDE1LCJuYmYiOjE3MDkwODk5MDMsImNzcmYiOiI2NWNmNjkxMS0xZGEzLTRjOWUtOTVlZS1iNjE2MzczYWZhNGIiLCJleHAiOjE3MDkxNzYzMDMsInVjIjp7InNhZmUiOnRydWV9fQ.1DfuHXNd-Vbu4pL95onY0fI8lQ-PGax7i3_b7795MbY; strategy=local; _gat_gtag_UA_153398119_1=1; AMP_487619ef1d=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJlOTBhMmMwMC1iZmY4LTQ1ZjgtOTIwNy0xODk3MWM2MTI0M2QlMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjI3ZmNhMWY3MS05MzZjLTQxYTktODI2Ny00ZjJiYjY4ZDIyODglMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzA5MDg5ODk3MjQyJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTcwOTA5MDAzOTgzNSUyQyUyMmxhc3RFdmVudElkJTIyJTNBMTE4JTdE; ab.storage.sessionId.a45e842b-5d46-46bf-8f41-2f75d6fd4b37=%7B%22g%22%3A%22dae4ab48-9190-82bb-1b49-f6a0f27e70f1%22%2C%22e%22%3A1709091841266%2C%22c%22%3A1709089897645%2C%22l%22%3A1709090041266%7D; wcs_bt=s_59a6a417df3:1709090041; _ga_SRFKTMTR0R=GS1.1.1709089897.9.1.1709090041.56.0.0; _ga_5LYDPM15LW=GS1.1.1709089898.9.1.1709090041.56.0.0; _ga=GA1.3.796994484.1708346430; airbridge_session=%7B%22id%22%3A%222b01fa7c-7587-4d51-bdb6-1da6e828f758%22%2C%22timeout%22%3A1800000%2C%22start%22%3A1709089898435%2C%22end%22%3A1709090041765%7D",
        "Referer": "https://kream.co.kr/search?keyword=%EB%9F%AD%EC%85%94%EB%A6%AC&shop_category_id=9",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  }).then(resp => {
    const data = resp.items;
    res.json(data)
  })
})

module.exports = router;
