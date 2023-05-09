// import { useState } from "react";
import styles from "./Home.module.css";
import Card from "../../components/card/Card";

function Home() {
  /*  const [value, setValue] = useState(3); */
  return (
    <div className={styles.home}>
      Home
      <Card
        image={
          "https://d3cdlnm7te7ky2.cloudfront.net/media/catalog/product/cache/mtools/300x300/catalog/product//F/M/FM16654BI20983_RV112487_SZ6.jpg"
        }
        price={45}
        name={"pepito"}
        rate={4.5}
      />
    </div>
  );
}

export default Home;
