import { useEffect, useState } from "react";
import styles from "./UserHistory.module.css";
import setUserInfo from "../../handlers/handleGetUserDataForHistory";

const UserHistory = () => {
  const [userData, setUserData] = useState({});
  const [shops, setShops] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setUserInfo(setUserData, setShops, setAppointments);
  }, []);
  return (
    <div>
      <h1>Historial</h1>
    </div>
  );
};

export default UserHistory;
