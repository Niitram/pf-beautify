const session = require("supertest");
const app = require("../../../src/app");
const {createProfesionals, modifyProfesionals, deleteAllTestData} = require('./professionalsData')
const {Profesional} = require('../../../src/db')
const router = session(app);


describe('Test for professional routes', () => {
    it('Should post a new professional', async () => {
        const toCreate = createProfesionals()
        for(let i = 0; i < toCreate.length; i++){
            const response = await router.post('/profesionals').send(toCreate[i])
            expect(response.body.fullname).toEqual(toCreate[i].fullname)
            expect(response.body.mail).toEqual(toCreate[i].mail)
            expect(response.body.direction).toEqual(toCreate[i].direction)
            expect(response.body.image).toEqual(toCreate[i].image)
        }
    })
    it('Should get all professionals', async () => {
        const profesional = await Profesional.findAll()
        const response = await router.get(`/profesionals`)
        expect(response.body.length).toEqual(profesional.length)
        expect(response.statusCode).toEqual(200)
    })
    it('Sould modify existing professional', async () => {
        const toModify = modifyProfesionals()
        for(let i = 0; i < toModify.length; i++){
            const profesional = await Profesional.findOne({where: {fullname: `TestProfessional${i+1}`}})
            const response = await router.put(`/profesionals/${profesional.id}`).send(toModify[i])
            expect(response.body.fullname).toEqual(toModify[i].fullname)
            expect(response.body.mail).toEqual(toModify[i].mail)
            expect(response.body.direction).toEqual(toModify[i].direction)
            expect(response.body.image).toEqual(toModify[i].image)
        }
    })
    it('Should respond with professional information', async () => {
        for(let i = 0; i < 4; i++){
            const profesional = await Profesional.findOne({where: {fullname: `TestModifyProfessional${i+1}`}})
            const response = await router.get(`/profesionals/${profesional.id}`)
            expect(response.body.fullname).toEqual(profesional.fullname)
            expect(response.body.mail).toEqual(profesional.mail)
            expect(response.body.direction).toEqual(profesional.direction)
            expect(response.body.image).toEqual(profesional.image)
        }
        await deleteAllTestData()
    })
})