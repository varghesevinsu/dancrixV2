/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as pageListActions from '../actions/pageListActions'
import * as curDocumentActions from '../actions/currentDocumentActions'
import ConfigurationDocument from './ConfigurationDocument'
import CustomGrid from './CustomGrid'
import CustomForm from './CustomForm'
import { ipcRenderer } from 'electron';
import {
  saveProjectListToDisk,
  saveCurrentProjectDetailsToDisk
} from '../renderer/Renderer';

class PageDocument extends Component {
  state = {};

  static getDerivedStateFromProps (props, state) {
    if(!state.id){
      return props.state.currentDocument;
    }
    if (state.id !== props.state.currentDocument.id) {
      return props.state.currentDocument
    }
    return null
  }

  saveCurrentApplication() {
    saveProjectListToDisk(this.props.state.app);
    const currentApplicationId = this.props.state.app.currentApplication.id;
    saveCurrentProjectDetailsToDisk(this.props.state, currentApplicationId);
  }

  saveDocument () {
    this.props.pageActions.editPage(this.state)
    this.props.documentActions.loadCurrentDocument(this.state)
    setTimeout(() => {
      const savePage = ipcRenderer.sendSync('save-page-details', this.props.state)
      this.saveCurrentApplication();
      console.log('savePage ', savePage);
    }, 500)
  }

  handleChange (e) {
    // eslint-disable-next-line prefer-destructuring
    const target = e.target
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }

  handleConfigChange (config) {
    const target = config.target

    const newConfig = {
      ...this.state.currentConfig,
      [target.name]: target.value
    }

    this.setState({
      ...this.state,
      currentConfig: newConfig,
      config: {
        ...this.state.config,
        columns: this.state.config.columns.map(col => {
          if (col.id === newConfig.id) {
            col = newConfig
          }
          return col
        })
      }
    })
  }

  sortColumns(columns){
    this.setState({
      ...this.state,
      config: {
        ...this.state.config,
        columns
      }
    })
  }

  addNewColumn (column) {
    this.setState({
      ...this.state,
      config: {
        ...this.state.config,
        columns: [...this.state.config.columns, column]
      }
    })
  }

  handleGridClick (column) {
    console.log(column)
    this.setState({
      ...this.state,
      currentConfig: column
    })
  }

  addCurrentPageToMenu(){

  }

  render () {
    const {columns} = this.state.config
    return (
      <div className='container-fluid pt-3 pb-3'>
        <div className='row'>
          <div className='page-options col-9'>
            <div>
              <button
                className='btn btn-primary'
                onClick={this.saveDocument.bind(this)}
              >
                Save
              </button>
              <span>&nbsp;</span>
              <button className="btn btn-secondary"
                onClick={this.addCurrentPageToMenu.bind(this)}
              >
                Add to Menu
              </button>
            </div>
            <div className='row'>
              <div className='form-group col-6'>
                <label htmlFor='ptype-label-placeholder'>Type</label>

                <select
                  value={this.state.ptype || ''}
                  onChange={this.handleChange.bind(this)}
                  name='ptype'
                  className='selectEmpty form-control form-control-sm'
                >
                  <option value={'grid'}>Grid</option>
                  <option value={'form'}>Form</option>
                </select>
              </div>
              <div className='col-6' />
              <div className='form-group col-6'>
                <label>Page Name</label>
                <input
                  name='label'
                  value={this.state.label || ''}
                  onChange={this.handleChange.bind(this)}
                  className='form-control form-control-sm'
                />
              </div>
              <div className='form-group col-6'>
                <label>Grid Data Url</label>
                <input
                  name='url'
                  value={this.state.url || ''}
                  onChange={this.handleChange.bind(this)}
                  className='form-control form-control-sm'
                />
              </div>
            </div>
            {this.state.ptype == 'grid' ? (
              <CustomGrid
                columns={columns}
                addNewColumn={this.addNewColumn.bind(this)}
                handleColumnSort={this.sortColumns.bind(this)}
                handleGridClick={this.handleGridClick.bind(this)}
              />
            ) : (
              <CustomForm
                columns={columns}
                addNewColumn={this.addNewColumn.bind(this)}
                handleColumnSort={this.sortColumns.bind(this)}
                handleGridClick={this.handleGridClick.bind(this)}
              />
            )}
          </div>
          <div className='page-config-options col-3 p-0'>
            <ConfigurationDocument
              config={this.state.currentConfig}
              handleConfigChange={this.handleConfigChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pageActions: bindActionCreators(pageListActions, dispatch),
    documentActions: bindActionCreators(curDocumentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageDocument)
