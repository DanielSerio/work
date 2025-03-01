import { TZDate } from "@date-fns/tz";
import type { APIRoute } from "astro";
import { db, EntriesTable } from "astro:db";
import { isValid } from "date-fns";

export const GET: APIRoute = async ({ request, params }) => {
  const entryDate = params.date;
  const [yy, mm, dd] = entryDate!.split(/[\-]/g) as [string, string, string];

  if (isValid(new TZDate(+yy, +mm, +dd))) {
    return new Response(JSON.stringify(await db.select().from(EntriesTable)));
  }

  return new Response('Error', { status: 500 });
};