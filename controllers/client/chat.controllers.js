//[get] chat
module.exports.index = (req,res) =>{
  res.render("client/pages/chats/index.pug",{
    pageTitle:"chat"
  })
}