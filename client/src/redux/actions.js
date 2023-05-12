export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";
export const ORDER_PRODUCTS_BY_PRICE = "ORDER_PRODUCTS_BY_PRICE";
export const ORDER_PRODUCTS_BY_RATE = "ORDER_PRODUCTS_BY_RATE";
export const RESET_FILTERS_ORDER = "RESET_FILTERS_ORDER";

/* Actions */

//const URL_BASE = "http://localhost:3001"

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
export const orderProductsByPrice = (data) => {
  return {
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: data,
  };
};
export const orderProductsByRate = (data) => {
  return {
    type: ORDER_PRODUCTS_BY_RATE,
    payload: data,
  };
};
