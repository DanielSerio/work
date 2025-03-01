import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const hashHistory = createHashHistory();

const rootRoute = createRootRoute();

const getParentRoute = () => rootRoute;

const dashboardRoute = createRoute({
  getParentRoute,
  path: "/",
  component: () => <>Dashboard</>,
});

const companiesRoute = createRoute({
  getParentRoute,
  path: "/companies",
  component: () => <>Companies</>,
});

const categoriesRoute = createRoute({
  getParentRoute,
  path: "/categories",
  component: () => <>Categories</>,
});

const reportRoute = createRoute({
  getParentRoute,
  path: "/report/:entryDate",
  component: () => <>Report</>,
});

const entryRoute = createRoute({
  getParentRoute,
  path: "/enter/:entryDate",
  component: () => <>Entry</>,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  companiesRoute,
  categoriesRoute,
  reportRoute,
  entryRoute,
]);

export const router = createRouter({ routeTree, history: hashHistory });
