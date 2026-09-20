import React, { useState } from 'react';
import { X, Globe2, Search, Clock, ArrowRight } from 'lucide-react';
import type { ClusteredStory } from '../types';

interface NationalDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: ClusteredStory[];
  onSelectStory: (story: ClusteredStory) => void;
}

const CATEGORIES = [
  'All',
  'Governance & Politics',
  'Judiciary & Law',
  'Markets & Economy',
  'Infrastructure',
  'Climate & Environment'
];

export const NationalDeskModal: React.FC<NationalDeskModalProps> = ({
  isOpen,
  onClose,
  stories,
  onSelectStory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredStories = stories.filter((story) => {
    const matchesCategory =
      selectedCategory === 'All' || story.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      story.story_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.summary && story.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
      story.states.some(st => st.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nationalTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overscroll-contain"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-center justify-between gap-4 bg-[var(--bg-card)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[var(--accent-crimson)]/10 text-[var(--accent-crimson)] flex items-center justify-center">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider">
                KAALVATRA Broadsheet
              </div>
              <h2 id="nationalTitle" className="text-xl sm:text-2xl font-serif font-semibold text-[var(--text-primary)]">
                National News Desk
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent-crimson)] text-white font-medium shadow-sm'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter headlines..."
              className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md pl-8 pr-3 py-1.5 text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-crimson)]"
            />
          </div>
        </div>

        {/* Story List Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredStories.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-[var(--text-muted)]">
              No national dispatches found matching your filter criteria.
            </div>
          ) : (
            filteredStories.map((story) => (
              <div
                key={story.story_id}
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className="editorial-card group p-5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] transition-all cursor-pointer shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-1.5">
                    <span className="px-2 py-0.5 rounded-sm bg-[var(--bg-surface)] text-[var(--accent-crimson)] font-medium text-[10px]">
                      {story.category || 'National Wire'}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {story.article_count} Sources
                    </span>
                    {story.states.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-[var(--text-secondary)]">{story.states.join(', ')}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors leading-snug">
                    {story.story_title}
                  </h3>

                  <p className="text-xs font-sans text-[var(--text-secondary)] line-clamp-2 mt-1.5">
                    {story.summary}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end sm:self-center font-mono text-xs text-[var(--accent-crimson)] font-medium group-hover:translate-x-1 transition-transform">
                  <span>Read Wire</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
