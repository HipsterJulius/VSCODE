/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Form, 
    useLoaderData,
    redirect, 
    useNavigate,
} from "react-router-dom";
import { updateTable } from "../tables";
import { csvToJson } from "../loader";

export async function action({ request, params }: { request: any, params: any }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const parsedData = await csvToJson(); // Warten auf die geparsten Daten
    await updateTable(params.tableId, updates, parsedData);
    return redirect(`/tables/${params.tableId}`);
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return redirect("/error"); // Zum Beispiel auf eine Fehlerseite umleiten
  }
}


export default function EditTable() {
  const { table } : any = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="table-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="First name"
          type="text"
          name="title"
          defaultValue={table.title}
        />
      </p>
      <label>
        <span>File</span>
          <input 
          id = "input"
          type="file" 
          name="file"
          accept=".csv"
          defaultValue={""}
          />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button"
          onClick={() => {
            navigate(-1);
          }}
        >Cancel
        </button>
      </p>
    </Form>
  );
}