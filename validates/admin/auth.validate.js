module.exports.loginPost = (req, res, next) => {

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    return res.redirect("admin/products/accounts");
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    return res.redirect("admin/products/accounts");
  }

  // ✅ Tất cả điều kiện đều hợp lệ, cho phép tiếp tục
  next();
};
