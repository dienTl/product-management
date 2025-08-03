module.exports.createPost = (req,res,next) =>{
  if(!req.body.title.length ){
    req.flash("error",`vui lòng nhập tiêu đề`)  
    res.redirect("http://localhost:3000/admin/products/create")
    return
  }
  next();
}