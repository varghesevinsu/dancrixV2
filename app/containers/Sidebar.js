import React, { Component } from 'react';
import ApplicationList from '../components/ApplicationList';
import PageList from '../components/PageList';
import MenuList from '../components/MenuList';

class Sidebar extends Component {

  render() {
    return (
      <div>
        <ul component="nav">
          <li>
            <ApplicationList />
          </li>
          <li>
            <PageList />
          </li>
          <li>
            <MenuList />
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
