import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import type { EntityTableColumn } from "./types";

export function calculateColumnGrid<RecordType extends CompanyEntity | CategoryEntity>(
  columns: EntityTableColumn<RecordType>[]
) {
  const copy = columns.slice();
  const total = copy.reduce((a, b) => {
    return a + (b.width ?? 5);
  }, 0);

  return columns
    .map((col) => (col.width ? `${(col.width / total) * 100}%` : "auto"))
    .join(" ");
}
