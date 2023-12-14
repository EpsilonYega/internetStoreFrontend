import React, { Component } from 'react'

export class ShowFullItem extends Component {
  render() {
    return (
      <div className='full-item'>
        <div>
            <img src={"./img/"+ this.props.item.img}  onClick={() => this.props.onHideItem(this.props.item)}/>
            <h2>{this.props.item.productname}</h2>
            <p>{this.props.item.category}</p>
            {this.props.item.characteristicsList.map((characteristic, index) => (
              <p key={index}>{characteristic}</p>
            ))}
            <b>{this.props.item.price}$</b>
            <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>+</div>
            <button onClick={() => this.props.onHideItem(this.props.item)}>Hide</button>
        </div>
      </div>
    )
  }
}

export default ShowFullItem