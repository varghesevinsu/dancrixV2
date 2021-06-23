import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as menuListActions from '../actions/menuListActions'
import * as curDocumentActions from '../actions/currentDocumentActions'
import { ipcRenderer } from 'electron'
import { saveProjectListToDisk, saveCurrentProjectDetailsToDisk } from '../renderer/Renderer';

class MenuDocument extends Component {
  state = {}

  static getDerivedStateFromProps (props, state) {
    if (!state.id) {
      return props.currentDocument
    }
    if (state.id !== props.currentDocument.id) {
      return props.currentDocument
    }
    return null
  }

  handleChange (e) {
    // eslint-disable-next-line prefer-destructuring
    const target = e.target
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }

  saveCurrentApplication() {
    saveProjectListToDisk(this.props.app);
    const currentApplicationId = this.props.app.currentApplication.id;
    saveCurrentProjectDetailsToDisk(this.props, currentApplicationId);
  }

  saveMenu () {
    const finalMenuList = this.props.menu.map(mItem => {
      if (mItem.id === this.state.id) {
        mItem = this.state
      }
      return mItem
    })
    this.props.menuActions.editMenu(finalMenuList)
    setTimeout(() => {
      ipcRenderer.sendSync('save-menu-details', this.props)
      this.saveCurrentApplication();
    }, 500)
  }

  render () {
    console.log(this.state)
    const curDocument = this.state
    return (
      <div className='container-fluid pt-3 pb-3'>
        <div className='row'>
          <div className='col-12'>
            <button
              className='btn btn-primary'
              onClick={this.saveMenu.bind(this)}
            >
              Save
            </button>
          </div>
          <div className='col-6'>
            <div className='form-group'>
              <label>Label</label>
              <input
                type='text'
                className='form-control form-control-sm'
                name='label'
                value={curDocument.label || ''}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className='form-group'>
              <label>Sub-menu Of</label>
              <select
                className='form-control form-control-sm'
                name='parentMenu'
                value={curDocument.parentMenu || ''}
                onChange={this.handleChange.bind(this)}
              >
                <option value=''>None</option>
                {this.props.menu
                  .filter(mItem => {
                    return mItem.id != curDocument.id
                  })
                  .map(mItem => {
                    return (
                      <option key={mItem.id} value={mItem.id}>
                        {mItem.label}
                      </option>
                    )
                  })}
              </select>
            </div>
            <div className='form-group'>
              <label>Link with page</label>
              <select
                className='form-control form-control-sm'
                name='page'
                value={curDocument.page || ''}
                onChange={this.handleChange.bind(this)}
              >
                <option value=''>None</option>
                {this.props.pages
                  .filter(mItem => {
                    return mItem.id != curDocument.id
                  })
                  .map(mItem => {
                    return (
                      <option key={mItem.id} value={mItem.id}>
                        {mItem.label}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>
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
    menuActions: bindActionCreators(menuListActions, dispatch),
    documentActions: bindActionCreators(curDocumentActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDocument)
