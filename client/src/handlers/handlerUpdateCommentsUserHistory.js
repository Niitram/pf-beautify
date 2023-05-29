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
