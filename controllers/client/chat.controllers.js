const Chat = require("../../models/chats.models")
const User = require("../../models/user.models")
//[get] chat
module.exports.index = async (req,res) =>{
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName
// socket
  _io.once('connection', (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content)=>{
      //lưu vào database
      const chat = new Chat({
        user_id : userId,
        content:content
      })
        await chat.save()
        // trả data về client 
      _io.emit("SERVER_SEND_MESSAGE",{
      userId :userId,
      fullName :fullName ,
      content : content
    })
    })
    
  });


// end socket

//lấy data từ database 
  const chats = await Chat.find({
    deleted : false ,
  }) 
  for (const chat of chats){
    const infoUser = await User.findOne({
      _id: chat.user_id 
    }).select("fullName avatar")
    chat.infoUser = infoUser 
  }
//end lấy data từ database 
  res.render("client/pages/chats/index.pug",{
    pageTitle:"chat",
    chats : chats
  })
}