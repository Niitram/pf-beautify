import  { useState } from "react";
import { FaBars, FaCubes, FaClipboardList, FaBoxes, FaTasks, FaPlus, FaSignOutAlt, FaUserTie } from "react-icons/fa";
import styles from "./SidebarAdmin.module.css";

export const SidebarAdmin = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles["dropdown-menu"]} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styles["dropdown-toggle"]}>
        <FaBars className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Dashboard</span>
      </div>
     
      <div className={styles["links"]}>

        <FaCubes className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Products</span>
      </div>
      <div className={styles["links"]}>

        <FaClipboardList className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Orders</span>
      </div>
      <div className={styles["links"]}>

        <FaBoxes className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Stock</span>
      </div>
      <div className={styles["links"]}>

        <FaTasks className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Services</span>
      </div>
      <div className={styles["links"]}>

        <FaPlus className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Add Product</span>
      </div>
      <div className={styles["links"]}>

        <FaUserTie className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Profesional</span>
      </div>

      <div className={styles["logout-icon"]}>
        <FaSignOutAlt className={styles["icon-style"]} size={20} />
        <span className={isHovered ? styles["name-visible"] : styles["name-hidden"]}>Logout</span>
      </div>
    </div>
  );
};

