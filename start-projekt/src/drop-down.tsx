import { categoryMapping } from "./table-config";

// Method to extract the dropdown-informations from the data object
export function getDropDownColumns(columns_config: any) {
  const dropDownColumns: any = {};
  for (const item of columns_config) {
    const headerName = item.headerName;
    if (!(headerName in dropDownColumns)) {
      dropDownColumns[headerName] = {};
    }
  }
  return dropDownColumns;
}

/*
 * Method to extract the dropdown-elements from the data
 * based on the main and subcategories
 */
export function getDropDownItems(data: any, rows: any) {
  const mainCategories = Object.keys(data);
  const mainCategoriesRows = Object.keys(rows[0]);
  for (const mainCategory of mainCategories) {
    const subCategory = categoryMapping[mainCategory];

    if (subCategory && mainCategoriesRows.includes(subCategory)) {
      for (const row of rows) {
        const value = row[subCategory];

        if (
          value &&
          (!Array.isArray(data[mainCategory]) ||
            !data[mainCategory].includes(value))
        ) {
          if (Array.isArray(data[mainCategory])) {
            data[mainCategory].push(value);
          } else {
            data[mainCategory] = [data[mainCategory], value];
          }
        }
      }
    }
    data[mainCategory] =
      Array.isArray(data[mainCategory]) &&
      data[mainCategory].length === rows.length
        ? data[mainCategory].slice(2)
        : data[mainCategory];
  }

  return data;
}

// Method to initialize both dropdown menus
export function initializeDropDown(columnObject: any) {
  // Get the both drop down menus
  var columnSel = document.getElementById(
    "column_selection"
  ) as HTMLSelectElement;
  var valueSel = document.getElementById(
    "value_selection"
  ) as HTMLSelectElement;

  // create the dropdown values for the first selection
  for (var x in columnObject) {
    if (x != undefined) {
      columnSel.options[columnSel.options.length] = new Option(x, x);
    }
  }
  // if the first selection changes,
  //the values for the second selection change and need to be created
  columnSel.onchange = function () {
    valueSel.length = 1;
    var z = columnObject[columnSel.value];
    if (z != undefined) {
      for (var i = 0; i < z.length; i++) {
        valueSel.options[valueSel.options.length] = new Option(z[i], z[i]);
      }
    }
  };
}
