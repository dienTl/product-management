//[GET] admin/pages/dashboard

const User = require("../../models/user.models");
const account = require("../../models/account.model")
const ProductCategory = require("../../models/product-category.models");
const Product = require("../../models/products.model")
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
    total: 0,
    active: 0,
    inactive: 0,
    },
  product: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  account: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  user: {
    total: 0,
    active: 0,
    inactive: 0,
  }
};
  statistic.categoryProduct.total = await ProductCategory.countDocuments({
    deleted : false
  });
  statistic.categoryProduct.active = await ProductCategory.countDocuments({
    deleted : false,
    status :"active"
  });
  statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
    deleted : false,
    status:"inactive"
  });

  statistic.product.total = await Product.countDocuments({
    deleted : false
  });
  statistic.product.active = await Product.countDocuments({
    deleted : false,
    status :"active"
  });
  statistic.product.inactive = await Product.countDocuments({
    deleted : false,
    status:"inactive"
  });

    statistic.account.total = await account.countDocuments({
    deleted : false
  });
  statistic.account.active = await account.countDocuments({
    deleted : false,
    status :"active"
  });
  statistic.account.inactive = await account.countDocuments({
    deleted : false,
    status:"inactive"
  });

    statistic.user.total = await User.countDocuments({
    deleted : false
  });
  statistic.user.active = await User.countDocuments({
    deleted : false,
    status :"active"
  });
  statistic.user.inactive = await User.countDocuments({
    deleted : false,
    status:"inactive"
  });

  res.render("admin/pages/dashboard", {
    pagetitle: "Trang quản trị",
    statistic :statistic
  });
};