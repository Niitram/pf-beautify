const {Comment} = require("../../db");

const putComment = async (id, content) => {
    const modifyComment = await Comment.findByPk(id)
    modifyComment.set(
        {content}
    )
    return modifyComment
}


module.exports = putComment