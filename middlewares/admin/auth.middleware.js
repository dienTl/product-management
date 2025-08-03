const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  const user = await Account.findOne({ token, deleted: false });
  if (!user) {
    res.clearCookie("token");
    return res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  const role = await Role.findById(user.role_id).select("title permissions");

  // ✅ Gắn vào biến toàn cục cho view
  res.locals.user = user;
  res.locals.role = role;

  next();
};