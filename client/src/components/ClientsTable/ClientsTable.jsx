import styles from "./ClientsTable.module.css";
import MockData from "../../assets/MOCK_DATA.json";
import { DataGrid } from "@mui/x-data-grid";
import { banClient, getAllClients, unbanClient } from "../../request/clients";
import { useEffect, useState } from "react";
import AlertDialogSlide from "../slideDialog/slideDialog";

export default function ClientsTable() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

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
      col6: row.banned,
      col7: row.banned ? "Remove ban" : "Ban client",
    };
  });
  const columns = [
    { field: "col1", headerName: "id", width: 50 },
    { field: "col2", headerName: "full name", width: 250 },
    { field: "col3", headerName: "email", width: 250 },
    { field: "col4", headerName: "address", width: 200 },
    { field: "col5", headerName: "phone", width: 150 },
    { field: "col6", headerName: "banned", width: 70 },
    { field: "col7", headerName: "", width: 100 },
  ];
  return (
    <div className={styles.container}>
      <DataGrid
        columns={columns}
        rows={rows}
        checkboxSelection={true}
        onCellClick={(e) => {
          if (e.field !== "col7") return;
          setSelectedClient(clients.filter(({ id }) => id === e.id)[0]);
          setOpenDialog(true);
        }}
      ></DataGrid>

      <AlertDialogSlide
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        yesCallback={async () => {
          if (selectedClient.banned) await unbanClient(selectedClient.id);
          else await banClient(selectedClient.id);
          setOpenDialog(false);
          getAllClients().then(({ data }) => setClients(data));
        }}
        questionText={`Are you sure you wanna ${
          selectedClient.banned ? "remove ban from" : "ban"
        } ${selectedClient.fullName}`}
      />
    </div>
  );
}
