import { useEffect, useState } from "react";
import styles from "./ProductsTable.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts } from "../../request/product";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../slideDialog/slideDialog";
import { cancelShop } from "../../request/shops";
import ScrollDialog from "./ProductsDetailsTable";
import CommentForm from "../commentForm/commentForm";
import Loading from "../../views/loading/Loading";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ProductsHistoryTable({
  shops,
  setShops,
  updateProductsComments,
}) {
  const [wishToCancel, setWishToCancel] = useState(false);
  const [eventRowId, setEventRowId] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [feedbackProductId, setFeedbackProductId] = useState(0);
  const [currentProductFeedback, setCurrentProductFeedback] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(false);

  const rows =
    shops &&
    shops.map((row) => {
      return {
        id: row.id,
        col1: row.date,
        col2: row.amount.toFixed(2),
        col3: `${row.discount.toFixed(2)}`,
        col4: row.productsNames,
        col6: row.ableToCancelShop ? "Cancel purchase" : "",
      };
    });

  const column = [
    { field: "col1", headerName: "Date", width: 100 },
    { field: "col2", headerName: "Ammount", width: 100 },
    { field: "col3", headerName: "Discount", width: 100 },
    {
      field: "col4",
      headerName: "Products (Click to see details)",
      width: 400,
    },
    { field: "col6", headerName: "", width: 150 },
  ];

  return (
    <div style={{ color: "transparent" }}>
      {shops && !shops.length && (
        <div
          style={{
            minHeight: "10em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You have no products purchase history
        </div>
      )}
      {shops && shops.length && (
        <div className={styles.container}>
          <DataGrid
            columns={column}
            rows={rows}
            pageSize={15}
            onCellClick={(e) => {
              const eventShop = shops.filter(({ id }) => id === e.id)[0];
              setEventRowId(e.id);
              e.field === "col4" && setOpenDetail(true);
              e.field === "col6" &&
                eventShop.ableToCancelShop &&
                setWishToCancel(true);
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

          <CommentForm
            openDialog={openFeedback}
            handleCloseDialog={() => {
              setOpenFeedback(false);
            }}
            type={"product"}
            id={feedbackProductId}
            comment={currentProductFeedback}
            updateProductsComments={updateProductsComments}
          />

          <ScrollDialog
            setCurrentProductFeedback={setCurrentProductFeedback}
            setOpenFeedback={setOpenFeedback}
            setFeedbackProductId={setFeedbackProductId}
            open={openDetail}
            handleClose={() => setOpenDetail(false)}
            shopData={shops.filter(({ id }) => id === eventRowId)[0]}
          />
        </div>
      )}
      {!shops && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "10em",
          }}
        >
          <CircularProgress />
        </Box>
      )}
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
