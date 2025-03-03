import { z } from 'zod';

import type { CodedEntityInsert } from "../../types/utility";
import { CODED_ENTITY_SCHEMA } from './coded-entity.schema';

/**
 * Validates and transforms a coded entity object based on specified constraints.
 * @param {Coded} value - CodedEntityInsert
 * @returns {CodedEntityInsert} {@link CodedEntityInsert}
 */
export function parseCodedEntity<Coded extends CodedEntityInsert>(value: Coded) {
  const schema = CODED_ENTITY_SCHEMA;

  return schema.parse(value);
}