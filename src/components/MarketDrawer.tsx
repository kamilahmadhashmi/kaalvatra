import React from 'react';
import { X, TrendingUp, TrendingDown, RefreshCw, Radio, Clock, ShieldCheck, Activity } from 'lucide-react';
import type { MarketSnapshot, SupportedLanguage } from '../types';
import { t } from '../i18n/translations';

interface MarketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  market: MarketSnapshot | null;
  lastRefreshed: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
  language?: SupportedLanguage;
}

export const MarketDrawer: React.FC<MarketDrawerProps> = ({
  isOpen,
  onClose,
  market,
  lastRefreshed,
  onRefresh,
  isRefreshing = false,
  language = 'en',
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const instruments = market?.instruments || [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end overscroll-contain" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-[var(--bg-surface)] border-l border-[var(--border-strong)] shadow-2xl flex flex-col h-full z-10 page-enter overflow-hidden overscroll-contain">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[var(--border-strong)] bg-[var(--bg-card)]/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-crimson)] font-bold">
                {t('live_telemetry', language)} · NSE / BSE / MCX
              </div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                {t('market_desk', language)}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all disabled:opacity-50"
              title="Refresh quotes"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[var(--accent-crimson)]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
              title="Close drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Telemetry Status Ribbon */}
        <div className="px-5 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>Feed: National Financial Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated {lastRefreshed}</span>
          </div>
        </div>

        {/* Scrollable Instruments List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
            PRIMARY QUOTATIONS & COMMODITIES ({instruments.length})
          </div>

          <div className="space-y-3">
            {instruments.map((inst) => (
              <div 
                key={inst.symbol} 
                className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] transition-all shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-sm font-mono font-bold text-[var(--text-primary)] block">
                      {inst.name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {inst.unit ? `Quotation per ${inst.unit.replace('/', '').trim()}` : 'Benchmark Index'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-[var(--text-primary)] block">
                      {inst.price}
                    </span>
                    <span className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold ${
                      inst.isPositive ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {inst.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {inst.change} ({inst.changePercent})
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>Exchange Wire</span>
                  <span className="flex items-center gap-1 text-emerald-500 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Quote
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Macro Editorial Note */}
          <div className="p-4 rounded-lg bg-[var(--bg-card)]/70 border border-[var(--border-subtle)] space-y-2 mt-6">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>Broadsheet Economic Dispatch</span>
            </div>
            <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              Official market quotations registered via automated telemetry. Data reflects equities, currency, sovereign bonds, and precious metals monitored by KAALVATRA’s national financial wire desk.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[var(--border-strong)] bg-[var(--bg-card)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
          <span>Continuous Telemetry Loop</span>
          <button
            onClick={onClose}
            className="h-8 px-4 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-xs font-mono transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
