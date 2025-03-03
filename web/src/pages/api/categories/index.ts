import type { APIRoute } from "astro";
import { CategoriesTable, db, eq, isNull, not } from "astro:db";
import type { AppClientError } from "src/lib/types/error/app-error.types";
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

//TODO: Create