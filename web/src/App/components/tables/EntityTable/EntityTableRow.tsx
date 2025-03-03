import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import type { EntityTableRowProps } from "./types";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import { Checkbox, Skeleton } from "@mantine/core";

export function EntityTableRow<
  RecordType extends CompanyEntity | CategoryEntity,
>({
  gridColumns,
  columns,
  record,
  isSelected,
  onRowActivate,
  onSelectionChange,
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

        if (col.oid === "select") {
          return (
            <label
              key={"select"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                size="xs"
                checked={isSelected}
                onChange={(e) => onSelectionChange(record, e.target.checked)}
              />
            </label>
          );
        }

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

//TODO: needs the columns so it can render correct count/size
export function EntityTableRowSkeleton<
  RecordType extends CompanyEntity | CategoryEntity,
>({
  gridColumns,
}: Omit<
  EntityTableRowProps<RecordType>,
  "record" | "columns" | "onRowActivate" | "onSelectionChange" | "isSelected"
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
