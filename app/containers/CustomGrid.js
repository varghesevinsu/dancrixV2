import React, { Component } from 'react'
import DragSortableList from 'react-drag-sortable'
import { RandomNum } from '../utils/Utils'

class CustomGrid extends Component {
  listGrid = []
  addNewColumn () {
    const newCol = {
      ctype: 'column',
      label: 'New Column',
      id: `column_${RandomNum()}`,
      data: '',
      format: ''
    }
    this.props.addNewColumn(newCol)
  }

  handleGridClick (column) {
    this.props.handleGridClick(column)
  }

  onSort = (sortedList) => {
    console.log('sortedList', sortedList)
    let tempCol = [];
    for(var i = 0; i < sortedList.length; i++){
      tempCol.push(sortedList[i].content.props.data);
    }
    this.props.handleColumnSort(tempCol);
  }

  handleRemoveElement(col, e){
    e.preventDefault();
    const tempCols = this.props.columns.filter( column => {
      return column.id != col.id
    })
    this.props.handleColumnSort(tempCols);
    e.stopPropagation();
  }

  getSortableGridColumns (columns) {
    this.listGrid = []
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]
      this.listGrid.push({
        content: (
          <div
            className='grid-col'
            key={column.id}
            onClick={e => this.handleGridClick(column)}
            data={column}
          >
            <div>
            <span className="fa fa-times delete-form-item" onClick={e => this.handleRemoveElement(column, e)}></span>
              <label className='h'>{column.label}</label>
              <label className='c'>content</label>
              <label className='c'>content</label>
            </div>
          </div>
        )
      })
    }

    return this.listGrid
  }

  render () {
    let columns = this.props.columns
    columns = this.getSortableGridColumns(columns)
    return (
      <div className='grid-type'>
        <p>
          Grid Columns{' '}
          <button
            className='btn btn-secondary btn-sm'
            onClick={this.addNewColumn.bind(this)}
          >
            <i className='fa fa-plus' />
          </button>
        </p>
        <div className='list list-inline'>
          <div className='sortable-grid'>
            <DragSortableList
              items={this.listGrid}
              dropBackTransitionDuration={0.3}
              onSort={this.onSort}
              type="horizontal"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CustomGrid
