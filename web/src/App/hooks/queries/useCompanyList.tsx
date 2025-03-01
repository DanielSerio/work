import { useList } from "./useList";

export function useCompanyList() {
  return useList({
    name: "companies",
  });
}
