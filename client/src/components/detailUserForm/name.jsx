import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../views/detailUser/DetailUser.module.css";

const Name = ({
  visibleInputs,
  handleVisibleInputs,
  handleChange,
  userData,
  errors,
  handleSubmit,
}) => {
  return (
    <div className={styles.textContainer}>
      {visibleInputs.name ? (
        <div className={styles.namePropertys}>
          <div className={styles.inputDiv}>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              onKeyDown={(e) => {
                // console.log(e);
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            ></input>
            {errors.name && <p className={styles.inputError}>*</p>}
          </div>
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
  );
};

export default Name;
