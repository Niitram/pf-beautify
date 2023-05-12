const handlerChange = (e, setSearched) => {
    e.preventDefault()
    setSearched(e.target.value)
}

export default handlerChange;