const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const userMiddleware = require("../../middlewares/client/user.middleware")
const settingMiddleware = require("../../middlewares/client/setting.middleware")
const searchRoutes = require("./search.router")
const cartRoutes = require("./cart.router")
const checkoutRoutes = require("./checkout.router")
const chatRoutes = require("./chat.router")
const userRouter = require("./user.router")
const productRouter = require("./product.router")
const homeRoutes = require("./home.router")
module.exports =(app) => {
  app.use(categoryMiddleware.category)

  app.use(cartMiddleware.cartId)

  app.use(userMiddleware.infoUser)

  app.use(settingMiddleware.SettingGeneral)

  app.use("/", homeRoutes)

  app.use("/product" , productRouter )

  app.use("/search" , searchRoutes)
  
  app.use("/cart" , cartRoutes)

  app.use("/checkout" , checkoutRoutes)
  
  app.use("/user" , userRouter)

  app.use("/chat" , chatRoutes )
}