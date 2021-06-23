/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appListActions from '../actions/appListActions'

import {
  saveProjectListToDisk,
  saveCurrentProjectDetailsToDisk
} from '../renderer/Renderer'

const electron = require('electron')
const { remote, ipcRenderer } = require('electron')
const { dialog } = remote
const win = remote.getCurrentWindow()

class AppDocument extends Component {
  constructor () {
    super()
    this.state = {
      label: '',
      id: '',
      actualLogo: '',
      logo: '',
      location: '',
      created: false
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    console.log(this.props.app)
    this.props.applicationActions.editApplication(this.state)

    setTimeout(() => {
      saveProjectListToDisk(this.props.app)

      let currentApplicationId = this.props.app.currentApplication.id
      let currentAppDetails = { ...this.props }
      saveCurrentProjectDetailsToDisk(currentAppDetails, currentApplicationId)
    }, 500);
  }

  handleChange (event, property) {
    console.log(event)
    event.preventDefault()
    let propToUpdate = {
      [property]: event.target.value
    }

    if (property === 'logo' || property === 'location') {
      propToUpdate[property] = event.target.files[0].path
    }
    this.setState({
      ...this.state,
      ...propToUpdate
    })
  }

  handleLogoClick () {
    document.getElementById('appLogo').click()
  }

  handleLocationClick () {
    const options = {
      properties: ['openDirectory']
    }
    const filePaths = dialog.showOpenDialog(win, options)
    if (filePaths && filePaths.length) {
      this.setState({
        ...this.state,
        location: filePaths[0]
      })
    }
  }

  handleCreateProject (event) {
    if (!this.state.location) {
      window.alert('Please select project location');
      return
    }
    this.setState(
      {
        created: true
      },
      () => {
        this.handleSubmit(event)
      }
    );

    let createProject = ipcRenderer.sendSync('create-project', this.state)
    console.log(createProject)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      ...this.state,
      ...nextProps.app.currentApplication
    })
  }

  render () {
    console.log(this.props.app)
    const { currentApplication } = this.props.app
    return (
      <div className='container-fluid pt-3 pb-3'>
        <div className='row'>
          <div className='col'>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className='btn-group'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={this.handleSubmit.bind(this)}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={this.handleCreateProject.bind(this)}
                >
                  Create Project
                </button>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='form-group'>
                    <label htmlFor='appLabel'>Application Name</label>
                    <input
                      type='text'
                      id='appLabel'
                      className='form-control form-control-sm'
                      value={this.state.label || ''}
                      onChange={e => this.handleChange(e, 'label')}
                    />
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group'>
                    <label htmlFor='appId'>Application Id</label>
                    <input
                      className='form-control form-control-sm'
                      id='appId'
                      value={this.state.id || ''}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <div className='form-group'>
                    <label htmlFor='appLogoUrl'>Application Logo</label>
                    <div className='input-group mb-3'>
                      <input
                        type='text'
                        id='appLogoUrl'
                        className='form-control form-control-sm'
                        value={this.state.logo || ''}
                        disabled
                      />
                      <div className='input-group-prepend'>
                        <button
                          className='btn btn-secondary'
                          variant='contained'
                          onClick={this.handleLogoClick.bind(this)}
                        >
                          Application Logo
                        </button>
                      </div>
                    </div>
                    <div className='d-none'>
                      <input
                        type='file'
                        className='hidden'
                        id='appLogo'
                        value={this.state.actualLogo || ''}
                        onChange={e => this.handleChange(e, 'logo')}
                      />
                    </div>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-group'>
                    <label htmlFor='appLocation'>Application Location</label>
                    <div className='input-group mb-3'>
                      <input
                        id='appLocation'
                        value={this.state.location || ''}
                        onChange={e => this.handleChange(e, 'location')}
                        className='form-control form-control-sm'
                        disabled
                      />
                      <div className='input-group-prepend'>
                        <button
                          variant='contained'
                          onClick={this.handleLocationClick.bind(this)}
                          className='btn btn-secondary'
                        >
                          Application Location
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
    applicationActions: bindActionCreators(appListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDocument)
