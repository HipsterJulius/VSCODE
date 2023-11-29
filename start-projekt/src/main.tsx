import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import { Filter, loader as filterLoader, action as filterAction } from "./routes/headerfilter";
import {AnotherTable, action as tableAction} from "./routes/anotherTable";

const rootElement: any = document.getElementById("root");

// Eine Seite laden, auf der die Tabelle zu sehen ist
const router = createBrowserRouter([
  {
    path: "/",
    element: <Filter />,
    errorElement: <ErrorPage />,
    loader: filterLoader,
    action: filterAction,
  },
      {
        path: "headerfilters/anotherTable",
        element: <AnotherTable />,
        loader: filterLoader,
        action: tableAction,
        errorElement: <ErrorPage />,
      },
    
  
]);

console.log("Router Configuration:", router);


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
