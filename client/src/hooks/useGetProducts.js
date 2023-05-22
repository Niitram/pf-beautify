import { useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "../request/product";

const useGetProducts = () => {

    const [data, setData] = useState([]);
    const getProductsBack = () => {
        axios
        getProducts()
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        getProductsBack();
    }, []);

    return [data];
}

export default useGetProducts;