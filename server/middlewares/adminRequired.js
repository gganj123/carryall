module.exports = (memberType) => {
  return (req, res, next) => {
    // admin 확인하기
    if (memberType === "admin") {
      const adminId = req.get("username");
      if (adminId !== "adminCarryAll") {
        // 어드민 닉네임이 "adminCarryAll"이 아닌 경우 에러 발생
        next(new Error("Invalid Admin Username"));
        return;
      }
    } else {
      // memberType이 "admin"이 아닌 경우 에러 발생
      next(new Error("Invalid Member Type"));
      return;
    }

    const user = req.get("username");
    if (!user) {
      // 유저 닉네임이 없는 경우 에러 발생
      next(new Error("No User"));
      return;
    }

    next(); // 모든 조건을 만족할 때 다음 미들웨어 또는 라우터 핸들러 함수로 이동
  };
};