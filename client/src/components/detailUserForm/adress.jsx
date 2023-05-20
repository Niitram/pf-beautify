import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../views/detailUser/DetailUser.module.css";

const Adress = ({
  visibleInputs,
  handleVisibleInputs,
  handleChange,
  userData,
  errors,
}) => {
  return (
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
          <div className={styles.inputDiv}>
            <input onChange={handleChange} type="text" name="adress"></input>
            {errors.adress && <p className={styles.inputError}>*</p>}
          </div>
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
  );
};

export default Adress;
