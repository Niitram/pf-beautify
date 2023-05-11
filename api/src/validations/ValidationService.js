const {Service} = require('../db')

const validatePostService = (req, res, next) => {
    try {

        const {name, price, description, image, rate } = req.body;
        if(!name) throw new Error('Require service name to create')
        if(!price) throw new Error('Require a price to create')
        if(!description) throw new Error('Require description to create')
        if(!image) throw new Error('Require image to create')
        if(!rate) throw new Error('Require rate to create')
        next()
    } catch (error) {
        res.json({error: error.message})
    }
}


const validateServiceExistence = async (req, res, next) => {
    try {
        const services = await Service.findAll()
        if (!services.length) throw new Error('No services found')
        next()
    } catch (error) {
        res.json({error: error.message})
    }
}


module.exports = {validatePostService, validateServiceExistence}