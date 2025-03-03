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
    ? { id: number | null; code: string; retypeCode: string }
    : { id: number; code: string; name: string },
];

function getMethods(endpoint: "companies" | "categories") {
  async function createEntity(...params: MutationFnParams<"create">) {
    const [body] = params;

    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      body: JSON.stringify({
        code: body.code,
        name: body.name,
      }),
    });

    return response.json();
  }

  async function updateEntity(...params: MutationFnParams<"update">) {
    const [body] = params;

    if (body.id) {
      const response = await fetch(`/api/${endpoint}/${body.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          code: body.code,
          name: body.name,
        }),
      });
      return response.json();
    }

    return {};
  }

  async function deleteEntity(...params: MutationFnParams<"delete">) {
    const [body] = params;

    if (body.id) {
      const response = await fetch(`/api/${endpoint}/${body.id}`, {
        method: "DELETE",
      });
      return response.json();
    }

    return {};
  }

  return {
    createEntity,
    updateEntity,
    deleteEntity,
  };
}

export function useSimpleMutation<
  Entity extends "companies" | "categories",
  Type extends "create" | "update" | "delete",
>({ type, entity }: UseSimpleMutation<Type, Entity>) {
  const KEYNAME = `${entity.toUpperCase()}_${type}`.toUpperCase() as
    | "COMPANIES_CREATE"
    | "CATEGORIES_CREATE";
  const KEYS = MUTATION_KEYS[KEYNAME];

  const { createEntity, updateEntity, deleteEntity } = getMethods(entity);

  return useMutation({
    mutationKey: KEYS,
    async mutationFn(...params: MutationFnParams<Type>) {
      if (type === "create") {
        return await createEntity(...(params as MutationFnParams<"create">));
      } else if (type === "update") {
        return await updateEntity(...(params as MutationFnParams<"update">));
      } else if (type === "delete") {
        return await deleteEntity(...(params as MutationFnParams<"delete">));
      }

      return null;
    },
  });
}
