import styles from "./About.module.css";
import Footer from "../../components/footerAll/FooterAll";

function About() {
  return (
    <div className={styles.Container}>
      <div className={styles.QuienesSomos}>
        <p>¿Quiénes somos?</p>
        <p>
          {" "}
          es una plataforma que conecta millones de clientes y clientas con el
          fin de otorgar la mejor atencion en distribucion y prestacion de
          servicios referentes a manicura y cuidado personal femenino.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default About;
