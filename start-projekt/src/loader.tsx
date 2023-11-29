import Papa from 'papaparse';

// Hilfsfunktion, um die Daten zu parsen
function parse(){
  return new Promise((resolve, reject) => {
    const config = {
      download : true,
      complete: function (results: any) {
        const data = JSON.stringify(results.data, null, 2);
        resolve(data);
      },
      error: function (error: any) {
        reject(error);
      },
    };
    const url = "https://raw.githubusercontent.com/HipsterJulius/VSCODE/table/start-projekt/public/Data_inventory_of_organisations.csv";
    Papa.parse(url, config);
  });
}

// Funktion, die aufgerufen werden kann, um die Daten zu parsen
export async function csvToJson(): Promise<any> {
      try {
        const parsedData = await parse();
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error('Error parsing CSV');
      }
}