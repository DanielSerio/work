import { useCallback, useState } from "react";
import type { CategoryEntity } from "#lib/types/models/category/entity.types";
import type { CompanyEntity } from "#lib/types/models/company/entity.types";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

export function useFocusedEntity<
  Entity extends CompanyEntity | CategoryEntity,
  Info = any,
>() {
  const [original, _setOriginal] = useState<Entity | null>(null);
  const form = useForm<Pick<Entity, "id" | "code" | "name">>({
    validate: zodResolver(
      z.object({
        id: z.number().int().positive(),
        code: z
          .string()
          .trim()
          .min(1)
          .max(12)
          .transform((v) => v.toUpperCase()),
        name: z.string().trim().min(2).max(64),
      })
    ),
    initialValues: {
      id: -1,
      code: "",
      name: "",
    } satisfies Pick<Entity, "id" | "code" | "name">,
  });
  const [entityInfo, _setEntityInfo] = useState<Info | null>(null);

  const focusEntity = useCallback(
    (ent: Entity, info?: Info | null) => {
      if (!original) {
        _setOriginal({ ...Object.freeze(ent) });
      }

      form.reset();
      form.setFieldValue("id", ent.id);
      form.setFieldValue("code", ent.code);
      form.setFieldValue("name", ent.name);

      if (info) {
        _setEntityInfo(info);
      }
    },
    [form, _setEntityInfo, _setOriginal]
  );

  const clearFocus = useCallback(() => {
    form.reset();
    _setEntityInfo(() => null);
  }, [form, _setEntityInfo, _setOriginal]);

  const updateEntity = useCallback(
    <Key extends keyof Entity = keyof Entity>(key: Key, value: Entity[Key]) => {
      form.setFieldValue(String(key), value);
    },
    [form]
  );

  return {
    form,
    original,
    entityInfo,
    updateEntity,
    focusEntity,
    clearFocus,
  };
}
