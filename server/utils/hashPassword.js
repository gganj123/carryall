const { createHash } = require('crypto');

module.exports = (password) => {
  const hash = createHash('sha1');
  hash.update(password);
  return hash.digest('hex');
};