import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { Anchor, Breadcrumbs } from "@mantine/core";

export function CompaniesPage() {
  return (
    <Page>
      <BreadcrumbNav />
      <div>CompaniesPage</div>
    </Page>
  );
}
