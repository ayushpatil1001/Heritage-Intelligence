import { NextResponse } from "next/server";

export async function GET() {
  const nodes = [
    { id: "e1", name: "Dr. B. R. Ambedkar", type: "person", mentions_count: 50 },
    { id: "e2", name: "Mahad Satyagraha", type: "place", mentions_count: 24 },
    { id: "e3", name: "Chavdar Tale", type: "place", mentions_count: 18 },
    { id: "e4", name: "Constitution of India", type: "legislation", mentions_count: 42 },
    { id: "e5", name: "Castes in India (1916)", type: "work", mentions_count: 20 },
    { id: "e6", name: "Annihilation of Caste (1936)", type: "work", mentions_count: 35 },
    { id: "e7", name: "The Problem of the Rupee (1923)", type: "work", mentions_count: 15 },
    { id: "e8", name: "Columbia University", type: "organization", mentions_count: 14 },
    { id: "e9", name: "John Dewey", type: "person", mentions_count: 12 },
    { id: "e10", name: "London School of Economics", type: "organization", mentions_count: 15 },
    { id: "e11", name: "Edwin Cannan", type: "person", mentions_count: 8 },
    { id: "e12", name: "Dhammadeeksha Nagpur", type: "concept", mentions_count: 28 },
    { id: "e13", name: "Hindu Code Bill", type: "legislation", mentions_count: 22 },
    { id: "e14", name: "Constituent Assembly", type: "organization", mentions_count: 38 },
    { id: "e15", name: "Poona Pact (1932)", type: "legislation", mentions_count: 26 },
    { id: "e16", name: "M. K. Gandhi", type: "person", mentions_count: 20 },
    { id: "e17", name: "Bahishkrit Hitakarini Sabha", type: "organization", mentions_count: 19 },
    { id: "e18", name: "Mooknayak", type: "work", mentions_count: 17 },
    { id: "e19", name: "Bahishkrit Bharat", type: "work", mentions_count: 16 },
    { id: "e20", name: "Article 32 (Constitutional Remedies)", type: "legislation", mentions_count: 30 },
  ];

  const edges = [
    { source: "e1", target: "e4", relation_type: "drafted_and_defended" },
    { source: "e1", target: "e5", relation_type: "authored" },
    { source: "e1", target: "e6", relation_type: "authored" },
    { source: "e1", target: "e7", relation_type: "authored" },
    { source: "e1", target: "e2", relation_type: "led_satyagraha" },
    { source: "e2", target: "e3", relation_type: "occurred_at" },
    { source: "e1", target: "e8", relation_type: "studied_at" },
    { source: "e8", target: "e9", relation_type: "mentored_by" },
    { source: "e1", target: "e10", relation_type: "studied_at" },
    { source: "e10", target: "e11", relation_type: "mentored_by" },
    { source: "e1", target: "e12", relation_type: "initiated_deeksha" },
    { source: "e1", target: "e13", relation_type: "introduced_bill" },
    { source: "e4", target: "e14", relation_type: "debated_in" },
    { source: "e1", target: "e14", relation_type: "chaired_drafting_comm" },
    { source: "e1", target: "e15", relation_type: "negotiated" },
    { source: "e15", target: "e16", relation_type: "co_signatory" },
    { source: "e1", target: "e17", relation_type: "founded" },
    { source: "e1", target: "e18", relation_type: "founded_journal" },
    { source: "e1", target: "e19", relation_type: "founded_journal" },
    { source: "e1", target: "e20", relation_type: "named_heart_and_soul" },
    { source: "e4", target: "e20", relation_type: "fundamental_guarantee" },
  ];

  return NextResponse.json({ nodes, edges });
}
