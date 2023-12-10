import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import { useState, useEffect } from 'react';

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

    setCurrentItems(items.filter((el) => el.category === category))
  }
  
  function deleteOrder(id) {
    setOrders(orders.filter((el) => el.id !== id))
  }

  function addToOrder(item) {
    let isInArray = false

    orders.forEach(el => {
      if(el.id === item.id) isInArray = true
    })

    if(!isInArray) setOrders([...orders, item])
  }

  useEffect(() => {
    async function getProductList() {
      let response = await fetch('http://localhost:8080/products')
      let json_data = await response.json()

      console.log(json_data)
      
      setItems(json_data)
    }

    getProductList();
  }, []);

  return (
    <div className="wrapper">
      <Header orders={orders} onDelete ={deleteOrder}/>
      <Categories chooseCategory ={chooseCategory}/>
      <Items onShowItem={onShowItem} items={items} onAdd={addToOrder}/>

      {showFullItem && <ShowFullItem onAdd={addToOrder} onHideItem={onHideItem} onShowItem={onShowItem} item={fullItem}/>}
      <Footer />
    </div>
  )
}
