import React, { Component } from 'react'
import { getUnderScoredName, getCamelCasedName } from '../utils/Utils'

function getInitialState (pageDetails) {
  console.log("page details here: ", pageDetails);
  const columns = pageDetails.config.columns;
  const dummyState = {};
  const fields = columns.map(col => {
    const colName = col.name
      ? getUnderScoredName(col.name)
      : getUnderScoredName(col.label)
    if(colName !== 'section' && !dummyState.hasOwnProperty(colName)){
      dummyState[colName] = null;
    }
  })
  console.log('Fields : ', dummyState)
  return JSON.stringify(dummyState);
}

export default function getDetailPageCode (pageDetails) {
  const columns = pageDetails.config.columns;

  return `import React, { Component } from 'react'
  import {
    Typography,
    Paper,
    Grid,
    TextField,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormControl,
    FormLabel,
    RadioGroup,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    Button,
    ButtonGroup,
    Input
  } from '@material-ui/core'
  import _ from 'lodash'
  import './Detail/detailStyles.css'
  import FireService from '../services/FireService'
  import ValidateForm from '../validators/ValidateForm'

  class ${getCamelCasedName(pageDetails.label)} extends Component {
    fireService = new FireService()
    validateForm = new ValidateForm()
    backupData = null

    constructor () {
      super()
      this.state = ${getInitialState(pageDetails)}
    }

    submit = e => {
      e.preventDefault()
      console.log(this.state)
      this.formRef.reportValidity()
      if (this.validateForm.validate()) {
        this.fireService
          .postRequest('/a/post', this.state)
          .then(data => {})
          .catch(error => {
            console.log('Error in request')
          })
      }
      e.stopPropagation()
    }

    resetForm = e => {
      this.setState(this.backupData)
    }

    handleBack = e => {
      if (!_.isEqual(this.state, this.backupData)) {
        if (window.confirm('You have unsaved changes. Do you want to proceed?')) {
          console.log('Going back')
        }
      }
      // TODO: go back to previous page
    }

    handleChange = event => {
      const target = event.target
      this.setState({
        ...this.state,
        [target.name]: target.value
      })
    }

    setData = data => {
      this.setState({
        ...this.state,
        ...data
      })
      this.backupData = data
    }

    getData = () => {
      /* Fire service to get Data here. */
      /* this.fireService.getRequest('/path/to/get/data').then(data => {
        this.setData(data);
      })
      .catch(error => {
        console.log('error : ', error);
      }) */
      this.setData(this.state)
    }
    componentDidMount () {
      this.getData()
    }

    render () {
      return (
        <div>
          <Typography variant='h4' align='left' component='h1' gutterBottom>
            ${pageDetails.label}
          </Typography>
          <form onSubmit={this.submit} ref={el => (this.formRef = el)} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems='flex-start' spacing={4}>
                <Grid xs={12} item style={{ marginTop: 8 }} align={'left'}>
                  <ButtonGroup style={{ marginRight: 8 }}>
                    <Button
                      variant='contained'
                      color='default'
                      onClick={this.handleBack}
                    >
                      Back
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button variant='contained' color='primary' type='submit'>
                      Submit
                    </Button>
                    <Button
                      variant='contained'
                      color='default'
                      onClick={this.resetForm}
                    >
                      Reset
                    </Button>
                  </ButtonGroup>
                </Grid>
                  ${columns.map(col => {
                    return col.ctype === 'formsection' ? (
                      `<Grid item xs={12} align={'left'}>
                        <FormLabel component='h4' className='form-section-header'>
                          ${col.label}
                        </FormLabel>
                      </Grid>`
                    ) : (
                      `<Grid item xs={6} align={'left'}>
                        <FormControl fullWidth>
                          <FormGroup>
                            <TextField
                              id='standard-name'
                              label='${col.label}'
                              name='${getUnderScoredName(col.name || col.label)}'
                              value={this.state.${getUnderScoredName(col.name || col.label)} || ''}
                              onChange={this.handleChange}
                              margin='normal'
                              required
                            />

                          </FormGroup>
                        </FormControl>
                      </Grid>`
                    );
                  }).join('\n')}
              </Grid>
            </Paper>
          </form>
        </div>
      )
    }
  }

  export default ${getCamelCasedName(pageDetails.label)}
  `
}
