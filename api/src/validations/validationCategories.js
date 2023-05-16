const {Category} = require('../db')

const validateCategoriesExistence = async (req, res, next) => {

    try {
        const categories = await Category.findAll()
        if(!categories.length) throw new Error('No categories found')
        next()
    } catch (error) {
        res.status(404).json({error: error.message})
    }

}



module.exports = validateCategoriesExistence