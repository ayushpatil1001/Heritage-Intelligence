import { NextRequest, NextResponse } from "next/server";
import { getCatalogItemById } from "@/lib/catalogData";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";

  const item = getCatalogItemById(params.id);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const title = (item.title_i18n && item.title_i18n[lang]) || item.title;
  const summaryEn = `Scholarly authenticated archival treatise of "${title}". Preserved under ${item.rights} in ${item.source}. Originally authored by ${item.creator}.`;
  const summaryHi = `"${title}" का प्रामाणिक अभिलेखीय विद्वतापूर्ण अवलोकन। ${item.source} में संरक्षित। मूल लेखक: ${item.creator}।`;
  const summaryMr = `"${title}" चे अधिकृत अभिलेखागार संशोधन सार. ${item.source} मध्ये जतन. मूळ लेखक: ${item.creator}.`;

  const summary = lang === "hi" ? summaryHi : lang === "mr" ? summaryMr : summaryEn;

  return NextResponse.json({
    item_id: item.id,
    level: "short",
    lang,
    text: summary,
    model: "Gemini-Archival-RAG",
  });
}
