const md5 = require("md5")
const User = require("../../models/user.models")
const ForgotPassword = require("../../models/forgot-password.router")
const Cart = require("../../models/cart.models")
const generateHelper = require("../../helpers/generate")
const sendMailHelper = require("../../helpers/sendMail")
//[GET] /user/register 
module.exports.register = async (req,res) =>{
  res.render("client/pages/user/register",{
    pagetitle :"Đăng kí tài khoản"
  })
}
//[POTS] /user/register 
module.exports.registerPost = async (req,res) =>{
  const exitsEmail = await User.findOne({
    email :req.body.email ,
  });
  if(exitsEmail){
    req.flash("error" ,"email đã tồn tại")
    res.redirect("user/register")
    return ;
  }
  req.body.password = md5(req.body.password)

  const user = new User(req.body)
  await user.save()

  res.cookie("tokenUser" , user.tokenUser)
  res.redirect("/")
}
//[GET] /user/login 
module.exports.login = async (req,res) =>{
  res.render("client/pages/user/login",{
    pagetitle :"Đăng nhập"
  })
}

//[POTS] /user/loginPost 
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    return res.redirect("user/login");
  }

  if (md5(password) !== user.password) {
    req.flash("error", "Password sai");
    return res.redirect("user/login");
  }

  if (user.status === "inactive") {
    req.flash("error", "Tài khoản đang bị khóa");
    return res.redirect("user/login");
  }
  const cart = await Cart.findOne({
    user_id: user.id 
  })
  if(cart){
  res.cookie("cartId", cart.id);
  }
  else{
    await Cart.updateOne(
    { _id: req.cookies.cartId },
    { user_id: user.id }
  );

  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
//[GET] user/logout
module.exports.logout = async (req,res) =>{
  res.clearCookie("tokenUser")
  res.redirect("/")
}

//[GET] user/forgot/password
module.exports.forgotPassword = async (req,res) =>{
  res.render("client/pages/user/forgot-password",{
    pagetitle: "lấy lại mật khẩu"
  })
}
//[POST] user/forgot/password
module.exports.forgotPasswordPost = async ( req,res) =>{
  const email = req.body.email ;
  const user = await User.findOne({
    email:email,
    deleted: false ,
  })
  if(!user) {
    req.flash("error" ,"email không tồn tại")
    res.redirect("user/password/forgot");
    return
  }
  //lưu thông tin vào data base
  const otp = generateHelper.generateRandomString(8)
  const objectForgotPassword = {
    email : email ,
    otp : otp,
    expireAt : Date.now() 
  }
  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save()
  // nếu tồn tại email thì gửi mã otp
  const subject = "Mã opt xác minh lấy lại mật khẩu";
  const html =`
    Mã opt để lấy lại mật khẩu là <b> ${otp} </b>
  `
  sendMailHelper.sendMail(email,subject,html) 
  res.redirect(`/user/password/otp?email=${email}`)
}

// [GET] user/password/otp
module.exports.otpPassword = async (req ,res) =>{
  const email = req.query.email ;
  res.render("client/pages/user/otp-password",{
    pagetitle :"Nhập mã otp",
    email: email
  })
}
// [POST] user/password/otp
module.exports.otpPasswordPost = async (req,res) =>{
  const email = req.body.email ;
  const otp = req.body.otp

  const result = await ForgotPassword.findOne({
    email : email ,
    otp : otp
  })
  if(!result){
    req.flash("error","Mã otp không hợp lệ");
    res.redirect(`http://localhost:3000/user/password/otp?email=${email}`)
    return ;
  }
  const user = await User.findOne({
    email:email
  });
  res.cookie("tokenUser" , user.tokenUser)
  res.redirect("/user/password/reset")
}
// [get] user/password/reset
module.exports.resetPassword= async(req,res) =>{
  res.render("client/pages/user/reset-password",{
    pagetitle : "Đổi mật khẩu"
  })
}
//[POST] user/password/reset 
module.exports.resetPasswordPost = async(req,res) =>{
  const password = req.body.password ;
  const tokenUser = req.body.tokenUser
  await User.updateOne({
    tokenUser: tokenUser 
  },{
    password: md5(password)
  }) 
  res.redirect("/")
}

// [GET] user/info
module.exports.info = async (req,res) =>{
  res.render("client/pages/user/info",{
    pagetitle : "Thông tin tài khoản",
  })
}