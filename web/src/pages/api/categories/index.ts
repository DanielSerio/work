import type { APIRoute } from "astro";
import { CategoriesTable, db, isNull } from "astro:db";
import type { AppClientError, AppServerError } from "src/lib/types/error/app-error.types";
import { parseCodedEntity } from "src/lib/utilities/entity";
import { createError } from "src/lib/utilities/error";


export const GET: APIRoute = async ({ }) => {
  try {
    const records = await db.select().from(CategoriesTable).where(isNull(CategoriesTable.deletedAt));

    return new Response(JSON.stringify(records), { status: 200 });
  } catch (err) {
    const { status, ...rest } = err as AppClientError;

    return new Response(JSON.stringify(createError({ status, ...rest })), { status });
  }
};


export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = parseCodedEntity(body);
    const records = await db.insert(CategoriesTable).values(parsed).returning();

    if (records.length < 1) {
      const err = new Error(`Something went wrong`) as AppServerError;

      err.name = 'InternalServerError';
      err.status = 500;

      throw err;
    }

    return new Response(JSON.stringify(records[0]), { status: 200 });
  } catch (err) {
    const { status, ...rest } = err as AppClientError;

    return new Response(JSON.stringify(createError({ status, ...rest })), { status });
  }
};