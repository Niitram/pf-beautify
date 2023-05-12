import comparePrice from "../utils/filterProducts";
import {
  GET_ALL_PRODUCTS,
  SEARCH_PRODUCT_BY_NAME,
  GET_ALL_CATEGORIES,
  FILTER_PRODUCTS,
  ORDER_PRODUCTS_BY_PRICE,
  ORDER_PRODUCTS_BY_RATE,
} from "./actions";

const initialState = {
  allProducts: [],
  copyAllProducts: [],
  allCategories: [],
  allServices: [],
  allProfessionals: [],
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
        copyAllProducts: [...action.payload],
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
    case ORDER_PRODUCTS_BY_PRICE: {
      let ordered;
      let orderedAll;
      if (action.payload === "maxPrice") {
        //ordenar ascendente
        ordered = [...state.copyAllProducts].sort((a, b) => b.price - a.price);
        orderedAll = [...state.allProducts].sort((a, b) => b.price - a.price);
      }
      if (action.payload === "minPrice") {
        //ordenar descendente
        ordered = [...state.copyAllProducts].sort((a, b) => a.price - b.price);
        orderedAll = [...state.allProducts].sort((a, b) => a.price - b.price);
      }
      return {
        ...state,
        copyAllProducts: [...ordered],
        allProducts: [...orderedAll],
      };
    }
    case ORDER_PRODUCTS_BY_RATE: {
      let ordered;
      let orderedAll;
      if (action.payload === "maxRate") {
        //ordenar ascendente
        ordered = [...state.copyAllProducts].sort((a, b) => b.rate - a.rate);
        orderedAll = [...state.allProducts].sort((a, b) => b.rate - a.rate);
      }
      if (action.payload === "minRate") {
        //ordenar descendente
        ordered = [...state.copyAllProducts].sort((a, b) => a.rate - b.rate);
        orderedAll = [...state.allProducts].sort((a, b) => a.rate - b.rate);
      }
      return {
        ...state,
        copyAllProducts: [...ordered],
        allProducts: [...orderedAll],
      };
    }

    default:
      return { ...state };
  }
};

export default rootReducer;
