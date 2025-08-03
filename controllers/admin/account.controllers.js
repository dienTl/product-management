const md5 = require('md5');
const Account = require("../../models/account.model");
const systemConfig =  require("../../config/system")

const Role = require("../../models/roles.model");
//[GET] admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Account.find(find).select("-password -token")
  for ( const record of records){
    const role = await Role.findOne({
      deleted: false
    })
    record.role =role
  }
  res.render("admin/pages/accounts/index.pug",{
    pagetitle: "Trang permission",
    records: records
  });
  
}
//[GET] admin/account/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted : false
  })
  res.render("admin/pages/accounts/create.pug",{
    pagetitle: "Trang tạo mới",
    roles: roles
  });
  
}
//[POST] admin/account/create
module.exports.createPost = async (req, res) => {
  const emailExist =  await Account.findOne({
    email: req.body.email,
    deleted: false
  })
  if(emailExist){
    req.flash("error" ,`email ${req.body.email} đã tồn tại`)
    const previousUrl = req.get('referer') || 'admin/accounts/create';
    res.redirect(previousUrl);
  }
  else{
    req.body.password = md5(req.body.password)
  const record = new Account(req.body)
  await record.save()
  req.flash("success" ,`tạo tài khoản thành công`)
  const previousUrl = req.get('referer') || 'admin/accounts/create';
  res.redirect(previousUrl);
  }
  
}
//[GET] admin/account/edit/:id
module.exports.edit =  async (req,res) =>{
  let find = {
     _id : req.params.id ,
     deleted : false
  }
  try {
    const data = await Account.findOne(find)
    const roles = await Role.find({
      deleted : false
    })
    res.render("admin/pages/accounts/edit",{
      pagetitle :" chỉnh sửa tài khoản",
      data : data ,
      roles : roles
    }
  )
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
}
//[PATCH] admin/account/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id

  const emailExist =  await Account.findOne({
    _id :{$ne : id} ,
    email: req.body.email,
    deleted: false
  })
  if(emailExist){
    req.flash("error" ,`email ${req.body.email} đã tồn tại`)
    
  }
  else{
  if(req.body.password){
    req.body.password = md5(req.body.password)
  }
  else{
    delete req.body.password
  }
  await Account.updateOne({_id : id}, req.body)
  req.flash("success" ,`cập nhật thành công`)
  }
  const previousUrl = req.get('referer') || 'admin/accounts';
  res.redirect(previousUrl);
}