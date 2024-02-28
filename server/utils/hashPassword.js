const { createHash } = require('crypto');

module.exports = (password) => {
  try {
    const hash = createHash('sha1');
    hash.update(password);
    return hash.digest('hex');
  } catch (error) {
    alert("잘못 입력받았습니다")
    return;
  }
};
