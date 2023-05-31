import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./Resumen.module.css";
import { rgbToHex } from "@mui/system";
import {
  getTotalClientes,
  getTotalProductos,
  getTotalServices,
  getTotalAppointments,
  getTotalProfesionales,
} from "../../request/homeDashboard/";
import logo from "../../assets/images/logo-beautify-500x500.png";
export const Resumen = () => {
  const colorRgb = "#030a10";
  const [numClientes, setNumClientes] = useState(0);
  const [numProductos, setNumProductos] = useState(0);
  const [numServices, setNumServices] = useState(0);
  const [numAppointments, setNumAppointments] = useState(0);
  const [numProfesionals, setNumProfesionals] = useState(0);

  useEffect(() => {
    const fetchTotalClientes = async () => {
      try {
        const totalClientes = await getTotalClientes();
        setNumClientes(totalClientes);
      } catch (error) {
        console.error("Error al obtener el total de clientes:", error);
      }
    };

    const fetchTotalProductos = async () => {
      try {
        const totalProductos = await getTotalProductos();
        setNumProductos(totalProductos);
      } catch (error) {
        console.error("Error al obtener el total de productos:", error);
      }
    };

    const fetchTotalServices = async () => {
      try {
        const totalServices = await getTotalServices();
        setNumServices(totalServices);
      } catch (error) {
        console.error("Error al obtener el total de servicios:", error);
      }
    };
    const fetchTotalAppointments = async () => {
      try {
        const totalAppointments = await getTotalAppointments();
        setNumAppointments(totalAppointments);
      } catch (error) {
        console.error("Error al obtener el total de productos:", error);
      }
    };
    const fetchTotalProfesionals = async () => {
      try {
        const totalProfesionals = await getTotalProfesionales();
        setNumProfesionals(totalProfesionals);
      } catch (error) {
        console.error("Error al obtener el total de productos:", error);
      }
    };

    fetchTotalClientes();
    fetchTotalProductos();
    fetchTotalServices();
    fetchTotalAppointments();
    fetchTotalProfesionals();
  }, []);

  return (
    <section className={styles.resumen_container}>
      <div className={styles.profile_admin}>
        <div>
          <img className={styles.logo} src={logo} />
        </div>
        <figure className={styles.figure}>
          <img
            src="https://media.istockphoto.com/id/1257734578/es/foto/colores-de-moda-de-esmaltes-de-u%C3%B1as-varios-tonos.jpg?s=612x612&w=0&k=20&c=eDRkLSCw1jC0UwMI-MTphbEv25G7f3Ugw4yAf2MwVwI="
            alt="profile"
          />
        </figure>
      </div>
      <div className={styles.details}>
        <div className={styles.content_details}>
          <Avatar sx={{ bgcolor: rgbToHex(colorRgb) }}>$</Avatar>
          <div className={styles.detailsDetails}>
            <h2>{numProfesionals}</h2>
            <span className={styles.nombreDetail}>Profesionals</span>
          </div>
        </div>
        <div className={styles.content_details}>
          <Avatar sx={{ bgcolor: rgbToHex(colorRgb) }}>C</Avatar>
          <div className={styles.detailsDetails}>
            <h2>{numClientes}</h2>
            <span className={styles.nombreDetail}>N° Clients</span>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.content_details}>
          <Avatar sx={{ bgcolor: rgbToHex(colorRgb) }}>P</Avatar>
          <div className={styles.detailsDetails}>
            <h2>{numProductos}</h2>
            <span className={styles.nombreDetail}>N° Products</span>
          </div>
        </div>
        <div className={styles.content_details}>
          <Avatar sx={{ bgcolor: rgbToHex(colorRgb) }}>S</Avatar>
          <div className={styles.detailsDetails}>
            <h2>{numServices}</h2>
            <span className={styles.nombreDetail}>N° Services</span>
          </div>
        </div>
        <div className={styles.content_details}>
          <Avatar sx={{ bgcolor: rgbToHex(colorRgb) }}>R</Avatar>
          <div className={styles.detailsDetails}>
            <h2>{numAppointments}</h2>
            <span className={styles.nombreDetail}>N° Appointments</span>
          </div>
        </div>
      </div>
    </section>
  );
};
