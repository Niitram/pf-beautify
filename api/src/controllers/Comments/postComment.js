const { Comment} = require("../../db");

const postComment = async (content, productId, clientId) => {
    
 const newComment = await Comment.create(
    {content}
 )
   await newComment.setClient(clientId)
   await newComment.setProduct(productId)

 return newComment
}


module.exports = postComment