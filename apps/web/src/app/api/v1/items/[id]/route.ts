import { NextRequest, NextResponse } from "next/server";
import { getCatalogItemById } from "@/lib/catalogData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = getCatalogItemById(params.id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
