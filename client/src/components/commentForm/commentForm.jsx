import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useEffect, useState } from "react";
import styles from "./commentForm.module.css";
import Rating from "@mui/material/Rating";
import {
  createProductComment,
  createServiceComment,
  updateComment,
} from "../../request/comments";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CommentForm({
  openDialog,
  handleCloseDialog,
  comment,
  type,
  id,
  updateProductsComments,
  updateServicesComments,
}) {
  const [form, setForm] = useState({ tittle: "", content: "", rating: 0 });
  const [errors, setErrors] = useState({
    tittle: "*",
    content: "*",
  });
  const [useForm, setUseForm] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userData")).id;

  const handleSubmit = async () => {
    if (!comment) {
      if (type === "product") await createProductComment(form, id, userId);
      if (type === "service") await createServiceComment(form, id, userId);
    } else {
      await updateComment(form, comment.id);
    }
    if (type === "product") updateProductsComments();
    if (type === "service") updateServicesComments();
    setUseForm(false);
    handleCloseDialog();
    setForm({ tittle: "", content: "", rating: 0 });
    setErrors({ tittle: "*", content: "*" });
  };

  const validate = (form) => {
    const newErrors = { tittle: "", content: "" };
    if (form.tittle.length > 30 || form.tittle.length < 1)
      newErrors.tittle = "*";
    if (form.content.length > 150 || form.content.length < 1)
      newErrors.content = "*";
    return newErrors;
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setErrors(validate({ ...form, [property]: value }));
  };

  useEffect(() => {
    setUseForm(!Boolean(comment));
  }, [openDialog]);
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
          {useForm && (
            <form className={styles.form}>
              <div className={styles.inputContainer}>
                <input
                  name="tittle"
                  type="text"
                  placeholder="Title"
                  value={form.tittle}
                  onChange={handleChange}
                ></input>
                {errors.tittle && <p className={styles.inputError}>*</p>}
              </div>
              <div className={styles.inputContainer}>
                <textarea
                  name="content"
                  type="text"
                  placeholder="Write your opinion here"
                  value={form.content}
                  onChange={handleChange}
                ></textarea>
                {errors.content && <p className={styles.inputError}>*</p>}
              </div>
              <Rating
                name="simple-controlled"
                value={Number(form.rating)}
                onChange={(event, newValue) => {
                  setForm({ ...form, rating: newValue });
                }}
              />
            </form>
          )}
          {!useForm && comment && (
            <div className={styles.commentDiv}>
              <h4>{comment.tittle}</h4>
              <p>{comment.content}</p>
              <Rating
                name="read-only"
                value={Number(comment.rating)}
                readOnly
              />
            </div>
          )}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: "#d14d72" }}>
            Close
          </Button>
          {useForm && (
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "#d14d72", color: "#fef2f4" }}
              className={styles.send}
              disabled={errors.tittle || errors.content ? true : false}
            >
              Send
            </Button>
          )}
          {!useForm && (
            <Button
              onClick={() => {
                setUseForm(true);
                setForm(comment);
              }}
              style={{ backgroundColor: "#d14d72", color: "#fef2f4" }}
              className={styles.send}
            >
              Edit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
