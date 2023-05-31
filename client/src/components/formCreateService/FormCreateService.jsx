import { useState } from "react";
import styles from "./FormCreateService.module.css";
import ErrorInputMessage from "../errorInputMessage/ErrorInputMessage";
import InputImage from "../inputImage/inputImage";
import DragImageServices from "../dragImageServices/DragImageServices";
import cameraIcon from "../../assets/images/camera-icon.png";
import validateCreateService from "../../utils/validateCreateService";

export default function FormCreateService({
  creationInfo,
  setCreationInfo,
  errors,
  setErrors,
}) {
  const handleChange = (e) => {
    e.preventDefault();
    const property = e.target.name;
    const value = e.target.value;
    setCreationInfo({ ...creationInfo, [property]: value });
    validateCreateService({ ...creationInfo, [property]: value }, setErrors);
  };

  return (
    <div className={styles.container}>
      <form className={styles.containerForm}>
        <input
          type="text"
          name="name"
          value={creationInfo?.name}
          placeholder="Service name"
          onChange={(e) => handleChange(e)}
          className={styles.inputTexto}
        ></input>
        <ErrorInputMessage errors={errors?.name} text={errors?.name} />
        <textarea
          name="description"
          value={creationInfo?.description}
          placeholder="Add a description to the service"
          onChange={(e) => handleChange(e)}
          className={styles.textArea}
        ></textarea>
        <ErrorInputMessage
          errors={errors?.description}
          text={errors?.description}
        />
        <input
          type="number"
          name="price"
          value={creationInfo?.price}
          onChange={(e) => handleChange(e)}
          min={1}
          className={styles.inputNumber}
          placeholder="price"
        ></input>
        <ErrorInputMessage errors={errors?.price} text={errors?.price} />
        <input
          type="number"
          name="duration"
          value={creationInfo?.duration}
          onChange={(e) => handleChange(e)}
          min={1}
          className={styles.inputNumber}
          placeholder="Duration"
        ></input>
        <ErrorInputMessage errors={errors?.duration} text={errors?.duration} />
        {/* <InputImage
                name='image'
                setProductData={setCreationInfo}
                productData={creationInfo}
                setErrors={setErrors}
                /> */}
      </form>
      <div>
        <DragImageServices
          creationInfo={creationInfo}
          errors={errors}
          cameraIcon={cameraIcon}
          setCreationInfo={setCreationInfo}
          setErrors={setErrors}
        />
        <ErrorInputMessage
          errors={errors?.imageService}
          text={errors?.imageService && "Image Required"}
        />
      </div>
    </div>
  );
}
