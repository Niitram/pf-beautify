const { Shop, ShopsDetail, Client } = require("../../db");
const addStock = require("../Products/addStock");

const cancelShop = async (shopId) => {
  const shopToCancel = await Shop.findByPk(shopId, {
    include: { model: ShopsDetail },
  });
  const client = await Client.findByPk(shopToCancel.ClientId);

  shopToCancel.ShopsDetails.forEach(async (detail) => {
    const product = await addStock(detail.ProductId, detail.count);
  });
  8;
  await client.update({
    balance: -(shopToCancel.amount - shopToCancel.discount),
  });

  await shopToCancel.destroy();
  return true;
};

module.exports = cancelShop;
