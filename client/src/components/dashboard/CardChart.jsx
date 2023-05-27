import  { useRef, useEffect,useMemo } from "react";
import Chart from "chart.js/auto";
import styles from "./CardChart.module.css";
//! debo usar este componente para mostrar cantidad de servicios contratados, total de ventas , 3 productos mas vendidos
export default function CardChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fechaActual = useMemo(() => new Date(), []);
  const opcionesFecha = { month: "short", day: "numeric", year: "numeric" };
  const diaActual = fechaActual.toLocaleDateString("en-US", opcionesFecha);

  const labels = useMemo(() => {
    // Cálculo de las etiquetas de los meses
    const mesActual = fechaActual.getMonth(); // Mes actual (0-11)
    const mesAnterior = (mesActual === 0) ? 11 : mesActual - 1; // Mes anterior
    const dosMesesAntes = (mesAnterior === 0) ? 11 : mesAnterior - 1; // Dos meses antes
  
    return [
      obtenerNombreMes(dosMesesAntes),
      obtenerNombreMes(mesAnterior),
      obtenerNombreMes(mesActual)
    ];
  }, []);

  function obtenerNombreMes(mes) {
    const opcionesMes = { month: "short" };
    const fecha = new Date();
    fecha.setMonth(mes);
    return fecha.toLocaleDateString("en-US", opcionesMes);
  }

  useEffect(() => {
    const chartElement = chartRef.current;
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Clients",
          data: [0, 0, 8],// !crear un action para traer los valores mes actual y 2 meses anteriores
          backgroundColor: "#f5b7",
          borderColor: "#f5b7",
          borderWidth: 1,
        },
      ],
    };

    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destruye el gráfico existente si hay uno
    }

    chartInstance.current = new Chart(chartElement, {
      type: "line",//!usar prop type
      data: chartData,
    });
  }, [labels]);

  return (
    <div className={styles.card_dashboard}>
      <div className={styles.card_title}>
        <h4>Registered Customers</h4>{/*!usar prop title*/}
      </div>
      <div className={styles.date}>
        <h5>{diaActual}</h5>
      </div>
      <div className={styles.cantidad}>
        <h1>8</h1>{/*! crear el action que me trae el numero de clientes*/}
        <h2>Total</h2>
      </div>
      <div className={styles.chart}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
