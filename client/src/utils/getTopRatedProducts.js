function getTopRatedProducts(products) {
    let topRatedProducts = []
    const sortedProducts = products.sort((a, b) => b.rate - a.rate);
    if (sortedProducts.length >= 5) {
        console.log(sortedProducts);
        topRatedProducts = sortedProducts.slice(0, 5);
    } else {
        topRatedProducts = sortedProducts
    }
    return topRatedProducts;
}

export default getTopRatedProducts;