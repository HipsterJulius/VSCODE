import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import {
  Health_and_institutional_data_table,
  loader as DataLoader,
  action as HaIdAction,
} from "./routes/health_and_institutional_data";
import {
  Contextual_data_table,
  action as CdAction,
} from "./routes/contextual_data";

const rootElement: any = document.getElementById("root");

// Eine Seite laden, auf der die Tabelle zu sehen ist
const router = createBrowserRouter([
  {
    path: "/",
    element: <Health_and_institutional_data_table />,
    errorElement: <ErrorPage />,
    loader: DataLoader,
    action: HaIdAction,
  },
  {
    path: "contextual_data",
    element: <Contextual_data_table />,
    loader: DataLoader,
    action: CdAction,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
