export default function getListPageCode(pageDetails) {

  getHeadRows(header){
    const arr = [];
    header.map((head) => {
      arr.push({id: head.label, label: head.label})
    });
    return arr;
  }

  getDummyRows(header) {
    const arr = [];
    for(var i = 0; i < 5; i++){
      arr.push(header.join(','))
    }
    return arr;
  }


  return `import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import { Paper, Button } from '@material-ui/core';
 import './tableStyles.css';
 import EnhancedTable from './Table/EnhancedTable';

 class SampleList extends Component {
   headRows = ${this.getHeadRows(pageDetails.columns)}

   createData (name, calories, fat, carbs, protein) {
     return { name, calories, fat, carbs, protein }
   }

   rows = ${this.getDummyRows(pageDetails.columns)};

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

 export default SampleList
 `
}
