const systemConfig= require("../../config/system");
const { v4: uuidv4 } = require('uuid'); // thêm dòng này vào đầu file
const md5 = require('md5');
const Account = require("../../models/account.model");

//[GET] admin/auth/login
module.exports.login = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    const user = await Account.findOne({ token, deleted: false }); // ⚠️ THÊM deleted: false

    if (user) {
      return res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    }

    // ❗ Token sai hoặc user bị xóa => xóa cookie để không bị redirect mãi
    res.clearCookie("token");
  }

  res.render("admin/pages/auth/login", {
    pagetitle: "đăng nhập"
  });
};
//[POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await Account.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "email không tồn tại");
    return res.redirect('/admin/auth/login');
    
  }

  if (md5(password) != user.password) {
    req.flash("error", "sai mật khẩu");
   return  res.redirect('/admin/auth/login');
    
  }

  if (user.status === "inactive") {
    req.flash("error", "tài khoản bị khóa");
    return res.redirect('/admin/auth/login');
    
  }

  // ✅ Tạo token mới duy nhất
  const newToken = uuidv4();

  // ✅ Lưu token vào database
  user.token = newToken;
  await user.save();

  // ✅ Lưu token vào cookie
  res.cookie("token", newToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 ngày
  });
res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};


//[GET] admin/auth/logout
module.exports.logout = (req, res) => {
  // xóa token trong cookie
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}