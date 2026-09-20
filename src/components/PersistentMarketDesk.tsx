import React from 'react';
import { TrendingUp, TrendingDown, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import type { MarketSnapshot, SupportedLanguage } from '../types';
import { t } from '../i18n/translations';

interface PersistentMarketDeskProps {
  market: MarketSnapshot | null;
  lastRefreshed: string;
  onOpenDrawer: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  language?: SupportedLanguage;
}

export const PersistentMarketDesk: React.FC<PersistentMarketDeskProps> = ({
  market,
  lastRefreshed,
  onOpenDrawer,
  onRefresh,
  isRefreshing = false,
  language = 'en',
}) => {
  const instruments = market?.instruments || [];

  return (
    <aside
      aria-label="Financial Market Telemetry Ticker"
      className="sticky top-0 z-40 w-full h-[42px] bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] text-xs font-mono shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Left: Desk Title & Live Beacon */}
        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--accent-crimson)] shrink-0 font-bold uppercase tracking-wider text-[11px] transition-colors group cursor-pointer"
          title="Click to open full Market Desk broadsheet"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="border-b border-transparent group-hover:border-[var(--accent-crimson)]">
            {t('market_desk', language)}
          </span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[9px] rounded-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-normal leading-none">
            LIVE
          </span>
        </button>

        {/* Center: Live Scrolling/Flowing Instruments Ticker */}
        <div 
          className="flex items-center gap-5 sm:gap-7 overflow-x-auto py-0.5 no-scrollbar scroll-smooth flex-1 mx-2"
          tabIndex={0}
          role="region"
          aria-label="Live quotations list"
        >
          {instruments.length === 0 ? (
            <div className="text-[11px] text-[var(--text-muted)] animate-pulse">
              Connecting to market telemetry feeds...
            </div>
          ) : (
            instruments.map((inst) => (
              <div
                key={inst.symbol}
                onClick={onOpenDrawer}
                className="flex items-center gap-2 shrink-0 hover:bg-[var(--bg-surface)] px-2 py-1 rounded-md cursor-pointer transition-colors group"
                title={`${inst.name}: ${inst.price} (${inst.change}). Click for full details.`}
              >
                <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] font-medium transition-colors">
                  {inst.name}
                </span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {inst.price}
                </span>
                {inst.unit && (
                  <span className="text-[10px] text-[var(--text-muted)] hidden md:inline">
                    {inst.unit}
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${
                    inst.isPositive ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {inst.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {inst.changePercent}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Right: Refresh & Full Desk Launcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 text-[10px] text-[var(--text-muted)]">
          <div className="hidden lg:flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3 text-[var(--text-muted)]" />
            <span>Updated {lastRefreshed}</span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-7 w-7 inline-flex items-center justify-center rounded-md hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50"
              title="Refresh telemetry"
              aria-label="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[var(--accent-crimson)]' : ''}`} />
            </button>
          )}

          <button
            onClick={onOpenDrawer}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 h-7 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-crimson)] transition-all font-semibold text-[10px]"
            title="Open comprehensive Market Broadsheet"
          >
            <span>Full Desk</span>
            <ExternalLink className="w-3 h-3 text-[var(--accent-crimson)]" />
          </button>
        </div>
      </div>
    </aside>
  );
};
