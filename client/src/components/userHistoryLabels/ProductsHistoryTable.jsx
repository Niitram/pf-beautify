import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./UserHistoryTable.module.css";
import AlertDialogSlide from "../slideDialog/slideDialog.jsx";

export default function ProductsHistoryTable({ shopsData }) {
  const [openSlideDialog, setOpenSlideDialog] = React.useState(false);
  return (
    <TableContainer component={Paper}>
      {shopsData.map((shop, i) => {
        return (
          <Table className={styles.table} aria-label={shop.id} key={`shop${i}`}>
            <TableHead className={styles.tableHead}>
              <TableRow className={styles.importantRow}>
                <TableCell>Purchase ID: {shop.id}</TableCell>
                <TableCell align="right">Total amount: {shop.amount}</TableCell>
                <TableCell align="right">
                  Total discount: {shop.discount}
                </TableCell>
                <TableCell align="right">Date: {shop.date}</TableCell>
                <TableCell align="right">
                  {shop.ableToCancelShop ? (
                    <button
                      className={styles.productCancelButtons}
                      onClick={() => setOpenSlideDialog(true)}
                    >
                      CancelShop
                    </button>
                  ) : (
                    <button className={styles.productCancelButtons}>
                      Give us your opinion
                    </button>
                  )}
                </TableCell>
              </TableRow>
              <TableRow className={styles.titlesRow}>
                <TableCell> </TableCell>
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Count:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shop?.details.map((detail, detaili) => (
                <TableRow
                  key={`row${detaili}shop${i}`}
                  className={detaili % 2 ? styles.row0 : styles.row1}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={styles.imageCell}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img src={detail.image} className={styles.productImage} />
                    </div>
                  </TableCell>
                  <TableCell align="right">{detail.productName}</TableCell>
                  <TableCell align="right" className={styles.cell}>
                    {detail.category}
                  </TableCell>
                  <TableCell align="right">{detail.price}</TableCell>
                  <TableCell align="right">{detail.count}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell className={styles.separationRow}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      })}
      {openSlideDialog && (
        <AlertDialogSlide
          open={openSlideDialog}
          yesCallback={() => setOpenSlideDialog(false)}
          handleCloseDialog={() => setOpenSlideDialog(false)}
          questionText={`Are you sure you wanna cancel your purchase?\n You'll recive an equivalent discount to continue shopping in our website`}
        />
      )}
    </TableContainer>
  );
}
