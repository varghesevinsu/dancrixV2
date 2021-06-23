import React, { Component } from 'react'
import '../assets/sidebar.css'

class PageListItem extends Component {
  deleteItem () {
    if (
      window.confirm(
        'Are you sure you want to delete this page?',
        'Confirm Delete'
      )
    ) {
      this.props.deletePageItem(this.props)
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

export default PageListItem
