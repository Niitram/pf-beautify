const { Client, Shop, ShopsDetail } = require("../../db");
const addStock = require("../Products/addStock");
const purchaseDevolution = async ({ clientId, shopId }) => {
  const client = await Client.findByPk(clientId);
  const shop = await Shop.findByPk(shopId);
  const newBalance = client.balance + Number(shop.amount);
  const shopDetails = await ShopsDetail.findAll({
    where: { ShopId: shop.id },
  });

  shopDetails.forEach(async (product) => {
    await addStock(product.dataValues.ProductId, product.dataValues.count);
  });
  await client.update({ balance: newBalance });
  await shop.destroy();
  
  return {success:'Balance added to your beautify wallet' , newBalance: client.balance};
}; 

module.exports = purchaseDevolution;
