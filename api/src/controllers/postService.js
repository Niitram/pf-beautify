const {Service} = require('../db')

const postService = async (serviceName, professionalName) => {
    const response = await Service.create({
        serviceName: serviceName,
        professionalName: professionalName
    })

    return response
}

module.exports = postService