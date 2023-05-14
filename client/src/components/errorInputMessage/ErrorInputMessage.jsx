import styles from "./ErrorInputMessage.module.css";

function ErrorInputMessage({ errors, text }) {
  return (
    <div className={styles.container}>
      {errors ? <div className={styles.message}>{text}</div> : <div></div>}
    </div>
  );
}

export default ErrorInputMessage;
