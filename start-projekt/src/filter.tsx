/*
 * File to sum up the filter methods
 * Two diffrent filterMethods
 * Each has two diffrent filterModi
 */

interface CategoryMapping {
  [mainCategory: string]: string;
}

// Die Reihen nach dem Filter filtern
function filterRowsTable1(rows: any[][], number: number): any[][] {
  if (number == 0) {
    return rows;
  }
  if (number == 1) {
    return rows.filter(
      (item: any) =>
        item.study_location === "The Netherlands" && item.source === "CBS"
    );
  } else
    return rows.filter((item: any) => {
      // Überprüfen, ob der String in einer der Zellen enthalten ist
      const stringIsIncluded = Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes("social".toLowerCase())
      );
      const locationIsNetherlands = item.secondary_primary_data === "primary";

      return stringIsIncluded && locationIsNetherlands;
    });
}

// Die Reihen nach dem Filter filtern
function filterRowsTable2(rows: any[][], number: number): any[][] {
  if (number == 0) {
    return rows;
  }
  if (number == 1) {
    return rows.filter(
      (item: any) =>
        item.study_location === "The Netherlands" && item.source === "RIVM"
    );
  } else
    return rows.filter((item: any) => {
      // Überprüfen, ob der String in einer der Zellen enthalten ist
      const stringIsIncluded = Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes("health".toLowerCase())
      );
      const locationIsNetherlands = item.study_location === "The Netherlands";

      return stringIsIncluded && locationIsNetherlands;
    });
}

// Helpermethod to call the filterMethod with diffrent modi
// filterMethod:    which filter method should be called
// filterMode:      which filter should be called
export const handleFilterButtonClick = (
  filterMethod: number,
  filterMode: number,
  rows: any
): any => {
  const columnSel = document.getElementById(
    "column_selection"
  ) as HTMLSelectElement;
  const valueSel = document.getElementById(
    "value_selection"
  ) as HTMLSelectElement;
  if (filterMethod == 1) {
    const newFilteredRows = filterRowsTable1(rows, filterMode);
    return newFilteredRows;
  } else if (filterMethod == 2) {
    const newFilteredRows = filterRowsTable2(rows, filterMode);
    return newFilteredRows;
  }
  columnSel.selectedIndex = 0;
  valueSel.selectedIndex = 0;
  removeOptions(valueSel);
  return rows;
};

function removeOptions(selectElement: any) {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i > 0; i--) {
    selectElement.remove(i);
  }
}

export function filterDropDown(rows: any) {
  const categoryMapping: CategoryMapping = {
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
  const columnSel = document.getElementById(
    "column_selection"
  ) as HTMLSelectElement;
  const valueSel = document.getElementById(
    "value_selection"
  ) as HTMLSelectElement;

  if (valueSel.value == "" || columnSel.value == "") {
    return rows;
  }

  for (var x in categoryMapping) {
    if (x == columnSel.value) {
      const subCategory = categoryMapping[x];
      return rows.filter((item: any) => item[subCategory] === valueSel.value);
    }
  }
}
