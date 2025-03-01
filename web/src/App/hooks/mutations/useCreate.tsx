import { useSimpleMutation } from "./useSimpleMutation";

export function useCreate<Entity extends "companies" | "categories">(
  entity: Entity
) {
  return useSimpleMutation<Entity, "create">({
    entity,
    type: "create",
  });
}
