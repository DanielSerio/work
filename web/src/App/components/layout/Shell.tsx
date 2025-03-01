import { AppShell } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function Shell({ children }: PropsWithChildren) {
  return (
    <AppShell header={{ height: 48 }}>
      <AppShell.Header className="app-header">
        <a href="/#/">Timesheet Data</a>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
