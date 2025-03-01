import { CategoryBreakdownCard } from "#components/cards/CategoryBreakdownCard";
import { CompanyBreakdownCard } from "#components/cards/CompanyBreakdownCard";
import { DashboardActionsCard } from "#components/cards/DashboardActionsCard";
import { Page } from "#components/layout/Page";

export function DashboardPage() {
  return (
    <Page>
      <section className="dashboard-cards" id="cards">
        <CompanyBreakdownCard />
        <CategoryBreakdownCard />
        <DashboardActionsCard />
      </section>
    </Page>
  );
}
