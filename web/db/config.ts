import { column, defineDb, defineTable, NOW } from 'astro:db';
import type { CompanyEntity } from '../src/lib/types/models/company/entity.types';
import type { CategoryEntity } from '../src/lib/types/models/category/entity.types';


const PrefsTable = defineTable({
  columns: {
    timezone: column.text({ default: 'America/New_York' }),
  }
});

const CompaniesTable = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
    code: column.text({ unique: true }),
    name: column.text({ unique: true })
  } satisfies Record<keyof CompanyEntity, any>
});

const CategoriesTable = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
    code: column.text({ unique: true }),
    name: column.text({ unique: true })
  } satisfies Record<keyof CategoryEntity, any>
});

const EntriesTable = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    entryDate: column.date(),
    startTime: column.date(),
    endTime: column.date(),
    companyId: column.number({ references: () => CompaniesTable.columns.id }),
    categoryId: column.number({ references: () => CategoriesTable.columns.id }),
    note: column.text({ optional: true })
  },
});

export default defineDb({
  tables: {
    PrefsTable,
    CategoriesTable,
    CompaniesTable,
    EntriesTable
  },
},);
