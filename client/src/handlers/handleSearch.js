import { getProductByName } from "../request/product"

const handlerSearch = async (e, searched, dispatch, searchProductByName, setCurrentPage, setSearched) => {
    e.preventDefault()
    const response = await getProductByName(searched)
    dispatch(searchProductByName(response.data))
    setCurrentPage(1)
    setSearched("")
}

export default handlerSearch;