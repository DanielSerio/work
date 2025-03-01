export const MUTATION_KEYS = {
  CATEGORIES_CREATE: ['categories', 'create'],
  CATEGORIES_UPDATE: ['categories', 'update'],
  CATEGORIES_DELETE: ['categories', 'delete'],
  COMPANIES_CREATE: ['companies', 'create'],
  COMPANIES_UPDATE: ['companies', 'update'],
  COMPANIES_DELETE: ['companies', 'delete'],
  ENTRIES_UPSERT: ['entries', 'update', 'list'],
  ENTRIES_DELETE: ['entries', 'delete', 'list'],
} as const;