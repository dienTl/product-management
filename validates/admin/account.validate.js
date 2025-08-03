module.exports.createPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập tên");
    return res.redirect("http://localhost:3000/admin/products/accounts");
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    return res.redirect("http://localhost:3000/admin/products/accounts");
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    return res.redirect("http://localhost:3000/admin/products/accounts");
  }

  // ✅ Tất cả điều kiện đều hợp lệ, cho phép tiếp tục
  next();
};
module.exports.editPatch = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập tên");
    return res.redirect("http://localhost:3000/admin/products/accounts");
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    return res.redirect("http://localhost:3000/admin/products/accounts");
  }
  // ✅ Tất cả điều kiện đều hợp lệ, cho phép tiếp tục
  next();
};