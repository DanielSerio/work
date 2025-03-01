import { TZDate } from '@date-fns/tz';
import { db, CompaniesTable, CategoriesTable, EntriesTable } from 'astro:db';

function createCompany(index: number) {
  const prefixes = ['C', 'CP', 'CMP'];
  const overallLengths = [5, 7, 12];

  const prefix = prefixes[index % prefixes.length];
  const length = overallLengths[index % overallLengths.length];
  const prefixLength = prefix.length;
  const nLength = `${index}`.length;
  const offsetLength = length - (prefixLength + nLength);

  const code = `${prefix}${`${index}`.padStart(offsetLength, '0')}`;


  return {
    code,
    name: `${code} Company #${index}`
  };
}

function createCategory(index: number) {
  const prefixes = ['C', 'CT', 'CAT'];
  const overallLengths = [5, 7, 12];

  const prefix = prefixes[index % prefixes.length];
  const length = overallLengths[index % overallLengths.length];
  const prefixLength = prefix.length;
  const nLength = `${index}`.length;
  const offsetLength = length - (prefixLength + nLength);

  const code = `${prefix}${`${index}`.padStart(offsetLength, '0')}`;


  return {
    code,
    name: `${code} Category`
  };
}

interface FakeEntParams {
  id: number;
  startTime: [number, number];
  endTime: [number, number];
}

function createEntry({ id, startTime, endTime }: FakeEntParams) {
  const d = new Date();
  const date = new TZDate(d.getFullYear(), d.getMonth(), d.getDate());
  const year = date.getFullYear();
  const month = date.getMonth();
  const dd = date.getDate();

  const start = new TZDate(year, month, dd, startTime[0], startTime[1]);
  const end = new TZDate(year, month, dd, endTime[0], endTime[1]);

  const rand = (max: number) => Math.floor(Math.random() * (max - 1) + 1);

  return {
    id,
    categoryId: rand(10),
    companyId: rand(16),
    entryDate: new Date(date.toUTCString()),
    startTime: new Date(start.toUTCString()),
    endTime: new Date(end.toUTCString()),
    note: null
  };
}

function createData() {
  const companies = [];
  const categories = [];

  for (let i = 1; i <= 16; i += 1) {
    if (i <= 10) {
      categories.push(createCategory(i));
    }

    companies.push(createCompany(i));
  }


  return {
    companies,
    categories,
    entries: [
      createEntry({
        id: 1,
        startTime: [8, 45],
        endTime: [9, 0]
      }),
      createEntry({
        id: 2,
        startTime: [9, 0],
        endTime: [10, 0]
      }),
      createEntry({
        id: 3,
        startTime: [10, 0],
        endTime: [10, 30]
      }),
      createEntry({
        id: 4,
        startTime: [10, 30],
        endTime: [12, 15]
      }),
    ]
  };
}

// https://astro.build/db/seed
export default async function seed() {
  const { companies, categories, entries } = createData();

  await db.insert(CompaniesTable).values(companies);
  await db.insert(CategoriesTable).values(categories);
  await db.insert(EntriesTable).values(entries);
}
