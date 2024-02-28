// req.body가 비어있는지 체크.
function bodyChecker(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    const err = new Error("경고! req.body가 비어있습니다.");
    err.statusCode = 400;
    next(err);
  }
  // req.body가 비어있지 않다면 다음 미들웨어 실행
  next();
}
module.exports = bodyChecker;