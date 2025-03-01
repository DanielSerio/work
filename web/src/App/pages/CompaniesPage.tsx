import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import { useCompanyList } from "#hooks/queries";

export function CompaniesPage() {
  const companiesQuery = useCompanyList();
  const operations = useSimpleEntityOperations("companies");

  return (
    <Page>
      <BreadcrumbNav />
      <div>CompaniesPage</div>
    </Page>
  );
}
