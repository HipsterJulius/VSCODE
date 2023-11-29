import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { csvToJson } from '../loader';
import { Form, Link, redirect } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


export async function loader(){
  try {
    const data = await csvToJson();
    const jsonArray = JSON.parse(data);
    return jsonArray;
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return redirect("/error");
  }
}

export async function action() {
  return redirect(`/anotherTable`);
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

export function Filter() {
  const [rows, setRows] = useState<any>([]);
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
      } catch (error) {
        console.error(error);
        redirect("/error");
      }
    };

    fetchData();

  }, []); 

return (
  <>
    <Form method="post">
      <button type="submit">New</button>
    </Form> 
    <Link to="/anotherTable">Link to AnotherTable</Link>
    {(rows.length > 0) && (
      <div>
        <DataGrid          

          // Rows and colums for the Data-Grid
          rows={rows.slice(1, 42)}
          columns={columns}

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
  </>
);
}
