import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCitation(item: { title: string; source?: string; date_start?: string; page_no?: number }, format: "APA" | "MLA" | "Chicago" = "APA") {
  const author = "Ambedkar, B. R.";
  const year = item.date_start ? item.date_start.substring(0, 4) : "n.d.";
  const title = item.title;
  const source = item.source || "Dr. Babasaheb Ambedkar: Writings and Speeches";
  const page = item.page_no ? `, p. ${item.page_no}` : "";

  if (format === "MLA") {
    return `${author} "${title}." ${source} (${year})${page}. Print / Digital Archive.`;
  } else if (format === "Chicago") {
    return `${author} "${title}." In ${source} (${year})${page}.`;
  }
  // Default APA
  return `${author} (${year}). ${title}. In ${source}${page}. Ministry of Social Justice and Empowerment.`;
}

/**
 * Enforces strict DD/MM/YYYY formatting for dates throughout the institutional webapp.
 */
export function toDDMMYYYY(dateStr?: string): string {
  if (!dateStr) return "";
  // Check if already in DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;

  // YYYY-MM-DD
  const ymdMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (ymdMatch) {
    return `${ymdMatch[3]}/${ymdMatch[2]}/${ymdMatch[1]}`;
  }

  // YYYY-MM
  const ymMatch = dateStr.match(/^(\d{4})-(\d{2})$/);
  if (ymMatch) {
    return `01/${ymMatch[2]}/${ymMatch[1]}`;
  }

  // YYYY
  if (/^\d{4}$/.test(dateStr)) {
    return `01/01/${dateStr}`;
  }

  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
  } catch {
    // fallback
  }

  return dateStr;
}

