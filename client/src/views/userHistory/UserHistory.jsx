import { useEffect, useState } from "react";
import styles from "./UserHistory.module.css";
import { getClientShops } from "../../request/clients";

const UserHistory = () => {
  const [userData, setUserData] = useState({});
  const [shops, setShops] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const setUserInfo = async (setUserData, setShops, setAppointments) => {
    const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
    setUserData(userDataFromStorage);

    const dataDbShops = await getClientShops(1);
    const dbShops = dataDbShops.data;

    const optimizedShops = dbShops.map(
      ({ id, amount, discount, details, date }) => {
        //optimizing date
        const prettyDate =
          date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);

        //calculating if theres time to return shop
        const optimizedDate = date.slice(0, 10);
        const actualDate = new Date();

        const [actualMonth, actualDay, actualYear] = [
          actualDate.getMonth() + 1,
          actualDate.getDate(),
          actualDate.getFullYear(),
        ];
        const [purchaseDay, purchaseMonth, purchaseYear] = [
          Number(optimizedDate.slice(8)),
          Number(optimizedDate.slice(5, 7)),
          Number(optimizedDate.slice(0, 4)),
        ];
        let ableToCancelShop = true;
        if (
          purchaseYear < actualYear ||
          (purchaseYear <= actualYear && purchaseMonth < actualMonth) ||
          (purchaseYear <= actualYear &&
            purchaseMonth <= actualMonth &&
            purchaseDay > actualDay + 1)
        )
          ableToCancelShop = false;

        return { id, amount, discount, details, prettyDate, ableToCancelShop };
      }
    );
    // console.log(dbShops);
  };
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
