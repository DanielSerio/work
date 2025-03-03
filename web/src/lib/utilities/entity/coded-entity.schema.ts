import { z } from "zod";

const codeRequiredMessage = `Code is required.`;
const codeTooLongMessage = `Code is too long. (max 12)`;
const nameMinMessage = `Name must be at least 2 characters.`;
const nameTooLongMessage = `Name is too long. (max 64)`;

export const CODED_ENTITY_SCHEMA = z.object({
  code: z.string().trim().min(1, codeRequiredMessage).max(12, codeTooLongMessage).transform((v) => v.toUpperCase()),
  name: z.string().trim().min(2, nameMinMessage).max(64, nameTooLongMessage),
});