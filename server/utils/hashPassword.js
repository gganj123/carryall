// const { createHash } = require('crypto') // 비밀번호 해시 때 사용하려고 미리 만들기~
const bcrypt = require('bcrypt');
module.exports = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
// module.exports = (password) => {
//   const hash = createHash('bcrypt');
//   hash.update(password);
//   return hash.digest("hex");
// }