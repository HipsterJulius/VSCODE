/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    Outlet,
    NavLink,
    Link,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { getTables, createTable } from "../tables";
import { useEffect } from "react";

 export async function loader({ request }: {request : any}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q.");
    const tables = await getTables(q);
    return { tables, q };
  }

 export async function action() {
    const table = await createTable();
    return redirect(`/tables/${table.id}/edit`);
  }

 export default function Root() {
    const { tables , q}:any = useLoaderData();
    
    
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    useEffect(() => {
        const qElement = document.getElementById("q");
        if (qElement) {
          qElement?.setAttribute("value", q);
        }
      }, [q]);
      
    return (
      <>
        <div id="sidebar">
          <h1>React Router Tables</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search tables"
                placeholder="Search..."
                type="search"
                name="q"
                defaultValue= {""}
                onChange={(event) => {
                    const isFirstSearch = q == null;
                    submit(event.currentTarget.form, {
                        replace: !isFirstSearch,
                    });
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
                />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {tables.length ? (
                <ul>
                {tables.map((table : any) => (
                    <li key={table.id}>
                        <NavLink
                            to={`tables/${table.id}`}
                            className={({ isActive, isPending }: {isActive:any, isPending:any}) =>
                         isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                            }
                        >
                            <Link to={`tables/${table.id}`}>
                            {table.title ? (
                            <>
                                {table.title}
                            </>
                            ) : (
                            <i>No Name</i>
                            )}{" "}
                            </Link>
                        </NavLink>
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
        <div id="detail"
        className={
            navigation.state === "loading" ? "loading" : ""
        }
        >
            <Outlet />
        </div>
      </>
    );
  }

