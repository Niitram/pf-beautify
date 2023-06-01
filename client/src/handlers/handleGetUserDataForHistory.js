import { getClientShops } from "../request/clients";
import { getAppointmentsByClient } from "../request/appointments";
import { getCommentsByClient } from "../request/comments";

const setUserInfo = async (setUserData, setShops, setAppointments) => {
  //*trae la info del usuario del local storage y la setea en el estado
  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  setUserData(userDataFromStorage);

  //* trae las compras del cliente de la base de datos y embellece la información y la pone en el estado
  const dataDbShops = await getClientShops(userDataFromStorage.id);
  const dbShops = dataDbShops.data;

  // dbShops[0].date = "2023-05-28 asd";
  // dbShops[1].date = "2023-05-29 asd";
  // dbShops[2].date = "2023-05-30 asd";
  // dbShops[3].date = "2023-05-31 asd";
  // dbShops[4].date = "2023-06-01 asd";
  // dbShops[5].date = "2021-05-31 asd";
  const dataComments = await getCommentsByClient(userDataFromStorage.id);
  const comments = dataComments.data;

  if (!dbShops.length) setShops([]);
  else {
    const optimizedShops = dbShops.map(
      ({ id, amount, discount, details, date }) => {
        const prettyDate =
          date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);

        const optimizedDetails = details.map((det) => {
          const comment = comments.filter(
            (com) => com.ProductId === det.productId
          );
          return { ...det, comment: comment[0] || null };
        });

        const productsNamesArray = details.map(({ productName }, i) => {
          if (i < details.length - 1) return `${productName}, `;
          else return productName;
        });
        const productsNames = productsNamesArray.join("");

        return {
          id,
          amount,
          discount,
          productsNames,
          details: optimizedDetails,
          date: prettyDate,
          ableToCancelShop: ableToCancelShop(date),
        };
      }
    );

    optimizedShops.sort((a, b) => {
      if (a.id < b.id) return 1;
      if (a.id > b.id) return -1;
      return 0;
    });

    setShops(optimizedShops);
  }
  //* trae los appointments del cliente de la base de datos, los embellece y los setea en el estado
  const dataDbAppointments = await getAppointmentsByClient(
    userDataFromStorage.id
  );
  const dbAppointments = dataDbAppointments.data;

  const optimizedAppointments = dbAppointments.map(
    ({ Profesional, Service, date, hour, id, paid }) => {
      const prettyDate =
        date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);

      const comment = comments.filter((com) => com.ServiceId === id);
      return {
        id,
        paid,
        profesional: Profesional.fullname,
        service: Service.name,
        serviceId: Service.id,
        date: prettyDate,
        hour: hour.slice(0, 5),
        ableToCancelAppointment: ableToCancelAppointment(date, hour),
        comment: comment[0],
      };
    }
  );
  optimizedAppointments.sort((a, b) => {
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  });
  setAppointments(optimizedAppointments);
};

//* función que calcula si el cliente está a tiempo de cancelar un appoinment (hasta la hora anterior a la del turno)
const ableToCancelAppointment = (date, hour) => {
  const optimizedDate = date.slice(0, 10);
  const [appointmentDay, appointmentMonth, appointmentYear] = [
    Number(optimizedDate.slice(8)),
    Number(optimizedDate.slice(5, 7)),
    Number(optimizedDate.slice(0, 4)),
  ];

  //calculating if theres time to return shop
  const actualDate = new Date();
  const [actualMonth, actualDay, actualYear, actualHour, actualMinutes] = [
    actualDate.getMonth() + 1,
    actualDate.getDate(),
    actualDate.getFullYear(),
    actualDate.getHours(),
    actualDate.getMinutes(),
  ];

  let ableToCancelAppointment = true;
  if (
    appointmentYear < actualYear ||
    (appointmentYear === actualYear && appointmentMonth < actualMonth) ||
    (appointmentYear === actualYear &&
      appointmentMonth === actualMonth &&
      appointmentDay < actualDay) ||
    (appointmentYear === actualYear &&
      appointmentMonth === actualMonth &&
      appointmentDay === actualDay &&
      Number(hour.slice(0, 2)) < actualHour) ||
    (appointmentYear === actualYear &&
      appointmentMonth === actualMonth &&
      appointmentDay === actualDay &&
      Number(hour.slice(0, 2)) === actualHour &&
      Number(hour.slice(3, 5)) < actualMinutes)
  )
    ableToCancelAppointment = false;

  return ableToCancelAppointment;
};

//* función que calcula si el cliente está a tiempo de cancelar la compra (hasta 48 hs después de la misma)
const ableToCancelShop = (date) => {
  const finalMonthDay = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  //optimizing date
  const optimizedDate = date.slice(0, 10);
  const [purchaseDay, purchaseMonth, purchaseYear] = [
    Number(optimizedDate.slice(8)),
    Number(optimizedDate.slice(5, 7)),
    Number(optimizedDate.slice(0, 4)),
  ];

  //calculating if theres time to return shop
  const actualDate = new Date();

  const [actualMonth, actualDay, actualYear] = [
    actualDate.getMonth() + 1,
    actualDate.getDate(),
    actualDate.getFullYear(),
  ];

  let ableToCancelShop = true;
  // si lo compraron el último día del mes
  if (
    purchaseYear === actualYear &&
    purchaseMonth === actualMonth - 1 &&
    purchaseDay === finalMonthDay[purchaseMonth] &&
    (actualDay == 1 || actualDay == 2)
  )
    return true;

  // si compraron el anteúltimo día del mes
  if (
    purchaseYear === actualYear &&
    purchaseMonth === actualMonth - 1 &&
    purchaseDay === finalMonthDay[purchaseMonth] - 1 &&
    actualDay == 1
  )
    return true;

  // si lo compra el último día del año
  if (
    purchaseYear === actualYear - 1 &&
    purchaseMonth === 12 &&
    actualMonth === 1 &&
    ((purchaseDay === finalMonthDay[purchaseMonth] - 1 && actualDay == 1) ||
      (purchaseDay === finalMonthDay[purchaseMonth] &&
        (actualDay == 1 || actualDay == 2)))
  )
    return true;

  // si compraron otros días
  if (
    purchaseYear < actualYear ||
    (purchaseYear === actualYear && purchaseMonth < actualMonth) ||
    (purchaseYear === actualYear &&
      purchaseMonth === actualMonth &&
      purchaseDay + 2 < actualDay)
  ) {
    ableToCancelShop = false;
  }
  // console.log(ableToCancelShop);
  return ableToCancelShop;
};

export default setUserInfo;
