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
import { Filter } from "./routes/headerfilter";

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
            //loader: filterLoader,
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

/*
const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
})

const theme = extendTheme({ 
  components: {
    Button,
  },
})

      <ChakraProvider theme={theme}>
      </ChakraProvider>
*/

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);