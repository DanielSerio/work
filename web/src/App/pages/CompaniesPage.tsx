import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { useCompanyList } from "#hooks/queries";

export function CompaniesPage() {
  const companiesQuery = useCompanyList();
  return (
    <Page>
      <BreadcrumbNav />
      <div>CompaniesPage</div>
    </Page>
  );
}
