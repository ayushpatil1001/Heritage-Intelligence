import { createClient } from '@supabase/supabase-js';
import { ArchivalRecord } from '../data/edgeCorpus';

export const SUPABASE_URL = 'https://mzfftifamjkuqaaybrey.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_PwGeftIcRGU4CHe6QT96TQ_y0qCYspn';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export interface SupabaseStats {
  total_archival_records: number;
  total_cad_nodes: number;
  total_searches_logged: number;
  database_engine: string;
  status: string;
}

export async function fetchSupabaseArchivalRecords(): Promise<ArchivalRecord[]> {
  try {
    const { data, error } = await supabase
      .from('ahi_archival_records')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data) return [];

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      collection: row.collection,
      date: row.date,
      volume: row.volume,
      page: row.page,
      articleRef: row.article_ref,
      keywords: row.keywords || [],
      manuscriptScan: row.manuscript_scan,
      verbatimQuote: row.verbatim_quote,
      synthesis: row.synthesis
    }));
  } catch {
    return [];
  }
}

export async function insertRecordToSupabase(rec: ArchivalRecord): Promise<boolean> {
  try {
    const { error } = await supabase.from('ahi_archival_records').upsert({
      id: rec.id,
      title: rec.title,
      category: rec.category,
      collection: rec.collection,
      date: rec.date,
      volume: rec.volume,
      page: rec.page,
      article_ref: rec.articleRef,
      keywords: rec.keywords,
      manuscript_scan: rec.manuscriptScan,
      verbatim_quote: rec.verbatimQuote,
      synthesis: rec.synthesis
    });
    return !error;
  } catch {
    return false;
  }
}

export async function logSearchToSupabase(payload: {
  query_text: string;
  language: string;
  confidence: number;
  dense_score: number;
  bm25_score: number;
  verified: boolean;
  matched_record_id: string | null;
  execution_tier: string;
}): Promise<void> {
  try {
    await supabase.from('ahi_search_telemetry').insert(payload);
  } catch {
    // Non-blocking audit log
  }
}

export async function fetchSupabaseSystemStats(): Promise<SupabaseStats | null> {
  try {
    const { data, error } = await supabase.rpc('get_ahi_system_stats');
    if (error || !data) return null;
    return data as SupabaseStats;
  } catch {
    return null;
  }
}
