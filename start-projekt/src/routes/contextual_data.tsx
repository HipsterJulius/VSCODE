import { useEffect, useState } from "react";
import "react-data-grid/lib/styles.css";
import { csvToJson } from "../loader";
import { Form, redirect } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns_config, getFilteredRows } from "../table-config";
import { filterDropDown, handleFilterButtonClick } from "../filter";
import {
  getDropDownColumns,
  getDropDownItems,
  initializeDropDown,
} from "../drop-down";

export async function loader() {
  try {
    const url: string =
      "https://raw.githubusercontent.com/HipsterJulius/VSCODE/table/start-projekt/public/contextual_data.csv";
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

export function Contextual_data_table() {
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

    // Helpermethod to fetch the data and set the rows after transforming
    const fetchData = async () => {
      try {
        const data = await loader();
        const transformedRows = transformData(data);

        // Codeblock to set the dropdown menu andfilter
        const columnObject = getDropDownColumns(columns_config);
        getDropDownItems(columnObject, transformedRows);
        initializeDropDown(columnObject);

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
        <h1>Data inventory of organisations: contextual data</h1>
      </div>
      <div className="menu-flex">
        <div className="table-flex">
          <label className="flex-item">Push the button to switch tables:</label>
          <Form method="post" className="flex-item">
            <button
              type="submit"
              onClick={() =>
                setFilteredRows(handleFilterButtonClick(0, 0, rows))
              }
            >
              health and institutional data
            </button>
          </Form>
        </div>

        <div className="presetfilter-flex">
          <label className="flex-item">
            Preset filter options with two columns:
          </label>
          <div className="button-flex">
            <Form method="post" className="flex-item">
              <button
                type="button"
                onClick={() =>
                  setFilteredRows(handleFilterButtonClick(1, 1, rows))
                }
              >
                study location und source
              </button>
            </Form>
            <Form method="post" className="flex-item">
              <button
                type="button"
                onClick={() =>
                  setFilteredRows(handleFilterButtonClick(1, 2, rows))
                }
              >
                social and primary/secondary
              </button>
            </Form>
          </div>
        </div>
        <div className="selectfilter-flex">
          <label className="flex-item">Select own filter:</label>
          <Form className="flex-item">
            <div>
              <select
                name="filter"
                id="column_selection"
                onChange={() => setFilteredRows(filterDropDown(rows))}
              >
                <option value="">Select column</option>
              </select>
              <select
                name="filter"
                id="value_selection"
                onChange={() => setFilteredRows(filterDropDown(rows))}
              >
                <option value="">Select value</option>
              </select>
            </div>
          </Form>
        </div>
        <div className="delete-flex">
          <label className="flex-item">Delete all filters:</label>
          <Form method="post" className="flex-item">
            <button
              type="button"
              onClick={() =>
                setFilteredRows(handleFilterButtonClick(0, 0, rows))
              }
            >
              delete filter
            </button>
          </Form>
        </div>
      </div>

      {rows.length > 0 && (
        <div>
          <DataGrid
            // Rows and colums for the Data-Grid
            rows={getFilteredRows(filteredRows, rows)}
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
