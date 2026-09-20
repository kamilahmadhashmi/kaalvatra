import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Grid, 
  Radio, 
  Clock
} from 'lucide-react';
import { STATES_DATA, ALL_STATE_IDS } from '../data/statesData';
import { getStateStories } from '../services/api';
import { ArchitecturalMotif } from './ArchitecturalMotif';
import type { ClusteredStory, SupportedLanguage, MarketSnapshot } from '../types';
import { getLocalizedStateName, getLocalizedStory } from '../i18n/translations';

interface StateDeskProps {
  stateId: string;
  onBackToAtlas: () => void;
  onSelectState: (stateId: string) => void;
  onSelectStory: (story: ClusteredStory) => void;
  onOpenStateSwitcher: () => void;
  language?: SupportedLanguage;
  market?: MarketSnapshot | null;
  onOpenMarketDrawer?: () => void;
}

export const StateDesk: React.FC<StateDeskProps> = ({
  stateId,
  onBackToAtlas,
  onSelectState,
  onSelectStory,
  onOpenStateSwitcher,
  language = 'en',
}) => {
  const [stories, setStories] = useState<ClusteredStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const state = STATES_DATA[stateId] || STATES_DATA['maharashtra'];

  // Current state index for next/prev
  const currentIndex = ALL_STATE_IDS.indexOf(stateId);
  const nextStateId = ALL_STATE_IDS[(currentIndex + 1) % ALL_STATE_IDS.length];
  const prevStateId = ALL_STATE_IDS[(currentIndex - 1 + ALL_STATE_IDS.length) % ALL_STATE_IDS.length];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // Stop any ongoing speech when switching states
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    getStateStories(stateId).then((data) => {
      if (mounted) {
        setStories(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [stateId]);

  const toggleAudioNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${state.displayName}. ${state.ep}. ${state.stand}. Today's state coverage includes ${stories.length} clustered dispatches.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <article className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 page-enter">
      {/* Top Breadcrumb & Quick Actions Bar */}
      <nav aria-label="Breadcrumb" className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] sticky top-[42px] z-30 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToAtlas}
              className="h-8 inline-flex items-center gap-1.5 px-3 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] font-medium transition-colors"
              title="Return to India Map"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Atlas</span>
            </button>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-muted)]">Front Page</span>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="font-semibold text-[var(--accent-crimson)]">{state.displayName}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudioNarration}
              className={`h-8 inline-flex items-center gap-1.5 px-3 rounded-md border transition-colors ${
                isSpeaking
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]'
              }`}
              title="Listen to synthesized state morning dispatch"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Mute Dispatch' : 'Listen Dispatch'}</span>
            </button>

            <button
              onClick={onOpenStateSwitcher}
              className="h-8 inline-flex items-center gap-1.5 px-3 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors"
              title="Browse all 36 Indian state & territory desks"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Desks (36)</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main State Hero & Broadside */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-b border-[var(--border-strong)] pb-10">
          {/* Left Column: State Identity, Motto & Stand */}
          <div className="lg:col-span-8 flex flex-col stagger-1">
            <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent-crimson)] mb-2 uppercase tracking-widest font-semibold">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: state.a || 'var(--accent-crimson)' }} />
              <span>State Desk</span>
              <span>·</span>
              <span>{state.ep}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-medium tracking-tight text-[var(--text-primary)] mb-4">
              {getLocalizedStateName(state.id, state.displayName, language)}
              {language !== 'en' && (
                <span className="text-2xl sm:text-3xl font-normal text-[var(--text-muted)] ml-3">
                  ({state.displayName})
                </span>
              )}
            </h1>

            <div className="border-l-2 border-[var(--accent-crimson)] pl-4 my-2">
              <p className="font-serif italic text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed">
                "{state.stand}"
              </p>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--border-subtle)] text-xs font-mono">
              <div>
                <span className="text-[var(--text-muted)] block text-[11px] uppercase">Capital</span>
                <span className="font-semibold text-sm text-[var(--text-primary)]">{state.cap}</span>
              </div>
              {state.facts.map(([label, value]) => (
                <div key={label}>
                  <span className="text-[var(--text-muted)] block text-[11px] uppercase">{label}</span>
                  <span className="font-semibold text-sm text-[var(--text-primary)]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Vector Motif & Symbolism */}
          <div className="lg:col-span-4 flex flex-col gap-4 stagger-2">
            <div className="flex flex-col items-center justify-center p-6 bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] text-center">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Architectural Motif · {state.motif}
              </span>
              <div className="text-[var(--text-primary)] my-2 p-2">
                <ArchitecturalMotif motif={state.motif} className="w-40 h-40" color={state.a || 'var(--text-primary)'} />
              </div>
              <p className="text-xs font-mono text-[var(--text-secondary)] mt-2">
                Historical monument & landscape silhouette
              </p>
            </div>
          </div>
        </div>

        {/* State Dispatches & Clustered Stories Section */}
        <div className="py-10 stagger-3">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-crimson)] uppercase font-semibold">
                <Radio className="w-3.5 h-3.5" />
                <span>Live State Wire</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--text-primary)] mt-1">
                Dispatches & Grouped Coverage
              </h2>
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)]">
              {stories.length} Clustered Story {stories.length === 1 ? '' : 'Units'} Available
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center font-mono text-sm text-[var(--text-muted)] flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-[var(--accent-crimson)] border-t-transparent rounded-full animate-spin" />
              <span>Fetching verified stories from regional wire bureaus...</span>
            </div>
          ) : stories.length === 0 ? (
            <div className="p-8 text-center bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)]">
              <p className="font-serif text-lg text-[var(--text-secondary)] mb-2">
                No breaking wire signals currently filed for {state.displayName}.
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                Regional correspondents continuously file accredited updates. Explore another state desk or browse the national wire.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((rawStory) => {
                const story = getLocalizedStory(rawStory, language);
                return (
                <div
                  key={story.story_id}
                  onClick={() => onSelectStory(rawStory)}
                  className="editorial-card group bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] rounded-lg p-6 flex flex-col justify-between cursor-pointer shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-muted)] mb-3">
                      <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-crimson)] font-medium">
                        {story.category || 'Regional'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {story.article_count} {story.article_count === 1 ? 'Article' : 'Sources'}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors leading-snug mb-2">
                      {story.story_title}
                    </h3>

                    <p className="text-xs font-sans text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                      {story.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {story.reasons.slice(0, 2).map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-base)] px-2 py-0.5 rounded"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[var(--text-primary)]">
                      <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[150px]">
                        {story.sources.slice(0, 2).join(' · ')}
                      </span>
                      <span className="font-semibold text-[var(--accent-crimson)] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                        Read Story →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>

        {/* State Carousel Footer Navigation */}
        <footer className="mt-12 pt-8 border-t border-[var(--border-strong)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <button
            onClick={() => onSelectState(prevStateId)}
            className="h-9 inline-flex items-center gap-2 px-4 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: {STATES_DATA[prevStateId]?.displayName}</span>
          </button>

          <div className="text-[var(--text-muted)] hidden sm:block">
            Exploring State {currentIndex + 1} of {ALL_STATE_IDS.length}
          </div>

          <button
            onClick={() => onSelectState(nextStateId)}
            className="h-9 inline-flex items-center gap-2 px-4 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors font-medium"
          >
            <span>Next: {STATES_DATA[nextStateId]?.displayName}</span>
            <ArrowRight className="w-4 h-4 text-[var(--accent-crimson)]" />
          </button>
        </footer>
      </div>
    </article>
  );
};
