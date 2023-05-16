import { useEffect } from "react";
import { upload } from "../../utils/firebaseConfig";
import style from "./DragImage.module.css";

const DragImage = ({
  productData,
  errors,
  cameraIcon,
  setProductData,
  setErrors,
}) => {
  useEffect(() => {}, [errors]);
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const archivo = event.dataTransfer.files[0];
    upload(archivo, setProductData, productData, setErrors);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div
      onDrop={(event) => handleDrop(event)}
      onDragOver={(e) => handleDragOver(e)}
      style={{
        backgroundImage: `url(${
          productData.image.length > 1 && !errors.image
            ? productData.image
            : cameraIcon
        })`,
      }}
      className={style.containerImg}
    ></div>
  );
};
export default DragImage;
