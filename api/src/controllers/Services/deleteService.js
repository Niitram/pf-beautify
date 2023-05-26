const { Service } = require("../../db");

const deleteService = async (id) => {
    const toDelService = await Service.findByPk(id)
    toDelService.destroy()
    return 'Deleted sucessfully'
}

module.exports = deleteService