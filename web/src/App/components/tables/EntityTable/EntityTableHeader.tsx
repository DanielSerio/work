import { Fragment } from "react";

import type { EntityTableHeaderRowProps } from "./types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";

export function EntityTableHeader<
  RecordType extends CompanyEntity | CategoryEntity,
>({ columns, gridColumns, children }: EntityTableHeaderRowProps<RecordType>) {
  return (
    <Fragment>
      <div
        className="entity-table-row header"
        style={{ gridTemplateColumns: gridColumns }}
      >
        {columns.map((col) => {
          return (
            <span
              key={String(col.oid ?? col.id ?? col.header)}
              className="table-col"
            >
              <span>{col.header}</span>
            </span>
          );
        })}
      </div>
      {!!children && <div className="entity-table-row header">{children}</div>}
    </Fragment>
  );
}
