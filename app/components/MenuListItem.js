import React, { Component } from 'react'

class MenuListItem extends Component {
  deleteItem () {
    if (window.confirm('Are you sure you want to delete this menu?', 'Confirm Delete')) {
      this.props.deleteMenuItem(this.props)
    }
  }
  render () {
    return (
      <div>
        <span className='pageName'>{this.props.label}</span>
        <span className='pageAction'>
          <i className='fa fa-trash' onClick={this.deleteItem.bind(this)} />
        </span>
      </div>
    )
  }
}

export default MenuListItem
