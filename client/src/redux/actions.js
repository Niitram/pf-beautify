export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const RESET_FILTERS_ORDER = "RESET_FILTERS_ORDER";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
//Errors
export const SHOW_ERROR = "SHOW_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

//login
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const START_LOADING = "START_LOADING";
export const FINISH_LOADING = "FINISH_LOADING";
export const SET_USER_INFO = "SET_USER_INFO";

//favorites
export const SET_FAVORITES = "SET_FAVORITES";
export const UNSET_FAVORITES = "UNSET_FAVORITES";
export const GET_BACKUP_PRODUCTS = "GET_BACKUP_PRODUCTS";

//Appointments
export const ADD_APPOINTMENT = "ADD_APPOINTMENT";

//Professionals
export const ADD_ALL_PROFESSIONALS = "ADD_ALL_PROFESSIONALS";

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

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

//Errors

export const showError = (errorData) => {
  return {
    type: SHOW_ERROR,
    payload: errorData,
  };
};
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};

// Favorites
export const setFavorites = (favorites) => {
  return {
    type: SET_FAVORITES,
    payload: favorites,
  };
};

export const unsetFavorites = (products) => {
  return {
    type: UNSET_FAVORITES,
    payload: products,
  };
};

export const getBackupProducts = (products) => {
  return {
    type: GET_BACKUP_PRODUCTS,
    payload: products,
  };
};

export const resetFiltersOrder = (products) => {
  return {
    type: RESET_FILTERS_ORDER,
    payload: products,
  };
};


//appoiments

export const addAppointment = (reservation) => {
  return {
    type: ADD_APPOINTMENT,
    payload: reservation,
  };
};
//appoiments

export const addAllProfessionals = (Professionals) => {
  return {
    type: ADD_ALL_PROFESSIONALS,
    payload: Professionals,
  };
};
