const handleOptionsCalendar = (
  e,
  setOptions,
  options,
  handleNext,
  handleReset,
  setAvailableSchedules
) => {
  //Si se elige un servicio se reinicia todo el resto y avanza uno el LinearStepper
  if (e.target.name === "service") {
    setOptions({
      service: "",
      day: "",
      schedule: "",
    });
    handleReset();
    handleNext();
    setAvailableSchedules([]);
  }
  //Si el horario aun no fue elegido entonces avanza uno el LinearStepper
  if (
    options.service !== "" &&
    options.day !== "" &&
    e.target.name === "schedule"
  ) {
    if (options.schedule === "") {
      handleNext();
    }
  }
  setOptions((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

export default handleOptionsCalendar;