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

const Transactions = Loader(
  lazy(() => import("src/content/applications/Transactions"))
);

// Applications
const DashBoard = Loader(
  lazy(() => import("src/content/applications/DashBoard"))
);
const ActionLog = Loader(
  lazy(() => import("src/content/applications/ActionLog"))
);
const CompanyList = Loader(
  lazy(() => import("src/content/applications/CompanyList"))
);
const StaffList = Loader(
  lazy(() => import("src/content/applications/StaffList"))
);
const SalesList = Loader(
  lazy(() => import("src/content/applications/SalesList"))
);
const SalesListDetails = Loader(
  lazy(() => import("src/content/applications/SalesListDetails"))
);
const CompanyDetails1 = Loader(
  lazy(() => import("src/content/applications/CompanyDetails1"))
);
const StaffDetails1 = Loader(
  lazy(() => import("src/content/applications/StaffDetails1"))
);
const Reports = Loader(lazy(() => import("src/content/applications/Reports")));
// const Setting = Loader(lazy(() => import("src/content/applications/Setting")));

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
    path: "company",
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
      {
        path: "companyDetails1",
        element: <CompanyDetails1 />,
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
        path: "salesListDetails",
        element: <SalesListDetails />,
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
  {
    path: "transactions",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="transactions" replace />,
      },
      {
        path: "transactions",
        element: <Transactions />,
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
