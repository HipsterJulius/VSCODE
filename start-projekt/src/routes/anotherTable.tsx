import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { csvToJson } from '../loader';
import { Form, redirect } from 'react-router-dom';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

export async function loader(){
  try {
    const url : string = "https://raw.githubusercontent.com/HipsterJulius/VSCODE/7942fee61c759865423963cfb5288fec912a4f6c/start-projekt/public/contextual_data.CSV"
    const data = await csvToJson(url);
    const jsonArray = JSON.parse(data);
    return jsonArray;
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return redirect("/error");
  }
}

export async function action() {
  return redirect(`/`);
}

// Die Reihen nach dem Filter filtern
function filterRows(rows: any[][], number : number): any[][] {
  if(number == 1){
    return rows.filter((item: any) => item.study_location === "The Netherlands" && item.source === "CBS");
  } else return rows.filter((item : any) => {
    // Überprüfen, ob der String in einer der Zellen enthalten ist
    const stringIsIncluded = Object.values(item).some(value => typeof value === 'string' && value.toLowerCase().includes("social".toLowerCase()));
    const locationIsNetherlands = item.secondary_primary_data === 'primary';
    
    return stringIsIncluded && locationIsNetherlands });
}

/*
 * Liste aller columns
 *
 * field:         Name der variable
 * headerName:    Name der angezeigt wird
 * sortable:      Boolean, ob die column sortiert werden kann
 * width:         Breite der column
 * align:         Ausrichtung des Textes der Spalte
 * type:          Typ der Spalte
 * valueOptions:  Möglichkeiten der Auswahl beim Filtern
*/
const columns : GridColDef[] = [
  { field: 'id',                          headerName: 'ID',                         sortable: true, width: 65,   align: 'center',  type: "number" },
  { field: 'name',                        headerName: 'Name',                       sortable: true, width: 350 },
  { field: 'source',                      headerName: 'Source',                     sortable: false, width: 200 },
  { field: 'study_location',              headerName: 'Study Location',             sortable: false, width: 200,                    type: "singleSelect", valueOptions: ["The Netherlands", "Lower Saxony", "Whole of the Netherlands", "Groningen", "Drenthe", "Germany", "European Union", "Germany/Netherlands (and other EU-countries)", "Groningen, Friesland, Drenthe"] },
  { field: 'geographical',                headerName: 'Geographical',               sortable: false, width: 200 },
  { field: 'study_period',                headerName: 'Study Period',               sortable: false, width: 200 },
  { field: 'time_unit',                   headerName: 'Time Unit',                  sortable: false, width: 200 },
  { field: 'number_of_cases',             headerName: 'Number of cases',            sortable: false, width: 200 },
  { field: 'variables',                   headerName: 'Variables',                  sortable: false, width: 200 },
  { field: 'qualitative_quantitative',    headerName: 'Qualitative/Quantitative',   sortable: false, width: 200,  align: 'center',  type: "singleSelect", valueOptions: ["qualitative", "quantitative", "quantitative/qualitative"] },
  { field: 'secondary_primary_data',      headerName: 'Secondary or primary data',  sortable: false, width: 200 },
  { field: 'aggregated_individual_data',  headerName: 'Aggregated/Individual Data', sortable: false, width: 250 },
  { field: 'access',                      headerName: 'Access',                     sortable: false, width: 200 },
  { field: 'cost',                        headerName: 'Cost',                       sortable: false, width: 150 },
  { field: 'url',                         headerName: 'URL',                        sortable: false, width: 200 },
  { field: 'contact_detail',              headerName: 'Contact detail',             sortable: false, width: 200 },
  { field: 'data_quality_limitations',    headerName: 'Data Quality/ Limitations',  sortable: false, width: 200 },
  { field: 'comments',                    headerName: 'Comments',                   sortable: false, width: 200 },
  { field: 'contributor',                 headerName: 'Contributor',                sortable: false, width: 100 },
  { field: 'topic',                       headerName: 'Topic',                      sortable: false, width: 150 }
];

export function AnotherTable() {
  const [rows, setRows] = useState<any>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]); // Gefilterte Daten

  useEffect(() => {

    // Helpermethod to transform the data into rows
    const transformData = (data: any[]) => {
      const rows = data.map((innerArray) => {
      const [id, name, source, study_location, geographical, study_period, time_unit, number_of_cases, variables , qualitative_quantitative, secondary_primary_data, aggregated_individual_data, access, cost, url, contact_detail, data_quality_limitations, comments, contributor,topic] = innerArray.slice(0);
      return { id, name, source, study_location, geographical, study_period, time_unit, number_of_cases, variables, qualitative_quantitative, secondary_primary_data, aggregated_individual_data, access,  cost, url, contact_detail, data_quality_limitations, comments, contributor,topic };
      });
      return rows;
    };

    // Method to fetch the data and set the rows after transforming
    const fetchData = async () => {
      try {
        const data = await loader();
        const transformedRows = transformData(data);
        setRows(transformedRows);
        setFilteredRows(transformedRows)
      } catch (error) {
        console.error(error);
        redirect("/error");
      }
    };

    fetchData();

  }, []); 

  const handleFilterButtonClick = (number : number) => {
    const newFilteredRows = filterRows(rows, number);
    setFilteredRows(newFilteredRows);
  };

  const handleClearFilterButtonClick = () => {
    setFilteredRows(rows)
  }

return (
  <>
    <html>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body>
      <div className="header">
        <h1>Data inventory of organisations</h1>
      </div>
      <div className='label-container'>
        <label htmlFor="">table:</label>
        <label htmlFor="" className='label-item'>filteroptions:</label>
      </div>
      <div className='flex-container'>
      <Form method="post">
       <button type="submit" className='flex-item'  onClick={handleClearFilterButtonClick}>health and institutional data</button>
      </Form>
      <Form method="post">
        <button type="button" id='1' className='flex-item' onClick={ () => handleFilterButtonClick(1)}>study location und source</button>
      </Form> 
      <Form method="post">
        <button type="button" id='2' className='flex-item' onClick={ () => handleFilterButtonClick(2)}>social and primary/secondary</button>
        </Form> 
      <Form method="post">
        <button type="button" className='flex-item' onClick={handleClearFilterButtonClick}>Delete Filter</button>
      </Form> 
    </div> 
    {(rows.length > 0) && (
      <div>
        <DataGrid          

          // Rows and colums for the Data-Grid
          rows={filteredRows.slice(1, 42)}
          columns={columns}

          slots={{
            toolbar: GridToolbar,
          }}
          
          // Initial state of the data-grid
          // Pagination and column visibility
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            columns: {
              columnVisibilityModel: {
                id: false,
                variables: false,
                geographical: false,
                secondary_primary_data: false,
                access: false,
                cost: false,
                url: false,
                contact_detail: false,
                data_quality_limitations: false,
                comments: false,
                contributor: false,
              },
            },
          }}

          // Options to choose for the pagesize
          pageSizeOptions={[10,20,30]}

          //Menu options for the colums
          //disableColumnFilter
          //disableColumnMenu
          //disableRowSelectionOnClick
          //columnGroupingModel={columnGroupingModel}

        />
      </div>
      )}
      </body>
    </html>
  </>
);
}
