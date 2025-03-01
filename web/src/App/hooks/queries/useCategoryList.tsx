import { useList } from "./useList";

export function useCategoryList() {
  return useList({
    name: "categories",
  });
}
