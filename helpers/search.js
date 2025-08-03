module.exports = (query) =>{
  let objectsearch = {
    keyword: "" ,
  }
  if(query.keyword){
    objectsearch.keyword = query.keyword

    const regex = new RegExp(objectsearch.keyword , "i")
    objectsearch.regex = regex
  }
  return objectsearch
}