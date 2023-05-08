const router = require('express').Router()
const postClient = require('../controllers/postClient');

router.post('/', async (req, res) => {
   try {
    const {password, email, name} = req.body
    const client = await postClient(password, email, name);
    res.json(client)
   } catch (error) {
    res.json({error: error.message})
   }
});


module.exports = router