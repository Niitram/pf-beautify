import { useEffect, useState } from "react";
import styles from "./UserHistory.module.css";
import setUserInfo from "../../handlers/handleGetUserDataForHistory";
import ProductsHistoryTable from "../../components/userHistoryLabels/ProductsHistoryTable";
import AppointmentsTable from "../../components/userHistoryLabels/AppointmentsTable";
import {
  updateProductsCommentsHandler,
  updateServicesCommentsHandler,
} from "../../handlers/handlerUpdateCommentsUserHistory";

const UserHistory = () => {
  const [userData, setUserData] = useState({});
  const [shops, setShops] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const labelsNames = { products: "Product", appointments: "Appointments" };
  const [label, setLabel] = useState(labelsNames.products);

  const updateProductsComments = async () => {
    setShops(await updateProductsCommentsHandler(shops));
  };

  const updateServicesComments = async () => {
    console.log("estoy en usersHistory");
    setAppointments(await updateServicesCommentsHandler(appointments));
  };

  useEffect(() => {
    setUserInfo(setUserData, setShops, setAppointments);
  }, []);
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>My history</h1>
        <div className={styles.labelsBar}>
          <div className={styles.smallFulfill} />
          <button
            className={
              label === labelsNames.products ? styles.activeLabel : styles.label
            }
            onClick={() => {
              setLabel(labelsNames.products);
            }}
          >
            {labelsNames.products}
          </button>
          <button
            className={
              label === labelsNames.appointments
                ? styles.activeLabel
                : styles.label
            }
            onClick={() => {
              setLabel(labelsNames.appointments);
            }}
          >
            {labelsNames.appointments}
          </button>
          <div className={styles.fulfill}></div>
        </div>
        {label === labelsNames.products && (
          <ProductsHistoryTable
            shops={shops}
            setShops={setShops}
            updateProductsComments={updateProductsComments}
          />
        )}
        {label === labelsNames.appointments && (
          <AppointmentsTable
            appointments={appointments}
            updateServicesComments={updateServicesComments}
          />
        )}
      </div>
    </div>
  );
};

export default UserHistory;
