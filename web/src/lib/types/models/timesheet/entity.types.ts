export interface ClearableTimesheetCreate {
  companyId: number | null;
  categoryId: number | null;
  startTime: Date | null;
  endTime: Date | null;
  note: string | null;
}

export interface TimesheetRowRecord {
  companyId: number;
  categoryId: number;
  startTime: Date;
  endTime: Date;
  note: string | null;
}