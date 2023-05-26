const { Service } = require("../../db");

const putService = async (id, newValues) => {
    const serviceToModify =  await Service.findByPk(id)
    for (key in newValues){
           await serviceToModify.update(
                {
                    [key]: newValues[key]
                }
            )
    }
    
    return serviceToModify
}

module.exports = putService