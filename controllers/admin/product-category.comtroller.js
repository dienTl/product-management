const Role = require("../../models/roles.model")
const ProductCategory = require("../../models/product-category.models")
const createTreeHelper = require("../../helpers/create-tree")
const systemConfig =  require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus")
//[GET] admin/pages/products-category
module.exports.index = async (req, res) => {
  const filterData = filterStatusHelper(req.query)
  
  let find = {
    deleted: false,
  }

  if(req.query.status){
    find.status = req.query.status
  }

  const records = await ProductCategory.find(find)
  
  const newRecords =createTreeHelper.tree(records)
  res.render("admin/pages/products-category/index",{
    pageTitle: "đây la trang mục sách sp ",
    records:newRecords,
    filterStatus : filterData 
  });
}
// [GET] admin/pages/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted : false,
  }

  const records = await ProductCategory.find(find)
  
  const newRecords =createTreeHelper.tree(records)
  // console.log(newRecords)
  res.render("admin/pages/products-category/create",{
    pageTitle: "Tạo danh mục ",
    records:newRecords,
    
  });
}

// [POST] /admin/products-category/create
module.exports.createPOST= async (req, res) => {
  // console.log(res.locals.role.permissions)
  const permissions = res.locals.role?.permissions || [];
  if(permissions.includes("products-category_create")){
    if(req.body.position == ""){
      const count = await ProductCategory.countDocuments();
      req.body.position = count+1
    }
    else{
      req.body.position=parseInt(req.body.position)
    }
    const record = new ProductCategory(req.body)
    await record.save()
    req.flash("success",`thêm sản phẩm thành công`)
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
  else{
    res.send("403")
    return
  }
    
}
//[PATCH] admin/pages/products-category/:status/:id
module.exports.changeStatus = async (req,res)=>{
  const status = req.params.status;
  const id = req.params.id;
  await ProductCategory.updateOne({_id:id}, {status:status})
  req.flash("success","bạn cập nhật thành công")
  const previousUrl = req.get('referer') || 'admin/pages/products-category';
  res.redirect(previousUrl);
}

//[GET] admin/pages/products-category/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id ;
  // console.log(id)
  const data = await ProductCategory.findOne({
    _id:id,
    deleted:false
  })
  const records = await ProductCategory.find({
    deleted:false
  })
    const newRecords =createTreeHelper.tree(records)
  // console.log(records)
  res.render("admin/pages/products-category/edit",{
    pageTitle:"Chỉnh sửa danh mục sản phẩm",
    records:newRecords,
    data:data
  })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
}
//[PATCH] admin/pages/products-category/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id ;

  
  req.body.position = parseInt(req.body.position)
  await ProductCategory.updateOne({_id:id}, req.body)
  
  const previousUrl = req.get('referer') || '/admin/products-category';
  res.redirect(previousUrl);
  req.flash("success",`cập nhật thành công`)
}

// [GET] /admin/products-category/detail/:id
module.exports.detail= async (req, res) => {
  try {
    const find={
    deleted: false,
    _id: req.params.id
  }
  const product_category = await ProductCategory.findOne(find)
  res.render("admin/pages/products-category/detail",{
    pageTitle: product_category.title,
    product:product_category
    
  });
  } catch (error) {
    const previousUrl = req.get('referer') || '/admin/products-category';
    res.redirect(previousUrl);
  }
}

//[DELTE] admin/pages/products/delete/id
module.exports.deleteitem = async (req, res) =>{
  const id = req.params.id;
  await ProductCategory.updateOne({ _id :id} , {
    deleted :true,
    deletedAt: new Date()
  }
  )
  req.flash("success",`đã xóa thành công 1 sản phẩm`)
  
  const previousUrl = req.get('referer') || '/admin/products-category';
  res.redirect(previousUrl);
}
