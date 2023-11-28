import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { csvToJson } from '../loader';
//import DataGrid from 'react-data-grid';
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
    return redirect("/error"); // Zum Beispiel auf eine Fehlerseite umleiten
  }
}

const columns : GridColDef[] = [
  { field: 'id', headerName: 'ID', sortable: false },
  { field: 'name', headerName: 'Name', sortable: false },
  { field: 'source', headerName: 'Source', sortable: false },
  { field: 'study_location', headerName: 'Study Location', sortable: false },
  { field: 'title', headerName: 'Geographical', sortable: false },
  { field: 'geographical', headerName: 'Study Period', sortable: false },
  { field: 'time_unit', headerName: 'Time Unit', sortable: false },
  { field: 'number_of_cases', headerName: 'Number of cases', sortable: false },
  { field: 'qualitative_quantitative', headerName: 'Qualitative/Quantitative', sortable: false },
  { field: 'secondary_primary_data', headerName: 'Secondary or primary data', sortable: false },
  { field: 'aggregated_individual_data', headerName: 'Aggregated/Individual Data', sortable: false },
  { field: 'cost', headerName: 'Cost', sortable: false },
  { field: 'url', headerName: 'URL', sortable: false },
  { field: 'contact_detail', headerName: 'Contact detail', sortable: false },
  { field: 'data_quality_limitations', headerName: 'Data Quality/ Limitations', sortable: false },
  { field: 'comments', headerName: 'Comments', sortable: false },
  { field: 'contributor', headerName: 'Contributor', sortable: false },
  { field: 'topic', headerName: 'Topic', sortable: false }
];


export function Filter() {
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {

    const transformData = (data: any[]) => {
      const rows = data.map((innerArray) => {
      const [id, name, source, study_location, title, geographical, time_unit, number_of_cases, qualitative_quantitative, secondary_primary_data, aggregated_individual_data, cost, url, contact_detail, data_quality_limitations, comments, contributor,topic] = innerArray.slice(0, 18);
      return { id, name, source, study_location, title, geographical, time_unit, number_of_cases, qualitative_quantitative, secondary_primary_data, aggregated_individual_data, cost, url, contact_detail, data_quality_limitations, comments, contributor,topic };
      });
      return rows;
    };

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
          rows={rows.slice(1, 42)}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          pageSizeOptions={[15,20,25]}

          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
        />
      </div>
    )}
  </>
);
}
