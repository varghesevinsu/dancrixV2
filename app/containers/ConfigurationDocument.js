/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'

class ConfigurationDocument extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      ...this.state.config,
      ...nextProps.config
    })
  }

  handleChange (e) {
    this.props.handleConfigChange(e)
  }

  render () {
    console.log(this.props)
    const configuration = this.props.config
    if (!this.props || !this.props.config) return <div />
    return (
      <div className='container'>
        <div className='row'>
          <div className='col p-1'>
            <form>
              {Object.keys(configuration).map((item, index) => {
                return (
                  <div key={index}>
                    <div className='form-group mb-2'>
                      <label htmlFor='appLabel'>{item.toUpperCase()}</label>
                      {item === 'ftype' ? (
                        <select
                          id='appLabel'
                          name={item}
                          className='form-control form-control-sm'
                          value={this.state[item] || ''}
                          onChange={this.handleChange.bind(this)}
                          variant='outlined'
                        >
                          <option>Text</option>
                          <option>Textarea</option>
                          <option>Dropdown</option>
                          <option>Checkbox</option>
                          <option>Checkbox Group</option>
                          <option>Radio</option>
                        </select>
                      ) : (
                        <input
                          id='appLabel'
                          name={item}
                          className='form-control form-control-sm'
                          // eslint-disable-next-line react/destructuring-assignment
                          value={this.state[item] || ''}
                          onChange={this.handleChange.bind(this)}
                          variant='outlined'
                          disabled={item === 'ctype' || item === 'id'}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </form>
            .
          </div>
        </div>
      </div>
    )
  }
}

export default ConfigurationDocument
