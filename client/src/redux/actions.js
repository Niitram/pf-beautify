export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const RESET_FILTERS_ORDER = "RESET_FILTERS_ORDER";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

//login
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const START_LOADING = "START_LOADING";
export const FINISH_LOADING = "FINISH_LOADING";
export const SET_USER_INFO = "SET_USER_INFO";

/* Actions */

export const getAllProducts = (data) => {
  return {
    type: GET_ALL_PRODUCTS,
    payload: data,
  };
};
export const searchProductByName = (data) => {
  return {
    type: SEARCH_PRODUCT_BY_NAME,
    payload: data,
  };
};

//Categories
export const getAllCategories = (data) => {
  return {
    type: GET_ALL_CATEGORIES,
    payload: data,
  };
};

//Filter
export const filterProducts = (data) => {
  return {
    type: FILTER_PRODUCTS,
    payload: data,
  };
};
export const orderProducts = (data) => {
  return {
    type: ORDER_PRODUCTS,
    payload: data,
  };
};
export const addProduct = (data) => {
  return {
    type: CREATE_PRODUCT,
    payload: data,
  };
};

//Login
export const setUserInfoAction = (dataUser) => {
  return {
    type: SET_USER_INFO,
    payload: dataUser,
  };
};



