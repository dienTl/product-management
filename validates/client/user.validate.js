module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập tên");
    return res.redirect("http://localhost:3000/user/register");
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    return res.redirect("http://localhost:3000/user/register");
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    return res.redirect("http://localhost:3000/user/register");
  }

  // ✅ Tất cả điều kiện đều hợp lệ, cho phép tiếp tục
  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    return res.redirect("http://localhost:3000/user/register");
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu");
    return res.redirect("http://localhost:3000/user/register");
  }

  // ✅ Tất cả điều kiện đều hợp lệ, cho phép tiếp tục
  next();
};
module.exports.forgotPasswordPost = (req,res,next) =>{
  if(!req.body.email){
    req.flash("error" ,"Vui lòng nhập email")
    res.redirect("http://localhost:3000/user/password/forgot")
    return
  }
  next()
}

module.exports.resetPasswordPost = (req,res,next) =>{
  if(!req.body.password){
    req.flash("error" ,"Vui lòng xác thực mật khẩu")
    res.redirect("http://localhost:3000/user/password/reset")
    return
  }
  if(!req.body.confirmPassword){
    req.flash("error" ,"Vui lòng xác thực mật khẩu")
    res.redirect("http://localhost:3000/user/password/reset")
    return
  }
  if( req.body.password != req.body.confirmPassword){
    req.flash("error" ,"Mật khẩu không khớp")
    res.redirect("http://localhost:3000/user/password/reset")
    return
  }
  next()
}