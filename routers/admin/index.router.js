const dashboardRoutes = require("./dashboard.router")

const authMiddleware = require("../../middlewares/admin/auth.middleware")
const productsRouters = require("./product.router")
const productsCategoryRouters = require("./product-category.router")
const roleRouters = require("./role.router")
const accountRouters = require("./account.router")
const authRouters = require("./auth.router")
const myACcountRouters = require("./my-account")
const settingRouters = require("./setting.router")
systemconfig = require("../../config/system")
module.exports = (app) => {
  
  const PATH_ADMIN = systemconfig.prefixAdmin ;
  app.use(
    PATH_ADMIN + "/dashboard" ,
    authMiddleware.requireAuth, 
    dashboardRoutes)

  app.use(PATH_ADMIN + "/products",authMiddleware.requireAuth, productsRouters) // authmiddleware để check token xem thỏa màn hay không

  app.use(PATH_ADMIN + "/products-category",authMiddleware.requireAuth, productsCategoryRouters)
  
  app.use(PATH_ADMIN + "/roles",authMiddleware.requireAuth, roleRouters)

  app.use(PATH_ADMIN + "/accounts",authMiddleware.requireAuth, accountRouters)

  app.use(PATH_ADMIN + "/auth", authRouters)

  app.use(PATH_ADMIN + "/my-account",authMiddleware.requireAuth, myACcountRouters )

  app.use(PATH_ADMIN + "/setting",authMiddleware.requireAuth, settingRouters)
}