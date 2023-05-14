function InputForm(props) {
  const { value, handler, ...inputAttributes } = props;
  return (
    <input
      {...inputAttributes}
      value={value}
      onChange={(e) => {
        handler(e);
      }}
    />
  );
}

export default InputForm;
