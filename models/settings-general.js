const mongoose = require("mongoose");

const settingGenneralSchema =  new mongoose.Schema({
    websiteName :String ,
    logo : String ,
    phone : String ,
    email : String ,
    address: String ,
    copyright : String
  },{
    timestamps: true // để cho có thời gian hiện tại
  }
);
const SettingGeneral = mongoose.model("SettingGeneral" , settingGenneralSchema , "settings-general")

module.exports = SettingGeneral