import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Newspaper, ArrowRight, CornerDownLeft } from 'lucide-react';
import { STATES_DATA } from '../data/statesData';
import type { ClusteredStory } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  nationalStories: ClusteredStory[];
  onSelectState: (stateId: string) => void;
  onSelectStory: (story: ClusteredStory) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  nationalStories,
  onSelectState,
  onSelectStory,
}) => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle search
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search states
  const matchedStates = Object.entries(STATES_DATA).filter(([id, state]) => {
    if (!cleanQuery) return true;
    return (
      state.displayName.toLowerCase().includes(cleanQuery) ||
      state.ep.toLowerCase().includes(cleanQuery) ||
      state.cap.toLowerCase().includes(cleanQuery) ||
      id.includes(cleanQuery)
    );
  }).slice(0, cleanQuery ? 10 : 6);

  // Search stories
  const matchedStories = nationalStories.filter((s) => {
    if (!cleanQuery) return true;
    return (
      s.story_title.toLowerCase().includes(cleanQuery) ||
      (s.summary && s.summary.toLowerCase().includes(cleanQuery)) ||
      s.states.some(st => st.toLowerCase().includes(cleanQuery)) ||
      (s.category && s.category.toLowerCase().includes(cleanQuery))
    );
  }).slice(0, cleanQuery ? 8 : 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="searchModalInput"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm animate-fade-in overscroll-contain"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center gap-3">
          <Search className="w-5 h-5 text-[var(--accent-crimson)]" />
          <input
            id="searchModalInput"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 36 Indian states, dispatches, topics, or capitals..."
            className="flex-1 bg-transparent border-none text-sm sm:text-base font-sans text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Clear
            </button>
          )}
          <kbd className="text-[10px] font-mono bg-[var(--bg-base)] px-2 py-0.5 rounded border border-[var(--border-subtle)] text-[var(--text-muted)]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* States Results */}
          <div>
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-semibold tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
              <span>State & Union Territory Desks</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {matchedStates.map(([id, state]) => (
                <div
                  key={id}
                  onClick={() => {
                    onSelectState(id);
                    onClose();
                  }}
                  className="p-2.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="truncate pr-2">
                    <h4 className="font-serif font-semibold text-sm text-[var(--text-primary)]">
                      {state.displayName}
                    </h4>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {state.ep} · {state.cap}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Stories Results */}
          <div>
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-semibold tracking-wider mb-2 flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Live News Dispatches</span>
            </div>
            <div className="space-y-2">
              {matchedStories.length === 0 ? (
                <div className="p-4 text-center font-mono text-xs text-[var(--text-muted)]">
                  No dispatches matched "{query}".
                </div>
              ) : (
                matchedStories.map((story) => (
                  <div
                    key={story.story_id}
                    onClick={() => {
                      onSelectStory(story);
                      onClose();
                    }}
                    className="p-3 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--accent-crimson)] mb-1">
                      <span>{story.category || 'National Wire'}</span>
                      {story.states.length > 0 && <span>· {story.states.join(', ')}</span>}
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[var(--text-primary)] leading-snug">
                      {story.story_title}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <span>Navigate with mouse or tap</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Select result
          </span>
        </div>
      </div>
    </div>
  );
};
