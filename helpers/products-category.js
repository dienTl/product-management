const ProductCategory = require("../models/product-category.models")

module.exports.getSubCategory = async (parentId) =>{
const getCategory =  async (parentId) => {
const subs = await ProductCategory.find({
    parent_id: parentId,
    status: "active",
    deleted: false,
    });
  let allsub = [...subs];
  for (const sub of subs) {
    const childs = await getCategory(sub.id);
    allsub = allsub.concat(childs);
}

return allsub
}
const result = await getCategory(parentId)
return result
}