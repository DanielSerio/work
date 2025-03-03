import { useCallback, useEffect, useState } from "react";

import { useEntityTableColumns } from "#hooks/state/useEntityTableColumns";
import { EntityTableHeader } from "./EntityTableHeader";
import { calculateColumnGrid } from "./helpers";
import { EntityTableRow, EntityTableRowSkeleton } from "./EntityTableRow";
import { EntityTrashSelectButton } from "./EntityTrashSelectButton";
import { EntityTableColumnsModal } from "./EntityTableColumnsModal";
import { EntityTableMenu } from "./EntityTableMenu";
import type { CategoryEntity } from "#lib/types/models/category/entity.types";
import type { CompanyEntity } from "#lib/types/models/company/entity.types";
import type { EntityTableProps } from "./types";
import { EntityTableCreateNewModal } from "./EntityTableCreateNewModal";

export function EntityTable<RecordType extends CompanyEntity | CategoryEntity>({
  entityFocusController,
  selectedRowsController,
  isLoading,
  entity,
  records,
  createController,
  operations,
  onCreate,
  onDeleteSelected,
}: EntityTableProps<RecordType>) {
  const {
    isSelectMode,
    selectedEntityIDs,
    startSelectMode,
    stopSelectMode,
    toggleEntityRow,
  } = selectedRowsController;

  const { allColumns, activeColumns, methods } =
    useEntityTableColumns<RecordType>();

  const gridColumns = calculateColumnGrid<RecordType>(activeColumns);
  const [openMenuID, setOpenMenuID] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setOpenMenuID(null);
  }, [setOpenMenuID]);

  const openModal = useCallback(
    (id: string) => {
      setOpenMenuID(id);
    },
    [setOpenMenuID]
  );

  useEffect(() => {
    if (isSelectMode) {
      methods.activateColumn({ oid: "select" });
    } else {
      methods.deactivateColumn({ oid: "select" });
    }
  }, [isSelectMode]);

  return (
    <>
      <EntityTableCreateNewModal
        operations={operations}
        entity={entity}
        openMenuID={openMenuID}
        onCreate={onCreate}
        createForm={createController}
        closeModal={closeModal}
      />
      <EntityTableColumnsModal
        openMenuID={openMenuID}
        allColumns={allColumns}
        activeColumns={activeColumns}
        setFromList={methods.setFromList}
        closeModal={closeModal}
      />
      <div className="table-wrapper entity-table">
        <header>
          <div className="table-toolbar">
            <EntityTrashSelectButton
              isSelectMode={isSelectMode}
              onStart={() => startSelectMode()}
              onCancel={() => stopSelectMode((v) => console.warn(v))}
              onExecute={() => {
                stopSelectMode((v) => {
                  onDeleteSelected(selectedEntityIDs);
                });
              }}
            />
            <EntityTableMenu
              onNewClick={() => openModal("newRecord")}
              onColumnsClick={() => openModal("columns")}
            />
          </div>
          <EntityTableHeader
            columns={activeColumns}
            gridColumns={gridColumns}
          />
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
                  onRowActivate={(record, col) =>
                    entityFocusController.focusEntity(record, col)
                  }
                  isSelected={selectedEntityIDs.includes(record.id)}
                  onSelectionChange={(record) => toggleEntityRow(record.id)}
                  columns={activeColumns}
                  gridColumns={gridColumns}
                  record={record}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
