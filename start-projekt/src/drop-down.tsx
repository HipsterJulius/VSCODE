// Method to create the drop down menus
export function getDropDownColumns(columns_config: any) {
  const transformedData: any = {};
  for (const item of columns_config) {
    const headerName = item.headerName;

    if (!(headerName in transformedData)) {
      transformedData[headerName] = {};
    }
  }
  return transformedData;
}

export function getDropDownItems(data: any, rows: any) {
  const mainCategories = ["ID", "Study Location"];
  const mainCategoriesRows = ["id", "study_location"];

  for (const mainCategorie of mainCategories) {
    for (const row of rows) {
      for (const mainCategoriesRow of mainCategoriesRows) {
        if (
          (mainCategorie == "ID" && mainCategoriesRow == "id") ||
          (mainCategorie == "Study Location" &&
            mainCategoriesRow == "study_location")
        ) {
          if (row[mainCategoriesRow]) {
            if (Array.isArray(data[mainCategorie])) {
              if (!data[mainCategorie].includes(row[mainCategoriesRow])) {
                data[mainCategorie].push(row[mainCategoriesRow]);
              }
            } else {
              data[mainCategorie] = [
                data[mainCategorie],
                row[mainCategoriesRow],
              ];
            }
          }
        }
      }
    }
    data[mainCategorie].splice(0, 2);
  }

  return data;
}

export function initializeDropDown(columnObject: any, subCategories: any) {
  // Get the both drop down menus
  var columnSel = document.getElementById(
    "column_selection"
  ) as HTMLSelectElement;
  var valueSel = document.getElementById(
    "value_selection"
  ) as HTMLSelectElement;
  // change the dropdown values for the first and second field
  for (var x in columnObject) {
    columnSel.options[columnSel.options.length] = new Option(x, x);
  }
  columnSel.onchange = function () {
    valueSel.length = 1;
    var z = subCategories[columnSel.value];
    if (z != undefined) {
      for (var i = 0; i < z.length; i++) {
        valueSel.options[valueSel.options.length] = new Option(z[i], z[i]);
      }
    }
  };
}
