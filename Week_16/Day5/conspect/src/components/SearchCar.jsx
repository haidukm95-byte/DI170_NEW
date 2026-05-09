const SearchCar = (props) => {
    // see App.js below
    const { listCars, handleChange } = props
    return (
        <select id="mySelect" onChange={handleChange}>
            <option value="...">...</option>
            {
                listCars.map(item => (
                    <option key={item.brand} value={item.brand}>{item.brand}</option>
                ))
            }
        </select>
    )
}

export default SearchCar;