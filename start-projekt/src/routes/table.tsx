/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Form, 
    useLoaderData,
  } from "react-router-dom";
import { getTable } from '../tables.js';
import { useEffect } from "react";
  
  
  export async function loader({ params }: {params : any}){
    const table = await getTable(params.tableId);
    
    if (!table) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { table };
  }

 
  function createTable(data : any) {
    const tableBody = document.getElementById("table-body") as HTMLTableSectionElement;
    const jsonArray = JSON.parse(data);

    if (Array.isArray(jsonArray)) {
        (jsonArray as any[]).forEach(function (innerArray: any) {
            const row = tableBody.insertRow();
            if (Array.isArray(innerArray)) {
                innerArray.forEach(function (item: any) {
                    const cell = row.insertCell();
                    cell.textContent = item;
                });
            }
        });
    }
  }
  
  export function Table() {
    const { table }:any = useLoaderData();
    useEffect(() => {
      const tableBody = document.getElementById("table-body") as HTMLTableSectionElement;
      if (table.data && !tableBody.hasChildNodes()) {
        createTable(table.data);
      }
    }, [table.data]);

    return (
      <div id="table">
        
        <div>
          <h1>
            {table.title ? (
              <>
                {table.title}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
          </h1>
         
          <div id="table-container">
            <table className="table">
              <thead>
              </thead>
              <tbody id="table-body">

              </tbody>
            </table>
          </div>
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="destroy"
              onSubmit={(event:any) => {
                if (
                  !confirm(
                    "Please confirm you want to delete this record."
                  )
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  