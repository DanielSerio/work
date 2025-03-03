import { useEntityTableColumns } from "#hooks/state/useEntityTableColumns";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import { EntityTableHeader } from "./EntityTableHeader";
import { calculateColumnGrid } from "./helpers";

import { EntityTableRow, EntityTableRowSkeleton } from "./EntityTableRow";
import type { EntityTableProps } from "./types";
import { Button, Chip, Group, Menu, Modal } from "@mantine/core";
import { Fragment, useCallback, useEffect, useState } from "react";

import { EntityTrashSelectButton } from "./EntityTrashSelectButton";
import { TbDotsVertical } from "react-icons/tb";

export function EntityTable<RecordType extends CompanyEntity | CategoryEntity>({
  entityFocusController,
  selectedRowsController,
  isLoading,
  records,
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
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [openMenuID, setOpenMenuID] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setOpenMenuID(null);
  }, [setOpenMenuID]);

  const openModal = useCallback(
    (id: string) => {
      setMenuIsOpen(false);
      setOpenMenuID(id);
    },
    [setMenuIsOpen, setOpenMenuID]
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
      <Modal
        title={"Table Options"}
        centered
        opened={openMenuID === "columns"}
        onClose={() => closeModal()}
      >
        <h4 style={{ margin: "0 0 6px 0", fontWeight: 300 }}>Show Columns</h4>
        <Chip.Group
          multiple
          value={activeColumns.map((v) => String(v.oid ?? v.id))}
          onChange={(values) => {
            methods.setFromList(values);
          }}
        >
          <Group justify="center">
            {allColumns.map((col) => {
              if (col.header === "🗑️") {
                return (
                  <Fragment
                    key={String(col.oid ?? col.id ?? col.header)}
                  ></Fragment>
                );
              }
              return (
                <label key={String(col.oid ?? col.id ?? col.header)}>
                  <Chip value={String(col.oid ?? col.id ?? col.header)}>
                    {col.header}
                  </Chip>
                </label>
              );
            })}
          </Group>
        </Chip.Group>
      </Modal>
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
            <Menu>
              <Menu.Target>
                <Button
                  size="xs"
                  variant="subtle"
                  p={0}
                  style={{ minWidth: 30 }}
                >
                  <TbDotsVertical />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => openModal("newRecord")}>
                  Create new
                </Menu.Item>
                <Menu.Item onClick={() => openModal("columns")}>
                  Show Columns
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
