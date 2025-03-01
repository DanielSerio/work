import type { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

function isTZDate(value: Date | TZDate): value is TZDate {
  return (value as TZDate).timeZone !== undefined;
}

export function dateStamp(value: Date | TZDate) {
  if (!isTZDate(value)) {
    return format(value, 'yyyy-MM-dd');
  }

  const yr = value.getFullYear();
  const mn = value.getMonth() + 1;
  const dy = value.getDate();

  return `${yr}-${`${mn}`.padStart(2, '0')}-${`${dy}`.padStart(2, '0')}`;
}