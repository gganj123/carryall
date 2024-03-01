// module.exports = (memberType) => {
//   return (req, res, next) => {
//     // admin 확인하기
//     if (memberType === "admin") {
//     const adminId = req.get("username");
//     if (adminId != "adminCarryAll") {
//       // 어드민 패스워드 정의 필요
//       next(new Error("Invalid Admin Password"));
//       return;
//     }
//   }
//     const user = req.get("username");
//     if (!user) {
//       next(new Error("No User"));
//       return;
//     }
//     next();
//   };
// };
