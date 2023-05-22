import Alert from "@mui/material/Alert";
import styles from "./AlertFavorite.module.css";
import { Snackbar } from "@mui/material";

function AlertFavorite({ parametroTrue, setParametroTrue, message }) {
  return (
    <div className={styles.container}>
      <Snackbar
        sx={{ width: "100%" }}
        spacing={2}
        open={parametroTrue}
        autoHideDuration={4000}
        onClose={() => {
          setParametroTrue(false);
        }}
      >
        <Alert style={{ backgroundColor: "#f5b7b1" }} severity="success">
          {parametroTrue && message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertFavorite;
