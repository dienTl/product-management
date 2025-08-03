const ProductCategory =require("../../models/product-category.models")
const createTreeHelper = require("../../helpers/create-tree")
module.exports.category = async (req,res,next) =>{
  const productCategory = await ProductCategory.find({
    deleted :false
  })
    const newProductCategory =createTreeHelper.tree(productCategory)
    res.locals.layoutProductsCategory = newProductCategory
  next();
}