import { 
    Form, 
    useLoaderData,
    redirect, 
    useNavigate,
} from "react-router-dom";
import { updateIndicator } from "../indicators";

export async function action({request, params}: {request : any, params : any}){
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateIndicator(params.indicatorId, updates);
    return redirect(`/indicators/${params.indicatorId}`);
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
          placeholder="File"
          aria-label="Avatar URL"
          type="text"
          name="file"
          defaultValue={indicator.file}
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