function getTopRatedProducts(products) {
    let topRatedProducts = []
    const sortedProducts = products.sort((a, b) => b.rate - a.rate);
    if (sortedProducts.length >= 5) {
        topRatedProducts = sortedProducts.slice(0, 5);
    }
    return topRatedProducts;
}

export default getTopRatedProducts;