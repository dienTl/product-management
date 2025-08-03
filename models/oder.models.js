const mongoose = require("mongoose");

const orderSchema =  new mongoose.Schema({
  // user_id: String,
  cart_id: String,
  userInfo : {
    fullName : String ,
    phone : String ,
    address : String ,
  },
  products :[
    {
      product_id : String , 
      price : Number ,
      quantity : Number,
      discountpercentage :Number
    }
  ],
  deleted: {
    type: Boolean ,
    default: false
  },
  deletedAt:Date
  },{
    timestamps: true // để cho có thời gian hiện tại
  }
);
const Order = mongoose.model("Order" , orderSchema , "orders")

module.exports = Order