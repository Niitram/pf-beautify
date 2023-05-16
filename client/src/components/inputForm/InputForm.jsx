import styles from "./InputForm.module.css";
function InputForm(props) {
  const { value, handler, ...inputAttributes } = props;
  return (
    <input
      className={styles.inputform}
      {...inputAttributes}
      value={value}
      min={0}
      onChange={(e) => {
        handler(e);
      }}
    />
  );
}

export default InputForm;
