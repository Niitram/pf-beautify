import { useEffect, useState } from 'react'
import styles from './FormCreateProfessional.module.css'
import handleInputChange from '../../handlers/handleInputChange'
import ErrorInputMessage from '../errorInputMessage/ErrorInputMessage'
import InputImage from '../inputImage/inputImage'
import DragImage from '../dragImage/DragImage'
import cameraIcon from '../../assets/images/camera-icon.png'
import validateCreateProfessional from '../../utils/validateCreateProfessional'
import { createProfessional } from '../../request/professionals'
import { getServices } from '../../request/services'
import DragImageProfessional from '../dragImageProfessional/DragImageProfessional'

export default function FormCreateProfessional({creationInfo,setCreationInfo,errors,setErrors}){


    const handleChange = (e)=>{
        e.preventDefault()
        const property = e.target.name
        const value = e.target.value
        setCreationInfo({...creationInfo,[property]:value})
        validateCreateProfessional({...creationInfo,[property]:value},setErrors)
    }



    return(
        <div className={styles.container}>
            <div className={styles.dataContainer}>
            <form className={styles.containerForm}
                onSubmit={(e)=>{handleSubmit(e)}}
            >

                <input
                    type='text'
                    name='fullname'
                    value={creationInfo?.fullname}
                    placeholder='Full name'
                    onChange={(e)=>handleChange(e)}
                    className={styles.inputTexto}

                >
                </input>
                    <ErrorInputMessage errors={errors?.fullname} text={errors?.fullname}/>
                <input
                    type='text'
                    name='direction'
                    value={creationInfo?.direction}
                    placeholder='Address'
                    onChange={(e)=>handleChange(e)}
                    className={styles.inputTexto}

                >
                </input>
                    <ErrorInputMessage errors={errors?.direction} text={errors?.direction}/>
                <input
                    type='text'
                    name='mail'
                    value={creationInfo?.mail}
                    placeholder='Email'
                    onChange={(e)=>handleChange(e)}
                    className={styles.inputTexto}

                >
                </input>
                    <ErrorInputMessage errors={errors?.mail} text={errors?.mail}/>
                <InputImage
                    name='imageProfessional'
                    setProductData={setCreationInfo}
                    productData={creationInfo}
                    setErrors={setErrors}
                />
                    <ErrorInputMessage errors={errors?.imageProfessional} text={errors?.imageProfessional} />
            </form>
                </div>
            <div className={styles.preview}>
                <DragImageProfessional
                    creationInfo={creationInfo}
                    errors={errors}
                    cameraIcon={cameraIcon}
                    setCreationInfo={setCreationInfo}
                    setErrors={setErrors}
                />
            </div>
        </div>
    )
}