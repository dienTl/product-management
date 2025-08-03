const mongoose = require("mongoose");

const roleSchema =  new mongoose.Schema({
  title: String, // SP1
  description: String,
  permissions:{
    type: Array,
    default : []
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
const Role = mongoose.model("Role" , roleSchema , "roles")

module.exports = Role