import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { EntityTable } from "#components/tables/EntityTable/EntityTable";
import { useDeleteMany } from "#hooks/mutations/useDeleteMany";
import { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import { useCategoryList } from "#hooks/queries";
import { useFocusedEntity } from "#hooks/state/useFocusedEntity";
import { useSelectedEntityRows } from "#hooks/state/useSelectedEntityRows";
import { Button, Drawer, Flex, Loader, TextInput } from "@mantine/core";

import type { CategoryEntity } from "src/lib/types/models/category/entity.types";
import type { EntityTableColumn } from "#components/tables/EntityTable/types";

export function CategoriesPage() {
  const categoriesQuery = useCategoryList();
  const operations = useSimpleEntityOperations("categories");
  const deleteManyOperation = useDeleteMany("categories");
  const entityFocusController = useFocusedEntity<
    CategoryEntity,
    EntityTableColumn<CategoryEntity>
  >();
  const selectedRowsController = useSelectedEntityRows();

  const handleUpdateSubmit = async () => {
    await operations.update.mutateAsync(entityFocusController.form.values);
    await categoriesQuery.refetch();
    await entityFocusController.clearFocus();
  };

  //TODO: Toast when below fails
  const handleDelete = async (ids: number[]) => {
    await deleteManyOperation.mutateAsync(ids);
    await categoriesQuery.refetch();
  };

  return (
    <Page>
      <Drawer
        position="right"
        opened={entityFocusController.form.values.id > 0}
        onClose={() => entityFocusController.clearFocus()}
      >
        <div>
          <header>{entityFocusController.original?.name}</header>
          <Flex
            direction={"column"}
            gap={6}
            style={{ marginBottom: 24, marginTop: 12 }}
          >
            <TextInput
              label="Code"
              required
              error={entityFocusController.form.errors.code}
              value={entityFocusController.form.values.code}
              onChange={(e) =>
                entityFocusController.updateEntity("code", e.target.value)
              }
              onBlur={() => entityFocusController.form.validateField("code")}
            />
            <TextInput
              label="Name"
              required
              error={entityFocusController.form.errors.name}
              value={entityFocusController.form.values.name}
              onChange={(e) =>
                entityFocusController.updateEntity("name", e.target.value)
              }
              onBlur={() => entityFocusController.form.validateField("name")}
            />
          </Flex>
          <div>
            {operations.update.isError && (
              <small className="form-error">
                {operations.update.error?.message}
              </small>
            )}
          </div>
          <Button
            w={"100%"}
            color="green"
            radius="xs"
            disabled={
              !entityFocusController.form.isValid() ||
              operations.update.isPending
            }
            onClick={handleUpdateSubmit}
          >
            <span>Save</span>
            {!!operations.update.isPending && (
              <span>
                <Loader size={"xs"} color="grey" />
              </span>
            )}
          </Button>
        </div>
      </Drawer>
      <BreadcrumbNav />
      <EntityTable
        records={categoriesQuery.data}
        isLoading={categoriesQuery.isLoading}
        entityFocusController={entityFocusController}
        selectedRowsController={selectedRowsController}
        onDeleteSelected={(ids) => handleDelete(ids)}
      />
    </Page>
  );
}
