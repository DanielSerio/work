import { TZDate } from "@date-fns/tz";
import { Card } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { dateStamp } from "src/lib/utilities/datetime";

export function DashboardActionsCard() {
  const today = new TZDate(new Date(), "America/New_York");
  const param = dateStamp(today);

  return (
    <Card shadow="md" withBorder>
      <header>
        <em>Actions</em>
      </header>

      <ul>
        <li>
          <Link to={`/report/${param}`}>Reports</Link>
        </li>
        <li>
          <Link to="/templates">Templates</Link>
        </li>
        <li>
          <Link to={`/entry/${param}`}>Enter Time</Link>
        </li>
      </ul>
    </Card>
  );
}
