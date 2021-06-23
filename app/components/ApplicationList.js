/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appListActions from '../actions/appListActions';
import * as curDocumentActions from '../actions/currentDocumentActions';
import styles from '../assets/sidebar.css';
import {
  saveProjectListToDisk,
  saveCurrentProjectDetailsToDisk
} from '../renderer/Renderer';

class ApplicationList extends Component {
  saveCurrentApplication() {
    saveProjectListToDisk(this.props.app);
    const currentApplicationId = this.props.app.currentApplication.id;
    saveCurrentProjectDetailsToDisk(this.props, currentApplicationId);
  }

  addApplication() {
    this.saveCurrentApplication();
    const curApplication = {
      label: `Untitled Application_${this.props.app.appList.length +
        1}`,
      id: `app__${Math.random()
        .toString(13)
        .replace('0.', '')}`
    };
    this.props.applicationActions.addApplication(curApplication);
    this.props.documentActions.loadCurrentDocument({
      type: 'application',
      document: curApplication
    });
  }

  loadApplication() {
    this.props.documentActions.loadCurrentDocument({
      type: 'application',
      document: this.props.app.currentApplication
    });
  }

  render() {
    const currentAppLabel = this.props.app
      ? this.props.app.currentApplication.label
      : '';
    return (
      <div className="sidebar-wrapper">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionItem}>Apps</p>
        </div>
        <div className="sidebar-content">
          <p
            onClick={this.loadApplication.bind(this)}
            className={styles.sidebarItem}
          >
            {currentAppLabel}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    applicationActions: bindActionCreators(appListActions, dispatch),
    documentActions: bindActionCreators(curDocumentActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationList);
