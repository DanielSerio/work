import { useCallback, useState } from "react";

import type { CompanyEntity } from "#lib/types/models/company/entity.types";
import type { CategoryEntity } from "#lib/types/models/category/entity.types";
import type { EntityTableColumn } from "#components/tables/EntityTable/types";
import { formatDistance, isValid } from "date-fns";

export function useEntityTableColumns<
  RecordType extends CompanyEntity | CategoryEntity,
>() {
  const [allColumns, _setAllColumns] = useState<
    EntityTableColumn<RecordType>[]
  >([
    {
      oid: "select",
      header: "🗑️",
      width: 5,
    },
    {
      id: "code",
      header: "Code",
      width: 15,
    },
    {
      id: "name",
      header: "Name",
      width: 40,
    },
    {
      id: "createdAt",
      header: "Created",
      width: 20,
      transformValue(value) {
        return formatDistance(
          new Date(value.replace(/[T]/g, " ")),
          new Date(),
          {
            addSuffix: true,
          }
        );
      },
    },
    {
      id: "updatedAt",
      header: "Updated",
      width: 20,
      transformValue(value) {
        if (value === null || !isValid(value)) {
          return "";
        }

        return formatDistance(
          new Date(value.replace(/[T]/g, " ")),
          new Date(),
          {
            addSuffix: true,
          }
        );
      },
    },
  ]);

  type ColID = NonNullable<Pick<(typeof allColumns)[number], "id">>["id"] &
    string;
  type ColOID = NonNullable<Pick<(typeof allColumns)[number], "oid">>["oid"] &
    string;

  const [columnIds, _setColumnIds] = useState<(ColID | ColOID)[]>([
    "code",
    "name",
    "createdAt",
  ]);

  const activateColumn = useCallback(
    (params: { id: ColID } | { oid: ColOID }) => {
      const id = (params as { id: ColID }).id;
      const oid = (params as { oid: ColOID }).oid;

      if (id) {
        _setColumnIds((curr) => {
          if (!curr.includes(id)) {
            return [...curr, id];
          }

          return curr;
        });
      } else if (oid) {
        _setColumnIds((curr) => {
          if (!curr.includes(oid)) {
            return [...curr, oid];
          }

          return curr;
        });
      }
    },
    [_setColumnIds]
  );

  const deactivateColumn = useCallback(
    (params: { id: ColID } | { oid: ColOID }) => {
      const id = (params as { id: ColID }).id;
      const oid = (params as { oid: ColOID }).oid;

      if (id) {
        _setColumnIds((curr) => {
          if (!curr.includes(id)) {
            return curr;
          }

          const foundIndex = curr.findIndex((v) => v === id);

          if (foundIndex > -1) {
            const copy = curr.slice();

            copy.splice(foundIndex, 1);

            return copy;
          }

          return curr;
        });
      } else if (oid) {
        _setColumnIds((curr) => {
          if (!curr.includes(oid)) {
            return curr;
          }

          const foundIndex = curr.findIndex((v) => v === oid);

          if (foundIndex > -1) {
            const copy = curr.slice();

            copy.splice(foundIndex, 1);

            return copy;
          }

          return curr;
        });
      }
    },
    [_setColumnIds]
  );

  const setFromList = useCallback(
    (values: string[]) => {
      _setColumnIds(values);
    },
    [_setColumnIds]
  );

  const methods = {
    activateColumn,
    deactivateColumn,
    setFromList,
  };

  return {
    allColumns,
    activeColumns: allColumns.filter((v) => {
      if (!v.id && !v.oid) {
        return false;
      }

      if (v.id) {
        return columnIds.includes(v.id as keyof RecordType & string);
      }

      return columnIds.includes(v.oid as string);
    }),
    methods,
  };
}
