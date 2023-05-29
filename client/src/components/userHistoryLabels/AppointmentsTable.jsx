import styles from "./ProductsTable.module.css";
import { DataGrid } from "@mui/x-data-grid";

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
    { field: "col1", headerName: "Service", width: 200 },
    { field: "col2", headerName: "Professional", width: 200 },
    { field: "col3", headerName: "Date", width: 100 },
    { field: "col4", headerName: "Hour", width: 100 },
    { field: "col5", headerName: "", width: 230 },
  ];

  return (
    <div className={styles.container}>
      <DataGrid columns={column} rows={rows} onCellClick={(e) => {}} />
    </div>
  );
}
