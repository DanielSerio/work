import type { useSimpleEntityOperations } from "#hooks/mutations/useSimpleEntityOperations";
import type { useCreateEntity } from "#hooks/state/useCreateEntity";
import { Button, Flex, Loader, Modal, TextInput } from "@mantine/core";

export interface EntityTableCreateNewModalProps {
  entity: "companies" | "categories";
  openMenuID: string | null;
  createForm: ReturnType<typeof useCreateEntity>;
  operations: ReturnType<typeof useSimpleEntityOperations<any>>;
  onCreate: () => Promise<void>;
  closeModal: () => void;
}

export function EntityTableCreateNewModal({
  entity,
  openMenuID,
  createForm,
  operations,
  onCreate,
  closeModal,
}: EntityTableCreateNewModalProps) {
  return (
    <Modal
      title={entity === "categories" ? "New Category" : "new Company"}
      opened={openMenuID === "newRecord"}
      onClose={() => closeModal()}
      centered
    >
      <div>
        <Flex
          direction={"column"}
          gap={6}
          style={{ marginBottom: 24, marginTop: 12 }}
        >
          <TextInput
            label="Code"
            required
            error={createForm.errors.code}
            {...createForm.getInputProps("code")}
          />
          <TextInput
            label="Name"
            required
            error={createForm.errors.name}
            {...createForm.getInputProps("name")}
          />
        </Flex>
        <div>{/** Form Error div */}</div>
        <Button
          w={"100%"}
          color="green"
          radius="xs"
          disabled={!createForm.isValid() || operations.create.isPending}
          onClick={() => onCreate().then(() => closeModal())}
        >
          <span>Create</span>
          {!!operations.create.isPending && (
            <span>
              <Loader size={"xs"} color="grey" />
            </span>
          )}
        </Button>
      </div>
    </Modal>
  );
}
