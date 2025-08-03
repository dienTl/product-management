const { message } = require('antd');

const express = require('express')
const path = require('path')
const methodOverride = require('method-override')// để cài sử dụng method 
const bodyParser = require('body-parser') // dữ liệu từ body của request HTTP, cụ thể là các dữ liệu được gửi từ phía client 
const cookieParser = require('cookie-parser') // de su dung cookie , de hien thi thong bao
const session = require('express-session')  //de su dung cookie , de hien thi thong bao
const flash = require('express-flash')  //de su dung cookie , de hien thi thong bao
const moment = require('moment') // để dịnh dạng ngày giờ
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config() // cài để dùng env

app.use(methodOverride('_method'));// cài để dùng method 
const port = process.env.PORT

// parse application/x-www-form-urlencoded


const database = require("./config/database.js")
const route = require("./routers/client/index.router")
const routeAmin = require("./routers/admin/index.router.js")
database.connect();

const sysemConfig = require("./config/system.js")

// app locals varibles
app.locals.prefixAdmin = sysemConfig.prefixAdmin
app.locals.moment = moment
app.set("views" ,`${__dirname}/views`)
app.set("view engine" , "pug")

console.log(__dirname)
app.use(express.static(`${__dirname}/public`))// cài đẻ dugnf file tĩnh pbulic

// flash
  app.use(cookieParser('hello world'))
  app.use(session({cookie :{ maxAge: 60000}}));
  app.use(flash())
// end flash

//tiny mce

app.use('/tinymce',express.static(path.join(__dirname,'node_modules','tinymce')))
//end tiny mce

//routes
route(app);
routeAmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})