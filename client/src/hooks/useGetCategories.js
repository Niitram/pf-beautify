import { useEffect, useState } from "react";
import { getCategories } from "../request/category";


const useGetCategories = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            getCategories()
                .then(res => setData(res.data))

        } catch (error) {
            console.log(error.message);
        }
    }, []);

    return [data];
}

export default useGetCategories;