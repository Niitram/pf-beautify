import { useEffect } from "react";
import { uploadProfessionalPhoto } from "../../utils/firebaseConfig";
import style from "./DragImageProfessional.module.css";

const DragImageProfessional = ({
  creationInfo,
  errors,
  cameraIcon,
  setCreationInfo,
  setErrors,
}) => {
  useEffect(() => {
  }, [creationInfo]);
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const archivo = event.dataTransfer.files[0];
    uploadProfessionalPhoto(archivo, setCreationInfo, creationInfo, setErrors);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <div
      onDrop={(event) => handleDrop(event)}
      onDragOver={(e) => handleDragOver(e)}
      className={style.containerImg}
    >
        <img  className={style.imagen} src={creationInfo?.imageProfessional ? creationInfo?.imageProfessional : cameraIcon} />
    </div>
  );
};
export default DragImageProfessional;
