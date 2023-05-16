const {Client} = require('../db')


const validationSaveClient = async (req, res, next) => {

    try {
        const { password, email, name } = req.body;
        if(!password) throw new Error(`Unable to save user in database, no password provided`)
        if(!email) throw new Error(`Unable to save user in database, no email provided`)
        if(!name) throw new Error(`Unable to save user in database, not name provided`)
        next()
    } catch (error) {
        res.json({error: error.message})
    }
}


const validationPutClient = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {adress, phone} = req.body;
        const toModify = await Client.findByPk(id)
        if(!toModify) throw new Error(`No client found with id:  ${id}`)
        if(adress && adress === toModify.adress) throw new Error(`Adress value alredy set to ${adress}`)
        if(phone && phone === toModify.phone) throw new Error(`Phone value alredy set to ${phone}`)
        next()
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {validationSaveClient, validationPutClient}