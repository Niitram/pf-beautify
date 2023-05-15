import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../../utils/firebaseConfig";

const InputImage = ({
  setProductData,
  productData,
  validateCreateProduct,
  setErrors,
}) => {
  const storage = getStorage(firebaseApp);
  const handleChange = async (event) => {
    // identifica el archivo
    const archivo = event.target.files[0];
    // crea una referencia al archivo
    const archivoRef = ref(storage, `images/${archivo.name}`);
    // sube el archivo a esa referencia
    await uploadBytes(archivoRef, archivo);
    // devuelve la url del archivo
    const url = await getDownloadURL(archivoRef);

    setProductData({ ...productData, image: url });
    validateCreateProduct({ ...productData, image: url }, setErrors);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default InputImage;
