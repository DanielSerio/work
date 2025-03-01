import type { APIRoute } from "astro";
import { CategoriesTable, db } from "astro:db";

//TODO: try/catch
export const GET: APIRoute = async ({ }) => {
  const records = await db.select().from(CategoriesTable);

  return new Response(JSON.stringify(records), { status: 200 });
};