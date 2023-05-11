const { Shop, ShopsDetail, Product } = require("../../db");

const postNewShop = async (shopData) => {
  //* creamos la compra general y la asociamos con el cliente
  const newShop = await Shop.create({
    amount: shopData.amount,
    discount: shopData.discount,
  });
  newShop.setClient(shopData.clientId);

  //* por cada producto comprado creamos un detalle, al que asociamos con la compra general y el producto
  //* lo devolvemos de manera organizada en un nuevo objeto

  //* el map devuelve un array de promesas, que se resuelven en el Promise.all()
  const promises = shopData.details.map(async (detail) => {
    const newDetail = await ShopsDetail.create({
      price: detail.price,
      count: detail.count,
    });
    newDetail.setProduct(detail.productId);
    newDetail.setShop(newShop.id);

    const product = await Product.findByPk(detail.productId);
    product.update({ stock: product.stock - detail.count });

    const finalDetail = {
      id: newDetail.id,
      price: newDetail.price,
      count: newDetail.count,
      productId: newDetail.ProductId,
      productName: product.name,
    };
    return finalDetail;
  });

  const details = await Promise.all(promises);

  //* reorganizamos la información de la compra general en un nuevo objeto
  const finalShop = {
    id: newShop.id,
    amount: newShop.amount,
    discount: newShop.discount,
    clientId: newShop.ClientId,
    details,
  };

  return finalShop;
};

module.exports = postNewShop;
