import type { TimesheetRowRecord } from "#lib/types/models/timesheet/entity.types";
import { getTimesheetAddSchema } from "#lib/utilities/timesheet";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";

export function useTimesheetState(initialValues?: TimesheetRowRecord[]) {
  const timesheetForm = useForm({
    initialValues,
  });

  const addForm = useForm({
    validate: zodResolver(getTimesheetAddSchema()),
    mode: "controlled",
    initialValues: {
      companyId: null as null | number,
      categoryId: null as null | number,
      startTime: null as null | string,
      endTime: null as null | string,
      note: null as null | string,
    },
  });

  return {
    timesheetForm,
    addForm,
  };
}
