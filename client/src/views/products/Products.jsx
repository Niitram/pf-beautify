import { useState } from "react";
import ContainerCardsProducts from "../../components/ContainerCardsProducts/ContainerCardsProducts";
import { useSelector } from "react-redux";
import Paginations from "../../components/paginations/Paginations";


function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const allProducts = useSelector(state=>state.allProducts)

    return (
        <section>
            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <ContainerCardsProducts allProducts={allProducts}/>
        </section>
    )
}

export default Products