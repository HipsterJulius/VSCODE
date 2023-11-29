import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import { Filter, loader as filterLoader } from "./routes/headerfilter";

const rootElement : any = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Filter />,
    errorElement: <ErrorPage />,
    loader: filterLoader,
  },
]);


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);