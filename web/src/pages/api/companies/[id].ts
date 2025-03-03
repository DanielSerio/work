import type { APIRoute } from "astro";
import { CompaniesTable, db, eq, NOW } from "astro:db";
import type { AppClientError } from "src/lib/types/error/app-error.types";
import { getEntityParam, parseCodedEntity } from "src/lib/utilities/entity";
import { createError } from "src/lib/utilities/error";

export const PATCH: APIRoute<any, { id: string; }> = async ({ request, params }) => {
  try {
    const entityID = getEntityParam(params.id);
    const body = await request.json();
    const parsed = parseCodedEntity(body);

    const results = await db.update(CompaniesTable).set(parsed).where(eq(CompaniesTable.id, entityID)).returning();

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

export const DELETE: APIRoute<any, { id: string; }> = async ({ params }) => {
  try {
    const entityID = getEntityParam(params.id);
    const results = await db.update(CompaniesTable).set({
      deletedAt: NOW
    }).where(
      eq(CompaniesTable.id, entityID)
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