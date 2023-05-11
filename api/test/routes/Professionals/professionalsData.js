const {Profesional} = require('../../../src/db')

const createProfesionals = () => {
    const professionals = [
        {fullname: 'TestProfessional1', mail:'TestMail1@gmail.com', direction: 'JestStreet1', image:'TestImage1'},
        {fullname: 'TestProfessional2', mail:'TestMail2@gmail.com', direction: 'JestStreet2', image:'TestImage2'},
        {fullname: 'TestProfessional3', mail:'TestMail3@gmail.com', direction: 'JestStreet3', image:'TestImage3'},
        {fullname: 'TestProfessional4', mail:'TestMail4@gmail.com', direction: 'JestStreet4', image:'TestImage4'}
    ]
    return professionals
}

const modifyProfesionals = () =>{ 
const profesionals = [
        {fullname: 'TestModifyProfessional1', mail:'TestModifyMail1@gmail.com', direction: 'JestModifyStreet1', image:'TestModifyImage1'},
        {fullname: 'TestModifyProfessional2', mail:'TestModifyMail2@gmail.com', direction: 'JestModifyStreet2', image:'TestModifyImage2'},
        {fullname: 'TestModifyProfessional3', mail:'TestModifyMail3@gmail.com', direction: 'JestModifyStreet3', image:'TestModifyImage3'},
        {fullname: 'TestModifyProfessional4', mail:'TestModifyMail4@gmail.com', direction: 'JestModifyStreet4', image:'TestModifyImage4'}
]
return profesionals
}

const deleteAllTestData = async () => {
    for(let i = 0; i < 4; i++){
        const toDelete = await Profesional.findOne({where: {fullname: `TestModifyProfessional${i+1}`}})
        await toDelete.destroy()
    }
}

module.exports = {createProfesionals, modifyProfesionals, deleteAllTestData}