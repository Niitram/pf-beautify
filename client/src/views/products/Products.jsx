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
    <section>
      <SearchBar
        setFilter={setFilter}
        setOrdered={setOrdered}
        setCurrentPage={setCurrentPage}
      />
      <Filter filter={filter} setFilter={setFilter} />
      <Order ordered={ordered} setOrdered={setOrdered} />
      <div className={styles.containerPaginations}>
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default Products;
