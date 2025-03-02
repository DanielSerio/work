import { Page } from "#components/layout/Page";
import { BreadcrumbNav } from "#components/navigation/BreadcrumbNav";
import { EntityTable } from "#components/tables/EntityTable/EntityTable";
import type { EntityTableColumn } from "#components/tables/EntityTable/types";
import { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import { useCategoryList } from "#hooks/queries";
import { useFocusedEntity } from "#hooks/state/useFocusedEntity";
import { useSelectedEntityRows } from "#hooks/state/useSelectedEntityRows";
import { Drawer, TextInput } from "@mantine/core";
import type { CategoryEntity } from "src/lib/types/models/category/entity.types";

export function CategoriesPage() {
  const categoriesQuery = useCategoryList();
  const operations = useSimpleEntityOperations("categories");
  const entityFocusController = useFocusedEntity<
    CategoryEntity,
    EntityTableColumn<CategoryEntity>
  >();
  const selectedRowsController = useSelectedEntityRows();

  return (
    <Page>
      <Drawer
        position="right"
        opened={!!entityFocusController.entity}
        onClose={() => entityFocusController.clearFocus()}
      >
        <div>
          <header>
            {entityFocusController.original?.code} -{" "}
            {entityFocusController.original?.name}
          </header>
          <div className="body">
            <TextInput
              label="Name"
              defaultValue={entityFocusController.entity?.name}
              onChange={(e) =>
                entityFocusController.updateEntity("name", e.target.value)
              }
            />
          </div>
        </div>
      </Drawer>
      <BreadcrumbNav />
      <EntityTable
        records={categoriesQuery.data}
        isLoading={categoriesQuery.isLoading}
        entityFocusController={entityFocusController}
        selectedRowsController={selectedRowsController}
      />
    </Page>
  );
}
