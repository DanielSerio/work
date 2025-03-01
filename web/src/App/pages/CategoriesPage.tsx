import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { useCategoryList } from "#hooks/queries";

export function CategoriesPage() {
  const categoriesQuery = useCategoryList();

  return (
    <Page>
      <BreadcrumbNav />
      <div>CategoriesPage</div>
    </Page>
  );
}
