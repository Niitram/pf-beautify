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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProductsHistoryTable({ shopsData }) {
  console.log(shopsData[0]);
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
                  {shop.ableToCancelShop ? "CancelShop" : "HOlis"}
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
    </TableContainer>
  );
}
