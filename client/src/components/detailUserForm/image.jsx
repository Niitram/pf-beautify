import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../views/detailUser/DetailUser.module.css";
import productDefault from "../../assets/images/camera-icon.png";
import { uploadProfilePicture } from "../../utils/firebaseConfig";

const Image = ({
  visibleInputs,
  handleVisibleInputs,
  userData,
  errors,
  updatedData,
  setUpdatedData,
  setErrors,
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const archivo = event.dataTransfer.files[0];
    uploadProfilePicture(
      archivo,
      setUpdatedData,
      updatedData,
      setErrors,
      visibleInputs
    );
  };

  return (
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
          {errors.image && <p className={styles.imageInputError}>*</p>}
          <IconButton
            name="image"
            style={{ position: "absolute", top: "5px", right: "5px" }}
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
            style={{ position: "absolute", top: "5px", right: "5px" }}
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
      )}
    </div>
  );
};

export default Image;
