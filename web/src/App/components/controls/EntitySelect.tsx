import { useList } from "#hooks/queries/useList";
import type { CodedEntityRecord } from "#lib/types/utility";
import { Select, type SelectProps } from "@mantine/core";
import { forwardRef, type ForwardedRef } from "react";

export interface EntitySelectProps extends SelectProps {
  entity: "companies" | "categories";
  showLabel?: boolean;
}

function useEntitySelectOptions(entity: "companies" | "categories") {
  function createListDataItem(record: CodedEntityRecord) {
    return {
      value: `${record.id}`,
      label: `${record.code}: ${record.name}`,
    };
  }

  function createListData(records: CodedEntityRecord[]) {
    return records.map(createListDataItem);
  }

  const list = useList({ name: entity });
  const listData = createListData(list.data ?? []);

  return {
    list,
    listData,
  };
}

function EntitySelectComponent(
  { entity, showLabel, value, ...props }: EntitySelectProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const { listData, list } = useEntitySelectOptions(entity);

  let inputValue = value ?? "";

  return (
    <Select
      {...props}
      value={inputValue}
      size="xs"
      ref={ref}
      label={
        !showLabel ? null : entity === "categories" ? "Category" : "Company"
      }
      placeholder={entity === "categories" ? "Category" : "Company"}
      data={list.isLoading || !listData ? [] : listData}
    />
  );
}

export const EntitySelect = forwardRef(EntitySelectComponent);
