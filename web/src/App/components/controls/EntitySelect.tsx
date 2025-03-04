import { useList } from "#hooks/queries/useList";
import type { CodedEntityRecord } from "#lib/types/utility";
import {
  Autocomplete,
  Group,
  Text,
  type AutocompleteProps,
} from "@mantine/core";
import { forwardRef, type ForwardedRef } from "react";

export interface EntitySelectProps extends AutocompleteProps {
  entity: "companies" | "categories";
  showLabel?: boolean;
}

function useEntitySelectOptions(entity: "companies" | "categories") {
  const list = useList({ name: entity });
  const listData = createGroupedListData(list.data ?? []);

  function createKey(entity: CodedEntityRecord) {
    return `${entity.code} | ${entity.name}`;
  }

  function createGroupedListData(entities: CodedEntityRecord[]) {
    const grouped = Object.groupBy(entities, (ent) => createKey(ent));
    const reflected = {} as Record<keyof typeof grouped, CodedEntityRecord>;

    for (const key in grouped) {
      const value = grouped[key];

      if (value) {
        reflected[key] = value[0];
      }
    }

    return reflected;
  }

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    return (
      <Group gap={"xs"}>
        <Text size="xs">{listData[option.value]?.code}</Text>
        <Text size="xs">|</Text>
        <Text size="xs">{listData[option.value]?.name}</Text>
      </Group>
    );
  };

  return {
    list,
    listData,
    renderAutocompleteOption,
  };
}

function EntitySelectComponent(
  { entity, showLabel, value, ...props }: EntitySelectProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const { listData, list, renderAutocompleteOption } =
    useEntitySelectOptions(entity);

  let inputValue = value ?? "";

  return (
    <Autocomplete
      {...props}
      value={inputValue}
      size="xs"
      ref={ref}
      label={
        !showLabel ? null : entity === "categories" ? "Category" : "Company"
      }
      placeholder={entity === "categories" ? "Category" : "Company"}
      data={
        list.isLoading || !listData
          ? ["React", "Angular", "Vue", "Svelte"]
          : Object.keys(listData)
      }
      renderOption={renderAutocompleteOption}
    />
  );
}

export const EntitySelect = forwardRef(EntitySelectComponent);
