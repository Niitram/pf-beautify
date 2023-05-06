function Card({image,price,name,rate}) {
    return (
        <>
            <img src={image} alt={name} />
            <span>{name}</span>
            <span>{rate}</span>
            <span>${price}</span>
        </>
    )
}

export default Card