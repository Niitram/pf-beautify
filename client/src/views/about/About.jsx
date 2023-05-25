import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.Container}>
      <div className={styles.QuienesSomos}>
        <h1>about us?</h1>
        <p>
          In <strong>Beautify</strong>, we are a company dedicated to offering
          high-quality beauty products and services. We take pride in being a
          reference in the cosmetics industry, providing our customers with a
          wide range of products and services that help enhance their beauty and
          confidence. Our mission is to provide innovative and effective beauty
          solutions that meet the individual needs of each customer. We are
          committed to carefully selecting the best products in the market,
          working with recognized brands and quality formulations to ensure
          exceptional results.
        </p>
      </div>
    </div>
  );
}

export default About;
