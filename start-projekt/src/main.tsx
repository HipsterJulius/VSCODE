/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { 
  //ChakraProvider, 
  //defineStyleConfig, 
  //extendTheme 
} from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { 
  loader as rootLoader,
  action as rootAction 
} from "./routes/root";
import ErrorPage from "./error-page";
import {loader as tableLoader,  Table} from "./routes/table";
import EditTable, {action as editAction} from "./routes/edit";
import {action as destroyAction} from "./routes/destroy";
import Index from "./routes/index";
import { Filter, loader as filterLoader } from "./routes/headerfilter";

const rootElement : any = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "tables/:headerfilter",
            element: <Filter />,
            loader: filterLoader,
          },
          {
            path: "tables/:tableId",
            element: <Table />,
            loader: tableLoader,
          },
          {
            path: "tables/:tableId/edit",
            element: <EditTable />,
            loader: tableLoader,
            action: editAction,
          },
          {
            path: "tables/:tableId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error!</div>
          }
        ],
      },
    ],
  },
]);


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);