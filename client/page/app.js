const express = require('express');
const app = express();

// 정적 파일 서빙 설정
app.use(express.static('js'));


// 루트 경로에 대한 GET 요청 처리
app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/main.html');
});


// Express 애플리케이션 리스닝
app.listen(5001, () => {
  console.log('서버가 5001번 포트에서 실행 중입니다.');
});