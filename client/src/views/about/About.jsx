import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.Container}>
      <div className={styles.QuienesSomos}>
        <h1>¿Quiénes somos?</h1>
        <p>
          En <strong>Beautify</strong>, somos una empresa dedicada a ofrecer
          productos y servicios de belleza de alta calidad. Nos enorgullece ser
          un referente en la industria de los cosméticos, brindando a nuestros
          clientes una amplia gama de productos y servicios que les ayudan a
          realzar su belleza y confianza. Nuestra misión es proporcionar
          soluciones de belleza innovadoras y efectivas que satisfagan las
          necesidades individuales de cada cliente. Nos comprometemos a
          seleccionar cuidadosamente los mejores productos del mercado,
          trabajando con marcas reconocidas y formulaciones de calidad para
          asegurar resultados excepcionales.
        </p>
      </div>
    </div>
  );
}

export default About;
