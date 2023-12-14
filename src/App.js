import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import { useState, useEffect } from 'react';
import request from "./utils/request"
import token from "./utils/token"

export default function App() {
  const [orders, setOrders] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [items, setItems] = useState([])
  const [showFullItem, setShowFullItem] = useState(false)
  const [fullItem, setFullItem] = useState({})

  function onShowItem(item) {
    setFullItem(item)
    setShowFullItem(true)
  }

  function onHideItem(item) {
    setFullItem({})
    setShowFullItem(false)
  }

  function chooseCategory(category) {
    if (category === 'all'){
      return setCurrentItems(items)
    }

    console.log(category, items.filter((el) => el.category === category))

    setCurrentItems(items.filter((el) => el.category === category))
  }
  
  async function deleteOrder(id) {
    const internalFetch = request.internalFetch()

      const jwtToken = token.getJwtToken()

      let response = await internalFetch.post({ 
        url: `http://localhost:8080/secured/basket/drop/${id}`,
        headers: { 
          "Authorization": `Bearer ${jwtToken}` 
        },
        credentials: "same-origin"
      })

      if(response.status === 200) {
        console.log(response)

        const internalFetch = request.internalFetch()

        const jwtToken = token.getJwtToken()

        let response2 = await internalFetch.get({
          url: "http://localhost:8080/secured/basket", 
          headers: { 
            "Authorization": `Bearer ${jwtToken}` 
          },
          credentials: "same-origin"
        })

        if(response2.status === 200) {
          console.log(response2)
          setOrders(JSON.parse(response2.message))
        }
        else {
          console.log(response2)
        }
      }
      else {
        console.log(response)
      }
  }

  async function addToOrder(item) {
    let isInArray = false

    orders.forEach(el => {
      if(el.productid === item.productid) isInArray = true
    })

    if(!isInArray) {
      const internalFetch = request.internalFetch()

      const jwtToken = token.getJwtToken()

      let response = await internalFetch.post({ 
        url: `http://localhost:8080/secured/products/${item.productid}/toBasket`,
        headers: { 
          "Authorization": `Bearer ${jwtToken}` 
        },
        credentials: "same-origin"
      })

      if(response.status === 200) {
        console.log(response)

        const internalFetch = request.internalFetch()

        const jwtToken = token.getJwtToken()

        let response2 = await internalFetch.get({
          url: "http://localhost:8080/secured/basket", 
          headers: { 
            "Authorization": `Bearer ${jwtToken}` 
          },
          credentials: "same-origin"
        })

        if(response2.status === 200) {
          console.log(response2)
          setOrders(JSON.parse(response2.message))
        }
        else {
          console.log(response2)
        }
      }
      else {
        console.log(response)
      }
    }
  }

  useEffect(() => {
    async function getProductList() {
      const internalFetch = request.internalFetch()

      let response = await internalFetch.get({ 
        url: "http://localhost:8080/products",
        credentials: "same-origin" 
      })

      if(response.status === 200) {
        console.log(response)
        setCurrentItems(JSON.parse(response.message))
        setItems(JSON.parse(response.message))
      }
      else {
        console.log(response)
        setCurrentItems([])
        setItems([])
      }
    }

    getProductList();
  }, []);

  useEffect(() => {
    async function getOrders() {
      const internalFetch = request.internalFetch()

      const jwtToken = token.getJwtToken()

      let response = await internalFetch.get({
        url: "http://localhost:8080/secured/basket", 
        headers: { 
          "Authorization": `Bearer ${jwtToken}` 
        },
        credentials: "same-origin"
      })

      if(response.status === 200) {
        console.log(response)
        setOrders(JSON.parse(response.message))
      }
      else {
        console.log(response)
        setOrders([])
      }
    }

    getOrders();
  }, []);

  return (
    <div className="wrapper">
      <Header orders={orders} onDelete ={deleteOrder}/>
      <Categories chooseCategory ={chooseCategory}/>
      <Items onShowItem={onShowItem} items={currentItems} onAdd={addToOrder}/>

      {showFullItem && <ShowFullItem onAdd={addToOrder} onHideItem={onHideItem} onShowItem={onShowItem} item={fullItem}/>}
      <Footer />
    </div>
  )
}
