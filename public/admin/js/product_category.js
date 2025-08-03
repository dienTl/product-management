
// button change status category products
  const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
  if(buttonChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path")
    buttonChangeStatus.forEach(button => {
      button.addEventListener("click",()=>{
        const statuscurrent = button.getAttribute("data-status")
        const id = button.getAttribute("data-id")
        let statusChange = statuscurrent == "active" ? "inactive" : "active" 
        const action = path +`/${statusChange}/${id}?_method=PATCH`
        formChangeStatus.action = action;
        formChangeStatus.submit()
      })
    })  
    }

// end button change status category products

// change status
    
// end change status

//delete item
    const buttonDelete=document.querySelectorAll("[button-delete]")
if(buttonDelete.length > 0){
  const formdeleteitem = document.querySelector("#form-delete-item")
  const path = formdeleteitem.getAttribute("data-path")

  buttonDelete.forEach(button => {
      button.addEventListener("click" , () => {
        const isConfirm = confirm("bạn có chắc có muốn xóa sản phẩm này")
        if(isConfirm){
          const id = button.getAttribute("data-id");
          const action = `${path}/${id}?_method=DELETE`;

          formdeleteitem.action=action;
          formdeleteitem.submit();
        }

      })
    })
}
//end delete item
//change status
const buttonstatus = document.querySelectorAll("[button-status]")
if(buttonstatus.length > 0){
  let url = new URL(window.location.href)
  buttonstatus.forEach(button =>{
    button.addEventListener("click",()=>{
      const status = button.getAttribute("button-status")
      if(status){
        url.searchParams.set("status",status)
      }
      else{
        url.searchParams.delete("status")
      }
      window.location.href= url.href
      console.log(window.location.href)
    })
  })
}
console.log("ok")
//end change status