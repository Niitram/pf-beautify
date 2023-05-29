import { addAppointment, showError } from "../redux/actions";
import { createAppointmentMP } from "../request/appointments";
import { getServiceById } from "../request/services";

const handlePayNow = async (dispatch, options, userData, navigate) => {
  let appointmentMP = [];
  try {
    //Se pide el servicio por id
    const respDb = await getServiceById(options.service);
    //Se setea un objeto con los detalles que necesita MP
    let serviceDetail = {
      details: respDb.data.name,
      id: respDb.data.id,
      unit_price: Number(respDb.data.price),
      quantity: 1,
    };
    const reservation = {
      profesionalId: options.service,
      clientId: userData.id,
      serviceId: options.service,
      date: options.day,
      hour: options.schedule,
      paid: true,
    };
    //Se crea en el estado global el appointment
    dispatch(addAppointment(reservation));
    appointmentMP = [{ ...serviceDetail }, { ...reservation }, userData.email];
    //Se crea el preferenceId en MP para el checkout
    const responseMP = await createAppointmentMP(appointmentMP);
    localStorage.setItem("preference", JSON.stringify(responseMP.data.id));
    localStorage.setItem("appointment", JSON.stringify(reservation));
    navigate("/checkoutAppointment");
  } catch (error) {
    console.log(error.message);
    dispatch(
      showError({
        tittle: "Wrong-appointment",
        message:
          "There was an error processing the appointment, please try again later",
      })
    );
  }
};

export default handlePayNow