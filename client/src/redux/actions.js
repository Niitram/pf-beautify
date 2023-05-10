
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"

/* Actions */

//const URL_BASE = "http://localhost:3001"


export const getAllProducts = (data) => {
    return {
        type: GET_ALL_PRODUCTS,
        payload: data
    }
}