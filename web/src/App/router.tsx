import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { CategoriesPage } from "#pages/CategoriesPage";
import { CompaniesPage } from "#pages/CompaniesPage";
import { DashboardPage } from "#pages/DashboardPage";
import { EntryPage } from "#pages/EntryPage";
import { ReportPage } from "#pages/ReportPage";
import { AppShell } from "@mantine/core";

const hashHistory = createHashHistory();

const rootRoute = createRootRoute({
  component: () => {
    return (
      <AppShell>
        <Outlet />
      </AppShell>
    );
  },
});

const getParentRoute = () => rootRoute;

const dashboardRoute = createRoute({
  getParentRoute,
  path: "/",
  component: DashboardPage,
});

const companiesRoute = createRoute({
  getParentRoute,
  path: "/companies",
  component: CompaniesPage,
});

const categoriesRoute = createRoute({
  getParentRoute,
  path: "/categories",
  component: CategoriesPage,
});

const reportRoute = createRoute({
  getParentRoute,
  path: "/report/:entryDate",
  component: ReportPage,
});

const entryRoute = createRoute({
  getParentRoute,
  path: "/enter/:entryDate",
  component: EntryPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  companiesRoute,
  categoriesRoute,
  reportRoute,
  entryRoute,
]);

export const router = createRouter({ routeTree, history: hashHistory });
