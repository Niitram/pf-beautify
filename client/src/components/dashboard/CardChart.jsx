import  { useRef, useEffect,useMemo } from "react";
import Chart from "chart.js/auto";
import styles from "./CardChart.module.css";


export default function CardChart({title,labels,data}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const fechaActual = useMemo(() => new Date(), []);
  const opcionesFecha = { month: "short", day: "numeric", year: "numeric" };
  const diaActual = fechaActual.toLocaleDateString("en-US", opcionesFecha);
  const etiquetas = labels;
  const datos = data;
  


  useEffect(() => {
    const chartElement = chartRef.current;
    const chartData = {
      labels: etiquetas,
      datasets: [
        {
          label:"quantity",
          data: datos,
          backgroundColor: ["#f5b7","#ff00c86c ","#ae00ff","#eeff0061","#ff080045","#48ff0092","#00b7ff8f","#1900ffe1","#ff0015","#FFA500","#ff7300"],
          borderColor: "#e704041f",
          borderWidth: 1,
        },
      ],
    };

    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destruye el gráfico existente si hay uno
    }

    chartInstance.current = new Chart(chartElement, {
      type:"bar",
      data: chartData,
    });
  }, [datos,etiquetas]);

  return (
    <div className={styles.card_dashboard}>
      <div className={styles.card_title}>
        <h4>{title}</h4>
        <h5>{diaActual}</h5>
      </div>
      
      <div className={styles.chart}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
