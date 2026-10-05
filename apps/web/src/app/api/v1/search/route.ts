import { NextRequest, NextResponse } from "next/server";
import { searchCatalog, CATALOG_ITEMS } from "@/lib/catalogData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "all";
  const lang = searchParams.get("lang") || "en";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : 50;

  const results = searchCatalog(q, type, lang);
  const sliced = results.slice(0, limit);

  return NextResponse.json(sliced, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
