import { useState } from "react";
import Paginations from "../../components/paginations/Paginations";
import SearchBar from "../../components/searchBar/SearchBar";
import Filter from "../../components/filter/Filter";
import Order from "../../components/order/Order";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "all",
    price: [1, 1000],
  });
  const [ordered, setOrdered] = useState({
    price: "",
    rate: "",
  });

  return (
    <section>
      <SearchBar
        setFilter={setFilter}
        setOrdered={setOrdered}
        setCurrentPage={setCurrentPage}
      />
      <Filter filter={filter} setFilter={setFilter} />
      <Order ordered={ordered} setOrdered={setOrdered} />
      <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </section>
  );
}

export default Products;
