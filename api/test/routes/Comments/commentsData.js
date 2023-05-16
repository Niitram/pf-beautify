const { Comment, Product, Client } = require("../../../src/db");

const commentArray = [
  { content: "Comment JestTest1" },
  { content: "Comment JestTest2" },
  { content: "Comment JestTest3" },
  { content: "Comment JestTest4" },
];

const modifyComments = [
  { content: "Comment modify JestTest1" },
  { content: "Comment modify JestTest2" },
  { content: "Comment modify JestTest3" },
  { content: "Comment modify JestTest4" },
];

const commentProdcut1 = { content: "This is a test comment saved throug jest" };

const generateProducts = async () => {
  const products = [
    {
      name: "ProductTest1",
      description: "Description1",
      image: "imageLink1",
      price: 1,
      stock: 1,
      state: "state1",
    },
    {
      name: "ProductTest2",
      description: "Description2",
      image: "imageLink2",
      price: 2,
      stock: 2,
      state: "state2",
    },
    {
      name: "ProductTest3",
      description: "Description3",
      image: "imageLink3",
      price: 3,
      stock: 3,
      state: "state3",
    },
    {
      name: "ProductTest4",
      description: "Description4",
      image: "imageLink4",
      price: 4,
      stock: 4,
      state: "state4",
    },
  ];
  await Product.bulkCreate(products);
};

const getProductsId = async () => {
  const arrayId = [];
  for (let i = 0; i < 4; i++) {
    const product = await Product.findOne({
      where: { name: `ProductTest${i + 1}` },
    });
    arrayId.push(product.dataValues.id);
  }
  return arrayId;
};

const generateClients = async () => {
  const clients = [
    {
      fullName: "ClientTest1",
      password: "JestTest1",
      email: "JestTest1@test.com",
    },
    {
      fullName: "ClientTest2",
      password: "JestTest2",
      email: "JestTest2@test.com",
    },
    {
      fullName: "ClientTest3",
      password: "JestTest4",
      email: "JestTest3@test.com",
    },
    {
      fullName: "ClientTest4",
      password: "JestTest5",
      email: "JestTest4@test.com",
    },
  ];
  await Client.bulkCreate(clients);
  return;
};

const getClientsId = async () => {
  const arrayId = [];
  for (let i = 0; i < 4; i++) {
    const client = await Client.findOne({
      where: { fullName: `ClientTest${i + 1}` },
    });
    arrayId.push(client.dataValues.id);
  }

  return arrayId;
};

const deleteAllTestData = async () => {
  for (let i = 0; i < 4; i++) {
    const client = await Client.findOne({
      where: { fullName: `ClientTest${i + 1}` },
    });
    const product = await Product.findOne({
      where: { name: `ProductTest${i + 1}` },
    });
    if(i > 0){
    const comment = await Comment.findOne({
      where: { content: `Comment JestTest${i + 1}` },
    })
      await comment.destroy()
}
    await client.destroy();
    await product.destroy();
  }
};
module.exports = {
  commentArray,
  generateClients,
  generateProducts,
  getClientsId,
  getProductsId,
  deleteAllTestData,
  modifyComments
};
