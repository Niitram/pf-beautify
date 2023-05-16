const session = require("supertest");
const app = require("../../../src/app");
const newService = require('./serviceData.json')
const { Service } = require("../../../src/db");

const router = session(app);

describe("Test for service routes", () => {
  it("Should get all services", async () => {
    const services = await Service.findAll();
    const response = await router.get("/services");
    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toEqual(services[i].dataValues);
    }
  });

  it("Sould post a new service", async () => {
    const response = await  router.post("/services").send(newService)
    const createdService = await Service.findOne({where: {name: "ManicuraTestJest"}})
    expect(response.body).toEqual(createdService.dataValues)
    await createdService.destroy()
  });
});
