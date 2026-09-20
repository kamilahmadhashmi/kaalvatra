// KAALVATRA v2.0 - Core TypeScript Definitions

export type Theme = 'midnight' | 'newsprint';
export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta';

export interface MarketInstrument {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  unit?: string;
}

export interface MarketSnapshot {
  run_id: string;
  fetched_at: string;
  provider: string;
  status: string;
  instruments: MarketInstrument[];
}

export interface WireArticle {
  article_id: string;
  headline: string;
  summary?: string;
  url: string;
  canonical_url?: string;
  published_at?: string;
  source?: {
    source_id?: string;
    name: string;
    scope?: string;
    language?: string;
  };
}

export interface ClusteredStory {
  story_id: string;
  run_id: string;
  story_title: string;
  article_count: number;
  latest_published_at: string;
  states: string[];
  reasons: string[];
  sources: string[];
  article_ids?: string[];
  articles?: WireArticle[];
  category?: string;
  summary?: string;
  body?: string[];
  byline?: string;
  dateline?: string;
  pull_quote?: string;
}

export interface NationalStoriesResponse {
  run_id: string;
  stories: ClusteredStory[];
}

export interface PipelineStageProgress {
  stage_id: string;
  name: string;
  status: 'idle' | 'running' | 'complete' | 'failed';
  articles_in?: number;
  articles_out?: number;
  duration_ms?: number;
  description?: string;
}

export interface PipelineRunTelemetry {
  run_id: string;
  entity_type: string;
  status: string;
  started_at: string;
  completed_at?: string;
  articles_found: number;
  articles_unique: number;
  duplicates_removed: number;
  story_count: number;
  current_stage: string;
  stage_progress?: Record<string, any>;
  grouping_summary: {
    matched_edges: number;
    articles_considered: number;
    candidate_pairs: number;
    matched_groups: number;
    articles_ungrouped: number;
    matching_method: string;
    articles_in_groups: number;
  };
  run_config?: {
    source_ids: string[];
  };
}
