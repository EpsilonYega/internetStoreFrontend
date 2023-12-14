async function externalFetch({ url, method, headers, body, credentials, mode }) {
  const fetchOptions = { method, headers, credentials, body: JSON.stringify(body), mode }

  try {
      return await fetch(url, fetchOptions).then(async (response) => ({ status: response.status, message: await response.text() }))
  }
  catch(error) {
      console.log(error)
      throw new Error("Internal server error")
  }
}

function internalFetch() {
  async function get({ credentials, headers, url }) {
      const externalFetchOptions = {
          credentials: credentials,
          headers: headers,
          method: "GET",
          url: url
      }

      try {
          return await externalFetch(externalFetchOptions)
      }
      catch(error) {
          return { status: 500, message: "Internal server error" }
      }
  }

  async function post({ credentials, headers, body, url }) {
      const externalFetchOptions = {
          credentials: credentials,
          headers: headers,
          method: "POST",
          body: body,
          url: url
      }

      try {
          return await externalFetch(externalFetchOptions)
      }
      catch(error) {
          return { status: 500, message: "Internal server error" }
      }
  }

  async function del({ credentials, headers, body, url }) {
      const externalFetchOptions = {
          credentials: credentials,
          headers: headers,
          method: "DELETE",
          mode: "no-cors",
          body: body,
          url: url,
      }

      try {
          return await externalFetch(externalFetchOptions)
      }
      catch(error) {
          return { status: 500, message: "Internal server error" }
      }
  }

  return { get, post, del }
}

function getJwtToken() {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === "jwtToken") {
      return cookie[1];
    }
  }
  return null;
}

function increaseQuantity() {
  let quantity = parseInt(document.querySelector('.product p:last-child').textContent.split(":")[1]);
  quantity += 1;
  document.querySelector('.product p:last-child').textContent = "Quantity: " + quantity;
}

// Добавление склада
async function addStore() {

    let storeName = document.getElementById("store-name-input").value; 
 
    let request = internalFetch() 
    let token = getJwtToken() 
 
    let response = await request.post({  
      url: `http://localhost:8080/admin/warehouses/new`, 
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }, 
      body: { 
        warehouseAddress: storeName 
      }, 
      credentials: "same-origin" 
    }) 

    //TODO: проверка на статус
   
    document.getElementById("store-id-input").value = ""; 
    document.getElementById("store-name-input").value = ""; 
  }

  async function updateStore() {

    let storeId = document.getElementById("store-id-input").value;
    let storeName = document.getElementById("store-name-input").value;

    let request = internalFetch() 
    let token = getJwtToken() 

    let response = await request.post({  
      url: `http://localhost:8080/admin/warehouses/update/${storeId}`, 
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }, 
      body: { 
        warehouseAddress: storeName 
      }, 
      credentials: "same-origin" 
    }) 

    document.getElementById("store-id-input").value = ""; 
    document.getElementById("store-name-input").value = ""; 
  }
  
  // Удаление склада
  async function deleteStore() {

    let storeId = document.getElementById("store-id-input").value;

    let request = internalFetch() 
    let token = getJwtToken() 

    let response = await request.post({  
      url: `http://localhost:8080/admin/warehouses/drop/${storeId}`, 
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }, 
      body: {

      },
      credentials: "same-origin" 
    }) 

    document.getElementById("store-id-input").value = ""; 
  }
  
  // Поиск склада по ID
  async function searchStore() {
    
    let storeId = document.getElementById("store-id-input").value;
  
    let request = internalFetch() 
    let token = getJwtToken() 

    let response = await request.get({  
      url: `http://localhost:8080/admin/warehouses/${storeId}`, 
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }, 
      credentials: "same-origin" 
    })
    console.log(JSON.parse(response.message))

    document.getElementById("store-id-input").value = ""; 
  }
  
  // Добавление товара
  async function addProduct() {
    var productName = document.getElementById("product-name-input").value;
    var productCategory = document.getElementById("product-category-input").value;
    var productCharacteristics = document.getElementById("product-characteristics-input").value.split(", ");
    var productStorageId = document.getElementById("product-storage-id-input").value;
  
    let request = internalFetch() 
    let token = getJwtToken() 
 
    let response = await request.post({  
      url: `http://localhost:8080/admin/products/new`, 
      headers: {  
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }, 
      body: { 
        productname: productName, 
        img: "Gold.jpg",
        category: productCategory, 
        characteristicsList: productCharacteristics,
        warehouseId: productStorageId, 
        price: 41399
    }, 
      credentials: "same-origin" 
    })
  
    document.getElementById("product-id-input").value = "";
    document.getElementById("product-name-input").value = "";
    document.getElementById("product-category-input").value = "";
    document.getElementById("product-characteristics-input").value = "";
    document.getElementById("product-storage-id-input").value = "";
  }

  async function updateProduct() {
    deleteProduct()
    addProduct()
  }
  
  // Удаление товара
  async function deleteProduct() {
    var productId = document.getElementById("product-id-input").value;
  
    var productList = document.getElementById("product-list");
    var products = productList.getElementsByTagName("li");
  
    for (var i = 0; i < products.length; i++) {
      if (products[i].innerHTML.includes("ID: " + productId)) {
        productList.removeChild(products[i]);
        break;
      }
    }
  
    document.getElementById("product-id-input").value = ""
}
    