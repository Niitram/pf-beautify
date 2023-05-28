import { useEffect, useState } from "react";
import styles from "./ProductsTable.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts } from "../../request/product";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../slideDialog/slideDialog";
import { cancelShop } from "../../request/shops";
import ScrollDialog from "./ProductsDetailsTable";

export default function ProductsHistoryTable({ shops, setShops }) {
  const [wishToCancel, setWishToCancel] = useState(false);
  const [eventRowId, setEventRowId] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);

  const rows = shops.map((row) => {
    return {
      id: row.id,
      col1: row.date,
      col2: row.amount,
      col3: `${row.discount}`,
      col4: "Click to see products",
      col5: row.ableToCancelShop ? "Cancel purchase" : "",
    };
  });

  const column = [
    { field: "col1", headerName: "Date", width: 100 },
    { field: "col2", headerName: "Ammount", width: 300 },
    { field: "col3", headerName: "Discount", width: 150 },
    { field: "col4", headerName: "Products", width: 100 },
    { field: "col5", headerName: "", width: 400 },
  ];

  return (
    <div className={styles.container}>
      <DataGrid
        columns={column}
        rows={rows}
        onCellClick={(e) => {
          setEventRowId(e.id);
          e.field === "col4" && setOpenDetail(true);
          e.field === "col5" && setWishToCancel(true);
        }}
      />

      <AlertDialogSlide
        openDialog={wishToCancel}
        handleCloseDialog={() => {
          setWishToCancel(false);
        }}
        yesCallback={() => {
          cancelShop(eventRowId);
          setWishToCancel(false);
          setShops(shops.filter(({ id }) => id !== eventRowId));
        }}
        questionText={
          "Are you sure you wanna cancel your purchase?\nA proportional discount would be granted to you so you can keep shoping in our web site"
        }
      />
      <ScrollDialog
        open={openDetail}
        handleClose={() => setOpenDetail(false)}
        shopData={shops.filter(({ id }) => id === eventRowId)[0]}
      />
    </div>
  );
}
// {/* <Button onClick={handleClickOpen("paper")}>scroll=paper</Button> */}
// const handleClickOpen = (scrollType) => () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };
