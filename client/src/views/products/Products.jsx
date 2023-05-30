import { useEffect, useState } from "react";
import Paginations from "../../components/paginations/Paginations";
import SearchBar from "../../components/searchBar/SearchBar";
import Filter from "../../components/filter/Filter";
import Order from "../../components/order/Order";
import styles from "./Products.module.css";

import { useDispatch, useSelector } from "react-redux";
import { unsetFavorites } from "../../redux/actions";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const backupProducts = useSelector((state) => state.backupProducts);
  const allProducts = useSelector((state) => state.allProducts);
  const [filter, setFilter] = useState({
    category: "all",
    price: [4, 95],
  });
  const [ordered, setOrdered] = useState("");

  useEffect(() => {
    // para que renderize todos los productos si viene desde favoritos
    allProducts.length !== backupProducts.length &&
      dispatch(unsetFavorites(backupProducts));
  }, []);

  return (
    <section className={styles.Container}>
      <SearchBar
        setFilter={setFilter}
        setOrdered={setOrdered}
        setCurrentPage={setCurrentPage}
      />
      <div className={styles.containerSide}>
        <div className={styles.Sidebar}>
          <Filter
            filter={filter}
            setFilter={setFilter}
            setCurrentPage={setCurrentPage}
          />
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
