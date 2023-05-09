const { Service } = require("../../db");

const postService = async (name, price, description, image, rate) => {
  const response = await Service.create({
    name: name,
    price: price,
    description: description,
    image: image,
    rate: rate,
  });

  return response;
};

module.exports = postService;
