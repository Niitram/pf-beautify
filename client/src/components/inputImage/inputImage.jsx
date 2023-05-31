import { upload } from "../../utils/firebaseConfig";
import style from "./inputImage.module.css";

const InputImage = ({ setProductData, productData, setErrors }) => {
  const handleChange = (event) => {
    // identifica el archivo
    const archivo = event.target.files[0];
    upload(archivo, setProductData, productData, setErrors);
  };

  return (
    <div>
      <input className={style.file}type="file" onChange={handleChange} />
    </div>
  );
};

export default InputImage;
