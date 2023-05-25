import { useState } from "react";
import styles from "./Services.module.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getServices } from "../../request/services";
import { useEffect } from "react";

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
const handlerClickCalendar = (e) => {
  /* para cambiar el el estilo al hacer click */
  /* e.dayEl.style.backgroundColor = "red"; */

  const daySelected = e.dateStr;
  console.log(e.dateStr);
};
const handleChangeOrder = (e) => {
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
function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    getServices().then((res) => {
      if (res.data) {
        const servicesName = res.data.map((service) => service.name);
        setServices(servicesName);
      }
    });
  }, []);
  console.log(services);

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <h3>Services</h3>
          {services?.map((service) => {
            return (
              <div key={service} className={styles.serviceContainerInput}>
                <input type="radio" value={service} name="service" />
                <label>{service}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.containerCalendar}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            eventMouseEnter={() => {
              console.log("entro");
            }}
            eventContent={renderEventContent}
            dateClick={handlerClickCalendar}
          />
        </div>
        <div>
          <h3>Schedules</h3>
          {arrSchedules?.map((schedule, index) => {
            return (
              <div key={index} className={styles.serviceContainerInput}>
                <input type="radio" value={schedule} name="schedule" />
                <label>
                  {schedule.hour} - {schedule.hour + 1}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
