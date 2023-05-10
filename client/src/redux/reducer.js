import { GET_ALL_PRODUCTS, SEARCH_PRODUCT_BY_NAME } from './actions';


const initialState = {
    allProducts: [],
    copyAllProducts: [],
    allServices: [],
    allProfessionals: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: [...action.payload],
                copyAllProducts: [...action.payload],
            }
        case SEARCH_PRODUCT_BY_NAME:
            return {
                ...state,
                copyAllProducts: [...action.payload],
            }

        default:
            return { ...state }
    }
}

export default rootReducer; 