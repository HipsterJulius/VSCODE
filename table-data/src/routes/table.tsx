import { Form } from "react-router-dom";

export default function Table() {
  const table = {
    title: "Title",
    file: "deineCsv.csv",
  };

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

        <div>
        {table.file && <p>{table.file}</p>}
        </div>

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event : any) => {
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