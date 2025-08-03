const Role = require("../../models/roles.model")
const systemConfig =  require("../../config/system")
const productsHelper =  require("../../helpers/products")
//[GET] admin/role

module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Role.find(find)
  res.render("admin/pages/roles/index.pug",{
    pagetitle: "Trang permission",
    records:records
  });
  
}
//[GET] admin/role/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create",{
    pagetitle: "Trang tạo nhóm quyền",
  });
}
//[PSST] admin/role/create
module.exports.createPost = async (req, res) => {

  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
//[GET] admin/role/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find ={
    _id:id,
    deleted:false
  }

  const data  = await Role.findOne(find)
  res.render("admin/pages/roles/edit",{
    pagetitle:"sửa nhóm quyền",
    data: data
  })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
}
//[PATCH] admin/role/edit
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne({_id:id}, req.body)
  
    
    req.flash("success" ,"bạn cập nhật thành công")
  } catch (error) {
    
    req.flash("error" ,"bạn cập nhật thành công")
  }
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

//[GET] admin/role/permissions
module.exports.permissions = async (req, res) => {
  let find ={
    deleted : false 
  };
  const records = await Role.find(find)
  res.render("admin/pages/roles/permissions",{
    pagetitle: "Phần phân quyền",
    records: records
  });
}

//[PATCH] admin/role/permissionsPatch
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions)
  for (const item of permissions){
    await Role.updateOne({_id:item.id} ,{permissions:item.permissions})
  }
    
    req.flash("success","cập nhật trạng thái sản phẩm thành công")
  const previousUrl = req.get('referer') || '/admin/products';
  res.redirect(previousUrl);
  } catch (error) {
    
    req.flash("success","cập nhật trạng thái sản phẩm thành công")
  const previousUrl = req.get('referer') || '/admin/products';
  res.redirect(previousUrl);
  }
}
