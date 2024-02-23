import axios from 'axios';

// 백엔드 API 엔드포인트 URL

const apiUrl = 'http://localhost:5000/category';

const testData = {
    "categoryId": "PB5_jgBvfT",
    "name": "김",
    "price": 1000,
    "image": "https://www.naver.com/",
    "option": "d",
    "stock": 12,
    "brand": "g"
};

const handleSubmit = async() => {
    try{
        const a = await axios.post(apiUrl, {  
            "categoryId":"PB5_jgBvfT",
            "name":"김",
            "price":1000,
            "image":"https://www.naver.com/",
            "option":"d",
            "stock":12,
            "brand":"g"
    });
}catch (err) {
    console.log(err);
  }
  console.log(a);
};

handleSubmit()
