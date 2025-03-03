import { Fragment } from "react";

import { Chip, Group, Modal } from "@mantine/core";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";
import type { EntityTableColumn } from "./types";

export type EntityTableColumnsModalProps<
  RecordType extends CompanyEntity | CategoryEntity,
> = {
  activeColumns: EntityTableColumn<RecordType>[];
  allColumns: EntityTableColumn<RecordType>[];
  openMenuID: null | string;
  closeModal: () => void;
  setFromList: (values: string[]) => void;
};

export function EntityTableColumnsModal<
  RecordType extends CompanyEntity | CategoryEntity,
>({
  openMenuID,
  activeColumns,
  allColumns,
  closeModal,
  setFromList,
}: EntityTableColumnsModalProps<RecordType>) {
  return (
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
          setFromList(values);
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
  );
}
