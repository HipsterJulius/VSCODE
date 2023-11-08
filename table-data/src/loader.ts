import Papa from 'papaparse'
import * as fs from 'fs'; // Node.js File System Modul (nur für serverseitige Anwendungen)


export function parseCsv(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err: any, data: any) => {
        if (err) {
            reject(err);
        } else {
            const config = {
                complete: function (results: any) {
                    const parsedData = results.data;
                    resolve(parsedData);
                },
                error: function (error: any) {
                    reject(error);
                },
            };
            Papa.parse(data, config);
        }
    });
});
}


  
export async function csvToJson(): Promise<any> {
    const input: any = document.getElementById('input');
    if (input) {
      const file = input.files[0];
      if (file) {
        try {
          const parsedData = await parseCsv(file);
          return parsedData;
        } catch (error) {
          console.error(error);
          throw new Error('Error parsing CSV');
        }
      } else {
        throw new Error('No file selected');
      }
    } else {
      throw new Error('Input element not found');
    }
  }