import { useState } from "react";
import Paginations from "../../components/paginations/Paginations";

function Products() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section>
      <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </section>
  );
}

export default Products;
