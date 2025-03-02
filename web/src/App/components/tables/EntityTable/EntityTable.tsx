import { useEntityTableColumns } from "#hooks/state/useEntityTableColumns";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import { EntityTableHeader } from "./EntityTableHeader";
import { calculateColumnGrid } from "./helpers";

import { EntityTableRow, EntityTableRowSkeleton } from "./EntityTableRow";
import type { EntityTableProps } from "./types";

export function EntityTable<RecordType extends CompanyEntity | CategoryEntity>({
  isLoading,
  records,
}: EntityTableProps<RecordType>) {
  const { activeColumns, methods } = useEntityTableColumns<RecordType>();
  const gridColumns = calculateColumnGrid<RecordType>(activeColumns);

  return (
    <div className="table-wrapper entity-table">
      <header>
        <div className="table-toolbar">
          <button>One</button>
          <button>Two</button>
          <button>Three</button>
        </div>
        <EntityTableHeader columns={activeColumns} gridColumns={gridColumns} />
      </header>

      <div className="table-body">
        {(!!isLoading || records === undefined) && (
          <>
            <EntityTableRowSkeleton gridColumns={gridColumns} />
            <EntityTableRowSkeleton gridColumns={gridColumns} />
            <EntityTableRowSkeleton gridColumns={gridColumns} />
            <EntityTableRowSkeleton gridColumns={gridColumns} />
            <EntityTableRowSkeleton gridColumns={gridColumns} />
            <EntityTableRowSkeleton gridColumns={gridColumns} />
          </>
        )}
        {!isLoading && (records?.length ?? 0) < 1 && (
          <div
            className="entity-table-row"
            style={{
              gridTemplateColumns: gridColumns,
            }}
          >
            <span
              className="table-col"
              data-align="center"
              style={{ gridColumn: `span ${activeColumns.length}` }}
            >
              <span>No Records Found</span>
            </span>
          </div>
        )}
        {!isLoading &&
          !!records &&
          records.length > 0 &&
          records.map((record) => {
            return (
              <EntityTableRow
                key={record.id}
                onRowActivate={(record, col) => {
                  console.info({
                    record,
                    col,
                  });
                }}
                columns={activeColumns}
                gridColumns={gridColumns}
                record={record}
              />
            );
          })}
      </div>
    </div>
  );
}
