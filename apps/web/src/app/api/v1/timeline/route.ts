import { NextResponse } from "next/server";
import { TIMELINE_EVENTS } from "@/lib/timelineData";

export async function GET() {
  return NextResponse.json(TIMELINE_EVENTS, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
