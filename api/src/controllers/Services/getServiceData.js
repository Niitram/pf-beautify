const { Service, Comment, Client } = require("../../db");

const getServiceData = async (id) => {
  const service = await Service.findByPk(id, { include: { model: Comment } });
  let name = [];
  service.dataValues.Comments.forEach((client) => {
    name.push(Client.findByPk(client.dataValues.ClientId));
  });
  await Promise.all(name).then((response) => {
     response.forEach((res) =>
      service.dataValues.Comments.forEach((client) => {
        if(client.dataValues.ClientId === res.dataValues.id)
        client.dataValues.clientName = res.dataValues.fullName;
      })
    )
  })
 
return service 
};

module.exports = getServiceData;
