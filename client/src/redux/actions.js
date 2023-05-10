
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME"

/* Actions */

//const URL_BASE = "http://localhost:3001"


export const getAllProducts = (data) => {
    return {
        type: GET_ALL_PRODUCTS,
        payload: data
    }
}
export const searchProductByName = (data) => {
    return {
        type: SEARCH_PRODUCT_BY_NAME,
        payload: data
    }
}