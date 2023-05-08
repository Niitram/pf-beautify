const router = require('express').Router()
const getCategories = require('../controllers/getCategories')

router.get('/', async (req, res) => {
    try {
        const categories = await getCategories()
        res.json(categories)
    } catch (error) {
        res.json({error: error.message})
    }
})


module.exports = router