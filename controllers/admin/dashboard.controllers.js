//[GET] admin/pages/dashboard

const User = require("../../models/user.models");

module.exports.dashboard = async (req, res) => {
  res.render("admin/pages/dashboard", {
    pagetitle: "Trang quản trị",
  });
};