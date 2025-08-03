const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater') // để tìm kieerm dẽ lên top 
mongoose.plugin(slug)

const productSchema =  new mongoose.Schema({
  title: String, // SP1
  product_category_id: {
    type :String ,
    default:"",
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured: String,
  position: Number,
  slug: { 
  type: String, 
  slug: "title", // sản phẩm 1
  unique: true // để cho slug alkf 1 duy nhất
  },
  createBy: {
    account_id : String ,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  deleted: {
    type: Boolean ,
    default: false
  },//deleted :DATE
  deletedBy: {
    account_id : String ,
    deletedAt: Date
  },
updatedBy: [
  {
    account_id: String,
    updatedAt: Date,
  }
],
  },{
    timestamps: true // để cho có thời gian hiện tại
  }
);
const Product = mongoose.model("Product" , productSchema , "products")

module.exports = Product