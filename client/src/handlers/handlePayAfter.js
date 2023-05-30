import { addAppointment } from "../redux/actions";
import { createAppointment } from "../request/appointments"
import { getServiceById } from "../request/services";

const handlePayAfter = async (dispatch, options, userData, navigate) => {
  try {
    //Se pide el servicio por id
    const respDb = await getServiceById(options.service);
    const reservation = {
      profesionalId: respDb.data.id,
      clientId: userData.id,
      serviceId: options.service,
      date: options.day,
      hour: options.schedule,
      paid: false,
    };
    //Se crea en el estado global y en el local storage el appointment
    dispatch(addAppointment(reservation));
    localStorage.setItem("appointment", JSON.stringify(reservation));
    const resp = await createAppointment(reservation)
    if (resp && resp.status === 201) navigate("/appointmentSuccess");

  } catch (error) {
    console.log(error.message);
  }
}


export default handlePayAfter;