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

// Pages

// Applications

const Messenger = Loader(
  lazy(() => import("src/content/applications/Messenger"))
);
const Transactions = Loader(
  lazy(() => import("src/content/applications/Transactions"))
);
const UserProfile = Loader(
  lazy(() => import("src/content/applications/Users/profile"))
);
const UserSettings = Loader(
  lazy(() => import("src/content/applications/Users/settings"))
);

// Components

const Buttons = Loader(
  lazy(() => import("src/content/pages/Components/Buttons"))
);
const Modals = Loader(
  lazy(() => import("src/content/pages/Components/Modals"))
);
const Accordions = Loader(
  lazy(() => import("src/content/pages/Components/Accordions"))
);
const Tabs = Loader(lazy(() => import("src/content/pages/Components/Tabs")));
const Badges = Loader(
  lazy(() => import("src/content/pages/Components/Badges"))
);
const Tooltips = Loader(
  lazy(() => import("src/content/pages/Components/Tooltips"))
);
const Avatars = Loader(
  lazy(() => import("src/content/pages/Components/Avatars"))
);
const Cards = Loader(lazy(() => import("src/content/pages/Components/Cards")));
const Forms = Loader(lazy(() => import("src/content/pages/Components/Forms")));

// Status

const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/pages/Status/Maintenance"))
);

// Sign

const SignIn = Loader(lazy(() => import("src/content/signIn")));

const ChangePassword = Loader(lazy(() => import("src/content/changePassword")));

// TaskBoard

const TaskBoard = Loader(lazy(() => import("src/content/taskBoard")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <NonSidebarLayout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "taskBoard",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="taskBoard" replace />,
      },
      {
        path: "taskBoard",
        element: <TaskBoard />,
      },
      {
        path: "messenger",
        element: <Messenger />,
      },
    ],
  },
  {
    path: "account",
    element: <NonSidebarLayout />,
    children: [
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignIn />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "management",
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
      {
        path: "profile",
        children: [
          {
            path: "",
            element: <Navigate to="details" replace />,
          },
          {
            path: "details",
            element: <UserProfile />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/components",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="buttons" replace />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "accordions",
        element: <Accordions />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "badges",
        element: <Badges />,
      },
      {
        path: "tooltips",
        element: <Tooltips />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "forms",
        element: <Forms />,
      },
    ],
  },
];

export default routes;
