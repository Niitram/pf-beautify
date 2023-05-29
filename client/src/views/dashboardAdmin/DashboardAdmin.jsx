import { useState, useEffect } from "react";
import styles from "./DashboardAdmin.module.css";
import CardChart from "../../components/dashboard/CardChart";
import RatingProducts from "../../components/dashboard/RatingProducts";
//import { SidebarAdmin } from "../../components/dashboard/SidebarAdmin";
//import {ViewProfesional} from '../../components/dashboard/ViewProfesional'
import { NavAdmin } from "../../components/dashboard/NavAdmin";
import { Resumen } from "../../components/dashboard/Resumen";
import FooterAll from "../../components/footerAll/FooterAll";
import {
  getProductosMinMaxPrecio,
  getStaticsAppointments,
  getProductsByCategories,
} from "../../request/homeDashboard";

const DashboardAdmin = () => {
  const [staticProducts, setStaticProducts] = useState({});
  const [staticAppointments, setStaticAppointments] = useState({});
  const [staticProductCategories, setStaticProductCategories] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await getProductosMinMaxPrecio();
      setStaticProducts(resultado);

      const appointmentsResult = await getStaticsAppointments();
      console.log(appointmentsResult);
      setStaticAppointments(appointmentsResult);

      const productCategoriesResult = await getProductsByCategories();
      setStaticProductCategories(productCategoriesResult);
    };

    fetchData();
  }, []);

  const labelProducts = Object.keys(staticProducts);
  const dataProducts = Object.values(staticProducts);

  const labelAppointments = staticAppointments
    ? Object.keys(staticAppointments)
    : [];

  const dataAppointments = Object.values(staticAppointments);

  const labelProductCategories = Object.keys(staticProductCategories);
  const dataProductCategories = Object.values(staticProductCategories);
  return (
    <div className={styles.admin_container}>
      <NavAdmin />
      <Resumen />
      <div className={styles.rating}>
        <div>
          <RatingProducts />
        </div>

        <div className={styles.statics}>
          {" "}
          <CardChart
            title="Statics Products"
            labels={labelProducts}
            data={dataProducts}
          />{" "}
        </div>
        <div className={styles.statics}>
          <CardChart
            title="Appointment Statistics"
            labels={labelAppointments}
            data={dataAppointments}
          />
        </div>
        <div className={styles.statics}>
          <CardChart
            title="Product Categories"
            labels={labelProductCategories}
            data={dataProductCategories}
          />
        </div>
      </div>
      <br />
      <div className={styles.footeradmin}>
        <FooterAll />
      </div>
    </div>
  );
};
export default DashboardAdmin;
