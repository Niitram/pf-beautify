const { Profesional, Service, Appointment } = require("../../db");

const getProfesionals = async () => {
  const response = await Profesional.findAll({
    include: [
      {
        model: Appointment,
        attributes: ["date", "hour"],
      },
      {
        model: Service,
        attributes: ["name"],
      },
    ],
  });
  console.log(response);
  const newResponse = response.map(
    ({ id, fullname, mail, direction, image, Appointments, Services }) => {
      return {
        id,
        fullname,
        mail,
        direction,
        image,
        appointments: Appointments,
        service: Services[0].name,
      };
    }
  );
  return newResponse;
};

module.exports = getProfesionals;
