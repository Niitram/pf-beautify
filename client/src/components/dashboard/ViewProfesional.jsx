// import React from "react";
import { FaTrash } from "react-icons/fa";

import styles from "./ViewProfesional.module.css";

export  function ViewProfesional() {
  const profesionales = [
    { id: 1,imagen:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", nombre: 'jose garzon',servicio:"tratamiento para el cabello"  },
    { id: 2,imagen:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", nombre: 'jose garzon', servicio:"tratamiento para el cabello",},
    { id: 3,imagen:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", nombre: 'jose garzon', servicio:"tratamiento para el cabello"},
    { id: 4,imagen:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", nombre: 'jose garzon', servicio: "tratamiento para el cabello"},
    { id: 5,imagen:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600", nombre: 'jose garzon', servicio:"tratamiento para el cabello" },
   
  ];

  return (
    <div className={styles.lista_profesionales}>
      <div className={styles.title}>
        <div>
        <h3>Profesionals</h3>
        </div>
       
      </div>
{profesionales.map(profesional=>(
  <div className={styles.profesional} key={profesional.id}>
    <div className={styles.div_profesionalImg}>
    <img src={profesional.imagen} alt="profesional"/>
    </div>
      
      <div className={styles.profesional_text}>
        <div>
<div>
<h4>{profesional.nombre}</h4>
        <span>{profesional.servicio}</span>
</div>
       
        </div>
      </div>
      <button>
  <FaTrash />
</button>

   </div>
))}
    
    </div>
  );
}


