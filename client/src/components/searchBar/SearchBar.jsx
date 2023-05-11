import { useDispatch} from "react-redux"
import { searchProductByName } from "../../redux/actions"
import { useState } from "react"
import handlerSearch from "../../handlers/handleSearch"
import handlerChange from "../../handlers/handleChange"

function SearchBar({setCurrentPage}) {
    const [searched, setSearched] = useState("")
    const dispatch = useDispatch()

    return (
        <div>
            <form onSubmit={(e)=>{handlerSearch(e, searched, dispatch, searchProductByName, setCurrentPage, setSearched)}} >
                <input 
                    type="search" 
                    value={searched}
                    onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                            handlerSearch(e, searched, dispatch, searchProductByName, setCurrentPage, setSearched)
                        }}}
                    onChange={(e)=>{handlerChange(e,setSearched)}}
                    placeholder="Nail polish..."/>
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchBar