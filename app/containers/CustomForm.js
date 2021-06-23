/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import DragSortableList from 'react-drag-sortable'
import { RandomNum } from '../utils/Utils'

class CustomForm extends Component {
  listGrid = []

  // eslint-disable-next-line class-methods-use-this
  onSort = (sortedList) => {
    console.log('sortedList', sortedList)
    let tempCol = [];
    for(var i = 0; i < sortedList.length; i++){
      tempCol.push(sortedList[i].content.props.data);
    }
    this.props.handleColumnSort(tempCol);
  }

  addNewColumn () {
    const newCol = {
      ctype: 'formcontrol',
      label: 'Form Label',
      id: `control_${RandomNum()}`,
      name: '',
      ftype: 'text',
      format: ''
    }
    this.props.addNewColumn(newCol)
  }

  addNewSection () {
    const newCol = {
      ctype: 'formsection',
      label: 'Section',
      id: `section_${RandomNum()}`,
      ftype: 'section'
    }
    this.props.addNewColumn(newCol)
  }

  handleColClick (column) {
    this.props.handleGridClick(column)
  }

  handleRemoveElement(col, e){
    e.preventDefault();
    const tempCols = this.props.columns.filter( column => {
      return column.id != col.id
    })
    this.props.handleColumnSort(tempCols);
    e.stopPropagation();
  }

  getSortableFormItems (columns) {
    this.listGrid = [];
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i]
      if (col.ctype === 'formcontrol') {
        this.listGrid.push({
          content: (
            <div className='form-group' onClick={e => this.handleColClick(col)} data={col}>
              <span className="fa fa-times delete-form-item" onClick={e => this.handleRemoveElement(col, e)}></span>
              <label>{col.label}</label>
              <input type='text' className='form-control form-control-sm' />
            </div>
          )
        })
      } else if (col.ctype === 'formsection') {
        this.listGrid.push({
          content: (
            <div onClick={e => this.handleColClick(col)} data={col}>
              <span className="fa fa-times delete-form-item" onClick={e => this.handleRemoveElement(col, e)}></span>
              <p className='mb-0'>{col.label}</p>
            </div>
          ),
          classes:['bigger']
        })
      }
    }
    return this.listGrid;
  }

  render () {
    let columns = this.props.columns || []
    columns = this.getSortableFormItems(columns);
    return (
      <div className='form-type'>
        <p>Form Layout</p>
        <div className='btn-group'>
          <button
            className='btn btn-secondary btn-sm'
            onClick={this.addNewColumn.bind(this)}
          >
            <i className='fa fa-plus' /> Control
          </button>
          <button
            className='btn btn-secondary btn-sm'
            onClick={this.addNewSection.bind(this)}
          >
            <i className='fa fa-plus' /> Section
          </button>
        </div>
        <div className='sortable-form'>
          <DragSortableList
            items={this.listGrid}
            dropBackTransitionDuration={0.3}
            onSort={this.onSort}
            type='grid'
          />
        </div>
      </div>
    )
  }
}

export default CustomForm
