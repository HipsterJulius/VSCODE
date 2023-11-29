import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { csvToJson } from '../loader';
import { redirect } from 'react-router-dom';
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

const columns : GridColDef[] = [
  { field: 'id',                          headerName: 'ID',                         sortable: false, width: 65,   type: "number", align: 'center' },
  { field: 'name',                        headerName: 'Name',                       sortable: false, width: 350 },
  { field: 'source',                      headerName: 'Source',                     sortable: false, width: 200 },
  { field: 'study_location',              headerName: 'Study Location',             sortable: false, width: 200,  type:"singleSelect", valueOptions: ["The Netherlands", "Lower Saxony", "Whole of the Netherlands", "Groningen", "Drenthe", "Germany", "European Union", "Germany/Netherlands (and other EU-countries)", "Groningen, Friesland, Drenthe"] },
  { field: 'geographical',                headerName: 'Geographical',               sortable: false, width: 200 },
  { field: 'study_period',                headerName: 'Study Period',               sortable: false, width: 200 },
  { field: 'time_unit',                   headerName: 'Time Unit',                  sortable: false, width: 200 },
  { field: 'number_of_cases',             headerName: 'Number of cases',            sortable: false, width: 200 },
  { field: 'variables',                   headerName: 'Variables',                  sortable: false, width: 200 },
  { field: 'qualitative_quantitative',    headerName: 'Qualitative/Quantitative',   sortable: false, width: 200,  type: "singleSelect", valueOptions: ["qualitative", "quantitative", "quantitative/qualitative"] },
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

/*
const columnGroupingModel: GridColumnGroupingModel = [
  { groupId: 'ID', children: [{ field: 'id' }],},
  {groupId: 'Name', children: [{ field: 'name' }],},
  {groupId: 'Source', children: [{ field: 'source' }],},
  {groupId: 'Study Location', children: [{ field: 'study_location' }],},
  {groupId: 'Geographical', children: [{ field: 'geographical' }],},
  {groupId: 'Study Period', children: [{ field: 'study_period' }],},
  {groupId: 'Time Unit', children: [{ field: 'time_unit' }],},
  {groupId: 'Number of cases', children: [{ field: 'number_of_cases' }],},
  {groupId: 'Variables', children: [{ field: 'variables' }],},
  {groupId: 'Qualitative/Quantitative', children: [{ field: 'qualitative_quantitative' }],},
  {groupId: 'Secondary or primary data', children: [{ field: 'secondary_primary_data' }],},
  {groupId: 'Aggregated/Individual Data', children: [{ field: 'aggregated_individual_data' }],},
  {groupId: 'Access', children: [{ field: 'access' }],},
  {groupId: 'Cost', children: [{ field: 'cost' }],},
  {groupId: 'URL', children: [{ field: 'url' }],},
  {groupId: 'Contact detail', children: [{ field: 'contact_detail' }],},
  {groupId: 'Data Quality/ Limitations', children: [{ field: 'data_quality_limitations' }],},
  {groupId: 'Comments', children: [{ field: 'comments' }],},
  {groupId: 'Contributor', children: [{ field: 'contributor' }],},
  {groupId: 'Topic', children: [{ field: 'topic' }],},
];*/

export function Filter() {
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {

    //Method to transform the data into rows
    const transformData = (data: any[]) => {
      const rows = data.map((innerArray) => {
      const [id, name, source, study_location, geographical, study_period, time_unit, number_of_cases, variables , qualitative_quantitative, secondary_primary_data, aggregated_individual_data, access, cost, url, contact_detail, data_quality_limitations, comments, contributor,topic] = innerArray.slice(0);
      return { id, name, source, study_location, geographical, study_period, time_unit, number_of_cases, variables, qualitative_quantitative, secondary_primary_data, aggregated_individual_data, access,  cost, url, contact_detail, data_quality_limitations, comments, contributor,topic };
      });
      return rows;
    };

    // Method to fetch the data and set the rows
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
    {(rows.length > 0) && (
    <div>
    <DataGrid
          
          // Header Grouping
          //experimentalFeatures={{ columnGrouping: true }}
          
          // Data for the Grid
          rows={rows.slice(1, 42)}
          columns={columns}

          // Initial state of the data-grid
          // Pagination and column visibility
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
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
          pageSizeOptions={[15,20,25]}

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
