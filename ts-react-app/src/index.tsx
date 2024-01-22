import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ComponentClaim from './routes/ReactGrammer/ComponentClaim'
import ImportExport from './routes/ImportExport'
import ReactChildren from './routes/ReactGrammer/ReactChildren';
import CounterUseHooks from './routes/ReactGrammer/UsePrevious'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: '/importExportGrammer',
    element: <ImportExport />,
  },
  {
    path: "/reactGrammer/componentClaim",
    element: <ComponentClaim />,
  },
  {
    path: '/reactGrammer/reactChildren',
    element: <ReactChildren />,
  },
  {
    path: '/reactGrammer/usePrevious',
    element: <CounterUseHooks />,
  },

]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);