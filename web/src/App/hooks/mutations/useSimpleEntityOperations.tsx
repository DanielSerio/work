import { useCreate } from "./useCreate";
import { useDelete } from "./useDelete";
import { useUpdate } from "./useUpdate";

export function useSimpleEntityOperations<
  Entity extends "companies" | "categories",
>(ent: Entity) {
  return {
    create: useCreate(ent),
    update: useUpdate(ent),
    delete: useDelete(ent),
  };
}
