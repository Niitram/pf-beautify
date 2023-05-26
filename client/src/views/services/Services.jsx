import Calendar from "../../components/calendar/Calendar";
import styles from "./Services.module.css";
import imgLogo from "../../assets/images/logo-beautify-1063x1063.png";
import { Divider } from "@mui/material";

function Services() {
  return (
    <section className={styles.section}>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        laudantium. Magnam delectus deserunt qui aspernatur expedita soluta
        tenetur, necessitatibus sint suscipit nobis minima architecto
        praesentium iste cumque! Similique quo facilis, quia ipsam quae quisquam
        tenetur? Quos at distinctio consequuntur saepe vel quae voluptates
        debitis modi totam nobis aliquam neque, tenetur sunt id ut laboriosam
        architecto error possimus labore quidem iste laborum necessitatibus
        vitae explicabo? Deserunt molestiae ducimus sapiente nulla quam dolor
        quaerat a soluta facere rem id, labore sit impedit, quae, quisquam velit
        cumque esse dolorem. Nihil, quidem. Sequi, ipsam impedit quas labore
        quod nulla deleniti animi consectetur commodi. Culpa voluptatibus dicta
        ducimus qui, inventore eligendi ipsum, dolore, quia libero nulla neque.
        Inventore natus sit eaque! Aut aperiam sed sit.
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        laudantium. Magnam delectus deserunt qui aspernatur expedita soluta
        tenetur, necessitatibus sint suscipit nobis minima architecto
        praesentium iste cumque! Similique quo facilis, quia ipsam quae quisquam
        tenetur? Quos at distinctio consequuntur saepe vel quae voluptates
        debitis modi totam nobis aliquam neque, tenetur sunt id ut laboriosam
        architecto error possimus labore quidem iste laborum necessitatibus
        vitae explicabo? Deserunt molestiae ducimus sapiente nulla quam dolor
        quaerat a soluta facere rem id, labore sit impedit, quae, quisquam velit
        cumque esse dolorem. Nihil, quidem. Sequi, ipsam impedit quas labore
        quod nulla deleniti animi consectetur commodi. Culpa voluptatibus dicta
        ducimus qui, inventore eligendi ipsum, dolore, quia libero nulla neque.
        Inventore natus sit eaque! Aut aperiam sed sit.
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        laudantium. Magnam delectus deserunt qui aspernatur expedita soluta
        tenetur, necessitatibus sint suscipit nobis minima architecto
        praesentium iste cumque! Similique quo facilis, quia ipsam quae quisquam
        tenetur? Quos at distinctio consequuntur saepe vel quae voluptates
        debitis modi totam nobis aliquam neque, tenetur sunt id ut laboriosam
        architecto error possimus labore quidem iste laborum necessitatibus
        vitae explicabo? Deserunt molestiae ducimus sapiente nulla quam dolor
        quaerat a soluta facere rem id, labore sit impedit, quae, quisquam velit
        cumque esse dolorem. Nihil, quidem. Sequi, ipsam impedit quas labore
        quod nulla deleniti animi consectetur commodi. Culpa voluptatibus dicta
        ducimus qui, inventore eligendi ipsum, dolore, quia libero nulla neque.
        Inventore natus sit eaque! Aut aperiam sed sit.
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        laudantium. Magnam delectus deserunt qui aspernatur expedita soluta
        tenetur, necessitatibus sint suscipit nobis minima architecto
        praesentium iste cumque! Similique quo facilis, quia ipsam quae quisquam
        tenetur? Quos at distinctio consequuntur saepe vel quae voluptates
        debitis modi totam nobis aliquam neque, tenetur sunt id ut laboriosam
        architecto error possimus labore quidem iste laborum necessitatibus
        vitae explicabo? Deserunt molestiae ducimus sapiente nulla quam dolor
        quaerat a soluta facere rem id, labore sit impedit, quae, quisquam velit
        cumque esse dolorem. Nihil, quidem. Sequi, ipsam impedit quas labore
        quod nulla deleniti animi consectetur commodi. Culpa voluptatibus dicta
        ducimus qui, inventore eligendi ipsum, dolore, quia libero nulla neque.
        Inventore natus sit eaque! Aut aperiam sed sit.
      </div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima,
        laudantium. Magnam delectus deserunt qui aspernatur expedita soluta
        tenetur, necessitatibus sint suscipit nobis minima architecto
        praesentium iste cumque! Similique quo facilis, quia ipsam quae quisquam
        tenetur? Quos at distinctio consequuntur saepe vel quae voluptates
        debitis modi totam nobis aliquam neque, tenetur sunt id ut laboriosam
        architecto error possimus labore quidem iste laborum necessitatibus
        vitae explicabo? Deserunt molestiae ducimus sapiente nulla quam dolor
        quaerat a soluta facere rem id, labore sit impedit, quae, quisquam velit
        cumque esse dolorem. Nihil, quidem. Sequi, ipsam impedit quas labore
        quod nulla deleniti animi consectetur commodi. Culpa voluptatibus dicta
        ducimus qui, inventore eligendi ipsum, dolore, quia libero nulla neque.
        Inventore natus sit eaque! Aut aperiam sed sit.
      </div>
      <Divider sx={{ mt: 5 }} />
      <div className={styles.imageFixed}>
        <img className={styles.image} src={imgLogo} alt="Logo Beautify" />
      </div>
      <Divider sx={{ mb: 5 }} />
      <h3 className={styles.titleH3}>Make your reservation</h3>
      <Calendar />
    </section>
  );
}

export default Services;
