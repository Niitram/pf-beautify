const session = require("supertest");
const app = require("../../../src/app");
const {generateClients, deleteAllTestData, dataToModify} = require('./clientData')
const {Client} = require('../../../src/db')
const router = session(app);

describe('Test for client routes', () => {
    it('Should create new client', async () => {
        const clients = await generateClients()
        for (let i = 0; i < clients.length; i++){
            const response = await router.post('/client').send(clients[i])
            expect(response.body.name).toEqual(clients[i].name)
            expect(response.body.password).toEqual(clients[i].password)
            expect(response.body.email).toEqual(clients[i].email)
        }
        
    })
    it('Should modify client info', async () => {
        const data = dataToModify()
        for(let i = 0; i < 4; i++){
            const client  = await Client.findOne({where: {fullName: `ClientTest${i+1}`}})
            const response = await router.put(`/client/${client.id}`).send(data[i])
            expect(response.body.adress).toEqual(data[i].adress)
            expect(response.body.phone).toEqual(data[i].phone)
        }
        await deleteAllTestData()
    })
})