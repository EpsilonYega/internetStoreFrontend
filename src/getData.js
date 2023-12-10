async function getProductList() {
    let response = await fetch('http://localhost:8080/products')
    let json_data = await response.json()
    console.log(json_data)
    return json_data
}