import { useEffect, useState } from "react";
import "react-data-grid/lib/styles.css";
import { csvToJson } from "../loader";
import { Form, redirect } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns_config } from "../table-config";
import { handleFilterButtonClick } from "../filter";

export async function loader() {
  try {
    const url: string =
      "https://raw.githubusercontent.com/HipsterJulius/VSCODE/table/start-projekt/public/health_and_institutional_data.csv";
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
  return redirect(`anotherTable`);
}

export function Filter() {
  const [rows, setRows] = useState<any>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]); // Gefilterte Daten

  useEffect(() => {
    // Helpermethod to transform the data into rows
    const transformData = (data: any[]) => {
      const rows = data.map((innerArray) => {
        const [
          id,
          name,
          source,
          study_location,
          geographical,
          study_period,
          time_unit,
          number_of_cases,
          variables,
          qualitative_quantitative,
          secondary_primary_data,
          aggregated_individual_data,
          access,
          cost,
          url,
          contact_detail,
          data_quality_limitations,
          comments,
          contributor,
          topic,
        ] = innerArray.slice(0);
        return {
          id,
          name,
          source,
          study_location,
          geographical,
          study_period,
          time_unit,
          number_of_cases,
          variables,
          qualitative_quantitative,
          secondary_primary_data,
          aggregated_individual_data,
          access,
          cost,
          url,
          contact_detail,
          data_quality_limitations,
          comments,
          contributor,
          topic,
        };
      });
      return rows;
    };

    // Method to fetch the data and set the rows after transforming
    const fetchData = async () => {
      try {
        const data = await loader();
        const transformedRows = transformData(data);
        setRows(transformedRows);
        setFilteredRows(transformedRows);
      } catch (error) {
        console.error(error);
        redirect("/error");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Data inventory of organisations : health and institutional data</h1>
      </div>
      <div className="label-container">
        <label htmlFor="">table:</label>
        <label htmlFor="" className="label-item">
          filteroptions:
        </label>
      </div>
      <div className="flex-container">
        <Form method="post">
          <button
            type="submit"
            className="flex-item"
            onClick={() => setFilteredRows(handleFilterButtonClick(0, 0, rows))}
          >
            contextual data
          </button>
        </Form>
        <Form method="post">
          <button
            type="button"
            className="flex-item"
            onClick={() => setFilteredRows(handleFilterButtonClick(2, 1, rows))}
          >
            study location und source
          </button>
        </Form>
        <Form method="post">
          <button
            type="button"
            className="flex-item"
            onClick={() => setFilteredRows(handleFilterButtonClick(2, 2, rows))}
          >
            health and studylocation
          </button>
        </Form>
        <Form method="post">
          <button
            type="button"
            className="flex-item"
            onClick={() => setFilteredRows(handleFilterButtonClick(0, 0, rows))}
          >
            delete filter
          </button>
        </Form>
      </div>
      {rows.length > 0 && (
        <div>
          <DataGrid
            // Rows and colums for the Data-Grid
            rows={filteredRows.slice(1, 42)}
            columns={columns_config}
            // toolbar on top of the table
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
            pageSizeOptions={[10, 20, 30]}
          />
        </div>
      )}
    </>
  );
}
