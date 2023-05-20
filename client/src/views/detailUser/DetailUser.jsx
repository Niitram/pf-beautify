import { useEffect, useState } from "react";
import { getClient, updateClient } from "../../request/clients";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp, uploadProfilePicture } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";
import styles from "./DetailUser.module.css";
import productDefault from "../../assets/images/camera-icon.png";
import cameraIcon from "../../assets/images/camera-icon.png";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CloseIcon from "@mui/icons-material/Close";
import { getProductById } from "../../request/product";


function DetailUser({ setLogout, detailVisible, handleDetailClick }) {
  const globalUserData = useSelector((state) => state.userData);
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDataFromDb = async (email) => {
    const data = await getClient(email);
    const userFromDb = data.data;

    setUserData({
      id: userFromDb.id,
      name: userFromDb.fullName,
      email: userFromDb.email,
      adress: userFromDb.adress,
      phone: userFromDb.phone,
      image: userFromDb.image,
    });
  };

  const onLogout = async () => {
    setLogout(false);
    // mandar al back la info del carrito
    await getProductById(1); // esta petición es cualquier cosa, pero necesito el await. Va a ser reemplazada por la petición que guarda el carrito
    localStorage.clear();
    handleDetailClick();
    dispatch(logout());
    navigate("/");
    await signOut(auth);
  };

  useEffect(() => {
    getDataFromDb(globalUserData.email);
  }, []);

  const initialState = {
    id: "",
    name: "",
    email: "",
    adress: "",
    phone: "",
    image: "",
  };

  const [userData, setUserData] = useState(initialState);

  const [updatedData, setUpdatedData] = useState(initialState);

  const [visibleInputs, setVisibleInputs] = useState(initialState);

  const anyUpdatedData = () => {
    for (const property in updatedData) {
      if (updatedData[property]) return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateClient(updatedData, userData.id);
    const userFromDb = response.data;
    setUserData({
      id: userFromDb.id,
      name: userFromDb.fullName,
      email: userFromDb.email,
      adress: userFromDb.adress,
      phone: userFromDb.phone,
      image: userFromDb.image,
    });
    setVisibleInputs(initialState);
    setUpdatedData(initialState);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const archivo = event.dataTransfer.files[0];
    uploadProfilePicture(archivo, setUpdatedData, updatedData);
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUpdatedData({ ...updatedData, [property]: value });
  };

  const handleVisibleInputs = (event, close) => {
    const property = event.target.name;
    setVisibleInputs({
      ...visibleInputs,
      [property]: !visibleInputs[property],
    });
    if (close) setUpdatedData({ ...updatedData, [property]: "" });
  };

  return (
    <div className={styles.loginForm}>
      <div
        style={
          detailVisible
            ? { display: "flex", transition: "400ms" }
            : { display: "none", transition: "400ms" }
        }
        className={styles.overlay}
        onClick={handleDetailClick}
      ></div>

      <form onSubmit={handleSubmit} className={styles.Container}>
        <div className={styles.closeButtons}>
          <button onClick={onLogout} className={styles.closeDetailButton}>
            Logout
          </button>
          <button
            onClick={handleDetailClick}
            className={styles.closeDetailButton}
          >
            {"< Close"}
          </button>
        </div>
        <div className={styles.textContainer}>
          {visibleInputs.name ? (
            <div className={styles.namePropertys}>
              <input onChange={handleChange} type="text" name="name"></input>
              <IconButton
                name="name"
                className={styles.closeImageButton}
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event, true);
                }}
              >
                <CloseIcon style={{ fill: paleta.accent1, zIndex: -1 }} />
              </IconButton>
            </div>
          ) : (
            <div className={styles.namePropertys}>
              <h2 className={styles.name}>
                {userData.name ? userData.name : "Unknown"}
              </h2>
              <IconButton
                name="name"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event);
                }}
              >
                <EditIcon style={{ fill: paleta.accent1, zIndex: -1 }} />
              </IconButton>
            </div>
          )}
        </div>
        <div className={styles.emailPropertys}>
          <h3 className={styles.value}>
            {userData.email ? userData.email : "Unknown"}
          </h3>
        </div>

        <div className={styles.imageContainer}>
          {visibleInputs.image ? (
            <div
              style={{
                backgroundImage: `url(${
                  updatedData.image.length && updatedData.image
                })`,
              }}
              className={styles.dragContainer}
              onDrop={(event) => handleDrop(event)}
              onDragOver={(e) => handleDragOver(e)}
            >
              {!updatedData.image && <p>Drag image here</p>}
              <IconButton
                name="image"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event, true);
                }}
              >
                <CloseIcon
                  style={{
                    fill: paleta.accent1,
                    zIndex: -1,
                  }}
                />
              </IconButton>
            </div>
          ) : (
            <div className={styles.image}>
              <img src={userData.image ? userData.image : productDefault} />

              <IconButton
                name="image"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event);
                }}
              >
                <EditIcon style={{ fill: paleta.accent1, zIndex: -1 }} />
              </IconButton>
            </div>
          )}
        </div>

        <div className={styles.textContainer}>
          {visibleInputs.phone ? (
            <div className={styles.propertysContainer}>
              <div className={styles.propertys}>
                <h4 className={styles.titles}>Phone number:</h4>
                <IconButton
                  name="phone"
                  onClick={(event) => {
                    event.preventDefault();
                    handleVisibleInputs(event, true);
                  }}
                >
                  <CloseIcon style={{ fill: paleta.accent1, zIndex: -1 }} />
                </IconButton>
              </div>
              <input
                onChange={handleChange}
                type="text"
                name="phone"
                className={styles.inputs}
              ></input>
            </div>
          ) : (
            <div className={styles.propertysContainer}>
              <div className={styles.propertys}>
                <h4>Phone number:</h4>
                <IconButton
                  name="phone"
                  onClick={(event) => {
                    event.preventDefault();
                    handleVisibleInputs(event);
                  }}
                >
                  <EditIcon
                    style={{
                      fill: paleta.accent1,
                      zIndex: -1,
                    }}
                  />
                </IconButton>
              </div>
              <h3 className={styles.value}>
                {userData.phone ? userData.phone : "Unknown"}
              </h3>
            </div>
          )}
        </div>

        <div className={styles.textContainer}>
          {visibleInputs.adress ? (
            <div className={styles.propertysContainer}>
              <div className={styles.propertys}>
                <h4>Adress:</h4>
                <IconButton
                  name="adress"
                  onClick={(event) => {
                    event.preventDefault();
                    handleVisibleInputs(event, true);
                  }}
                >
                  <CloseIcon
                    style={{
                      fill: paleta.accent1,
                      zIndex: -1,
                    }}
                  />
                </IconButton>
              </div>
              <input onChange={handleChange} type="text" name="adress"></input>
            </div>
          ) : (
            <div className={styles.propertysContainer}>
              <div className={styles.propertys}>
                <h4>Adress:</h4>

                <IconButton
                  name="adress"
                  onClick={(event) => {
                    event.preventDefault();
                    handleVisibleInputs(event);
                  }}
                >
                  <EditIcon style={{ fill: paleta.accent1, zIndex: -1 }} />
                </IconButton>
              </div>
              <h3 className={styles.value}>
                {userData.adress ? userData.adress : "Unknown"}
              </h3>
            </div>
          )}
        </div>

        {anyUpdatedData() && (
          <button type="submit" className={styles.importantButton}>
            Submit changes
          </button>
        )}
        <hr className={styles.hr} />
        <div className={styles.finalButtons}>
          <button onClick={onLogout} className={styles.button}>
            My favorites
          </button>
          <button onClick={onLogout} className={styles.button}>
            My history
          </button>
        </div>
        {/* <button onClick={onLogout} className={styles.button}>
          Log out
        </button> */}
      </form>
    </div>
  );
}

export default DetailUser;
