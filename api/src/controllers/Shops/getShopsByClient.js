const { Shop, ShopsDetail, Product, Category } = require("../../db");

const getShopsByClient = async (clientId) => {
  //* en la variable generalShops guarda todas las compras del cliente
  const generalShops = await Shop.findAll({ where: { ClientId: clientId } });

  //* en la variable categorys guarda todas las categorías
  const categorys = await Category.findAll();

  //* la función map devuelve un array de promesas
  const promises = generalShops.map(async (generalShop) => {
    //* busca los detalles de compra relacionados a la compra general
    const shopDetails = await ShopsDetail.findAll({
      where: { ShopId: generalShop.id },
      include: {
        model: Product,
        attributes: ["id", "name", "CategoryId"],
      },
    });

    //* mapea el array con los detalles para devolver otro array con los detalles de las compras pero más ordenados
    const newDetails = shopDetails.map((detail) => {
      //* crea el nuevo detalle
      const newDetail = {
        id: detail.id,
        productId: detail.Product.id,
        productName: detail.Product.name,
        price: detail.price,
        count: detail.count,
      };

      //* busca la categoría del producto del detalle y la agrega al objeto de detalle
      categorys.forEach((category) => {
        if (category.id === detail.CategoryId)
          newDetail.category = category.name;
      });
      return newDetail;
    });

    //* teniendo el nuevo array con los detalles organizados, creamos el objeto de la compra general incluyéndolo
    const finalShopDetail = {
      id: generalShop.id,
      amount: generalShop.amount,
      discount: generalShop.discount,
      details: newDetails,
    };

    return finalShopDetail;
  });

  //* resuelve las promesas que generó el map
  const finalShops = await Promise.all(promises);

  //* retorna las respuestas de esas promesas
  return finalShops;
};
module.exports = getShopsByClient;
