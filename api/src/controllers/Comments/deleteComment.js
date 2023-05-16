const {Comment} =require("../../db.js")


const deleteComment = async (id) => {
    const toDelete =  await Comment.findByPk(id)
    toDelete.destroy()
    return 'comment deleted sucessfully'
}


module.exports = deleteComment