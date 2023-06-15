import { useEffect, useState } from "react";
import styles from "./ProductsTable.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { getProducts } from "../../request/product";
import { useNavigate } from "react-router-dom";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data));
  }, []);

  const rows = products.map((row) => {
    return {
      id: row.id,
      col1: row.id,
      col2: row.name,
      col3: `$${row.price}`,
      col4: row.discount ? `${row.discount.toFixed(2)}` : "none",
      col5: row.rate.toFixed(2),
      col6: row.stock,
      // col7:
    };
  });

  const goToDetail = (e) => {
    navigate(`/dashboardAdmin/products_control/${e.id}`);
  };

  const column = [
    { field: "col1", headerName: "id", width: 100 },
    { field: "col2", headerName: "name", width: 300 },
    { field: "col3", headerName: "price", width: 150 },
    { field: "col4", headerName: "discount", width: 200 },
    { field: "col5", headerName: "rate", width: 120 },
    { field: "col6", headerName: "stock", width: 130 },
  ];

  return (
    <div className={styles.container}>
      <DataGrid
        columns={column}
        rows={rows}
        checkboxSelection={true}
        onCellClick={(e) => goToDetail(e)}
      />
    </div>
  );
}
