import { Button, Flex } from "@mantine/core";
import { TbReport } from "react-icons/tb";

import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { DateNavigator } from "#components/navigation/DateNavigator";
import { useTimesheetState } from "#hooks/state/useTimesheetState";
import { TimesheetAddRow } from "#components/control-groups";

export function EntryPage() {
  const { addForm } = useTimesheetState();
  return (
    <Page>
      <BreadcrumbNav />
      <DateNavigator baseURL="/entry/" />
      <Flex justify={"end"} align={"center"} my={24}>
        <Button variant="subtle" size="sm" rightSection={<TbReport />}>
          View Report
        </Button>
      </Flex>
      <TimesheetAddRow entryDate="2025-03-03" controller={addForm} />
    </Page>
  );
}
