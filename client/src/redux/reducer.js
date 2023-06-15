import comparePrice from "../utils/filterProducts";
import { INVITED } from "../utils/roles";
import {
  GET_ALL_PRODUCTS,
  SEARCH_PRODUCT_BY_NAME,
  GET_ALL_CATEGORIES,
  FILTER_PRODUCTS,
  ORDER_PRODUCTS,
  CREATE_PRODUCT,
  SET_USER_INFO,
  LOGOUT,
  SHOW_ERROR,
  CLEAR_ERROR,
  SET_FAVORITES,
  UNSET_FAVORITES,
  RESET_FILTERS_ORDER,
  GET_BACKUP_PRODUCTS,
  ADD_APPOINTMENT,
  ADD_ALL_PROFESSIONALS,
} from "./actions";

const initialState = {
  allProducts: [],
  copyAllProducts: [],
  backupProducts: [],
  allCategories: [],
  allServices: [],
  allProfessionals: [],
  userData: {
    id: null,
    name: null,
    email: null,
    rol: INVITED,
  },
  appointment: {},
  errorState: {
    tittle: null,
    message: null,
  },
  oldLocation: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        copyAllProducts: [...action.payload],
        backupProducts: [...action.payload],
      };

    case GET_BACKUP_PRODUCTS:
      return {
        ...state,
        backupProducts: [...action.payload],
      };

    case SEARCH_PRODUCT_BY_NAME:
      return {
        ...state,
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
    //Errors
    case SHOW_ERROR:
      return {
        ...state,
        errorState: {
          tittle: action.payload.tittle,
          message: action.payload.message,
        },
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorState: {
          tittle: null,
          message: null,
        },
      };

    // Appointments
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointment: { ...action.payload }
      };
    // Professionals
    case ADD_ALL_PROFESSIONALS:
      return {
        ...state,
        allProfessionals: [...action.payload]
      };
    // favorites
    case SET_FAVORITES:
      return {
        ...state,
        allProducts: [...action.payload],
        copyAllProducts: [...action.payload],
      };

    case UNSET_FAVORITES:
      return {
        ...state,
        allProducts: [...action.payload],
        copyAllProducts: [...action.payload],
      };

    case RESET_FILTERS_ORDER:
      return {
        ...state,
        allProducts: [...action.payload],
        copyAllProducts: [...action.payload],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
