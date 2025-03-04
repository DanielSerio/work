import { EntitySelect, TimeField } from "#components/controls";
import type { useTimesheetState } from "#hooks/state/useTimesheetState";
import { useEffect } from "react";

export type TimesheetRowAddRecord = {
  companyId: string;
  categoryId: string;
  startTime: string;
  endTime: string;
  note: null | string;
};

export function TimesheetAddRow({
  entryDate,
  controller,
  onSubmit,
}: {
  entryDate: string;
  controller: ReturnType<typeof useTimesheetState>["addForm"];
  onSubmit: (values: TimesheetRowAddRecord) => void;
}) {
  useEffect(() => {
    controller.validate();
  }, [
    controller.values.companyId,
    controller.values.categoryId,
    controller.values.startTime,
    controller.values.endTime,
  ]);

  const getTimeString = (value: Date | string | null) => {
    if (value === null) return "";
    if (typeof value === "object") {
      const y = value.getUTCFullYear();
      const m = value.getUTCMonth() + 1;
      const d = value.getUTCDate();
      const hh = value.getUTCHours();
      const mm = value.getUTCMinutes();

      const pad = (n: number) => `${n}`.padStart(2, "0");

      return `${y}-${pad(m)}-${pad(d)} ${pad(hh)}:${pad(mm)}`;
    }
  };

  return (
    <div>
      <div className="row">
        <EntitySelect
          entity="companies"
          {...controller.getInputProps("companyId")}
          //value={controller.values.companyId ?? ""}
        />
        <EntitySelect
          entity="categories"
          {...controller.getInputProps("categoryId")}
          //value={controller.values.categoryId ?? ""}
        />
        <TimeField
          value={getTimeString(controller.values.startTime)}
          onChange={(e) => {
            controller.setFieldValue(
              "startTime",
              `${entryDate} ${e.target.value}:00.000`
            );
          }}
        />
        <TimeField
          value={getTimeString(controller.values.endTime)}
          onChange={(e) => {
            console.info(e.target.value);
            controller.setFieldValue(
              "endTime",
              `${entryDate} ${e.target.value}:00.000`
            );
          }}
        />
        <button
          onClick={() =>
            onSubmit(controller.values as unknown as TimesheetRowAddRecord)
          }
        >
          Add
        </button>
      </div>
      <div>
        {!!controller.errors && (
          <>
            <div>{controller.errors.companyId}</div>
            <div>{controller.errors.categoryId}</div>
            <div>{controller.errors.startTime}</div>
            <div>{controller.errors.endTime}</div>
          </>
        )}
      </div>
    </div>
  );
}
