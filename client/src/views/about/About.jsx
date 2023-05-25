import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.Container}>
      <div className={styles.QuienesSomos}>
        <p>About us</p>
        <p>
          {" "}
          Beautify is a platform that connects millions of clients, both men and
          women, in order to provide the best attention in the distribution and
          provision of services related to manicure and female personal care.
        </p>
      </div>
    </div>
  );
}

export default About;
