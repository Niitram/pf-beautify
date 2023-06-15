import { useEffect } from "react";
import { uploadServicePhoto } from "../../utils/firebaseConfig";
import style from "./DragImageServices.module.css";

const DragImageService = ({
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
    uploadServicePhoto(archivo, setCreationInfo, creationInfo, setErrors);
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
        <img  className={style.imagen} src={creationInfo?.imageService ? creationInfo?.imageService : cameraIcon} />
    </div>
  );
};
export default DragImageService;
