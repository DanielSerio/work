import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { CODED_ENTITY_SCHEMA } from "#lib/utilities/entity/coded-entity.schema";

export function useCreateEntity() {
  return useForm({
    validate: zodResolver(CODED_ENTITY_SCHEMA),
    initialValues: {
      code: "",
      name: "",
    },
  });
}
