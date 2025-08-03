module.exports = async (req, res, next) => {
  console.log("Middleware checkAdminLogin chạy");

  const token = req.cookies?.token;
  console.log("Token từ cookie:", token);

  if (!token) {
    console.log("Không có token, chuyển hướng login");
    return res.redirect("/admin/auth/login");
  }

  const user = await Account.findOne({ token, deleted: false });
  console.log("User tìm được:", user);

  if (!user) {
    console.log("Token sai, xóa cookie");
    res.clearCookie("token");
    return res.redirect("/admin/auth/login");
  }

  req.user = user;
  console.log("Đăng nhập hợp lệ, đi tiếp dashboard");
  next();
};