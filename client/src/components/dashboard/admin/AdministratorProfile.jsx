// import React from 'react';
import styles from './AdministratorProfile.module.css';

export default function AdministratorProfile() {

  return (
    <div className={styles.profile}>
  <h2>Administrator</h2>
  <div className={styles.img_profile}>
    <img src="https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=250" alt="Imagen de perfil" />
  </div>
  <div className={styles.content}>
  <div className={styles.info}>
    <span className={styles.label}>Email:</span>
    <span>correo@example.com</span>
  </div>
  <div className={styles.info}>
    <span className={styles.label}>Phone:</span>
    <span>123-456-7890</span> 
  </div>
  <div className={styles.info}>
    <span className={styles.label}>Password:</span>
    <span>*******</span> 
  </div>
</div>
</div>

  );
}