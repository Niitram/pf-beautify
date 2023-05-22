import { useEffect, useState } from "react";
import Paginations from "../../components/paginations/Paginations";
import SearchBar from "../../components/searchBar/SearchBar";
import Filter from "../../components/filter/Filter";
import Order from "../../components/order/Order";
import styles from "../products/Products.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  setFavorites,
  showError,
  unsetFavorites,
} from "../../redux/actions";
import axios from "axios";
import { getFavorites } from "../../request/favorites";

function Favorites() {
  const backupProducts = useSelector((state) => state.backupProducts);
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.userData.id);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({
    category: "all",
    price: [4, 95],
  });
  const [ordered, setOrdered] = useState("");

  useEffect(() => {
    try {
      getFavorites(clientId).then(({ data }) => {
        dispatch(setFavorites(data));
      });
    } catch (error) {
      dispatch(showError({ tittle: "Error", message: error.message }));
      console.log(error.message);
    }

    return () => {
      dispatch(unsetFavorites(backupProducts));
    };
  }, []);

  return (
    <section className={styles.Container}>
      <SearchBar
        setFilter={setFilter}
        setOrdered={setOrdered}
        setCurrentPage={setCurrentPage}
      />
      <div style={{ display: "flex", height: "100%" }}>
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

export default Favorites;
