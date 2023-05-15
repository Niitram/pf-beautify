const { Service } = require("../../db");

const deleteService = async () => {
    const toDelService = await Service.findByPk(id)
    toDelService.destroy()
    return 'Deleted sucessfully'
}

module.exports = deleteService