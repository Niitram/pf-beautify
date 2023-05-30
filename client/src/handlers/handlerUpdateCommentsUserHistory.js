import { getAppointmentsByClient } from "../request/appointments";
import { getCommentsByClient } from "../request/comments";

export const updateProductsCommentsHandler = async (shops) => {
  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  const dataComments = await getCommentsByClient(userDataFromStorage.id);
  const comments = dataComments.data;

  const optimizedShops = shops.map((shop) => {
    const optimizedDetails = shop.details.map((det) => {
      const comment = comments.filter((com) => com.ProductId === det.productId);
      return { ...det, comment: comment[0] || null };
    });
    return {
      ...shop,
      details: optimizedDetails,
    };
  });

  optimizedShops.sort((a, b) => {
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  });
  return optimizedShops;
};

export const updateServicesCommentsHandler = async (appointments) => {
  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  const dataComments = await getCommentsByClient(userDataFromStorage.id);
  const comments = dataComments.data;

  const optimizedAppointments = appointments.map((appointment) => {
    const comment = comments.filter((com) => com.ServiceId === appointment.id);
    return {
      ...appointment,
      comment: comment[0],
    };
  });
  optimizedAppointments.sort((a, b) => {
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  });

  return optimizedAppointments;
};

export const updateAppointmentsHandler = async (setAppointments) => {
  const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
  const dataDbAppointments = await getAppointmentsByClient(
    userDataFromStorage.id
  );
  const dbAppointments = dataDbAppointments.data;

  const dataComments = await getCommentsByClient(userDataFromStorage.id);
  const comments = dataComments.data;

  const optimizedAppointments = dbAppointments.map(
    ({ Profesional, Service, date, hour, id }) => {
      const prettyDate =
        date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);

      const comment = comments.filter((com) => com.ServiceId === id);
      return {
        id,
        profesional: Profesional.fullname,
        service: Service.name,
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

const ableToCancelAppointment = (date, hour) => {
  const optimizedDate = date.slice(0, 10);
  const [appointmentDay, appointmentMonth, appointmentYear] = [
    Number(optimizedDate.slice(8)),
    Number(optimizedDate.slice(5, 7)),
    Number(optimizedDate.slice(0, 4)),
  ];

  //calculating if theres time to return shop
  const actualDate = new Date();
  const [actualMonth, actualDay, actualYear, actualHour] = [
    actualDate.getMonth() + 1,
    actualDate.getDate(),
    actualDate.getFullYear(),
    actualDate.getHours(),
  ];

  let ableToCancelAppointment = true;
  if (
    appointmentYear < actualYear ||
    (appointmentYear <= actualYear && appointmentMonth < actualMonth) ||
    (appointmentYear <= actualYear &&
      appointmentMonth <= actualMonth &&
      appointmentDay < actualDay) ||
    (appointmentYear <= actualYear &&
      appointmentMonth <= actualMonth &&
      appointmentDay <= actualDay &&
      Number(hour.slice(0, 2)) > actualHour)
  )
    ableToCancelAppointment = false;

  return ableToCancelAppointment;
};
