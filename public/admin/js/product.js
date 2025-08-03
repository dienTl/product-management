//change status
const butonChangeStatus = document.querySelectorAll("[button-change-status]")
if(butonChangeStatus.length > 0){
  const formchangeStatus = document.querySelector("#form-change-status");
  // console.log(formchangeStatus)
  const path = formchangeStatus.getAttribute("data-path")
  butonChangeStatus.forEach(button => {
    button.addEventListener("click",()=> {
      const statuscurrent = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      let statusChange = statuscurrent == "active" ? "inactive" : "active"  
      const action = path + `/${statusChange}/${id}?_method=PATCH`
      formchangeStatus.action = action;
      formchangeStatus.submit()
    })
  })
}
//end change status
// button change status category products
  // const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
  // console.log(buttonChangeStatus)
  // if(buttonChangeStatus.length>0){
  //   const formChangeStatus = document.querySelector("#form-change-status");
  //   const path = formChangeStatus.getAttribute("data-path")
  //   buttonChangeStatus.forEach(button =>{
  //     button.addEventListener("click",()=>{
  //       const statuscurrent = button.getAttribute("data-status")
  //       const id = button.getAttribute("data-id")
  //       let statusChange = statuscurrent == "active" ? "inactive" : "active" 
  //       const action = path +`/${statusChange}/${id}?_method=PATCH`
  //       formChangeStatus.action = action;
  //       console.action(action)
  //       formChangeStatus.submit()
  //     })
  //   })
      
      
    // }

// end button change status category products
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
          console.log(action)
          formdeleteitem.submit();
        }

      })
    })
}
console.log("ok")
//end delete item 