import { useEffect, useState } from "react";
import styles from "./ProductsTable.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts } from "../../request/product";
import { useNavigate } from "react-router-dom";

export default function AppointmentsTable({ appointments }) {
  const rows = appointments.map((row) => {
    return {
      id: row.id,
      col1: row.service,
      col2: row.profesional,
      col3: `${row.date}`,
      col4: row.hour,
      col5: row.ableToCancelAppointment
        ? "Cancel / Modify appointment"
        : "Give us your opinion",
    };
  });

  const column = [
    { field: "col1", headerName: "Service", width: 100 },
    { field: "col2", headerName: "Professional", width: 300 },
    { field: "col3", headerName: "Date", width: 150 },
    { field: "col4", headerName: "Hour", width: 100 },
    { field: "col5", headerName: "", width: 400 },
  ];

  return (
    <div className={styles.container}>
      <DataGrid columns={column} rows={rows} onCellClick={(e) => {}} />
    </div>
  );
}
