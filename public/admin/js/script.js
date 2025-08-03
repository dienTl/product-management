// button stauts 
const buttonstatus = document.querySelectorAll("[button-status]");
if(buttonstatus.length > 0 ){
  let url = new URL(window.location.href) ;
  buttonstatus.forEach(button =>{
    button.addEventListener("click",() =>{
      const status = button.getAttribute("button-status")
      if(status){
        url.searchParams.set("status", status )
      }
      else{
        url.searchParams.delete("status")
      }
      window.location.href= url.href
    })
  })
}
//end button status

//form search 
const formsearch = document.querySelector("#form-search")
if(formsearch){
  let url = new URL(window.location.href)
  formsearch.addEventListener("submit",(e)=>{
    e.preventDefault()
    const keyword = e.target.elements.keyword.value
    if(keyword){
        url.searchParams.set("keyword", keyword )
      }
      else{
        url.searchParams.delete("keyword")
      }
      window.location.href= url.href
  })
}
// end form search

//panigation
  const buttonPagination  = document.querySelectorAll("[button-panigation]")
  buttonPagination.forEach(button=>{
    let url = new URL(window.location.href)
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-panigation")
      url.searchParams.set("page",page)
      window.location.href = url.href
    })
  })
//end pagination

//checkbox

  const checkboxMulti = document.querySelector("[checkbox-multi]")
  if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputIds = checkboxMulti.querySelectorAll("input[name='id']")
    // console.log(inputCheckAll)
    // console.log(inputIds)
    inputCheckAll.addEventListener("click", () =>{
      if(inputCheckAll.checked){
        inputIds.forEach(input =>{
            input.checked = true
        })
      }
      else{
        inputIds.forEach(input =>{
            input.checked = false
      })
    }})

    inputIds.forEach(input =>{
      input.addEventListener("click" , () =>{
        const countchecked = checkboxMulti.querySelectorAll(
          "input[name='id']:checked"
        ).length
        if(countchecked == inputIds.length){
          inputCheckAll.checked = true
        }else{
          inputCheckAll.checked = false
        }
      })
    })
  }
//endcheckbox

//form change multi

const formChangeMulti  = document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit" , (e) =>{
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    const typechange = e.target.elements.type.value ;
    const isConfirm = confirm("bạn có chắc muôn xóa những sản phẩm này không");
    if(!isConfirm){
      return
    }
    if(inputsChecked.length > 0 ){
      let ids =[];
      const inputids = formChangeMulti.querySelector("input[name='ids']")

      inputsChecked.forEach(input =>{
        const id = input.value;

        if(typechange == "chage-position"){
          const position = input.closest("tr").querySelector("input[name='position']").value
          ids.push(`${id}-${position}`)
          console.log(ids)
        }else{
          ids.push(id)
        }
      })
      inputids.value = ids.join(", ")

      formChangeMulti.submit();
    }
    else{
      alert("vui lòng chọn ít nhất 1 bản ghi")
    }
  })
}
// end form change multi

//show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
  const time=parseInt(showAlert.getAttribute("data-time"))
  const closeAlert = showAlert.querySelector("[close-alert]")
  setTimeout(() =>{
    showAlert.classList.add("alert-hidden")
  },time)
  closeAlert.addEventListener("click",()=>{
    showAlert.classList.add("alert-hidden")
  })
}

//end show alert

// upload image
  const uploadImage = document.querySelector("[upload-image]")
  if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change" , (e) =>{
      const file = e.target.files[0]
      uploadImagePreview.src = URL.createObjectURL(file)
    })
  }

  const HUY = document.querySelector("[HUY]");
if (HUY) {
  HUY.addEventListener("click", () => {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    if (uploadImageInput && uploadImagePreview) {
      uploadImageInput.value = "";
      uploadImagePreview.src = "";
    }
  });
}
//end upload image

//sort
  const sort = document.querySelector("[sort]")
  if(sort){
    let url = new URL(window.location.href)

    const sortSelect =sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]")
    // sắp xếp
    sortSelect.addEventListener("change", (e) =>{
      const value = e.target.value;
      const [sortKey,sortValue] = value.split("-")
      url.searchParams.set("sortKey",sortKey)
      url.searchParams.set("sortValue",sortValue)

      window.location.href=url.href
    })
    sortClear.addEventListener("click",()=>{
      url.searchParams.delete("sortKey")
      url.searchParams.delete("sortValue")
      window.location.href=url.href
    })

    //thêm slected
    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    if(sortKey && sortValue){
      const stringSort = `${sortKey}-${sortValue}`
      const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
      optionSelected.selected =true
    }
  }
//end sort