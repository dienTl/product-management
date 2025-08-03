const Product = require("../../models/products.model")
const productsHelper =  require("../../helpers/products")
//[GET] /
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured:"1",
    deleted: false,
    status: "active"
  })
    const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured)
  //hiển thị danh sách sản phẩm mới nhất
    const productsNew =await Product.find({
      deleted: false,
      status: "active"
    }).sort({position:"desc"}).limit(6)
    const newProductsNew = productsHelper.priceNewProducts(productsNew)
  // end hiển thị danh sách sản phẩm mới nhất
  res.render("client/pages/home/index.pug",{
    pagetitle: "Trang chủ",
    productsFeatured :newProductsFeatured,
    newProductsNew : newProductsNew
  });
}