import { useSelector } from "react-redux"
import productsForPage from "../../utils/productsForPage"
import ShowCardsProduct from "../showCardsProduct/ShowCardsProduct";

function Paginations({currentPage,setCurrentPage}) {
    const allProducts = useSelector(state=>state.allProducts)
    const arrayWithPages = productsForPage(allProducts)

    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };
    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <div>
            <div >
                <button disabled={currentPage === 1} onClick={prevPage}>
                    Previous Page
                </button>
                {
                    arrayWithPages.map((page,index) => {
                        if (arrayWithPages.length-1) {
                            return (
                                <button
                                    disabled={currentPage === index+1}
                                    key={index}
                                    onClick={()=>{
                                        <ShowCardsProduct currentPage={setCurrentPage(index+1)} />
                                    }}>
                                        {index+1}
                                </button>
                            );
                        }
                    })
                }
                <button disabled={currentPage === arrayWithPages.length || arrayWithPages.length ===1} onClick={nextPage}>
                    Next Page
                </button>
            </div>
            <div>
                <ShowCardsProduct currentPage={currentPage} />
            </div>
        </div>
    )
}

export default Paginations