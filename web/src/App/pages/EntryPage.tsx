import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { DateNavigator } from "#components/navigation/DateNavigator";

export function EntryPage() {
  return (
    <Page>
      <BreadcrumbNav />
      <DateNavigator baseURL="/entry/" />
      <div>EntryPage</div>
    </Page>
  );
}
