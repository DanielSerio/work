import type { APIRoute } from "astro";
import { CompaniesTable, db } from "astro:db";

//TODO: try/catch
export const GET: APIRoute = async ({ }) => {
  const records = await db.select().from(CompaniesTable);

  return new Response(JSON.stringify(records), { status: 200 });
};