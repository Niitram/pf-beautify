const session = require("supertest");
const app = require("../../../src/app");
const {createCategories, deleteAllTestData } = require('./categoriesData')


const router = session(app);

describe('Test for categories routes', () => {
    it('Should respond with status 200', async () => {
        await createCategories()
        const response  = await router.get('/categories')
        expect(response.statusCode).toEqual(200);
        expect(response.body).toContain('TestCategory')
        await deleteAllTestData()
    })
})