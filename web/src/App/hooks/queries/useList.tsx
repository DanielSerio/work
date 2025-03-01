import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./keys";
import { QUERY_OPTIONS } from "./options";

export type ListOptions = {
  name: "companies" | "categories";
};
export function useList({ name }: ListOptions) {
  const KEYNAME = `${name.toUpperCase()}` as "COMPANIES" | "CATEGORIES";
  const KEYS = QUERY_KEYS[KEYNAME];
  const OPTIONS = QUERY_OPTIONS[KEYNAME];

  return useQuery({
    queryKey: KEYS,
    async queryFn() {
      const response = await fetch(`/api/${name}`);

      return await response.json();
    },
    ...OPTIONS,
  });
}
