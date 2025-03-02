import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { EntityTable } from "#components/tables/EntityTable/EntityTable";
import { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import { useCategoryList } from "#hooks/queries";

export function CategoriesPage() {
  const categoriesQuery = useCategoryList();
  const operations = useSimpleEntityOperations("categories");

  return (
    <Page>
      <BreadcrumbNav />
      <EntityTable
        records={categoriesQuery.data}
        isLoading={categoriesQuery.isLoading}
      />
    </Page>
  );
}
