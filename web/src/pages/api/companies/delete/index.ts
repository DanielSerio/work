import type { APIRoute } from "astro";
import { CompaniesTable, db, inArray, NOW } from "astro:db";
import type { AppClientError } from "#lib/types/error/app-error.types";
import { createError } from "#lib/utilities/error";

export const POST: APIRoute = async ({ request }) => {
  try {
    const entityIDs = await request.json();

    const results = await db.update(CompaniesTable).set({
      deletedAt: NOW
    }).where(
      inArray(CompaniesTable.id, entityIDs)
    ).returning();

    if (results.length < 1) {
      throw createError({
        status: 500,
        message: 'Something went wrong'
      });
    }

    return new Response(JSON.stringify(results[0]), { status: 200 });
  } catch (err) {
    const { status, ...rest } = err as AppClientError;

    return new Response(JSON.stringify(createError({ status, ...rest })), { status });
  }
};