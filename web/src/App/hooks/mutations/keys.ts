export const MUTATION_KEYS = {
  CATEGORY_CREATE: ['categories', 'create'],
  CATEGORY_UPDATE: ['categories', 'update'],
  CATEGORY_DELETE: ['categories', 'delete'],
  COMPANY_CREATE: ['companies', 'create'],
  COMPANY_UPDATE: ['companies', 'update'],
  COMPANY_DELETE: ['companies', 'delete'],
  ENTRIES_UPSERT: ['entries', 'update', 'list'],
  ENTRIES_DELETE: ['entries', 'delete', 'list'],
} as const;