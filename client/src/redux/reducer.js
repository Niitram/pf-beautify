import comparePrice from "../utils/filterProducts";
import { ADMIN, INVITED, CLIENT } from "../utils/roles";
import {
  GET_ALL_PRODUCTS,
  SEARCH_PRODUCT_BY_NAME,
  GET_ALL_CATEGORIES,
  FILTER_PRODUCTS,
  ORDER_PRODUCTS,
  CREATE_PRODUCT,
  SET_USER_INFO,
  LOGOUT,
} from "./actions";

const initialState = {
  allProducts: [],
  copyAllProducts: [],
  allCategories: [],
  allServices: [],
  allProfessionals: [],
  userData: {
    id: null,
    name: null,
    email: null,
    rol: INVITED,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        copyAllProducts: [...action.payload],
      };
    case SEARCH_PRODUCT_BY_NAME:
      return {
        ...state,
        allProducts: [...action.payload],
        copyAllProducts: [...action.payload],
      };
    //Create product
    case CREATE_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
        copyAllProducts: [...state.copyAllProducts, action.payload],
      };
    //CATEGORIES
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: [...action.payload],
      };
    //filter products
    case FILTER_PRODUCTS: {
      const { category, price } = action.payload;
      const filteredCategories =
        category === "all"
          ? state.allProducts
          : state.allProducts.filter(
              (product) => product.category === category
            );

      return {
        ...state,
        copyAllProducts: filteredCategories.filter((product) =>
          comparePrice(product.price, price)
        ),
      };
    }

    //Ordenar productos
    case ORDER_PRODUCTS: {
      let ordered;
      let orderedAll;
      if (action.payload === "maxPrice") {
        //ordenar ascendente por precio
        ordered = [...state.copyAllProducts].sort((a, b) => b.price - a.price);
        orderedAll = [...state.allProducts].sort((a, b) => b.price - a.price);
      } else if (action.payload === "minPrice") {
        //ordenar descendente por precio
        ordered = [...state.copyAllProducts].sort((a, b) => a.price - b.price);
        orderedAll = [...state.allProducts].sort((a, b) => a.price - b.price);
      } else if (action.payload === "maxRate") {
        //ordenar ascendente por rate
        ordered = [...state.copyAllProducts].sort((a, b) => b.rate - a.rate);
        orderedAll = [...state.allProducts].sort((a, b) => b.rate - a.rate);
      } else if (action.payload === "minRate") {
        //ordenar descendente por rate
        ordered = [...state.copyAllProducts].sort((a, b) => a.rate - b.rate);
        orderedAll = [...state.allProducts].sort((a, b) => a.rate - b.rate);
      } else {
        //en el caso de que no traiga lo que se espera
        ordered = [...state.copyAllProducts];
        orderedAll = [...state.allProducts];
      }
      return {
        ...state,
        copyAllProducts: [...ordered],
        allProducts: [...orderedAll],
      };
    }

    //SET_USER_INFO
    case SET_USER_INFO:
      return {
        ...state,
        userData: {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          rol: action.payload.rol,
        },
      };

    //LOGOUT
    case LOGOUT:
      return {
        ...state,
        userData: {
          id: null,
          name: null,
          email: null,
          rol: INVITED,
        },
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
