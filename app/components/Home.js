// @flow
import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import { ipcRenderer } from 'electron'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styles from './Home.css'
import CustomTitlebar from './CustomTitlebar'
import Sidebar from '../containers/Sidebar'
import * as appListActions from '../actions/appListActions'
import * as pageListActions from '../actions/pageListActions'
import * as menuListActions from '../actions/menuListActions'
import DocumentContainer from '../containers/DocumentContainer'
import Terminal from '../containers/Terminal';

class Home extends Component {
  props: Props

  componentDidMount () {
    const appData = ipcRenderer.sendSync('init-app', 'get app data');
    console.log('APP DATA ', appData);
    const parsedData = JSON.parse(appData) || {};
    this.props.applicationActions.loadApplications(parsedData);
    this.props.pageActions.loadPages(parsedData.pages || []);
    this.props.menuActions.loadMenu(parsedData.menu || []);
  }

  render () {
    return (
      <div className={styles.container} data-tid='container'>
        <CustomTitlebar />
        <SplitPane split='vertical' minSize={200} className="splitpane-start">
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <SplitPane split='horizontal' minSize={200} primary='second' >
            <div>
              <DocumentContainer />
            </div>
            <div id="splitPaneForTerminal" className="terminal-split-pane">
              <Terminal />
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    applicationActions: bindActionCreators(appListActions, dispatch),
    pageActions: bindActionCreators(pageListActions, dispatch),
    menuActions: bindActionCreators(menuListActions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home)
