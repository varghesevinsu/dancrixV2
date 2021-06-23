import { getCamelCasedName } from "../utils/Utils";

function getHeadRows(header) {
  const arr = [];
  header.map((head) => {
    arr.push({id: head.label, label: head.label})
  });
  return JSON.stringify(arr);
}

function getRow(){
  return {id: '', label: ''};
}

function getDummyRows(header) {
  const arr = [];
  for(var i = 0; i < 5; i++){
    arr.push(getRow());
  }
  return JSON.stringify(arr);
}

export default function getListPageCode(pageDetails) {

  console.log('pagedetails ', pageDetails);
  return `import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import { Paper, Button } from '@material-ui/core';
 import './tableStyles.css';
 import EnhancedTable from './Table/EnhancedTable';

 class ${getCamelCasedName(pageDetails.label)} extends Component {
   headRows = ${getHeadRows(pageDetails.config.columns)}

   rows = ${getDummyRows(pageDetails.config.columns)};

   render () {
     return (
       <div>
         <Paper className="paper">
           <Button variant="contained" color="primary" component={Link} to='/list/detail/1'>
             New
           </Button>
         </Paper>
         <EnhancedTable rows={this.rows} header={this.headRows} />
       </div>
     )
   }
 }

 export default ${getCamelCasedName(pageDetails.label)}
 `
}
