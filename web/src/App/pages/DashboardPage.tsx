import { Page } from "#components/layout/Page";
import { Link } from "@tanstack/react-router";

export function DashboardPage() {
  return (
    <Page>
      <div>
        <section>
          <h1>Companies Data Breakdown</h1>
          <Link to="/companies">Companies</Link>
        </section>
        <section>
          <h1>Categories Data Breakdown</h1>
          <Link to="/categories">Categories</Link>
        </section>
        <section>
          <h1>Actions</h1>
          <ul>
            <li>
              <Link to="/report/2025-03-01">Reports</Link>
            </li>
            <li>
              <Link to="/templates">Templates</Link>
            </li>
            <li>
              <Link to="/entry/2025-03-01">Enter Time</Link>
            </li>
          </ul>
        </section>
      </div>
    </Page>
  );
}
