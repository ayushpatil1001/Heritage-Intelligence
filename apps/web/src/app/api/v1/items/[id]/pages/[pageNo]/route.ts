import { NextRequest, NextResponse } from "next/server";
import { getCatalogItemById } from "@/lib/catalogData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; pageNo: string } }
) {
  const item = getCatalogItemById(params.id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const pNum = parseInt(params.pageNo, 10) || 1;
  const page = item.pages.find((p) => p.page_no === pNum) || item.pages[0];

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json({
    item_id: item.id,
    page_no: page.page_no,
    ocr_text: page.ocr_text,
    ocr_confidence: page.ocr_confidence,
    lang: page.lang || "en",
    words: page.words || [],
    image_uri: `/assets/scans/${item.id}_p${page.page_no}.jpg`,
  });
}
