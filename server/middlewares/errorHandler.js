// 에러 처리 전담 미들웨어
function errorHandler(error, req, res, next) {
  if (error) {
    return res
      .status(error.statusCode || 500) // error.statusCode 없으면 500 (내부 서버 오류) 반환
      .json({ success: false, message: error.message }); // 에러 메시지 객체 형태로 전달
  }
  next(); // 에러 처리 후 next 메소드 호출해 다음 동작 수행
}
module.exports = errorHandler;