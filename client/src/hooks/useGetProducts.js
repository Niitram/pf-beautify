import { useEffect, useState } from "react";
import axios from "axios";


const useGetProducts = () => {

    const [data, setData] = useState([]);
    const URL_BASE = "http://localhost:3001"
    useEffect(() => {
        axios.get(`${URL_BASE}/products`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err.message))
    }, []);

    return [data]
}

export default useGetProducts;