function getProductsCategorie(products, category) {
    const filteredProducts = products.filter(product => product.category == category);
    return filteredProducts;
}

export default getProductsCategorie;