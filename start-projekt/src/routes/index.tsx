import { Form, redirect } from "react-router-dom";

export async function action() {
  return redirect(`contextual_data`);
}

export function Index() {
  return (
    <>
      <div className="header">
        <h1>Data inventory of organisations</h1>
      </div>
      <div className="button-flex">
        <label>Push the buttons to get to the tables:</label>
        <Form className="flex-item" method="post">
          <button type="submit">To the tables</button>
        </Form>
      </div>
    </>
  );
}
