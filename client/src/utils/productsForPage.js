//recibe un array y lo divide en subarrays de 8 elementos
const productsForPage = (arr) => {
    const subArrays = []
    for (let i = 0; i < arr.length; i += 8) {
        const aux = arr.slice(i, i + 8);
        subArrays.push(aux);
    }
    return subArrays
}

export default productsForPage