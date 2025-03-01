import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "./keys";

type UseSimpleMutation<
  Type extends "create" | "update" | "delete",
  Entity extends "companies" | "categories",
> = {
  type: Type;
  entity: Entity;
};

type MutationFnParams<Type extends "create" | "update" | "delete"> = [
  Type extends "delete"
    ? { code: string; retypeCode: string }
    : { code: string; name: string },
];

async function createEntity(...params: MutationFnParams<"create">) {
  //TODO: this
}

async function updateEntity(...params: MutationFnParams<"update">) {
  //TODO: this
}

async function deleteEntity(...params: MutationFnParams<"delete">) {
  //TODO: this
}

export function useSimpleMutation<
  Entity extends "companies" | "categories",
  Type extends "create" | "update" | "delete",
>({ type, entity }: UseSimpleMutation<Type, Entity>) {
  const KEYNAME = `${entity.toUpperCase()}_${type}`.toUpperCase() as
    | "COMPANIES_CREATE"
    | "CATEGORIES_CREATE";
  const KEYS = MUTATION_KEYS[KEYNAME];

  return useMutation({
    mutationKey: KEYS,
    async mutationFn(...params: MutationFnParams<Type>) {
      if (type === "create") {
        return await createEntity(...(params as MutationFnParams<"create">));
      } else if (type === "update") {
        return await createEntity(...(params as MutationFnParams<"update">));
      } else if (type === "delete") {
        return await deleteEntity(...(params as MutationFnParams<"delete">));
      }

      return null;
    },
  });
}
