import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import paleta from "../../assets/images/Paleta";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../views/detailUser/DetailUser.module.css";

const Phone = ({
  visibleInputs,
  handleVisibleInputs,
  handleChange,
  userData,
  errors,
  handleSubmit,
}) => {
  return (
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
          <div className={styles.inputDiv}>
            <input
              onChange={handleChange}
              type="text"
              name="phone"
              className={styles.inputs}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            ></input>
            {errors.phone && <p className={styles.inputError}>*</p>}
          </div>
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
  );
};

export default Phone;
