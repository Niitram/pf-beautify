const session = require("supertest");
const app = require("../../../src/app");
const { Product } = require("../../../src/db");
const {
  getProductsId,
  generateProducts,
  createCategories,
  setCategories,
  deleteAllTestData,
} = require("./productsData");
const router = session(app);

describe("Test for products routes", () => {
  it("Should send status 200", async () => {
    const response = await router.get("/products");
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });
  it('Should post new products', async () => {
    const testCategory = await createCategories();
    const products = generateProducts();
    for (let i = 0; i < products.length; i++){
        const response = await router.post('/products').send(products[i])
        expect(response.body.CategoryId).toEqual(testCategory.id)
        expect(response.body.name).toEqual(products[i].name)
        expect(response.body.description).toEqual(products[i].description)
    }
  })
  it("Should respond with specific product", async () => {
    
    const id = await getProductsId();
    for (let i = 0; i < id.length; i++) {
      const product2 = await Product.findByPk(id[i]);
      const product = await setCategories(product2);
      const response = await router.get(`/products/${id[i]}`);
      expect(response.body.category).toEqual('TestCategory');
      expect(response.body.name).toEqual(product.dataValues.name);
      expect(response.body.description).toEqual(product.dataValues.description);
    }
   await deleteAllTestData()
  });
});
