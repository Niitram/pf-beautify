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

export default function ServicesHistoryTable({ servicesData }) {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label={"servicios"}>
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.importantRow}>
            <TableCell> </TableCell>
            <TableCell align="right">Service</TableCell>
            <TableCell align="right">Professional</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Paid for</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servicesData?.map((detail, detaili) => (
            <TableRow
              key={`row${detaili}serv${detaili}`}
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
              <TableCell align="right">{detail.service}</TableCell>
              <TableCell align="right" className={styles.cell}>
                {detail.professional}
              </TableCell>
              <TableCell align="right" className={styles.cell}>
                {detail.date}
              </TableCell>
              <TableCell align="right">{detail.hour}</TableCell>
              <TableCell align="right">
                {detail.paid ? "Alredy paid" : "Not paid"}
              </TableCell>
              <TableCell align="right">
                {detail.ableToCancelAppointment ? (
                  <div>
                    <button className={styles.cancelButtons}>Cancel</button>/
                    <button className={styles.cancelButtons}>Modify</button>
                    appointment
                  </div>
                ) : (
                  <button className={styles.cancelButtons}>
                    Give us your opinion
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell className={styles.separationRow}></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
