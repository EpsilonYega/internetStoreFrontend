function increaseQuantity() {
  let quantity = parseInt(document.querySelector('.product p:last-child').textContent.split(":")[1]);
  quantity += 1;
  document.querySelector('.product p:last-child').textContent = "Quantity: " + quantity;
}

// Добавление склада
function addStore() {
    var storeId = document.getElementById("store-id-input").value;
    var storeName = document.getElementById("store-name-input").value;
  
    var storeList = document.getElementById("store-list");
    var newStore = document.createElement("li");
    newStore.innerHTML = "ID: " + storeId + ", Название: " + storeName;
    storeList.appendChild(newStore);
  
    document.getElementById("store-id-input").value = "";
    document.getElementById("store-name-input").value = "";
  }

  function updateStore() {
    var storeId = document.getElementById("store-id-input").value;
    var storeName = document.getElementById("store-name-input").value;
  
    var storeList = document.getElementById("store-list");
    var stores = storeList.getElementsByTagName("li");
  
    for (var i = 0; i < stores.length; i++) {
      if (stores[i].innerHTML.includes("ID: " + storeId)) {
        storeList.removeChild(stores[i]);
        break;
      }
    }

    var storeList = document.getElementById("store-list");
    var newStore = document.createElement("li");
    newStore.innerHTML = "ID: " + storeId + ", Название: " + storeName;
    storeList.appendChild(newStore);
  }
  
  // Удаление склада
  function deleteStore() {
    var storeId = document.getElementById("store-id-input").value;
  
    var storeList = document.getElementById("store-list");
    var stores = storeList.getElementsByTagName("li");
  
    for (var i = 0; i < stores.length; i++) {
      if (stores[i].innerHTML.includes("ID: " + storeId)) {
        storeList.removeChild(stores[i]);
        break;
      }
    }
  
    document.getElementById("store-id-input").value = "";
  }
  
  // Поиск склада по ID
  function searchStore() {
    var storeId = document.getElementById("store-id-input").value;
  
    var storeList = document.getElementById("store-list");
    var stores = storeList.getElementsByTagName("li");
  
    for (var i = 0; i < stores.length; i++) {
      if (stores[i].innerHTML.includes("ID: " + storeId)) {
        alert("Склад найден:\n" + stores[i].innerHTML);
        break;
      }
    }
  
    document.getElementById("store-id-input").value = "";
  }
  
  // Добавление товара
  function addProduct() {
    var productId = document.getElementById("product-id-input").value;
    var productName = document.getElementById("product-name-input").value;
    var productCategory = document.getElementById("product-category-input").value;
    var productCharacteristics = document.getElementById("product-characteristics-input").value.split(", ");
    var productStorageId = document.getElementById("product-storage-id-input").value;
  
    var productList = document.getElementById("product-list");
    var newProduct = document.createElement("li");
    newProduct.innerHTML = "ID: " + productId + ", Название: " + productName + ", Категория: " + productCategory + ", Характеристики: " + productCharacteristics + ", ID склада: " + productStorageId;
    productList.appendChild(newProduct);
  
    document.getElementById("product-id-input").value = "";
    document.getElementById("product-name-input").value = "";
    document.getElementById("product-category-input").value = "";
    document.getElementById("product-characteristics-input").value = "";
    document.getElementById("product-storage-id-input").value = "";
  }

  function updateProduct() {
    deleteProduct()
    addProduct()
  }
  
  // Удаление товара
  function deleteProduct() {
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
    