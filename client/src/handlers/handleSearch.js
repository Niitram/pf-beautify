import { showError } from "../redux/actions"
import { getProductByName } from "../request/product"

const handlerSearch = async (e, searched, dispatch, searchProductByName, setCurrentPage, setSearched) => {
    e.preventDefault()
    try {
        const response = await getProductByName(searched)
        dispatch(searchProductByName(response.data))
        setCurrentPage(1)
        setSearched("")
    } catch (error) {
        dispatch(showError({ tittle: "Error", message: error.message }))
    }
}

export default handlerSearch;