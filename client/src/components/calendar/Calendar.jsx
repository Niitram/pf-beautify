import { useState } from "react";
import styles from "./Calendar.module.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getServices } from "../../request/services";
import { useEffect } from "react";
import LinearStepper from "../linearStepper/LinearStepper";
import { Divider } from "@mui/material";

const arrSchedules = [
  {
    hour: "10:00",
    available: true,
  },
  {
    hour: "11:00",
    available: false,
  },
  {
    hour: "12:00",
    available: false,
  },
  {
    hour: "13:00",
    available: true,
  },
  {
    hour: "14:00",
    available: true,
  },
  {
    hour: "15:00",
    available: false,
  },
  {
    hour: "16:00",
    available: true,
  },
  {
    hour: "17:00",
    available: false,
  },
];

// a custom render function
const handlerClickCalendar = (
  e,
  setDay,
  setOptions,
  options,
  handleNext,
  handleBack
) => {
  /* para cambiar el el estilo al hacer click */
  /* e.dayEl.style.backgroundColor = "red"; */

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
};
const handleChangeOptions = (
  e,
  setOptions,
  options,
  handleNext,
  handleReset
) => {
  //Si se elige un servicio se reinicia todo el resto y avanza uno el LinearStepper
  if (e.target.name === "service") {
    console.log("reseteando");
    setOptions({
      service: "",
      day: "",
      schedule: "",
    });
    handleReset();
    handleNext();
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
const handleClickReservation = (e) => {
  console.log(e);
};
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function Calendar() {
  const [services, setServices] = useState([]);
  const [day, setDay] = useState("");
  const [options, setOptions] = useState({
    service: "",
    day: "",
    schedule: "",
  });

  /* Logica para el LinearStepper */
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  //Cuando se cargue el componente, obtener los servicios
  useEffect(() => {
    try {
      getServices().then((res) => {
        if (res.data) {
          const servicesName = res.data.map((service) => service.name);
          setServices(servicesName);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  console.log(options);
  return (
    <section className={styles.section}>
      <LinearStepper activeStep={activeStep} isStepSkipped={isStepSkipped} />
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <h3 className={styles.titleServices}>Services</h3>
          {services?.map((service) => {
            return (
              <div key={service} className={styles.serviceContainerInput}>
                <input
                  className={styles.inputRadio}
                  onChange={(e) => {
                    handleChangeOptions(
                      e,
                      setOptions,
                      options,
                      handleNext,
                      handleReset
                    );
                  }}
                  type="radio"
                  value={service}
                  name="service"
                />
                <label className={styles.labelServices}>{service}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.containerCalendar}>
          <div className={styles.containerSelectedInfo}>
            <div className={styles.selectedInfo}>
              {options.service ? `Service: ${options.service}` : ""}
            </div>
            <div className={styles.selectedInfo}>
              {options.day ? `Date: ${options.day}` : ""}
            </div>
            <div className={styles.selectedInfo}>
              {options.schedule ? `Hour: ${options.schedule}` : ""}
            </div>
          </div>
          <Divider></Divider>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            fixedWeekCount={false}
            eventContent={renderEventContent}
            hiddenDays={[0, 6]}
            validRange={function(nowDate) {
              return {
                start: nowDate,
              };
            }}
            dateClick={(e) => {
              handlerClickCalendar(
                e,
                setDay,
                setOptions,
                options,
                handleNext,
                handleBack
              );
            }}
          />
        </div>
        <div>
          <h3 className={styles.titleServices}>Schedules</h3>
          {options.service && options.day ? (
            <div className={styles.containerRight}>
              {options.service &&
                options.day &&
                arrSchedules?.map((schedule, index) => {
                  return (
                    <div key={index} className={styles.serviceContainerInput}>
                      <input
                        disabled={schedule.available}
                        className={styles.inputRadio}
                        onChange={(e) => {
                          handleChangeOptions(
                            e,
                            setOptions,
                            options,
                            handleNext,
                            handleReset
                          );
                        }}
                        type="radio"
                        value={schedule.hour}
                        name="schedule"
                      />
                      <label
                        style={{
                          color: schedule.available ? "#d3d3de" : "black",
                        }}
                      >
                        {schedule.hour} -{" "}
                        {Number(schedule.hour.split(":")[0]) + 1}:00
                      </label>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div></div>
          )}
          <button
            disabled={!options.service || !options.schedule || !options.day}
            className={styles.buttonReservation}
            onClick={handleClickReservation}
          >
            Reservation
          </button>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
