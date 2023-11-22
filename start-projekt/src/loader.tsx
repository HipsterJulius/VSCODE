/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from 'papaparse';


export function parse(){
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

export async function csvToJson(): Promise<any> {
      try {
        const parsedData = await parse();
        return parsedData;
      } catch (error) {
        console.error(error);
        throw new Error('Error parsing CSV');
      }
}

/*
export function parseCsv(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        complete: function (results: any) {
          const data = JSON.stringify(results.data, null, 2);
          resolve(data);
        },
        error: function (error: any) {
          reject(error);
        },
      };
  
      Papa.parse(file, config);
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
  }*/