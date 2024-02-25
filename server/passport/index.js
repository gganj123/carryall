const passport = require('passport');
const local = require('./strategies/local');

module.exports = () => {
  passport.use(local);
};