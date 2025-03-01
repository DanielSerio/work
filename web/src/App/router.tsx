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
import { Shell } from "#components/layout/Shell";
import { TemplatesPage } from "#pages/TemplatesPage";

const hashHistory = createHashHistory();

const rootRoute = createRootRoute({
  component: () => {
    return (
      <Shell>
        <Outlet />
      </Shell>
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
  path: "/report/$entryDate",
  component: ReportPage,
});

const entryRoute = createRoute({
  getParentRoute,
  path: "/entry/$entryDate",
  component: EntryPage,
});

const templatesRoute = createRoute({
  getParentRoute,
  path: "/templates",
  component: TemplatesPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  companiesRoute,
  categoriesRoute,
  reportRoute,
  entryRoute,
  templatesRoute,
]);

export const router = createRouter({ routeTree, history: hashHistory });
