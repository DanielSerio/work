import { z } from 'zod';

import type { CodedEntityInsert } from "../../types/utility";

/**
 * Validates and transforms a coded entity object based on specified constraints.
 * @param {Coded} value - CodedEntityInsert
 * @returns {CodedEntityInsert} {@link CodedEntityInsert}
 */
export function parseCodedEntity<Coded extends CodedEntityInsert>(value: Coded) {
  const codeRequiredMessage = `Code is required.`;
  const codeTooLongMessage = `Code is too long. (max 12)`;
  const nameMinMessage = `Name must be at least 2 characters.`;
  const nameTooLongMessage = `Name is too long. (max 64)`;

  const schema = z.object({
    code: z.string().trim().min(1, codeRequiredMessage).max(12, codeTooLongMessage).transform((v) => v.toUpperCase()),
    name: z.string().trim().min(2, nameMinMessage).max(64, nameTooLongMessage),
  });

  return schema.parse(value);
}