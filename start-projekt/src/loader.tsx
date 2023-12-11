import Papa from "papaparse";

// Hilfsfunktion, um die Daten zu parsen
function parse(url: any) {
  return new Promise((resolve, reject) => {
    const config = {
      download: true,
      encoding: "ISO-8859-1",
      complete: function (results: any) {
        const data = JSON.stringify(results.data, null, 2);
        resolve(data);
      },
      error: function (error: any) {
        reject(error);
      },
    };
    Papa.parse(url, config);
  });
}

// Funktion, die aufgerufen werden kann, um die Daten zu parsen
export async function csvToJson(url: string): Promise<any> {
  try {
    const parsedData = await parse(url);
    return parsedData;
  } catch (error) {
    console.error(error);
    throw new Error("Error parsing CSV");
  }
}
