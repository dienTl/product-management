const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater') // để tìm kieerm dẽ lên top 
mongoose.plugin(slug)

const productCategorySchema =  new mongoose.Schema({
  title: String, // SP1
  parent_id: {
    type: String,
    default:"",
  },
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: { 
  type: String, 
  slug: "title", // sản phẩm 1
  unique: true // để cho slug alkf 1 duy nhất
},
  deleted: {
    type: Boolean ,
    default: false
  },
  deletedAt:Date
  },{
    timestamps: true // để cho có thời gian hiện tại
  }
);
const ProductCategory = mongoose.model("ProductCategory" , productCategorySchema , "products-category")

module.exports = ProductCategory