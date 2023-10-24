import { 
    Form, 
    useLoaderData,
    useFetcher, 
  } from "react-router-dom";
  import { getIndicator,  updateIndicator } from '../indicators.js';
import { useEffect } from "react";
  

  export async function action({ request, params }: {request : any, params : any}) {
    let formData = await request.formData();
    return updateIndicator(params.indicatorId, {
      favorite: formData.get("favorite") === "true",
    });
    
  }
  
  export async function loader({ params }: {params : any}){
    const indicator = await getIndicator(params.indicatorId);
    
    if (!indicator) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return { indicator };
  }

 
  function createTable(data : any) {
    const tableBody = document.getElementById("table-body") as HTMLTableSectionElement;
    const jsonArray = JSON.parse(data);
   

    if (Array.isArray(jsonArray)) {
        (jsonArray as any[]).forEach(function (innerArray: any) {
          console.log("test")
            var row = tableBody.insertRow();
            if (Array.isArray(innerArray)) {
                innerArray.forEach(function (item: any) {
                    var cell = row.insertCell();
                    cell.textContent = item;
                });
            }
        });
    }
  }
  
  export function Indicator() {
    const { indicator }:any = useLoaderData();
    useEffect(() => {
      const tableBody = document.getElementById("table-body") as HTMLTableSectionElement;
      if (indicator.data && !tableBody.hasChildNodes()) {
        createTable(indicator.data);
      }
    }, [indicator.data]);

    return (
      <div id="indicator">
        
        <div>
          <h1>
            {indicator.title ? (
              <>
                {indicator.title}
              </>
            ) : (
              <i>No Name</i>
            )}{" "}
            <Favorite indicator={indicator} />
          </h1>
  
          {indicator.description && (
            <p>
              {indicator.description}
            </p>
          )}
  
          {indicator.file && (
            <p>
              {indicator.file}
            </p>
          )}
         
          <div id="table-container">
            <table className="table">
              <thead>
              </thead>
              <tbody id="table-body">

              </tbody>
            </table>
          </div>

          {indicator.test && (
            <p>
              {indicator.test}
            </p>
          )}
  
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
  
  function Favorite({ indicator }: any ) {
    const fetcher = useFetcher();
    // yes, this is a `let` for later
    let favorite = indicator.favorite;
    if (fetcher.formData) {
      favorite = fetcher.formData.get("favorite") === "true";
    }
  
    return (
      <fetcher.Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </fetcher.Form>
    );
  }
  