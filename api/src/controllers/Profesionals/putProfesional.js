const { Profesional } = require("../../db");


const putProfesional = async (id, fullname, mail, direction, image) => {
    const modifyProfesional = await Profesional.findByPk(id)
    if(fullname) await modifyProfesional.update({ fullname })
    if(mail) await modifyProfesional.update({ mail })
    if(direction) await modifyProfesional.update({ direction })
    if(image) await modifyProfesional.update({ image })
    return modifyProfesional
}


module.exports = putProfesional