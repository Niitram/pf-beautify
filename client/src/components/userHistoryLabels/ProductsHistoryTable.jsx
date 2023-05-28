import { useEffect, useState } from "react";
import styles from "./ProductsTable.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts } from "../../request/product";
import { useNavigate } from "react-router-dom";

export default function ProductsHistoryTable({ shops }) {
  console.log(shops);
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
          e.field === "col4" && console.log("details");
          e.field === "col5" && console.log("cancel");
        }}
      />
    </div>
  );
}
