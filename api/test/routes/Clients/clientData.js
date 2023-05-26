const {Client} = require('../../../src/db')

const generateClients = async () => {
    const clients = [
      {
        fullName: "ClientTest1",
        password: "JestTest1",
        email: "JestTest1@test.com",
      },
      {
        fullName: "ClientTest2",
        password: "JestTest2",
        email: "JestTest2@test.com",
      },
      {
        fullName: "ClientTest3",
        password: "JestTest4",
        email: "JestTest3@test.com",
      },
      {
        fullName: "ClientTest4",
        password: "JestTest5",
        email: "JestTest4@test.com",
      },
    ];
    return clients;
  };

  const dataToModify  = () => {
    const toModify = [
        {adress: 'adressTest1', phone: 'phoneTest1'},
        {adress: 'adressTest2', phone: 'phoneTest2'},
        {adress: 'adressTest3', phone: 'phoneTest3'},
        {adress: 'adressTest4', phone: 'phoneTest4'}
    ]
    return toModify
  }



  const deleteAllTestData = async () => {
    for (let i = 0; i < 4; i++) {
        const client = await Client.findOne({
          where: { fullName: `ClientTest${i + 1}` },
        });
        await client.destroy()
    }
  }

  module.exports = {generateClients, deleteAllTestData, dataToModify}