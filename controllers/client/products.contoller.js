const productsHelper =  require("../../helpers/products")
const productsCategoryHelper =  require("../../helpers/products-category")

const ProductCategory = require("../../models/product-category.models")
//[GET] products

const Product = require("../../models/products.model")

module.exports.index = async (req,res) => {

  const products = await Product.find({
    
    status: "active",
    deleted: false
  }).sort({position : "desc"})
  const newProducts = productsHelper.priceNewProducts(products)
  
  res.render("client/pages/products/index.pug",{
    pagetitle:" day la trang ds sp",
    products: newProducts
  });
}
//[GET] products/:slugProduct
module.exports.detail = async (req,res) => {
  try {
    const find ={
      deleted: false,
      slug: req.params.slugProduct,
      status: "active"
    }
    const product = await Product.findOne(find);

    if(product.product_category_id){
      const category = await ProductCategory.findOne({
        _id: product.product_category_id ,
        status :"active" ,
        deleted :false
      })
      product.category = category;
    }
  
    product.pricenew = productsHelper.priceNewProduct(product)
    res.render("client/pages/products/detail.pug",{
    pagetitle: product.title ,
    product:product
  });
  } catch (error) {
    res.redirect("/product")
  }
  
}

//[GET] products/:slugCateogory
module.exports.category = async (req,res) => {
  const category = await ProductCategory.findOne({
    slug :req.params.slugCategory,
    status : "active",
    deleted: false
  })
  
     const listSubCategory = await productsCategoryHelper.getSubCategory(category.id)
     const listSubCategoryId = listSubCategory.map(item=> item.id)
    //  console.log(listSubCategoryId)
  // 6879d086df1b028343b843f9
  const products = await Product.find({
    product_category_id: { $in:[category.id ,...listSubCategoryId]},
    deleted : false
  }).sort({position:"desc"})
  const newProducts = productsHelper.priceNewProducts(products)
  res.render("client/pages/products/index.pug",{
    pagetitle: category.title,
    products: newProducts
  });
}