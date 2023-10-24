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
import { getIndicators, createIndicator } from "../indicators";
import { useEffect } from "react";

 export async function loader({ request }: {request : any}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q.");
    const indicators = await getIndicators(q);
    return { indicators, q };
  }

 export async function action() {
    const indicator = await createIndicator();
    return redirect(`/indicators/${indicator.id}/edit`);
  }

 export default function Root() {
    const { indicators , q}:any = useLoaderData();
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
          <h1>React Router Indicators</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search indicators"
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
            {indicators.length ? (
                <ul>
                {indicators.map((indicator : any) => (
                    <li key={indicator.id}>
                        <NavLink
                            to={`indicators/${indicator.id}`}
                            className={({ isActive, isPending }: {isActive:any, isPending:any}) =>
                         isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                            }
                        >
                            <Link to={`indicators/${indicator.id}`}>
                            {indicator.title ? (
                            <>
                                {indicator.title}
                            </>
                            ) : (
                            <i>No Name</i>
                            )}{" "}
                            {indicator.favorite && <span>★</span>}
                            </Link>
                        </NavLink>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>No indicators</i>
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

