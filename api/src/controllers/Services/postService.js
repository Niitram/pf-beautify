const { Service } = require("../../db");

const postService = async (name, price, description, image, rate) => {
  name = name[0].toUpperCase() + name.slice(1);
  description = description[0].toUpperCase() + description.slice(1);
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

module.exports = postService;
