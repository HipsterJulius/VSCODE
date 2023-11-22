import { useEffect, useState } from 'react';
import 'react-data-grid/lib/styles.css';
import { csvToJson } from '../loader';
import DataGrid from 'react-data-grid';
import { redirect, useLoaderData } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader(){
  console.log("hi")
  try {
    const data = await csvToJson();
    console.log(data)
    const jsonArray = JSON.parse(data);
    console.log(jsonArray)
    return jsonArray;
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return redirect("/error"); // Zum Beispiel auf eine Fehlerseite umleiten
  }
}

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
  {id: "0", name:"first" }
]
/*
async function createTable(): Promise<Row[]> {
  const data = await csvToJson();
  const jsonArray = JSON.parse(data) as Row[];
  return jsonArray;
}*/

export function Filter() {
  const [jsonArray, setJsonArray] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loader();
        setJsonArray(data);
      } catch (error) {
        // Handle errors appropriately
        console.error(error);
        // Zum Beispiel auf eine Fehlerseite umleiten
        redirect("/error");
      }
    };

    fetchData();
  }, []); // Leeres Abhängigkeitsarray, um sicherzustellen, dass es nur einmal geladen wird

  return <>{(jsonArray.length > 0) && <DataGrid columns={columns} rows={jsonArray} />}</>;
}