import { IconButton, Rating } from "@mui/material";
import styles from "./Card.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageComponent from "../imageComponent/ImageComponent";
import productDefault from "../../assets/images/camera-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, getFavorites } from "../../request/favorites";
import paleta from "../../assets/images/Paleta";
import { setFavorites, unsetFavorites } from "../../redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

function Card({ image, price, name, rate, id }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = useSelector((state) => state.userData.id);
  const allProducts = useSelector((state) => state.allProducts);
  const backupProducts = useSelector((state) => state.backupProducts);

  const handleDeleteFavorite = async () => {
    try {
      await deleteFavorite(clientId, id);
      if (location.pathname === "/favorites" && allProducts.length === 1) {
        navigate("/home");
        return dispatch(unsetFavorites(backupProducts));
      }
      getFavorites(clientId).then(({ data }) => {
        dispatch(setFavorites(data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.aux}>
      {location.pathname === "/favorites" && (
        <IconButton
          onClick={handleDeleteFavorite}
          style={{
            zIndex: 20,
            position: "absolute",
            top: "5px",
            right: "5px",
          }}
        >
          <CloseIcon style={{ fill: paleta.accent1, zIndex: 10 }} />
        </IconButton>
      )}
      <Link
        className={styles.link}
        style={{ textDecoration: "none" }}
        to={`/detailProduct/${id}`}
      >
        <div className={styles.cardContainer}>
          <div className={styles.imagen}>
            <ImageComponent src={image} notFoundSrc={productDefault} />
          </div>
          <div className={styles.detailsCard}>
            <div className={styles.nombre}>
              {name.length > 13 ? `${name.slice(0, 14)}...` : name}
            </div>
            <Rating
              name="size-small"
              defaultValue={rate}
              size="small"
              readOnly
            />
            <div className={styles.precio}>
              <p>${price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
