const Cart = require("../../models/cart.models");

module.exports.cartId = async (req, res, next) => {
  // Kiểm tra nếu chưa có cartId
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const oneYear = 365 * 24 * 60 * 60 * 1000;

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + oneYear),
    });

  }
  else{
    const cart = await Cart.findOne({
      _id : req.cookies.cartId
    })
   const totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);

    res.locals.minicart = {
      ...cart.toObject(), // hoặc cart nếu bạn chắc là không cần clone
      totalQuantity,
    };
  }
  next();

}