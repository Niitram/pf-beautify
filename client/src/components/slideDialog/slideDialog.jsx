import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  openDialog,
  handleCloseDialog,
  yesCallback,
  questionText,
}) {
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-slide-title"
          style={{
            color: "#3d3b54",
            fontFamily: "Playfair Display",
            fontWeight: "bold",
          }}
        >
          {questionText}
        </DialogTitle>
        {/* <DialogContent >
            <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
          </DialogContent> */}
        <DialogActions>
          <Button
            onClick={yesCallback}
            style={{ backgroundColor: "#d14d72", color: "#fef2f4" }}
          >
            Yes
          </Button>
          <Button onClick={handleCloseDialog} style={{ color: "#d14d72" }}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// estados y funciones a definir en el componente que lo usa

// const [openDialog, setOpenDialog] = useState(false);
// const handleClickOpenDialog = () => {
//   setOpenDialog(true);
// };
// const handleCloseDialog = () => {
//   setOpenDialog(false);
// };
