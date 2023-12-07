import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      orders:[],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Высокопробный алмаз',
          img: 'diamondONE.jpg',
          category: 'minerals',
          price: '899.99'
        },
        {
          id: 2,
          title: 'Высокопробный изумруд',
          img: 'Emerald.jpg',
          category: 'minerals',
          price: '779.99'
        },
        {
          id: 3,
          title: 'Высокопробный рубин',
          img: 'Ruby.jpg',
          category: 'minerals',
          price: '839.99'
        },
        {
          id: 4,
          title: 'Высокопробный сапфир',
          img: 'Saphfir.jpg',
          category: 'minerals',
          price: '765.00'
        },
        {
          id: 5,
          title: 'Высокопробный топаз',
          img: 'Topaz.jpg',
          category: 'minerals',
          price: '729.99'
        },
        {
          id: 6,
          title: 'Золотые слитки',
          img: 'Gold.jpg',
          category: 'metal',
          price: '459.99'
        },
        {
          id: 7,
          title: 'Платиновые слитки',
          img: 'Platinum.jpg',
          category: 'metal',
          price: '510.00'
        },
        {
          id: 8,
          title: 'Премиум часы',
          img: 'clock.jpg',
          category: 'jewelry',
          price: '2999.99'
        },
        {
          id: 9,
          title: 'Высокопробный кварц',
          img: 'CrystalQuarzh.jpg',
          category: 'crystal',
          price: '289.99'
        }
      ],
      showFullItem : false,
      fullItem: {}
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }
  render() {
  return (
    <div className="wrapper">
      <Header orders={this.state.orders} onDelete ={this.deleteOrder}/>
      <Categories chooseCategory ={this.chooseCategory}/>
      <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>

      {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/>}
      <Footer />
    </div>
    )
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    if (category === 'all'){
      this.setState({currentItems: this.state.items})
      return
    }

    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }
  
    deleteOrder(id) {
      this.setState({orders: this.state.orders.filter(el => el.id !== id)})
    }

  addToOrder(item) {
                          //начало кода для добавление(фиксации) одного элемента продукта
    let isInArray = false
    this.state.orders.forEach(el => {
      if(el.id === item.id)
      isInArray = true
    })
    if(!isInArray)
                          //конец кода для добавление(фиксации) одного элемента продукта
     this.setState({orders: [...this.state.orders, item  ]})
  }
}

export default App;
