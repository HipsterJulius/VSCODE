/*
 * File to sum up the filter methods
 * Two diffrent filterMethods
 * Each has two diffrent filterModi
 */

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
  columnSel.value = "";
  valueSel.value = "";
  return rows;
};

export function filterDropDown(rows: any) {
  const columnSel = document.getElementById(
    "column_selection"
  ) as HTMLSelectElement;
  const valueSel = document.getElementById(
    "value_selection"
  ) as HTMLSelectElement;

  if (valueSel.value == "" || columnSel.value == "") {
    return rows;
  }

  if (columnSel.value == "ID") {
    return rows.filter((item: any) => item.id === valueSel.value);
  } else if (columnSel.value == "Study Location") {
    return rows.filter((item: any) => item.study_location === valueSel.value);
  }
}
