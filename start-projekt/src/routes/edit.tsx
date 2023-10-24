import { 
    Form, 
    useLoaderData,
    redirect, 
    useNavigate,
} from "react-router-dom";
import { updateIndicator } from "../indicators";
import Papa from 'papaparse';

export async function action({ request, params }: { request: any, params: any }) {
  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const parsedData = await csvToJson(); // Warten auf die geparsten Daten
    //const data = JSON.stringify(parsedData, null, 2);
    //console.log(data); // Hier stehen die geparsten Daten zur Verfügung
    await updateIndicator(params.indicatorId, updates, parsedData);
    return redirect(`/indicators/${params.indicatorId}`);
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return redirect("/error"); // Zum Beispiel auf eine Fehlerseite umleiten
  }
}

function parseCsv(file: File): Promise<any> {
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

async function csvToJson(): Promise<any> {
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


export default function EditIndicator() {
  const { indicator } : any = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="indicator-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="First name"
          type="text"
          name="title"
          defaultValue={indicator.title}
        />
      </p>
      <label>
        <span>Description</span>
          <input
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={indicator.description}
          />
      </label>
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
      <label>
        <span>Test</span>
          <input 
          type="text" 
          name="test"
          placeholder="test"
          defaultValue={indicator.test}
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