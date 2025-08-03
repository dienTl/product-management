module.exports.priceNewProducts = (products) =>{
  const newProducts = products.map((item) =>{
    item.pricenew = ((item.price *(100- item.discountPercentage ))/100).toFixed(0)
    return item
  })
  return newProducts
}
module.exports.priceNewProduct = (product) => {
  const price = Number(product.price) || 0;
  const discount = Number(product.discountPercentage) || 0;

  const priceNew = ((price * (100 - discount)) / 100).toFixed(0);
  return parseInt(priceNew);
};