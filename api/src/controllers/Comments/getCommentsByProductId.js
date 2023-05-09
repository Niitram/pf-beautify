const {Comment, Client} =require("../../db.js")

const getCommentsByProductId=async(productId)=>{
    const comments=await Comment.findAll({
        where:{ProductId:productId},
        include:
            {
                model:Client,
                attributes:['fullName']
            
            }
        })
    const newComments=comments.map(({Client, content, id})=>{
        return {
            client:Client.fullName,
            content,
            id
        }
    })
    return newComments

}

module.exports=getCommentsByProductId