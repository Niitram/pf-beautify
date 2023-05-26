import styles from "./ClientsTable.module.css";
import MockData from "../../assets/MOCK_DATA.json";
import { DataGrid } from "@mui/x-data-grid";
import { getAllClients } from "../../request/clients";
import { useEffect, useState } from "react";

export default function ClientsTable() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getAllClients().then(({ data }) => setClients(data));
  }, []);

  const rows = clients.map((row) => {
    return {
      id: row.id,
      col1: row.id,
      col2: row.fullName,
      col3: row.email,
      col4: row.adress,
      col5: row.phone,
    };
  });
  const columns = [
    { field: "col1", headerName: "id", width: 100 },
    { field: "col2", headerName: "full name", width: 250 },
    { field: "col3", headerName: "email", width: 250 },
    { field: "col4", headerName: "address", width: 200 },
    { field: "col5", headerName: "phone", width: 200 },
  ];
  return (
    <div className={styles.container}>
      <DataGrid
        columns={columns}
        rows={rows}
        checkboxSelection={true}
      ></DataGrid>
    </div>
  );
}
