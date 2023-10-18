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
const ChangePassword = Loader(lazy(() => import("src/content/changePassword")));

// Applications
const DashBoard = Loader(
  lazy(() => import("src/content/applications/DashBoard"))
);
const ActionLog = Loader(
  lazy(() => import("src/content/applications/ActionLog"))
);
const CorporationList = Loader(
  lazy(() => import("src/content/applications/CorporationList"))
);
const StaffList = Loader(
  lazy(() => import("src/content/applications/StaffList"))
);
const SalesList = Loader(
  lazy(() => import("src/content/applications/SalesList"))
);
const SalesListCorporationDetails = Loader(
  lazy(() => import("src/content/applications/SalesListCorporationDetails"))
);
const SalesListStaffDetails = Loader(
  lazy(() => import("src/content/applications/SalesListStaffDetails"))
);
const SalesListImportDetails = Loader(
  lazy(() => import("src/content/applications/SalesListImportDetails"))
);
const CorporationDetails1 = Loader(
  lazy(() => import("src/content/applications/CorporationDetails1"))
);
const CorporationDetails2 = Loader(
  lazy(() => import("src/content/applications/CorporationDetails2"))
);
const StaffDetails1 = Loader(
  lazy(() => import("src/content/applications/StaffDetails1"))
);
const StaffDetails2 = Loader(
  lazy(() => import("src/content/applications/StaffDetails2"))
);
const ImportDetails = Loader(
  lazy(() => import("src/content/applications/ImportDetails"))
);

const Reports = Loader(lazy(() => import("src/content/applications/Reports")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <NonSidebarLayout />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "account",
    element: <NonSidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="signIn" replace />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "task",
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
    path: "corporation",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="corporationList" replace />,
      },
      {
        path: "corporationList",
        element: <CorporationList />,
      },
      {
        path: "corporationDetails1",
        element: <CorporationDetails1 />,
      },
    ],
  },
  {
    path: "staff",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="staffList" replace />,
      },
      {
        path: "staffList",
        element: <StaffList />,
      },
      {
        path: "staffDetails1",
        element: <StaffDetails1 />,
      },
    ],
  },
  {
    path: "salesTask",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="salesList" replace />,
      },
      {
        path: "salesList",
        element: <SalesList />,
      },
      {
        path: "salesListCorporationDetails",
        element: <SalesListCorporationDetails />,
      },
      {
        path: "salesListStaffDetails",
        element: <SalesListStaffDetails />,
      },
      {
        path: "salesListImportDetails",
        element: <SalesListImportDetails />,
      },
      {
        path: "corporationDetails2",
        element: <CorporationDetails2 />,
      },
      {
        path: "staffDetails2",
        element: <StaffDetails2 />,
      },
      {
        path: "ImportDetails",
        element: <ImportDetails />,
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
    path: "action",
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
  // {
  //   path: "setting",
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: "",
  //       element: <Navigate to="setting" replace />,
  //     },
  //     {
  //       path: "setting",
  //       element: <Setting />,
  //     },
  //   ],
  // },
];
export default routes;
