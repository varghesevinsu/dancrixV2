import React, { Component } from 'react'
import { ipcRenderer } from 'electron'
import { connect } from 'react-redux'

class Terminal extends Component {
  constructor () {
    super()
    this.state = {
      terminalOutput: ''
    }
  }

  setTerminalAutoScroll(){
    var term = document.getElementById('splitPaneForTerminal');
    if(term){
      setTimeout(() => {
        console.log('auto scroll');
        term.scrollTop = term.scrollHeight - term.clientHeight
      }, 500)
    }
  }

  componentDidMount () {
    this.setTerminalAutoScroll();
    ipcRenderer.on('shell-output', (event, args) => {
      console.log('ARGS ', args)
      this.setState({
        terminalOutput: this.state.terminalOutput + args
      }, () => {
        this.setTerminalAutoScroll();
      })
    })
  }

  startServing () {
    console.log(this.props)
    const { currentApplication } = this.props.app
     this.server = ipcRenderer.sendSync('start-server', currentApplication)
  }

  stopServing () {
    this.setState({
      terminalOutput: this.state.terminalOutput + 'Stopping server...\n'
    })
    var serverStop = ipcRenderer.sendSync('stop-server', this.server)
    this.setState({
      terminalOutput:
        this.state.terminalOutput + '\n' + serverStop + 'Server stopped!!'
    }, () => {
      this.setTerminalAutoScroll();
    })
  }

  render () {
    return (
      <div className='terminal-wrapper' id="terminalWrapper">
        <ul className='server-actions'>
          <li>
            <span onClick={this.startServing.bind(this)}>
              <i className='fa fa-play icon-play' />
            </span>
          </li>
          <li>
            <span onClick={this.stopServing.bind(this)}>
              <i className='fa fa-circle icon-stop' />
            </span>
          </li>
        </ul>
        <pre dangerouslySetInnerHTML={{ __html: this.state.terminalOutput }} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

export default connect(
  mapStateToProps,
  null
)(Terminal)
