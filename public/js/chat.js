

// CLIENT_END_MESSAGE
   const formSendData = document.querySelector(".chat .inner-form");
   if(formSendData){
    formSendData.addEventListener("submit" ,(e) =>{
      e.preventDefault()
      const content = e.target.elements.content.value
      if(content){
        socket.emit("CLIENT_SEND_MESSAGE" , content)
        e.target.elements.content.value =""
      }
    })
   }
// END  CLIENT_END_MESSAGE


//SERVER_RETURN_MESSAGE
socket.on("SERVER_SEND_MESSAGE", (data) => {
  const body = document.querySelector(".chat .inner-body")
  const myId = document.querySelector("[my-id]").getAttribute("my-id")
  const div = document.createElement("div")
  div.classList.add("inner-incoming")
  let htmlFullName = "";
  if(myId == data.userId){
    div.classList.add("inner-outgoing")
  }
  else{
    htmlFullName =` <div class="inner-name" > ${data.fullName} </div>`
    div.classList.add("inner-incoming")
  }
  div.innerHTML =  `
    ${htmlFullName}
    <div class="inner-content"> ${data.content} </div>
  `
  body.appendChild(div)
})
//END SERVER_RETURN_MESSAGE