const {Client, Product, Comment} = require('../db')


const validationComment = async (req, res, next) => {
    try {
        const {productId, clientId} = req.params;
        const validateProduct = await Product.findByPk(productId)
        const validateClient = await Client.findByPk(clientId)
        if(validateProduct && validateClient) return next()
        else throw new Error('Product or client not found')
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}


const validateCommentModification = async (req, res, next) => {
    try {
        const {id} = req.params;
        const exist = await Comment.findByPk(id)
        if(exist) next()
        else throw new Error('Comment do not exist')
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {validationComment, validateCommentModification};