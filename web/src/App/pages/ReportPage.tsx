import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { DateNavigator } from "#components/navigation/DateNavigator";

export function ReportPage() {
  return (
    <Page>
      <BreadcrumbNav />
      <DateNavigator baseURL="/report/" />
      <div>ReportPage</div>
    </Page>
  );
}
