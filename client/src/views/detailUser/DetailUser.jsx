import { useEffect, useState } from "react";
import { getClient, updateClient } from "../../request/clients";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp, uploadProfilePicture } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";
import styles from "./DetailUser.module.css";
import ImageComponent from "../../components/imageComponent/ImageComponent";
import productDefault from "../../assets/images/camera-icon.png";
import cameraIcon from "../../assets/images/camera-icon.png";

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
    handleDetailClick();
    dispatch(logout());
    navigate("/");
    await signOut(auth);
  };

  useEffect(() => {
    getDataFromDb(globalUserData.email);
  }, []);

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    adress: "",
    phone: "",
    image: "",
  });

  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    adress: "",
    phone: "",
    image: "",
  });

  const [visibleInputs, setVisibleInputs] = useState({
    name: false,
    email: false,
    adress: false,
    phone: false,
    image: false,
  });

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
    setVisibleInputs({
      name: false,
      email: false,
      adress: false,
      phone: false,
    });
    setUpdatedData({
      name: "",
      email: "",
      adress: "",
      phone: "",
      image: "",
    });
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
        <button
          onClick={handleDetailClick}
          className={styles.closeDetailButton}
        >
          {"< Close"}
        </button>
        <div className={styles.textContainer}>
          {visibleInputs.name ? (
            <div className={styles.namePropertys}>
              <input onChange={handleChange} type="text" name="name"></input>
              <button
                name="name"
                onClick={(event) => {
                  event.preventDefault;
                  handleVisibleInputs(event, true);
                }}
              >
                x
              </button>
            </div>
          ) : (
            <div className={styles.namePropertys}>
              <h2 className={styles.value}>
                {userData.name ? userData.name : "Unknown"}
              </h2>
              <button
                name="name"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event);
                }}
              >
                Update
              </button>
            </div>
          )}
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
              <button
                name="image"
                className={styles.updateImageButton}
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event, true);
                }}
              >
                Back
              </button>
            </div>
          ) : (
            <div className={styles.image}>
              <img src={userData.image ? userData.image : productDefault} />
              {/* <ImageComponent
                src={userData.image}
                notFoundSrc={productDefault}
              /> */}
              <button
                name="image"
                className={styles.updateImageButton}
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>

        <div className={styles.emailContainer}>
          <h3 className={styles.emailTitle}>Email</h3>

          <div className={styles.emailPropertys}>
            <h3 className={styles.value}>
              {userData.email ? userData.email : "Unknown"}
            </h3>
          </div>
        </div>

        <div className={styles.textContainer}>
          <h3>Phone number:</h3>

          {visibleInputs.phone ? (
            <div className={styles.propertys}>
              <input onChange={handleChange} type="text" name="phone"></input>
              <button
                name="phone"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event, true);
                }}
              >
                x
              </button>
            </div>
          ) : (
            <div className={styles.propertys}>
              <h3 className={styles.value}>
                {userData.phone ? userData.phone : "Unknown"}
              </h3>
              <button
                name="phone"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>

        <div className={styles.textContainer}>
          <h3>Adress:</h3>

          {visibleInputs.adress ? (
            <div className={styles.propertys}>
              <input onChange={handleChange} type="text" name="adress"></input>
              <button
                name="adress"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event, true);
                }}
              >
                x
              </button>
            </div>
          ) : (
            <div className={styles.propertys}>
              <h3 className={styles.value}>
                {userData.adress ? userData.adress : "Unknown"}
              </h3>
              <button
                name="adress"
                onClick={(event) => {
                  event.preventDefault();
                  handleVisibleInputs(event);
                }}
              >
                Update
              </button>
            </div>
          )}
        </div>
        {anyUpdatedData() && <button type="submit">Submit changes</button>}

        <button onClick={onLogout}>My favorites</button>
        <button onClick={onLogout}>My history</button>
        <button onClick={onLogout}>Log out</button>
      </form>
    </div>
  );
}

export default DetailUser;
