import type { useQuery } from "@tanstack/react-query";

type ParamOptions = Partial<Parameters<typeof useQuery>[0]>;

export const QUERY_OPTIONS = {
  CATEGORIES: {
    staleTime: 60 * 30 * 1000
  } satisfies ParamOptions,
  COMPANIES: {
    staleTime: 60 * 30 * 1000
  } satisfies ParamOptions,
  ENTRIES: {
    staleTime: 60 * 30 * 1000
  } satisfies ParamOptions,
} as const;