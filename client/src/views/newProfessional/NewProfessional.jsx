import FormCreateProfessional from "../../components/FormCreateProfessional/FormCreateProfessional";
import FormCreateService from "../../components/formCreateService/FormCreateService";
import styles from "./NewProfessional.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showError } from "../../redux/actions";
import { createProfessional } from "../../request/professionals";

export default function NewProfessional() {
  const dispatch = useDispatch();
  const [creationInfo, setCreationInfo] = useState({
    fullname: "",
    mail: "",
    direction: "",
    imageProfessional: "",
    name: "",
    description: "",
    price: "",
    imageService: "",
    duration: "",
  });

  const [errors, setErrors] = useState({
    fullname: "*",
    mail: "*",
    direction: "*",
    imageProfessional: "*",
    name: "*",
    description: "*",
    price: "*",
    imageService: "*",
    duration: "*",
  });

  const handleClickSubmit = (e) => {
    e.preventDefault();
    if (
      errors.fullname === "" ||
      errors.mail === "" ||
      errors.direction === "" ||
      errors.imageProfessional === "" ||
      errors.name === "" ||
      errors.description === "" ||
      errors.price === "" ||
      errors.imageService === "" ||
      errors.duration === ""
    ) {
      const aux = {
        fullname: creationInfo.fullname,
        mail: creationInfo.mail,
        direction: creationInfo.direction,
        image: creationInfo.imageProfessional,
        service: {
          name: creationInfo.name,
          description: creationInfo.description,
          price: Number(creationInfo.price),
          image: creationInfo.imageService,
          duration: creationInfo.duration,
        },
      };
      // console.log(aux);
      createProfessional(aux);
    } else {
      dispatch(
        showError({
          tittle: "Error",
          message: "check the inputs and their values",
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <FormCreateProfessional
        creationInfo={creationInfo}
        setCreationInfo={setCreationInfo}
        errors={errors}
        setErrors={setErrors}
      />
      <FormCreateService
        creationInfo={creationInfo}
        setCreationInfo={setCreationInfo}
        errors={errors}
        setErrors={setErrors}
      />
      <button type="submit" onClick={(e) => handleClickSubmit(e)}>
        submit
      </button>
    </div>
  );
}
