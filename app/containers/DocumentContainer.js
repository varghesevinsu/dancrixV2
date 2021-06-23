import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppDocument from './AppDocument'
import PageDocument from './PageDocument'
import MenuDocument from './MenuDocument';

class DocumentContainer extends Component {
  getDocumentType () {
    console.log('current document', this.props)
    let { currentDocument } = this.props || {}
    if (!currentDocument) currentDocument = {}
    switch (currentDocument.type) {
      case 'application':
        return <AppDocument />
      case 'page':
        return <PageDocument />
      case 'menu':
        return <MenuDocument />
      default:
        break
    }
    return currentDocument.type
  }

  render () {
    console.log(this.props)
    return <div>{this.getDocumentType()}</div>
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(
  mapStateToProps,
  null
)(DocumentContainer)
