import { useEffect, useState } from "react";
import styles from "../Checkout/Checkout.module.css";
import { Wallet } from "@mercadopago/sdk-react";
import { Skeleton, getNativeSelectUtilityClasses } from "@mui/material";
import { useDispatch } from "react-redux";
import { getServiceById } from "../../request/services";
import { addAppointment } from "../../redux/actions";

export default function CheckoutAppointment() {
  /* const appointment = useSelector((state) => state.appointment); */
  const dispatch = useDispatch();
  const [preferenceId, setPreferenceId] = useState();
  const [appointment, setAppointment] = useState();
  const [service, setService] = useState();

  useEffect(() => {
    try {
      setPreferenceId(JSON.parse(localStorage.getItem("preference")));
      setAppointment(JSON.parse(localStorage.getItem("appointment")));
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  useEffect(() => {
    try {
      if (appointment && appointment.serviceId) {
        dispatch(addAppointment(appointment));
        getServiceById(appointment.serviceId).then((res) => {
          setService(res.data);
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [appointment]);
  return (
    <div className={styles.container}>
      <div className={styles.aux}>
        <div className={styles.pasarela}>
          <div className={styles.resumen}>
            <h1>Summary</h1>
            <br />
            <div className={styles.datos}>
              <h4>Total price:</h4>
              {service && service.price && <h4>${service.price}</h4>}
            </div>
            {/* <div className={styles.datos}>
              <h4>Shipping:</h4>
              <h4>${shipping}</h4>
            </div>
            <div className={styles.datos}>
              <h4>Tax:</h4>
              <h4>${tax}</h4>
            </div>
            <div className={styles.datos} style={{ marginTop: "50%" }}>
              <h4>Total Amount to pay:</h4>
              <h4>${totalPayment}</h4>
            </div> */}
          </div>
          <div className={styles.mercadopago}>
            {service ? (
              <Wallet initialization={{ preferenceId: `${preferenceId}` }} onReady={localStorage.removeItem("preference")} />
            ) : (
              <Skeleton height={40} width={150} variant="rectangular" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
