function getTopRatedProducts(products) {
    let topRatedProducts = []
    const sortedProducts = products.sort((a, b) => {
        if (a.rate) {
            return b.rate - a.rate
        }
        if (a.rating) {
            return b.rating - a.rating
        }
    });
    if (sortedProducts.length >= 5) {
        topRatedProducts = sortedProducts.slice(0, 5);
    } else {
        topRatedProducts = sortedProducts
    }
    return topRatedProducts;
}

export default getTopRatedProducts;