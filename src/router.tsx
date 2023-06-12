import { Suspense, lazy } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";

import SidebarLayout from "src/layouts/SidebarLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import NonSidebarLayout from "./layouts/NonSidebarLayout";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );


// Sign
const SignIn = Loader(lazy(() => import("src/content/signIn")));

// Applications
const DashBoard = Loader( lazy(() => import("src/content/applications/DashBoard")) );
const ActionLog = Loader( lazy(() => import("src/content/applications/ActionLog")) );
const CompanyList = Loader( lazy(() => import("src/content/applications/CompanyList")) );
const ContactPersonList = Loader( lazy(() => import("src/content/applications/ContactPersonList")) );
const Lists = Loader( lazy(() => import("src/content/applications/Lists")) );
const Reports = Loader( lazy(() => import("src/content/applications/Reports")) );
const Setting = Loader( lazy(() => import("src/content/applications/Setting")) );

const routes: RouteObject[] = [
  {
    path: "",
    element: <NonSidebarLayout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      }
    ],
  },
  {
    path: "dashBoard",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="dashBoard" replace />,
      },
      {
        path: "dashBoard",
        element: <DashBoard />,
      },
    ],
  },
  {
    path: "companyList",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="companyList" replace />,
      },
      {
        path: "companyList",
        element: <CompanyList />,
      },
    ],
  },
  {
    path: "contactPersonList",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="contactPersonList" replace />,
      },
      {
        path: "contactPersonList",
        element: <ContactPersonList />,
      },
    ],
  },
  {
    path: "lists",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="lists" replace />,
      },
      {
        path: "lists",
        element: <Lists />,
      },
    ],
  },
  {
    path: "reports",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="reports" replace />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "actionLog",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="actionLog" replace />,
      },
      {
        path: "actionLog",
        element: <ActionLog />,
      },
    ],
  },
  {
    path: "setting",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="setting" replace />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
];
export default routes;
