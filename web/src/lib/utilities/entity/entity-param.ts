import type { AppClientError } from "#lib/types/error/app-error.types";

export function getEntityParam(value: string): number {
  if (value === '' || isNaN(+value) || +value % 1 !== 0) {
    const err = new Error(`${value} is not a number`) as AppClientError;

    err.name = 'ClientError';
    err.status = 400;

    throw err;
  }

  return ~~+value;
}