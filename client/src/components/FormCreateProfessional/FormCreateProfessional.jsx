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

export default function FormCreateProfessional(){

    const [professionalInfo,setProfessionalInfo] = useState({
        fullname:'',
        mail:'',
        direction:'',
        image:'',
        // services:''
    })

    const [errors,setErrors] = useState({
        fullname:'*',
        mail:'*',
        direction:'*',
        image:'*'
    })

    // const [servicios,setServicios] = useState([])

    useEffect(()=>{
        getServices()
        .then(({data})=>setServices(data))
    },[])

    // const handleServices = (e)=>{
    //     e.preventDefault()
    //     const value = e.target.value
    //     setProfessionalInfo({...professionalInfo,})
    // }

    const handleChange = (e)=>{
        e.preventDefault()
        const property = e.target.name
        const value = e.target.value
        setProfessionalInfo({...professionalInfo,[property]:value})
        validateCreateProfessional({...professionalInfo,[property]:value},setErrors)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // if(errors.fullname !== )
        createProfessional(professionalInfo)
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
                    value={professionalInfo.fullname}
                    placeholder='Full name'
                    onChange={(e)=>handleChange(e)}
                >
                </input>
                    <ErrorInputMessage errors={errors.fullname} text={errors.fullname}/>
                <input
                    type='text'
                    name='direction'
                    value={professionalInfo.direction}
                    placeholder='Address'
                    onChange={(e)=>handleChange(e)}
                >
                </input>
                    <ErrorInputMessage errors={errors.direction} text={errors.direction}/>
                <input
                    type='text'
                    name='mail'
                    value={professionalInfo.mail}
                    placeholder='Email'
                    onChange={(e)=>handleChange(e)}
                >
                </input>
                    <ErrorInputMessage errors={errors.mail} text={errors.mail}/>
                <InputImage
                    name='image'
                    setProductData={setProfessionalInfo}
                    productData={professionalInfo}
                    setErrors={setErrors}
                />
                    <ErrorInputMessage errors={errors.image} text={errors.image} />

                {/* <select>
                    {servicios?.map((element)=>{
                        return(
                            <option value={element.id} onClick={(e)=>handleServices(e)}>{element.name} </option>
                        )
                    })}
                </select> */}


                <button type='submit' >Submit</button>
            </form>
                </div>
            <div className={styles.preview}>
                <DragImage
                    productData={professionalInfo}
                    errors={errors}
                    cameraIcon={cameraIcon}
                    setProductData={setProfessionalInfo}
                    setErrors={setErrors}
                />
            </div>
        </div>
    )
}