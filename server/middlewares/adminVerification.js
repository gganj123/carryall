const { ADMIN } = process.env;

function adminVerification(req, res, next) {
  if (req.session.username == ADMIN) {
    return next();
  } else {
    return res.status(403).json({ message: "접근불가" });
  }
}

module.exports = adminVerification;
