import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { csvToJson } from '../loader';
//import DataGrid from 'react-data-grid';
import { redirect } from 'react-router-dom';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import  "tabulator-tables"

export async function loader(){
  try {
    const data = await csvToJson();
    const jsonArray = JSON.parse(data);
    return jsonArray;
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return redirect("/error"); // Zum Beispiel auf eine Fehlerseite umleiten
  }
}


/*
const columns [
  { id: 'id', name: 'ID'},
  { field: 'name', headerName: 'Name' },
  { field: 'source', headerName: 'Source'},
  { field: 'study_location', headerName: 'Study Location'},
  { field: 'title', headerName: 'Geographical' },
  { field: 'geographical', headerName: 'Study Period' },
  { field: 'time_unit', headerName: 'Time Unit' },
  { field: 'number_of_cases', headerName: 'Number of cases' },
  { field: 'qualitative_quantitative', headerName: 'Qualitative/Quantitative' },
  { field: 'secondary_primary_data', headerName: 'Secondary or primary data' },
  { field: 'aggregated_individual_data', headerName: 'Aggregated/Individual Data' },
  { field: 'cost', headerName: 'Cost' },
  { field: 'url', headerName: 'URL' },
  { field: 'contact_detail', headerName: 'Contact detail'},
  { field: 'data_quality_limitations', headerName: 'Data Quality/ Limitations'},
  { field: 'comments', headerName: 'Comments', sortable: false },
  { field: 'contributor', headerName: 'Contributor'},
  { field: 'topic', headerName: 'Topic'}
];*/


export function Filter() {
  
  useEffect(() => {

     var tabledata = [
    {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
    {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
    {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
    {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
  ];
  
  //create Tabulator on DOM element with id "example-table"
  const table = new Tabulator("#example-table", {
    height:500, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data:tabledata, //assign data to table
    layout:"fitColumns", //fit columns to width of table (optional)
    columns:[ //Define Table Columns
      {title:"Name", field:"name", width:150},
      {title:"Age", field:"age", hozAlign:"left", formatter:"progress"},
      {title:"Favourite Color", field:"col"},
      {title:"Date Of Birth", field:"dob", sorter:"date", hozAlign:"center"},
    ],
  });
  
  //trigger an alert message when the row is clicked
  table.on("rowClick", function(_e, row){ 
    alert("Row " + row.getData().id + " Clicked!!!!");
  });

  }, []);

  

return (
  <div id="example-table"></div>
  
  /*
  <>
    {(rows.length > 0) && (
      <div id="example-table"></div>
    )}
  </>*/
);
}
