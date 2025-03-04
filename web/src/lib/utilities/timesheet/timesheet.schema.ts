import type { ClearableTimesheetCreate } from "#lib/types/models/timesheet/entity.types";
import { isAfter, isSameMinute } from "date-fns";
import { z, ZodSchema } from "zod";


export const getTimesheetAddSchema = () => {
  const transformTime = (v: string | Date | null) => {
    if (!!v) {
      if (typeof v === 'object') {
        return v;
      }

      return new Date(`${v}Z`);
    }

    return null;
  };

  const transformId = (v: number | null) => {
    if (v === null || v < 1) {
      return null;
    }

    return ~~v;
  };

  return z.object({
    companyId: z.coerce.number().int().positive().nullable().transform(transformId),
    categoryId: z.coerce.number().int().positive().nullable().transform(transformId),
    startTime: z.coerce.date().nullable().transform(transformTime),
    endTime: z.coerce.date().nullable().transform(transformTime),
    note: z.string().nullable()
  } satisfies Record<keyof ClearableTimesheetCreate, any>).superRefine((record, ctx) => {
    if (record.companyId === null) {
      ctx.addIssue({
        code: 'invalid_type',
        message: `Company is required`,
        expected: 'number',
        received: 'null',
        path: ['companyId']
      });
    }
    if (record.categoryId === null) {
      ctx.addIssue({
        code: 'invalid_type',
        message: `Category is required`,
        expected: 'number',
        received: 'null',
        path: ['categoryId']
      });
    }
    if (record.startTime === null) {
      ctx.addIssue({
        code: 'invalid_type',
        message: `Start time is required`,
        expected: 'number',
        received: 'null',
        path: ['startTime']
      });
    }
    if (record.endTime === null) {
      ctx.addIssue({
        code: 'invalid_type',
        message: `End time is required`,
        expected: 'number',
        received: 'null',
        path: ['endTime']
      });
    }

    if (record.startTime && record.endTime) {
      if (isAfter(record.startTime!, record.endTime!)) {
        ctx.addIssue({
          code: 'custom',
          message: `Start time cannot be after end time`,
          path: ['startTime']
        });
      }
      if (isSameMinute(record.startTime!, record.endTime!)) {
        ctx.addIssue({
          code: 'custom',
          message: `Start time cannot be the same as end time`,
          path: ['startTime']
        });
      }
    }
  }) as ZodSchema<ClearableTimesheetCreate>;
};