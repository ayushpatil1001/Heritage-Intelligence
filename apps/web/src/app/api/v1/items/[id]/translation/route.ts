import { NextRequest, NextResponse } from "next/server";
import { getCatalogItemById } from "@/lib/catalogData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";
  const pageNo = parseInt(searchParams.get("page_no") || "1", 10);

  const item = getCatalogItemById(params.id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const page = item.pages.find((p) => p.page_no === pageNo) || item.pages[0];
  const translatedText = page?.translations?.[lang] || page?.ocr_text || "";

  return NextResponse.json({
    item_id: item.id,
    page_no: pageNo,
    lang,
    text: translatedText,
    engine: "Bhashini / IndicTrans2",
  });
}
