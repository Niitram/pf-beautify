import Alert from "@mui/material/Alert";
import styles from "./AlertAddCart.module.css";
import { Snackbar } from "@mui/material";

function AlertAddCart({ setAddProduct, addProduct }) {
  return (
    <div className={styles.container}>
      <Snackbar
        sx={{ width: "100%" }}
        spacing={2}
        open={addProduct}
        autoHideDuration={4000}
        onClose={() => {
          setAddProduct(false);
        }}
      >
        <Alert style={{ backgroundColor: "#f5b7b1" }} severity="success">
          Product added to cart
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertAddCart;
