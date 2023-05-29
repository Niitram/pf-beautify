import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./ProductsDetailsTable.module.css";

export default function ScrollDialog({
  open,
  handleClose,
  shopData,
  setFeedbackProductId,
  setOpenFeedback,
  setCurrentProductFeedback,
}) {
  const navigate = useNavigate();
  const descriptionElementRef = useRef(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    shopData &&
      setRows(
        shopData.details.map((row) => {
          return {
            id: row.productId,
            col2: row.productName,
            col3: row.count,
            col4: `$${row.price}`,
            col5: row.comments ? "See your review" : "Give us your opinion",
          };
        })
      );
  }, [open]);

  const column = [
    { field: "col2", headerName: "Product Name", width: 150 },
    { field: "col3", headerName: "Quantity", width: 80 },
    { field: "col4", headerName: "Price", width: 80 },
    { field: "col5", headerName: "Review", width: 200 },
  ];

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Purchase Detail</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <div className={styles.container}>
            <DataGrid
              columns={column}
              rows={rows}
              pageSize={5}
              onCellClick={(e) => {
                e.field === "col2" && navigate(`/detailProduct/${e.id}`);
                if (e.field === "col5") {
                  setFeedbackProductId(e.id);
                  handleClose();
                  setOpenFeedback(true);
                  const comment = shopData.details.filter(
                    ({ productId }) => productId === e.id
                  )[0].comment;
                  setCurrentProductFeedback(comment);
                }
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
