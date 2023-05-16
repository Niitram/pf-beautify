const { Shop, ShopsDetail, Client, Product, Category } = require("../../db");

const getAllShopsDetails = async () => {
  //* trae todos los detalles de compra con las características del producto comprado
  const shops = await ShopsDetail.findAll({
    include: {
      model: Product,
      attributes: ["id", "name", "CategoryId"],
    },
  });

  //* trae la compra general con los datos del comprador
  const generalShops = await Shop.findAll({
    include: {
      model: Client,
      attributes: ["id", "fullName", "email"],
    },
  });

  //* trae todas las categorías para completar la información del producto comprado
  const categorys = await Category.findAll();

  //* junta en un sólo objeto la información de la compra, del cliente y del producto
  const combinedShops = shops.map((shopDetail) => {
    const newDetail = {
      id: shopDetail.id,
      price: shopDetail.price,
      count: shopDetail.price,
      productId: shopDetail.Product.id,
      productName: shopDetail.Product.name,
    };

    categorys.forEach(({ id, name }) => {
      if (id === shopDetail.Product.CategoryId) {
        newDetail.productCategory = name;
        return;
      }
    });

    generalShops.forEach((generalShop) => {
      if (generalShop.id === shopDetail.ShopId) {
        newDetail.clientId = generalShop.ClientId;
        newDetail.clientFullName = generalShop.Client.fullName;
        newDetail.clientEmail = generalShop.Client.email;
        newDetail.date = generalShop.createdAt;
        return;
      }
    });
    return newDetail;
  });
  return combinedShops;
};

module.exports = getAllShopsDetails;
