import { getAppointmentsHours } from "../request/appointments";
import { showError } from "../redux/actions";

const handlerClickCalendar = async (
  e,
  setDay,
  setOptions,
  options,
  handleNext,
  handleBack,
  dispatch,
  setAvailableSchedules
) => {
  //En el caso que aun no se haya elegido un servicio se corta
  if (options.service === "") return;
  //Si apreta un dia y ya habia elegido un horario se vuelve un step
  if (options.schedule !== "") {
    handleBack();
    setOptions({
      ...options,
      schedule: "",
    });
  }
  //Si ya fue elegido un servicio se avanza uno en el LinearStepper
  if (options.service !== "" && options.day === "") handleNext();
  const daySelected = e.dateStr;
  setDay(daySelected);
  setOptions((prevState) => ({
    ...prevState,
    day: daySelected,
  }));
  //Se hace la peticion de los horarios disponibles para ese dia
  try {
    const resp = await getAppointmentsHours(options.service, daySelected);
    let hourNow = new Date().getHours();
    //Si el horario es menor a la hora actual setea el estado a false
    resp.data.forEach((hour) => {
      if (Number(hour.hour.split(":")[0]) <= hourNow) hour.available = false;
      return hour;

    })
    //Si hay horarios disponibles se setean en el state
    if (resp.data.length > 0) setAvailableSchedules(resp.data);
  } catch (error) {
    console.log(error.message);
    dispatch(
      showError({ tittle: "Error", message: "Incorrect date error" })
    );
  }
};

export default handlerClickCalendar;