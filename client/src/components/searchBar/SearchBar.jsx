
import axios from "axios"
import { useDispatch} from "react-redux"
import { searchProductByName } from "../../redux/actions"
import { useState } from "react"

function SearchBar({setCurrentPage}) {
    const [searched, setSearched] = useState("")
    const dispatch = useDispatch()

    const handlerSearch = async (e) => {
        e.preventDefault()
        const response = await axios.get(`http://localhost:3001/products?name=${searched}`)
        dispatch(searchProductByName(response.data))
        setCurrentPage(1)
        setSearched("")
    }
    const handlerChange = (e) => {
        e.preventDefault()
        setSearched(e.target.value)
    }

    return (
        <div>
            <form onSubmit={(e)=>{handlerSearch(e)}} >
                <input 
                    type="search" 
                    value={searched}
                    onChange={(e)=>{handlerChange(e)}}
                    placeholder="Nail polish..."/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar