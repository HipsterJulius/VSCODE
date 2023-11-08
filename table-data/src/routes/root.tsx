import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getTables } from "../tables";


export async function loader() {
  const tables = await getTables("");
  return { tables };
}

  export default function Root() {
    const {tables}: any = useLoaderData();

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
          {tables.length ? (
            <ul>
              {tables.map((table : any) => (
                <li key={table.id}>
                  <Link to={`tables/${table.id}`}>
                    {table.title ? (
                      <>
                        {table.title}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No tables</i>
            </p>
          )}
          </nav>
        </div>
        <div id="detail"><Outlet/></div>
      </>
    );
  }
