import { useSimpleMutation } from "./useSimpleMutation";

export function useUpdate<Entity extends "companies" | "categories">(
  entity: Entity
) {
  return useSimpleMutation<Entity, "update">({
    entity,
    type: "update",
  });
}
