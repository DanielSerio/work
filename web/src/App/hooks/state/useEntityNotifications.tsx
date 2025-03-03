import type { useDeleteMany } from "#hooks/mutations/useDeleteMany";
import type { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export function useEntityNotifications({
  entity,
  deleteManyOperation,
  operations,
}: {
  entity: "categories" | "companies";
  deleteManyOperation: ReturnType<typeof useDeleteMany>;
  operations: ReturnType<typeof useSimpleEntityOperations>;
}) {
  const capSingular = entity === "categories" ? "Category" : "Company";
  const capPlural = entity === "categories" ? "Categories" : "Companies";

  useEffect(() => {
    if (deleteManyOperation.isError) {
      notifications.show({
        color: "red",
        title: `Delete ${capPlural}`,
        message: `An error occurred while attempting to delete ${capPlural}`,
      });
    }
    if (deleteManyOperation.isSuccess) {
      notifications.show({
        color: "green",
        title: `Delete ${capPlural}`,
        message: `Successfully deleted ${capPlural}`,
      });
    }
  }, [deleteManyOperation.isSuccess, deleteManyOperation.isError]);

  useEffect(() => {
    if (operations.create.isError) {
      notifications.show({
        color: "red",
        title: `Create ${capSingular}`,
        message: operations.create.error.message,
      });
    }
    if (operations.create.isSuccess) {
      notifications.show({
        color: "green",
        title: `Create ${capSingular}`,
        message: `Successfully created ${capSingular}`,
      });
    }
  }, [operations.create.isSuccess, operations.create.isError]);

  useEffect(() => {
    if (operations.update.isError) {
      notifications.show({
        color: "red",
        title: `Update ${capSingular}`,
        message: operations.update.error.message,
      });
    }
    if (operations.update.isSuccess) {
      notifications.show({
        color: "green",
        title: `Update ${capSingular}`,
        message: `Successfully updated ${capSingular}`,
      });
    }
  }, [operations.update.isSuccess, operations.update.isError]);
}
