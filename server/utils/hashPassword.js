const crypto = require('crypto'); // 비밀번호 해시 때 사용하려고 미리 만들기~

module.exports = (password) => {
  const hash = crypto.createHash('sha1');
  hash.update(password);
  return hash.digest("hex");
}