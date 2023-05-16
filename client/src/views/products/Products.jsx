import { useState } from "react";
import Paginations from "../../components/paginations/Paginations";
import SearchBar from "../../components/searchBar/SearchBar";
import Filter from "../../components/filter/Filter";
import Order from "../../components/order/Order";
import styles from "./products.module.css";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "all",
    price: [1, 1000],
  });
  const [ordered, setOrdered] = useState("");

  return (
    <section className={styles.Container}>
      <SearchBar
        setFilter={setFilter}
        setOrdered={setOrdered}
        setCurrentPage={setCurrentPage}
      />
      <div style={{display:'flex', height:'100%'}}>
      <div className={styles.Sidebar}>

      <Filter filter={filter} setFilter={setFilter} />
      <Order ordered={ordered} setOrdered={setOrdered} />
      </div>
      <div className={styles.containerPaginations}>
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      </div>
    </section>
  );
}

export default Products;
