import type { useFocusedEntity } from "#hooks/state/useFocusedEntity";
import type { useSelectedEntityRows } from "#hooks/state/useSelectedEntityRows";
import type { AreaHTMLAttributes } from "react";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { CompanyEntity } from "src/lib/types/models/company/entity.types";

export type EntityTableRecordColumn<RecordType extends CompanyEntity | CategoryEntity> = {
  header: string;
  oid?: never;
  id: keyof RecordType;
  width?: number;
  transformValue?: (value: string) => string;
};

export type EntityTableOtherColumn = {
  header: string;
  id?: never;
  oid: string;
  width?: number;
  transformValue?: (value: string) => string;
};

export type EntityTableColumn<RecordType extends CompanyEntity | CategoryEntity> = EntityTableRecordColumn<RecordType> | EntityTableOtherColumn;

export type EntityTableProps<RecordType extends CompanyEntity | CategoryEntity> = {
  isLoading?: boolean;
  records?: RecordType[];
  entityFocusController: ReturnType<typeof useFocusedEntity<RecordType, EntityTableColumn<RecordType>>>;
  selectedRowsController: ReturnType<typeof useSelectedEntityRows>;
};

export type EntityTableRowProps<RecordType extends CompanyEntity | CategoryEntity> = AreaHTMLAttributes<HTMLAreaElement> & {
  gridColumns: string;
  columns: EntityTableColumn<RecordType>[];
  record: RecordType;
  onRowActivate: (record: RecordType, column: EntityTableColumn<RecordType>) => void;
};

export type EntityTableHeaderRowProps<RecordType extends CompanyEntity | CategoryEntity> = AreaHTMLAttributes<HTMLAreaElement> & {
  gridColumns: string;
  columns: EntityTableColumn<RecordType>[];
};