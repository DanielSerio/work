import { useSimpleMutation } from "./useSimpleMutation";

export function useDelete<Entity extends "companies" | "categories">(
  entity: Entity
) {
  return useSimpleMutation<Entity, "delete">({
    entity,
    type: "delete",
  });
}
