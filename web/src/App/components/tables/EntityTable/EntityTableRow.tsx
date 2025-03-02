import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import type { EntityTableRowProps } from "./types";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import { Skeleton } from "@mantine/core";

export function EntityTableRow<
  RecordType extends CompanyEntity | CategoryEntity,
>({
  gridColumns,
  columns,
  record,
  onRowActivate,
}: EntityTableRowProps<RecordType>) {
  return (
    <div
      className="entity-table-row"
      style={{
        gridTemplateColumns: gridColumns,
      }}
    >
      {columns.map((col) => {
        let printValue = `${(record as any)[col.id]}`;

        if (col.transformValue) {
          printValue = col.transformValue(printValue);
        }

        return (
          <button
            key={String(col.id ?? col.oid)}
            className="table-col pseudo-link"
            onClick={() => onRowActivate(record, col)}
          >
            {!!col.id && <span>{printValue}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function EntityTableRowSkeleton<
  RecordType extends CompanyEntity | CategoryEntity,
>({
  gridColumns,
}: Omit<
  EntityTableRowProps<RecordType>,
  "record" | "columns" | "onRowActivate"
>) {
  return (
    <div
      className="entity-table-row"
      style={{
        gridTemplateColumns: gridColumns,
      }}
    >
      <span className="table-col">
        <span>
          <Skeleton h={16} w={"8ch"} />
        </span>
      </span>
      <span className="table-col">
        <span>
          <Skeleton h={16} />
        </span>
      </span>
      <span className="table-col">
        <span>
          <Skeleton h={16} />
        </span>
      </span>
    </div>
  );
}
