function comparePrice(productPrice, price) {
    const minPrice = price[0];
    const maxPrice = price[1];
    if ((productPrice <= maxPrice) && (productPrice >= minPrice)) return true;
    return false;
}


export default comparePrice;