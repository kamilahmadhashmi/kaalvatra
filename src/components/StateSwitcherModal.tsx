import React, { useState } from 'react';
import { X, Grid, Search, ArrowRight } from 'lucide-react';
import { STATES_DATA, ALL_STATE_IDS } from '../data/statesData';

interface StateSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeStateId: string | null;
  onSelectState: (stateId: string) => void;
}

export const StateSwitcherModal: React.FC<StateSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeStateId,
  onSelectState,
}) => {
  const [filterQuery, setFilterQuery] = useState<string>('');

  React.useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredStates = ALL_STATE_IDS.filter((id) => {
    const s = STATES_DATA[id];
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase();
    return s.displayName.toLowerCase().includes(q) || s.cap.toLowerCase().includes(q) || s.ep.toLowerCase().includes(q);
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="switcherTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overscroll-contain"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-crimson)]/15 text-[var(--accent-crimson)] flex items-center justify-center">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider">
                Atlas Directory
              </div>
              <h2 id="switcherTitle" className="text-xl sm:text-2xl font-serif font-semibold text-[var(--text-primary)]">
                All State & Territory Desks (36)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Input */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Quick find state or capital..."
              className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-crimson)]"
            />
          </div>
        </div>

        {/* State Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredStates.map((id) => {
              const state = STATES_DATA[id];
              const isActive = activeStateId === id;

              return (
                <div
                  key={id}
                  onClick={() => {
                    onSelectState(id);
                    onClose();
                  }}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] shadow-md'
                      : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-serif font-semibold text-sm">
                        {state.displayName}
                      </h4>
                      <span className={`text-[11px] font-mono block ${isActive ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                        {state.ep}
                      </span>
                    </div>
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                      style={{ backgroundColor: isActive ? '#ffffff' : state.a || 'var(--accent-crimson)' }}
                    />
                  </div>

                  <div className={`pt-2 border-t flex items-center justify-between text-[11px] font-mono ${
                    isActive ? 'border-white/20 text-white/90' : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
                  }`}>
                    <span>Cap: {state.cap}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
