import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./AppointmentSuccess.module.css";

function AppointmentSuccess() {
  const appointment = useSelector((state) => state.appointment);
  useEffect(() => {
    //el appointment en la base de datos y del localStorage
    localStorage.setItem("appointment", JSON.stringify({}));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.iconCheck}></div>
      <h1>
        <b>Congratulations!</b> The appointment has been successfully completed
      </h1>
      {appointment && (
        <h3>
          We look forward to seeing you on day {appointment.date} at{" "}
          {appointment.hour} oclock.
        </h3>
      )}
      <h3>Thank you for choosing us</h3>
      <Link to="/home">Go to Home</Link>
    </div>
  );
}

export default AppointmentSuccess;
