//[GET] admin/pages/products

const Product = require("../../models/products.model")
const ProductCategory = require("../../models/product-category.models.js")
const Account = require("../../models/account.model.js")
const filterStatusHelpers = require("../../helpers/filterStatus")
const createTreeHelper = require("../../helpers/create-tree.js")
const SearchHelpers = require("../../helpers/search")
const panigationHelpers = require("../../helpers/panigation")
const { Pagination } = require("antd")
const panigation = require("../../helpers/panigation")
const systemConfig =  require("../../config/system")

module.exports.index = async (req, res) => {
  
  const filterStatus = filterStatusHelpers(req.query)
  
  let find = {
    deleted: false,
  }

  const objectsearch = SearchHelpers(req.query)

  if(objectsearch.regex){
    find.title = objectsearch.regex ;
  }
  // console.log(req.query.status)
  if(req.query.status){
    find.status = req.query.status
  }

  // panigation
  const  countProducts  = await Product.countDocuments(find)
  
  let objectPagination = panigationHelpers(
    {
    currentPage: 1 ,
    limitItems : 4
    },
    req.query,
    countProducts
)

  // console.log(objectPagination.skip)

  //sort
  let sort ={}
  
  if(req.query.sortKey && req.query.sortValue ){
    sort[req.query.sortKey] = req.query.sortValue
  }else{
    sort.position = "desc"
  }

  // end sort
  const products = await Product
  .find(find).sort(sort)
  .limit(objectPagination.limitItems)
  .skip(objectPagination.skip)

  for (const product of products){
    // lấy ra thông tin người tạo
    const user = await Account.findOne({
      _id: product.createBy.account_id
    })
    if(user){
      product.accountFullname = user.fullName
    }
  
  // lấy ra thông tin người cập nhật gần nhất
  const updatedBy = product.updatedBy.slice(-1)[0]
  if(updatedBy){
    const userUpdated =await Account.findOne({
    _id : updatedBy.account_id
  })
  updatedBy.accountFullname= userUpdated.fullName
  }
}


  res.render("admin/pages/products/index",{
    pageTitle: "đây la trang danh sách sp ",
    products : products,
    filterStatus: filterStatus,
    keyword: objectsearch.keyword,
    Pagination: objectPagination
  });
}
//[PATCH] admin/pages/products/change/:status/:id
module.exports.changeStatus = async (req, res) =>{
  const status = req.params.status;
  const id = req.params.id;
  
  const updated = {
    account_id: res.locals.user.id,
    updatedAt : new Date()
    }

  await Product.updateOne({_id:id} , {
    status: status,
     $push: {updatedBy:updated}
  })

  req.flash("success","cập nhật trạng thái sản phẩm thành công")
  const previousUrl = req.get('referer') || '/admin/products';
  res.redirect(previousUrl);
}

//[GET] admin/pages/products/changeMulti
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  const updated = {
      account_id: res.locals.user.id,
      updatedAt : new Date()
    }

  try {
    switch (type) {
      case "active":
        await Product.updateMany(
          { _id: { $in: ids } },
          {
            $set: { status: "active" },
            $push: { updatedBy: updated }
          }
        );
        req.flash("success", `Đã cập nhật trạng thái 'active' cho ${ids.length} sản phẩm`);
        break;

      case "inactive":
        await Product.updateMany(
          { _id: { $in: ids } },
          {
            $set: { status: "inactive" },
            $push: { updatedBy: updated }
          }
        );
        req.flash("success", `Đã cập nhật trạng thái 'inactive' cho ${ids.length} sản phẩm`);
        break;

      case "delete-all":
        await Product.updateMany(
          { _id: { $in: ids } },
          {
            $set: {
              deleted: false,
              deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date()
              }
            }
          }
        );
        req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm`);
        break;

      case "chage-position":
        for (const item of ids) {
          let [id, position] = item.split("-");
          position = parseInt(position);
          await Product.updateOne({ _id: id }, { 
            $set: { position: position },
            $push: { updatedBy: updated }
           });
        }
        break;

      default:
        req.flash("error", "Hành động không hợp lệ");
        break;
    }
  } catch (err) {
    console.error("Lỗi khi xử lý changeMulti:", err);
    req.flash("error", "Đã xảy ra lỗi khi cập nhật sản phẩm");
  }

  const previousUrl = req.get("referer") || "/admin/products";
  res.redirect(previousUrl);
};


//[DELTE] admin/pages/products/delete/:id
module.exports.deleteitem = async (req, res) =>{
  const id = req.params.id;
  await Product.updateOne({ _id :id} , {
    deleted :true,
    // deletedAt: new Date()
    deletedBy :{
      account_id: res.locals.user.id,
      deletedAt: new Date()
    }
  }
  )
  req.flash("success",`đã xóa thành công 1 sản phẩm`)
  
  const previousUrl = req.get('referer') || '/admin/products';
  res.redirect(previousUrl);
}



// [GET] /admin/products/creat
module.exports.create= async (req, res) => {

    let find = {
    deleted : false,
  }
  const category = await ProductCategory.find(find) 

  const newCategory =createTreeHelper.tree(category)
  res.render("admin/pages/products/creat",{
    pageTitle: "thêm mới sản phẩm ",
    category: newCategory
  });
}

// [POST] /admin/products/creat
module.exports.createPOST= async (req, res) => {
  
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  if(req.body.position == ""){
    const countProducts = await Product.countDocuments()
    req.body.position = countProducts + 1;
  }
  else{
    req.body.position = parseInt(req.body.position)
  }

  req.body.createBy = {
  account_id: res.locals.user.id,
  createdAt: new Date()
}

  const product = new Product(req.body)
  await product.save()
  req.flash("success",`thêm sản phẩm thành công`)
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/:id
module.exports.edit= async (req, res) => {
  
  try {
    const find={
    deleted: false,
    _id: req.params.id
  }
  const product = await Product.findOne(find)

  const category = await ProductCategory.find({
    deleted : false,
  }) 

  const newCategory =createTreeHelper.tree(category)

  console.log(product);
  res.render("admin/pages/products/edit.pug",{
    pageTitle: "Chỉnh sửa sản phẩm ",
    product:product,
    category: newCategory 
  });
  req.flash("success",`cập nhật thành công`)
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch= async (req, res) => {
  const id = req.params.id
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position = parseInt(req.body.position)
  if(req.file){
    req.body.thumbnail = `/uploads/${req.file.filename}`
  }
  try {
    const updated = {
      account_id: res.locals.user.id,
      updatedAt : new Date()
    }
    await Product.updateOne({_id:id} ,
       {...req.body , 
       $push: {updatedBy:updated}},
      )
    req.flash("success" , 'cập nhật thành công')
  } catch (error) {
    // req.flash("error" , 'cập nhật thất bại')
  }
  res.redirect("back")
}


// [GET] /admin/products/detail/:id
module.exports.detail= async (req, res) => {
  try {
    const find={
    deleted: false,
    _id: req.params.id
  }
  const product = await Product.findOne(find)
  console.log(product);
  
  res.render("admin/pages/products/detail",{
    pageTitle: product.title,
    product:product
    
  });
  } catch (error) {
    req.redirect(`${systemConfig.prefixAdmin}/products`);
  }
}