import { dateStamp } from "./date-stamp";

function getDirectionalStamp(value: string, setDateCallback: (d: Date) => number) {
  const date = new Date(`${value}T00:00:00.000`);
  const setDateValue = setDateCallback(date);

  date.setDate(setDateValue);

  return dateStamp(date);
}

export function getPrevDateStamp(value: string) {
  return getDirectionalStamp(value, (date) => date.getDate() - 1);
}

export function getNextDateStamp(value: string) {
  return getDirectionalStamp(value, (date) => date.getDate() + 1);
}