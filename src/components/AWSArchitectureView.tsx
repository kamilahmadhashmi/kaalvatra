import React, { useState, useEffect } from 'react';
import { X, Cloud, ArrowRight } from 'lucide-react';

interface AWSArchitectureViewProps {
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

interface ServiceNode {
  id: string;
  category: 'DELIVERY' | 'ENTRY' | 'COMPUTE' | 'PERSISTENCE';
  service: string;
  name: string;
  role: string;
  details: string;
  specs: string[];
}

const AWS_SERVICES: ServiceNode[] = [
  {
    id: 's3',
    category: 'DELIVERY',
    service: 'Amazon S3',
    name: 'first-commit-kaalvatra-2026',
    role: 'Static Website Hosting & Asset Delivery',
    details: 'Serves compiled Vite React application bundle, styles, and vector cartography assets with low latency in ap-south-1.',
    specs: ['Region: ap-south-1 (Mumbai)', 'Static website hosting enabled', 'Object versioning configured']
  },
  {
    id: 'apigw',
    category: 'ENTRY',
    service: 'Amazon API Gateway',
    name: 'HTTP API (nechnrnjk0)',
    role: 'Serverless REST Router',
    details: 'Handles cross-origin browser requests for /market, /national/stories, /states/{id}/stories, and /runs/{id}.',
    specs: ['HTTP API v2 payload', 'CORS enabled for web origins', 'Direct integration with ApiFunction']
  },
  {
    id: 'eventbridge',
    category: 'ENTRY',
    service: 'Amazon EventBridge',
    name: 'Hourly News Ingestion Schedule',
    role: 'Cron Ingestion Trigger',
    details: 'Triggers the newsroom ingestion and NLP clustering pipeline every 60 minutes automatically.',
    specs: ['Schedule: rate(1 hour)', 'State: ENABLED', 'Target: ProcessingFunction Lambda']
  },
  {
    id: 'api-lambda',
    category: 'COMPUTE',
    service: 'AWS Lambda (Python 3.11)',
    name: 'ApiFunction',
    role: 'Query & Retrieval Handler',
    details: 'Handler: first_commit.lambda_handlers.api_handler. Reads indexed stories and market snapshots from DynamoDB and returns JSON.',
    specs: ['Memory: 512 MB', 'Timeout: 10s', 'Sub-50ms execution overhead']
  },
  {
    id: 'proc-lambda',
    category: 'COMPUTE',
    service: 'AWS Lambda (Python 3.11)',
    name: 'ProcessingFunction',
    role: 'NLP & Graph Clustering Engine',
    details: 'Handler: first_commit.lambda_handlers.processing_handler. Ingests 4,000+ RSS feeds, runs TF-IDF sparse retrieval, and extracts story clusters.',
    specs: ['Algorithm: global-story-graph-v2', 'Memory: 2048 MB', 'Timeout: 300s']
  },
  {
    id: 'dynamodb',
    category: 'PERSISTENCE',
    service: 'Amazon DynamoDB',
    name: 'KaalvatraStoryStore',
    role: 'Single-Table NoSQL Persistence',
    details: 'Stores run telemetry, individual article fingerprints, and multi-source clustered stories with composite primary keys and GSI indices.',
    specs: ['PK: STORY#{run}#{id} / SK: META', 'GSI1PK: RUN#{id}', 'On-demand pay-per-request capacity']
  },
  {
    id: 'sqs',
    category: 'PERSISTENCE',
    service: 'Amazon SQS',
    name: 'ProcessingFailureQueue',
    role: 'Dead-Letter Queue & Fault Capture',
    details: 'Captures failed RSS ingestion batches or parsing anomalies for automated retries and newsroom diagnostics.',
    specs: ['Standard SQS Queue', 'Message retention: 14 days', 'Zero data loss architecture']
  }
];

export const AWSArchitectureView: React.FC<AWSArchitectureViewProps> = ({ isOpen, onClose, embedded = false }) => {
  const [selectedNode, setSelectedNode] = useState<ServiceNode>(AWS_SERVICES[0]);

  useEffect(() => {
    if (isOpen && !embedded) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen, embedded]);

  if (!isOpen) return null;

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
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-crimson)]/15 text-[var(--accent-crimson)] flex items-center justify-center">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider">
              Cloud Systems Architecture
            </div>
            <h2 id="archTitle" className="text-xl sm:text-2xl font-serif font-semibold text-[var(--text-primary)]">
              The AWS Machinery Powering KAALVATRA
            </h2>
          </div>
        </div>

        {!embedded && (
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Interactive Architecture Flow Canvas */}
      <div className="p-6 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] overflow-x-auto">
        <div className="min-w-[700px] flex items-center justify-between gap-4">
          {/* Stage 1: Delivery */}
          <div className="flex-1 p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-2">
              1. Delivery
            </span>
            <button
              onClick={() => {
                const node = AWS_SERVICES.find(s => s.id === 's3');
                if (node) setSelectedNode(node);
              }}
              className={`w-full text-left p-2.5 rounded-md border transition-all text-xs font-mono ${
                selectedNode.id === 's3'
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-sm'
                  : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold">Amazon S3</div>
              <div className="text-[10px] opacity-80">Origin Static Hosting</div>
            </button>
          </div>

          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />

          {/* Stage 2: Gateway */}
          <div className="flex-1 p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-2">
              2. Gateway
            </span>
            <button
              onClick={() => {
                const node = AWS_SERVICES.find(s => s.id === 'apigw');
                if (node) setSelectedNode(node);
              }}
              className={`w-full text-left p-2.5 rounded-md border transition-all text-xs font-mono ${
                selectedNode.id === 'apigw'
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-sm'
                  : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold">API Gateway</div>
              <div className="text-[10px] opacity-80">HTTP API v2 Proxy</div>
            </button>
          </div>

          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />

          {/* Stage 3: Compute */}
          <div className="flex-1 p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-2">
              3. Processing
            </span>
            <button
              onClick={() => {
                const node = AWS_SERVICES.find(s => s.id === 'proc-lambda');
                if (node) setSelectedNode(node);
              }}
              className={`w-full text-left p-2.5 rounded-md border transition-all text-xs font-mono ${
                selectedNode.id === 'proc-lambda'
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-sm'
                  : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold">AWS Lambda</div>
              <div className="text-[10px] opacity-80">TF-IDF & Graph Mining</div>
            </button>
          </div>

          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />

          {/* Stage 4: Database */}
          <div className="flex-1 p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-2">
              4. Storage
            </span>
            <button
              onClick={() => {
                const node = AWS_SERVICES.find(s => s.id === 'dynamodb');
                if (node) setSelectedNode(node);
              }}
              className={`w-full text-left p-2.5 rounded-md border transition-all text-xs font-mono ${
                selectedNode.id === 'dynamodb'
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-sm'
                  : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold">Amazon DynamoDB</div>
              <div className="text-[10px] opacity-80">Indexed Broadsheet</div>
            </button>
          </div>

          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />

          {/* Stage 5: DLQ */}
          <div className="flex-1 p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-semibold block mb-2">
              5. Dead Letter
            </span>
            <button
              onClick={() => {
                const node = AWS_SERVICES.find(s => s.id === 'sqs');
                if (node) setSelectedNode(node);
              }}
              className={`w-full text-left p-2.5 rounded-md border transition-all text-xs font-mono ${
                selectedNode.id === 'sqs'
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-sm'
                  : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
              }`}
            >
              <div className="font-bold">Amazon SQS</div>
              <div className="text-[10px] opacity-80">Failure Dead-Letter</div>
            </button>
          </div>
        </div>

        {/* Quick Inspector Tabs for All 7 Services */}
        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-[10px] uppercase text-[var(--text-muted)] shrink-0 font-semibold">
            All Services ({AWS_SERVICES.length}):
          </span>
          {AWS_SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedNode(s)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 border ${
                selectedNode.id === s.id
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-sm'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
              }`}
            >
              {s.service}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Component Inspector Panel */}
      <div className={`${embedded ? 'p-6 bg-[var(--bg-surface)]' : 'flex-1 p-6 overflow-y-auto bg-[var(--bg-surface)]'}`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider">
              {selectedNode.category} · {selectedNode.service}
            </span>
            <h3 className="text-2xl font-serif font-semibold text-[var(--text-primary)] mt-1">
              {selectedNode.name}
            </h3>
          </div>
          <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 font-mono text-xs font-medium border border-emerald-500/20">
            Live & Verified in ap-south-1
          </span>
        </div>

        <p className="text-sm font-sans text-[var(--text-secondary)] leading-relaxed mb-6">
          {selectedNode.details}
        </p>

        <div className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
            Infrastructure Specifications & Deployment Attributes
          </h4>
          <ul className="space-y-2 text-xs font-mono text-[var(--text-secondary)]">
            {selectedNode.specs.map((spec, sIdx) => (
              <li key={sIdx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-crimson)]" />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  if (embedded) return content;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="archTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in overscroll-contain"
      onClick={onClose}
    >
      {content}
    </div>
  );
};
