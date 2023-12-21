interface CategoryMapping {
  [mainCategory: string]: string;
}

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
  const mainCategories = [];
  const mainCategoriesRows = [];

  for (var item in data) {
    mainCategories.push(item);
  }
  for (var item in rows[0]) {
    mainCategoriesRows.push(item);
  }

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

  for (const mainCategorie of mainCategories) {
    for (const row of rows) {
      for (const mainCategoriesRow of mainCategoriesRows) {
        const subCategory = categoryMapping[mainCategorie];
        if (subCategory && mainCategoriesRow === subCategory) {
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
  console.log(data);
  return data;
}

export function initializeDropDown(columnObject: any) {
  // Get the both drop down menus
  var columnSel = document.getElementById(
    "column_selection"
  ) as HTMLSelectElement;
  var valueSel = document.getElementById(
    "value_selection"
  ) as HTMLSelectElement;

  // change the dropdown values for the first and second field
  for (var x in columnObject) {
    if (x != undefined) {
      columnSel.options[columnSel.options.length] = new Option(x, x);
    }
  }
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
