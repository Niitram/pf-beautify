import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./ProductsDetailsTable.module.css";

export default function ScrollDialog({ open, handleClose, shopData }) {
  console.log(shopData);
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
            id: row.id,
            // col1: row.image,
            col2: row.productName,
            col3: row.count,
            col4: `$${row.price}`,
          };
        })
      );
  }, [open]);

  const column = [
    // { field: "col1", headerName: "Image", width: 100 },
    { field: "col2", headerName: "Product Name", width: 270 },
    { field: "col3", headerName: "Quantity", width: 80 },
    { field: "col4", headerName: "Price", width: 80 },
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
            <DataGrid columns={column} rows={rows} pageSize={5} />
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
