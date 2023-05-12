import styles from './PromoCard.module.css'

export default function PromoCard ({image,id,name}){
    return (
        <div className={styles.Container}>
            <img src={image} alt={name}/>
            {/* <p>{name}</p> */}
        </div>
    )
}