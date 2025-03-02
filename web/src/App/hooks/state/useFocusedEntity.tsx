import { useCallback, useState } from "react";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";

export function useFocusedEntity<
  Entity extends CompanyEntity | CategoryEntity,
  Info = any,
>() {
  const [original, _setOriginal] = useState<Entity | null>(null);
  const [entity, _setEntity] = useState<Entity | null>(null);
  const [entityInfo, _setEntityInfo] = useState<Info | null>(null);

  const focusEntity = useCallback(
    (ent: Entity, info?: Info | null) => {
      if (!original) {
        _setOriginal({ ...Object.freeze(ent) });
      }

      _setEntity(ent);

      if (info) {
        _setEntityInfo(info);
      }
    },
    [_setEntity, _setEntityInfo, _setOriginal]
  );

  const clearFocus = useCallback(() => {
    _setEntity(() => null);
    _setEntityInfo(() => null);
  }, [_setEntity, _setEntityInfo, _setOriginal]);

  const updateEntity = useCallback(
    <Key extends keyof Entity = keyof Entity>(key: Key, value: Entity[Key]) => {
      _setEntity((curr) => ({ ...curr, [key]: value }) as Entity);
    },
    [_setEntity]
  );

  return {
    entity,
    original,
    entityInfo,
    updateEntity,
    focusEntity,
    clearFocus,
  };
}
