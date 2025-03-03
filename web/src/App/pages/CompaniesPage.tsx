import { Button, Drawer, Flex, Loader, TextInput } from "@mantine/core";

import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { EntityTable } from "#components/tables/EntityTable/EntityTable";
import { useDeleteMany } from "#hooks/mutations/useDeleteMany";
import { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import { useCompanyList } from "#hooks/queries";
import { useFocusedEntity } from "#hooks/state/useFocusedEntity";
import { useSelectedEntityRows } from "#hooks/state/useSelectedEntityRows";
import { useCreateEntity } from "#hooks/state/useCreateEntity";
import { useEntityNotifications } from "#hooks/state/useEntityNotifications";

import type { CompanyEntity } from "#lib/types/models/company/entity.types";
import type { EntityTableColumn } from "#components/tables/EntityTable/types";

export function CompaniesPage() {
  const companiesQuery = useCompanyList();
  const operations = useSimpleEntityOperations("companies");
  const deleteManyOperation = useDeleteMany("companies");
  const entityFocusController = useFocusedEntity<
    CompanyEntity,
    EntityTableColumn<CompanyEntity>
  >();
  const createForm = useCreateEntity();
  const selectedRowsController = useSelectedEntityRows();

  useEntityNotifications({
    entity: "companies",
    operations,
    deleteManyOperation,
  });

  const handleCreate = async () => {
    await operations.create.mutateAsync({
      id: -1,
      code: createForm.values.code,
      name: createForm.values.name,
    });
    await companiesQuery.refetch();
    createForm.reset();
  };

  const handleUpdate = async () => {
    await operations.update.mutateAsync(entityFocusController.form.values);
    await companiesQuery.refetch();
    await entityFocusController.clearFocus();
  };

  const handleDelete = async (ids: number[]) => {
    await deleteManyOperation.mutateAsync(ids);
    await companiesQuery.refetch();
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
            onClick={handleUpdate}
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
        entity="companies"
        operations={operations}
        records={companiesQuery.data}
        isLoading={companiesQuery.isLoading}
        entityFocusController={entityFocusController}
        selectedRowsController={selectedRowsController}
        createController={createForm}
        onCreate={handleCreate}
        onDeleteSelected={(ids) => handleDelete(ids)}
      />
    </Page>
  );
}
