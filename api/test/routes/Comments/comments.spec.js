const session = require("supertest");
const app = require("../../../src/app");
const {
  commentArray,
  generateClients,
  generateProducts,
  getClientsId,
  getProductsId,
  deleteAllTestData,
  modifyComments,
} = require("./commentsData");
const { Comment, Client } = require("../../../src/db");

const router = session(app);

describe("Test for comments route", () => {
  it("Should post a new comment", async () => {
    await generateClients();
    await generateProducts();
    const clientId = await getClientsId();
    const prodId = await getProductsId();
    for (let i = 0; i < clientId.length; i++) {
      const response = await router
        .post(`/comments/${prodId[i]}/${clientId[i]}`)
        .send(commentArray[i]);
      expect(response.body.ClientId).toEqual(clientId[i].toString());
      expect(response.body.ProductId).toEqual(prodId[i].toString());
      expect(response.body.content).toEqual(commentArray[i].content);
    }
  });
  it("Should get comments from specific product", async () => {
    const prodId = await getProductsId();
    const clientId = await getClientsId();
    for (let i = 0; i < commentArray.length; i++) {
      const response = await router.get(`/comments/${prodId[i]}`);
      const client = await Client.findByPk(clientId[i]);
      expect(response.body[0].content).toEqual(commentArray[i].content);
      expect(response.body[0].client).toEqual(client.dataValues.fullName);
    }
  });
  it("Should modify existent comment", async () => {
    for (let i = 0; i < commentArray.length; i++) {
      const comment = await Comment.findOne({
        where: { content: commentArray[i].content },
      });
      const response = await router
        .put(`/comments/${comment.dataValues.id}`)
        .send(modifyComments[i]);
      expect(response.body.content).toEqual(modifyComments[i].content);
    }
  });
  it("Should delete an existing comment", async () => {
    const comment = await Comment.findOne({
      where: { content: commentArray[0].content },
    });
    const response = await router.delete(`/comments/${comment.dataValues.id}`);
    expect(response.text).toEqual("comment deleted sucessfully");
    deleteAllTestData()
  });
});
