import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertTwoOptions({
  openDialog,
  handleCloseDialog,
  optionOne,
  optionTwo,
  questionTitle,
  textOne,
  textTwo,
}) {
  return (
    <div>
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
          {questionTitle}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={optionOne}
            style={{ backgroundColor: "#d14d72", color: "#fef2f4" }}
          >
            {textOne}
          </Button>
          <Button
            onClick={optionTwo}
            style={{ backgroundColor: "#d14d72", color: "#fef2f4" }}
          >
            {textTwo}
          </Button>
          <Button onClick={handleCloseDialog} style={{ color: "#d14d72" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
