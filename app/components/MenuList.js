import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as menuListActions from '../actions/menuListActions';
import * as curDocumentActions from '../actions/currentDocumentActions';
import MenuListItem from './MenuListItem'
import { RandomNum } from '../utils/Utils';

class MenuList extends Component {
  addMenu () {
    console.log('Add Menu')
    const newMenu = {
      label: `Menu ${this.props.menu.length + 1}`,
      id: `Menu_${RandomNum()}`,
      parentMenu: '',
      children: [],
      type: 'menu',
    }
    this.props.menuActions.addMenu(newMenu)
  }

  menuItemClicked(event, menu) {
    console.log(menu);
    this.props.documentActions.loadCurrentDocument(menu);
  }

  deleteMenuItem = menu => {
    this.props.menuActions.removeMenu(menu)
  }

  isDisplay(){
    return this.props.app.currentApplication.created ? 'inline-block': 'none';
  }

  render () {
    const menus = this.props.menu || []
    console.log(menus)
    return (
      <div className='sidebar-wrapper'>
        <div className='sectionHeader'>
          <p className='sectionItem'>Menu</p>
          <p className='sidebarToolIcons' style={{'display': this.isDisplay()}}>
            <span onClick={this.addMenu.bind(this)}>
              <i className='fa fa-plus' />
            </span>
          </p>
        </div>
        <div className='sidebar-content'>
          <ul className="sidebarItem">
            {menus.map(menu => {
              return (
                <li key={menu.id}
                onClick={(e) => this.menuItemClicked(e, menu)}
                >
                  <MenuListItem {...menu} deleteMenuItem={this.deleteMenuItem.bind(this)} />{' '}
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
  return state;
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
)(MenuList)
