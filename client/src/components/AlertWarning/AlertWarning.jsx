import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import styles from "./AlertWarning.module.css";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../../redux/actions";

function AlertWarning({ messageAlert = "error...", tittleAlert = "Warning" }) {
  //Con este estado se controla la visibilidad de la alerta en el componente Collapse
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Collapse in={open}>
          <Alert
            style={{ backgroundColor: "#f5b7b1" }}
            severity="warning"
            onClose={() => {
              dispatch(clearError());
              setOpen(false);
            }}
          >
            <AlertTitle style={{ fontWeight: "bold" }}>
              {tittleAlert}
            </AlertTitle>
            {messageAlert}
          </Alert>
        </Collapse>
      </Stack>
    </div>
  );
}

export default AlertWarning;
