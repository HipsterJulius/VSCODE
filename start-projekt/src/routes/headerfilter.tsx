/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-data-grid/lib/styles.css';
import { csvToJson2 } from '../loader';
import DataGrid from 'react-data-grid';


const columns = [
  { key: 'id', name: 'ID' },
  { key: 'name', name: 'Name' },
  { key: 'source', name: 'Source' },
  { key: 'study_location', name: 'Study Location' },
  { key: 'title', name: 'Geographical' },
  { key: 'geographical', name: 'Study Period' },
  { key: 'time_unit', name: 'Time Unit' },
  { key: 'number_of_cases', name: 'Number of cases' },
  { key: 'qualitative_quantitative', name: 'Qualitative/Quantitative' },
  { key: 'secondary_primary_data', name: 'Secondary or primary data' },
  { key: 'aggregated_individual_data', name: 'Aggregated/Individual Data' },
  { key: 'cost', name: 'Cost' },
  { key: 'url', name: 'URL' },
  { key: 'contact_detail', name: 'Contact detail' },
  { key: 'data_quality_limitations', name: 'Data Quality/ Limitations' },
  { key: 'comments', name: 'Comments' },
  { key: 'contributor', name: 'Contributor' },
  { key: 'topic', name: 'Topic' }
];

const rows = [
  {id : 1, name : "Academic General Practitioner Development Network (AHON)"}
]

async function createTable() {
  const csvdata = await csvToJson2();
  console.log(csvdata);
}

export function Filter() {
  createTable();
  
  return <DataGrid columns={columns} rows={rows} />;
}