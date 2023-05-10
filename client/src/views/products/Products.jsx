import { useState } from "react";
import Paginations from "../../components/paginations/Paginations";
import SearchBar from "../../components/searchBar/SearchBar";


function Products() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </section>
    )
}

export default Products