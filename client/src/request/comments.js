import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getCommentsByClient = async (clientId) => {
  try {
    return await axios.get(`${URL_BASE}/comments/client/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProductComment = async (
  { tittle, rating, content },
  productId,
  userId
) => {
  try {
    return await axios.post(
      `${URL_BASE}/comments/products/${productId}/${userId}`,
      {
        tittle,
        rating,
        content,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const createServiceComment = async (form, serviceId, userId) => {
  try {
    return await axios.post(
      `${URL_BASE}/comments/services/${serviceId}/${userId}`,
      form
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const updateComment = async ({ tittle, rating, content }, commentId) => {
  try {
    return await axios.put(`${URL_BASE}/comments/${commentId}`, {
      tittle,
      rating,
      content,
    });
  } catch (error) {
    console.log(error.message);
  }
};
