import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  Cpu
} from 'lucide-react';
import type { PipelineRunTelemetry } from '../types';
import { getPipelineTelemetry } from '../services/api';

interface PipelineSandboxProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

interface StageInfo {
  id: string;
  name: string;
  service: string;
  desc: string;
  articlesIn: number;
  articlesOut: number;
}

const PIPELINE_STAGES: StageInfo[] = [
  {
    id: 'ingest',
    name: '1. Multi-Feed Ingestion',
    service: 'EventBridge + Lambda',
    desc: 'Hourly poll of 4,000+ national and state bureau RSS feeds (The Hindu, Indian Express, TOI, NDTV, regional papers).',
    articlesIn: 4080,
    articlesOut: 4012
  },
  {
    id: 'dedupe',
    name: '2. Canonical De-duplication',
    service: 'ProcessingFunction (Python)',
    desc: 'SHA-256 fingerprinting and URL canonicalization to remove wire duplicates and syndicated mirrors.',
    articlesIn: 4012,
    articlesOut: 3944
  },
  {
    id: 'entity',
    name: '3. Geographic Entity Routing',
    service: 'NLP Entity Tagger',
    desc: 'Extracts 36 Indian states, capitals, districts, and legislative entities from headline and lede contexts.',
    articlesIn: 3944,
    articlesOut: 3944
  },
  {
    id: 'sparse',
    name: '4. Sparse Retrieval & TF-IDF',
    service: 'Vector Scoring Engine',
    desc: 'Generates n-gram token weights and evaluates 464,213 candidate cross-source article pairs.',
    articlesIn: 464213,
    articlesOut: 127
  },
  {
    id: 'graph',
    name: '5. Story Graph Clustering',
    service: 'Graph Partitioning',
    desc: 'Builds weighted co-occurrence edges across newsrooms; partitions graph into cohesive story clusters.',
    articlesIn: 127,
    articlesOut: 62
  },
  {
    id: 'persist',
    name: '6. DynamoDB Broadsheet Store',
    service: 'Amazon DynamoDB',
    desc: 'Persists clustered stories, publisher links, and state dispatches with single-table indexing for zero-latency queries.',
    articlesIn: 62,
    articlesOut: 36
  }
];

export const PipelineSandbox: React.FC<PipelineSandboxProps> = ({ isOpen, onClose, embedded = false }) => {
  const [telemetry, setTelemetry] = useState<PipelineRunTelemetry | null>(null);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(5);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      getPipelineTelemetry().then(setTelemetry);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !embedded) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen, embedded]);

  // Simulation execution
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSimulating) {
      interval = setInterval(() => {
        setActiveStageIndex((prev) => {
          if (prev >= PIPELINE_STAGES.length - 1) {
            setIsSimulating(false);
            return PIPELINE_STAGES.length - 1;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  if (!isOpen) return null;

  const startSimulation = () => {
    setActiveStageIndex(0);
    setIsSimulating(true);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setActiveStageIndex(5);
  };

  const content = (
    <div
      className={`bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl w-full ${
        embedded ? 'shadow-md text-left' : 'max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden overscroll-contain'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Header */}
      <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-gold)]/15 text-[var(--accent-gold)] flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--accent-gold)] font-semibold uppercase tracking-wider">
              The Machine Behind The Paper
            </div>
            <h2 id="pipelineTitle" className="text-xl sm:text-2xl font-serif font-semibold text-[var(--text-primary)]">
              Live Processing System & Telemetry Sandbox
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={isSimulating ? () => setIsSimulating(false) : startSimulation}
            className="h-8 inline-flex items-center gap-1.5 px-3 rounded-md bg-[var(--accent-crimson)] text-white hover:brightness-110 text-xs font-mono font-medium transition-all shadow-sm"
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Run' : 'Simulate Run'}</span>
          </button>

          <button
            onClick={resetSimulation}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {!embedded && (
            <button
              onClick={onClose}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Telemetry Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] text-xs font-mono">
        <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] block text-[11px]">RAW ARTICLES MONITORED</span>
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {telemetry?.articles_found || 4080}
          </span>
          <span className="text-[10px] text-emerald-500 block">Across 18+ State Desks</span>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] block text-[11px]">CANDIDATE PAIRS TESTED</span>
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {(telemetry?.grouping_summary?.candidate_pairs || 464213).toLocaleString()}
          </span>
          <span className="text-[10px] text-[var(--accent-gold)] block">Weighted TF-IDF</span>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] block text-[11px]">GRAPH EDGES FORMED</span>
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {telemetry?.grouping_summary?.matched_edges || 127}
          </span>
          <span className="text-[10px] text-emerald-500 block">Strong Cross-Outlet Consensus</span>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <span className="text-[var(--text-muted)] block text-[11px]">CLUSTERED STORIES FILED</span>
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {telemetry?.story_count || 36}
          </span>
          <span className="text-[10px] text-[var(--accent-crimson)] block">Live In Broadsheet</span>
        </div>
      </div>

      {/* Interactive Stages Flow */}
      <div className={`${embedded ? 'p-6 space-y-4' : 'flex-1 overflow-y-auto p-6 space-y-4'}`}>
        <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Pipeline Architecture Flow · Stage {activeStageIndex + 1} of {PIPELINE_STAGES.length}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isPast = idx < activeStageIndex;
            const isCurrent = idx === activeStageIndex;

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-5 rounded-lg border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--bg-card)] border-[var(--accent-crimson)] shadow-md ring-1 ring-[var(--accent-crimson)]'
                    : isPast
                    ? 'bg-[var(--bg-card)]/70 border-emerald-500/40 text-[var(--text-secondary)]'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] opacity-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                    {stage.name}
                  </span>
                  {isPast ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Complete
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-crimson)]/10 text-[var(--accent-crimson)] flex items-center gap-1 font-medium animate-pulse">
                      <Activity className="w-3 h-3" /> Active Processing
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Queued</span>
                  )}
                </div>

                <div className="text-[11px] font-mono text-[var(--accent-gold)] mb-2 font-medium">
                  AWS Component: {stage.service}
                </div>

                <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed mb-4">
                  {stage.desc}
                </p>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Input: {stage.articlesIn.toLocaleString()} signals</span>
                  <span className="text-[var(--text-primary)] font-semibold">
                    Yield: {stage.articlesOut.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Info */}
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Algorithm: global-story-graph-v2-sparse-retrieval</span>
        </div>
        <div>Run ID: {telemetry?.run_id || 'run-live'}</div>
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pipelineTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overscroll-contain"
      onClick={onClose}
    >
      {content}
    </div>
  );
};
