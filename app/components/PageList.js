import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pageListActions from '../actions/pageListActions'
import * as curDocumentActions from '../actions/currentDocumentActions'
import PageListItem from './PageListItem'
import '../assets/sidebar.css'
import { RandomNum } from '../utils/Utils'

class PageList extends Component {
  addPage () {
    const newPage = {
      label: `Page ${this.props.pages.length + 1}`,
      id: `Page_${RandomNum()}`,
      type: 'page',
      ptype: 'grid',
      config: {
        url: '',
        columns: []
      },
      currentConfig: {}
    }
    this.props.pageActions.addPage(newPage)
    this.props.documentActions.loadCurrentDocument(newPage)
  }

  renamePage () {}

  pageItemClicked (event, page) {
    console.log(page)
    this.props.documentActions.loadCurrentDocument(page)
  }

  deletePageItem = page => {
    console.log(page)
    this.props.pageActions.removePage(page)
  }

  isDisplay () {
    return this.props.app.currentApplication.created ? 'inline-block' : 'none'
  }

  render () {
    const pages = this.props.pages || []
    return (
      <div className='sidebar-wrapper'>
        <div className='sectionHeader'>
          <p className='sectionItem'>Pages</p>
          <p className='sidebarToolIcons' style={{ display: this.isDisplay() }}>
            <i className='fa fa-plus' onClick={this.addPage.bind(this)} />
          </p>
        </div>
        <div className='sidebar-content'>
          <ul className='sidebarItem'>
            {pages.map(page => {
              return (
                <li key={page.id} onClick={e => this.pageItemClicked(e, page)}>
                  <PageListItem
                    {...page}
                    deletePageItem={this.deletePageItem.bind(this)}
                  />{' '}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    pageActions: bindActionCreators(pageListActions, dispatch),
    documentActions: bindActionCreators(curDocumentActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageList)
