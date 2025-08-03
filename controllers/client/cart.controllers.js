const Cart = require("../../models/cart.models.js")
const Product = require("../../models/products.model.js")

const productsHelper =require("../../helpers/products.js")
// [POST] /cart/add/:product
module.exports.add = async (req,res) =>{
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)
  const cartId = req.cookies.cartId 

  console.log(productId)
  console.log(quantity)
  console.log(cartId)
  const cart = await Cart.findOne({
    _id : cartId
  });
    const existProductIncart = cart.products.find(item => item.product_id == productId)

    if(existProductIncart){
      const quantityNew =  quantity + existProductIncart.quantity;
      await Cart.updateOne({
        _id : cartId ,
        "products.product_id" :  productId
      },{
        $set:{
          "products.$.quantity" : quantityNew
        }
      })
    }
    else{
        await Cart.updateOne(
          { _id: cartId },
          {
            $push: {
              products: {
                product_id: productId,
                quantity: quantity
              }
            }
          }
        )
    }



  req.flash("success","thêm vào giỏ hàng thành công")
  const previousUrl = req.get('referer') || 'product';
  res.redirect(previousUrl);
  
}
// [GET] /cart
module.exports.index = async (req,res) =>{
  const cartId = req.cookies.cartId ;
  const cart = await Cart.findOne({
    _id : cartId
})

  if(cart.products.length > 0){
    for( const item of cart.products){
      const productId = item.product_id
      const productInfo =await Product.findOne({
        _id : productId ,
        deleted : false,
      }).select("title thumbnail slug price discountPercentage")
      productInfo.priceNew = productsHelper.priceNewProduct(productInfo)

      item.productInfo = productInfo

      item.totalPrice = productInfo.priceNew * item.quantity
    }
  }
  cart.totalPrice = cart.products.reduce((sum,item) =>sum + item.totalPrice , 0)
  // console.log(cart)
  res.render("client/pages/cart/index.pug",{
    pagetitle:"giỏ hàng",
    cartDetail :cart
  }
)
}
// [GET] /cart/delete/:ProductId
module.exports.delete = async (req,res) =>{
  const cartId =req.cookies.cartId
  const productId =req.params.productId
  
  await Cart.updateOne({
    _id : cartId,
  },{
    $pull:{products :{product_id : productId}}
  })

  req.flash("success","xóa sản phẩm ở giỏ hàng thành công")
  const previousUrl = req.get('referer') || 'product';
  res.redirect(previousUrl);
}

// [GET] /cart/update/:ProductId/:quantity
module.exports.update = async (req,res) =>{
  const cartId =req.cookies.cartId
  const productId =req.params.productId
  const quantity = req.params.quantity
  await Cart.updateOne({
    _id :cartId ,
    "products.product_id" : productId,
  },{
    $set:{
      "products.$.quantity":quantity,
    }
  })
  req.flash("success","cập nhật thành công")
  const previousUrl = req.get('referer') || 'product';
  res.redirect(previousUrl);
}