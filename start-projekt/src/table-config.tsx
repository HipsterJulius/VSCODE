import { GridColDef, GridRowProps } from "@mui/x-data-grid";

//Interface to map the category from a column to the variable name
export interface CategoryMapping {
  [mainCategory: string]: string;
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
export const columns_config: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    sortable: true,
    width: 65,
    align: "center",
    type: "number",
  },
  { field: "name", headerName: "Name", sortable: true, width: 350 },
  { field: "source", headerName: "Source", sortable: false, width: 200 },
  {
    field: "study_location",
    headerName: "Study Location",
    sortable: false,
    width: 200,
    type: "singleSelect",
    valueOptions: [
      "The Netherlands",
      "Lower Saxony",
      "Whole of the Netherlands",
      "Groningen",
      "Drenthe",
      "Germany",
      "European Union",
      "Germany/Netherlands (and other EU-countries)",
      "Groningen, Friesland, Drenthe",
    ],
  },
  {
    field: "geographical",
    headerName: "Geographical",
    sortable: false,
    width: 200,
  },
  {
    field: "study_period",
    headerName: "Study Period",
    sortable: false,
    width: 200,
  },
  { field: "time_unit", headerName: "Time Unit", sortable: false, width: 200 },
  {
    field: "number_of_cases",
    headerName: "Number of cases",
    sortable: false,
    width: 200,
  },
  { field: "variables", headerName: "Variables", sortable: false, width: 200 },
  {
    field: "qualitative_quantitative",
    headerName: "Qualitative/Quantitative",
    sortable: false,
    width: 200,
    align: "center",
    type: "singleSelect",
    valueOptions: ["qualitative", "quantitative", "quantitative/qualitative"],
  },
  {
    field: "secondary_primary_data",
    headerName: "Secondary or primary data",
    sortable: false,
    width: 200,
  },
  {
    field: "aggregated_individual_data",
    headerName: "Aggregated/Individual Data",
    sortable: false,
    width: 250,
  },
  { field: "access", headerName: "Access", sortable: false, width: 200 },
  { field: "cost", headerName: "Cost", sortable: false, width: 150 },
  { field: "url", headerName: "URL", sortable: false, width: 200 },
  {
    field: "contact_detail",
    headerName: "Contact detail",
    sortable: false,
    width: 200,
  },
  {
    field: "data_quality_limitations",
    headerName: "Data Quality/ Limitations",
    sortable: false,
    width: 200,
  },
  { field: "comments", headerName: "Comments", sortable: false, width: 200 },
  {
    field: "contributor",
    headerName: "Contributor",
    sortable: false,
    width: 100,
  },
  { field: "topic", headerName: "Topic", sortable: false, width: 150 },
];

//All categorys mapping with the "variable" names
export const categoryMapping: CategoryMapping = {
  ID: "id",
  Name: "name",
  Source: "source",
  "Study Location": "study_location",
  Geographical: "geographical",
  "Study Period": "study_period",
  "Time Unit": "time_unit",
  "Number of cases": "number_of_cases",
  Variables: "variables",
  "Qualitative/Quantitative": "qualitative_quantitative",
  "Secondary or primary data": "secondary_primary_data",
  "Aggregated/Individual Data": "aggregated_individual_data",
  Access: "access",
  Cost: "cost",
  URL: "url",
  "Contact detail": "contact_detail",
  "Data Quality/ Limitations": "data_quality_limitations",
  Comments: "comments",
  Contributor: "contributor",
  Topic: "topic",
};

// Method to create a GridRowProps[] object with the filtered rows
export function getFilteredRows(
  filteredRows: any[],
  rows: any[]
): GridRowProps[] {
  if (filteredRows.length) {
    if (filteredRows.length == rows.length) {
      return filteredRows.slice(1, rows.length - 1);
    } else return filteredRows;
  } else {
    return [];
  }
}
