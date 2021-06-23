import React, { Component } from 'react'
import TitleBar from 'frameless-titlebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ipcRenderer } from 'electron';
import * as appListActions from '../actions/appListActions'
import * as pageListActions from '../actions/pageListActions'
import * as menuListActions from '../actions/menuListActions'
import * as curDocumentActions from '../actions/currentDocumentActions'
import {
  saveProjectListToDisk,
  saveCurrentProjectDetailsToDisk
} from '../renderer/Renderer'
import { getUniqueArr } from '../utils/Utils';

class CustomTitlebar extends React.Component {

  constructor(){
    super();
    this.state = {
      open: false,
      apps: []
    }
  }

  saveCurrentApplication () {
    saveProjectListToDisk(this.props.app)
    const currentApplicationId = this.props.app.currentApplication.id
    saveCurrentProjectDetailsToDisk(this.props, currentApplicationId)
  }

  addApplication () {
    this.saveCurrentApplication()
    const curApplication = {
      label: `Untitled Application_${this.props.app.appList.length + 1}`,
      id: `app__${Math.random()
        .toString(13)
        .replace('0.', '')}`
    }
    this.props.applicationActions.addApplication(curApplication)
    this.props.pageActions.loadPages([]);
    this.props.menuActions.loadMenu([]);
    this.props.documentActions.loadCurrentDocument({
      type: 'application',
      document: curApplication
    })
  }

  switchApplication () {
    const apps = this.props.app.appList
    this.setState({
      open: true,
      apps: apps
    })
  }
  handleClose(){
    this.setState({
      open: false
    })
  }

  loadThisApp = (event, app) => {

    const appData = ipcRenderer.sendSync('switch-app', app.id);
    console.log('APP DATA ', appData);
    const parsedData = JSON.parse(appData) || {};
    let tempAppList;
    if(parsedData.app && this.state){
      tempAppList = [...parsedData.app.appList, ...this.state.apps];
      tempAppList = getUniqueArr(tempAppList, 'id')
      parsedData.app.appList = tempAppList;
    }
    this.props.applicationActions.loadApplications(parsedData);
    this.props.pageActions.loadPages(parsedData.pages || []);
    this.props.menuActions.loadMenu(parsedData.menu || []);
    this.handleClose();
  }

  render () {
    const menu = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New',
            click: (item, win, e) => {
              this.addApplication()
            }
          },
          {
            label: 'Save',
            click: (item, win, e) => {
              this.saveCurrentApplication()
            }
          },
          {
            label: 'Switch Project',
            click: (item, win, e) => {
              this.switchApplication()
            }
          }
        ]
      }
    ]
    return (
      <div>
        <TitleBar
          icon={`${__dirname}/../resources/icon.png`}
          app='Electron'
          menu={menu}
          theme={{
            barTheme: 'dark',
            barBackgroundColor: 'rgb(36, 37, 38)',
            barColor: 'rgb(230, 230, 230)',
            menuHighlightColor: '#373277',
            menuDimItems: false,
            showIconDarwin: false
          }}
        />
        <div style={{'display': this.state.open ? 'block' : 'none'}} className="app-list-modal">
          <div className="header">
            <h4>App List</h4>
            <i className="fa fa-times" onClick={this.handleClose.bind(this)}></i>
          </div>
          <div className="content">
            <ul>
              {
                this.state.apps.map( (app, i) => {
                  return (<li key={i} onClick={(e) => this.loadThisApp(e, app)}>{app.label}</li>)
                })
              }
            </ul>
          </div>
        </div>
        <div style={{'display': this.state.open ? 'block' : 'none'}} className="app-list-modal-backdrop">&nbsp;</div>
        {
          /* the rest of your application
           *  all your routes and stuff
           */
          this.props.children
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return {
    applicationActions: bindActionCreators(appListActions, dispatch),
    documentActions: bindActionCreators(curDocumentActions, dispatch),
    pageActions: bindActionCreators(pageListActions, dispatch),
    menuActions: bindActionCreators(menuListActions, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTitlebar)
