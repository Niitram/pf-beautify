import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "./Calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getServices } from "../../request/services";
import { useEffect } from "react";
import LinearStepper from "../linearStepper/LinearStepper";
import { Divider } from "@mui/material";
import handlerClickCalendar from "../../handlers/handlerClickCalendar";
import handleOptionsCalendar from "../../handlers/handleOptionsCalendar";
import useToggle from "../../hooks/useToggle";
import AlertTwoOptions from "../alertTwoOptions/AlertTwoOptions";
import { useNavigate } from "react-router-dom";
import handlePayNow from "../../handlers/handlePayNow";
import handlePayAfter from "../../handlers/handlePayAfter";

const handleClickReservation = (setOpenReservationDialog) => {
  setOpenReservationDialog(true);
};

function Calendar() {
  const [services, setServices] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [openReservationDialog, setOpenReservationDialog] = useToggle(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);
  const [day, setDay] = useState("");
  console.log(day);
  const dispatch = useDispatch();
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

  const handleCloseDeleteDialog = () => {
    setOpenReservationDialog(false);
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
          const servicesName = res.data.map((service) => {
            return {
              name: service.name,
              id: service.id,
              ProfesionalId: service.ProfesionalId,
            };
          });
          setServices(servicesName);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
    return () => {
      setServices([]);
    };
  }, []);

  return (
    <section className={styles.section}>
      <LinearStepper activeStep={activeStep} isStepSkipped={isStepSkipped} />
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <h3 className={styles.titleServices}>Services</h3>
          {services &&
            services.length > 0 &&
            services.map((service) => {
              return (
                <div key={service.id} className={styles.serviceContainerInput}>
                  <input
                    className={styles.inputRadio}
                    onChange={(e) => {
                      handleOptionsCalendar(
                        e,
                        setOptions,
                        options,
                        handleNext,
                        handleReset,
                        setAvailableSchedules
                      );
                    }}
                    type="radio"
                    value={service.id}
                    name="service"
                  />
                  <label className={styles.labelServices}>{service.name}</label>
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
                handleBack,
                dispatch,
                setAvailableSchedules
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
                availableSchedules.length > 0 &&
                availableSchedules.map((schedule, index) => {
                  return (
                    <div key={index} className={styles.serviceContainerInput}>
                      <input
                        disabled={!schedule.available}
                        className={styles.inputRadio}
                        onChange={(e) => {
                          handleOptionsCalendar(
                            e,
                            setOptions,
                            options,
                            handleNext,
                            handleReset,
                            setAvailableSchedules
                          );
                        }}
                        type="radio"
                        value={schedule.hour}
                        name="schedule"
                      />
                      <label
                        style={{
                          color: !schedule.available ? "#d3d3de" : "black",
                        }}
                      >
                        {schedule.hour.split(":")[0]} :
                        {schedule.hour.split(":")[1]} -
                        {Number(schedule.hour.split(":")[0]) + 1}:
                        {schedule.hour.split(":")[1]}
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
            onClick={() => {
              handleClickReservation(setOpenReservationDialog);
            }}
          >
            Reservation
          </button>
        </div>
      </div>
      <AlertTwoOptions
        handleCloseDialog={handleCloseDeleteDialog}
        openDialog={openReservationDialog}
        optionOne={() => {
          handlePayNow(dispatch, options, userData, navigate);
        }}
        optionTwo={() => {
          handlePayAfter(dispatch, options, userData, navigate);
        }}
        questionTitle={`Would you like to pay for advance now or to pay in our center on the appointment day?`}
        textOne={"Pay now"}
        textTwo={"On the same day"}
      />
    </section>
  );
}

export default Calendar;
