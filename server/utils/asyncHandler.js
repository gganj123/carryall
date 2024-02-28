module.exports = function (requestHandler) {
  return async function (req, res, next) {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next(err);
    }
  };
};