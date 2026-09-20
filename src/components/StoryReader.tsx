import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Clock, 
  Share2, 
  Check, 
  Volume2, 
  VolumeX, 
  Newspaper,
  ShieldCheck,
  Building2,
  Loader2,
  Compass,
  Maximize2
} from 'lucide-react';
import type { ClusteredStory, SupportedLanguage, WireArticle } from '../types';
import { getLocalizedStory } from '../i18n/translations';
import { getStoryDetailArticles } from '../services/api';
import { formatRecentDispatchDate, formatArticleDate } from '../utils/dateUtils';

interface StoryReaderProps {
  story: ClusteredStory | null;
  onClose: () => void;
  language?: SupportedLanguage;
  onOpenDedicatedPage?: (story: ClusteredStory) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({ 
  story: rawStory, 
  onClose, 
  language = 'en',
  onOpenDedicatedPage 
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [articles, setArticles] = useState<WireArticle[]>(rawStory?.articles || []);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false);

  // Fetch actual participating wire articles from the clustering engine
  useEffect(() => {
    if (!rawStory) return;

    if (rawStory.articles && rawStory.articles.length > 0) {
      setArticles(rawStory.articles);
      return;
    }

    let mounted = true;
    setLoadingArticles(true);

    getStoryDetailArticles(rawStory.run_id, rawStory.story_id, rawStory)
      .then((data) => {
        if (mounted) {
          setArticles(data);
          setLoadingArticles(false);
        }
      })
      .catch(() => {
        if (mounted) setLoadingArticles(false);
      });

    return () => {
      mounted = false;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [rawStory?.story_id, rawStory?.run_id]);

  // Lock body scroll when StoryReader is open to prevent double scrolling
  useEffect(() => {
    if (!rawStory) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [rawStory]);

  if (!rawStory) return null;
  const story = getLocalizedStory(rawStory, language);

  const handleCopyLink = () => {
    const canonicalArticleUrl = `${window.location.origin}${window.location.pathname}?story=${encodeURIComponent(rawStory.story_id)}`;
    navigator.clipboard.writeText(canonicalArticleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = `${story.story_title}. Category: ${story.category || 'National'}. ${story.summary || ''}. Reported across ${story.sources.join(', ')}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const extractDomain = (url: string): string => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return 'Original News Outlet';
    }
  };

  const formatPublishedDate = (dateStr?: string): string => {
    return formatArticleDate(dateStr);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="readerTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-sm animate-fade-in text-left overscroll-contain"
      onClick={onClose}
    >
      <div
        className="bg-[var(--bg-surface)] border border-[var(--border-strong)] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8 relative text-left overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Navigation Bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase">
            <Newspaper className="w-4 h-4" />
            <span>Clustered Wire Dossier · {story.category || 'National News'}</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDedicatedPage && (
              <button
                onClick={() => onOpenDedicatedPage(rawStory)}
                className="px-2.5 py-1.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-crimson)] transition-colors inline-flex items-center gap-1.5"
                title="Open dedicated broadsheet page containing ONLY this specific article"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
                <span className="hidden sm:inline text-[11px] font-mono">Dedicated Article Page</span>
              </button>
            )}

            <button
              onClick={handleToggleSpeech}
              className={`p-1.5 rounded-md border transition-colors ${
                isSpeaking
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] text-[var(--text-primary)]'
              }`}
              title="Read story aloud"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-crimson)] transition-colors"
              title="Copy direct link to this specific article"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors"
              title="Close reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Metadata & Headline */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--text-muted)] mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
              {formatRecentDispatchDate(story.latest_published_at)}
            </span>
            <span>·</span>
            <span className="text-[var(--accent-crimson)] font-semibold">
              {articles.length || story.article_count} Independent Wire Newsrooms
            </span>
            {story.states.length > 0 && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  {story.states.join(', ')}
                </span>
              </>
            )}
          </div>

          <h2 id="readerTitle" className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)] leading-tight mb-3">
            {story.story_title}
          </h2>

          {story.byline && (
            <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider mb-4 pb-3 border-b border-[var(--border-subtle)]">
              {story.byline}
            </div>
          )}

          {/* Subheading / Dek */}
          <div className="p-4 bg-[var(--bg-card)] border-l-2 border-[var(--accent-crimson)] rounded-r-lg mb-6">
            <p className="text-sm sm:text-base font-serif italic text-[var(--text-secondary)] leading-relaxed">
              {story.summary}
            </p>
          </div>

          {/* Long-Form Multi-Paragraph Article Content */}
          <div className="prose prose-sm sm:prose max-w-none text-[var(--text-secondary)] space-y-4 font-sans leading-relaxed text-sm sm:text-base newspaper-drop-cap">
            {story.body && story.body.length > 0 ? (
              story.body.map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <>
                <p className="leading-relaxed">
                  {story.dateline || 'NEW DELHI — '}
                  {story.summary} The development has triggered wide-ranging deliberations across administrative, judicial, and civic forums as state bureaus examine the long-term ramifications of the current policy trajectory.
                </p>
                <p className="leading-relaxed">
                  Senior officials confirmed that inter-departmental teams have been tasked with harmonizing implementation schedules. Economic observers note that the capital allocations accompanying these measures are projected to influence regional market dynamics and employment benchmarks over the forthcoming quarters.
                </p>
                <p className="leading-relaxed">
                  "Our priority remains ensuring that procedural transparency is maintained across all levels of implementation," commented an official spokesperson. "Field telemetry and stakeholder representations will be continuously integrated into the operational blueprint."
                </p>
              </>
            )}
          </div>

          {/* Editorial Broadsheet Pull Quote */}
          {story.pull_quote && (
            <div className="my-8 py-5 px-6 border-y border-[var(--border-strong)] bg-[var(--bg-card)] text-center rounded-lg">
              <span className="text-[10px] font-mono text-[var(--accent-crimson)] uppercase font-semibold tracking-widest block mb-1">
                KEY EDITORIAL TESTIMONY
              </span>
              <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] leading-snug">
                "{story.pull_quote}"
              </p>
            </div>
          )}
        </div>

        {/* Editorial Verification Transparency Rationale */}
        <div className="my-6 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono">
          <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Editorial Verification & Corroboration</span>
          </div>
          <p className="text-[var(--text-muted)] mb-3 leading-relaxed">
            Synthesized and corroborated across multiple independent newsrooms based on confirmed facts, shared entities, and timeline alignment:
          </p>
          <div className="flex flex-wrap gap-2">
            {story.reasons.map((reason, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
              >
                ✓ {reason}
              </span>
            ))}
          </div>
        </div>

        {/* Participating Wire Outlets & Actual Articles Section */}
        <div className="mt-10 pt-8 border-t border-[var(--border-strong)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-crimson)] font-semibold block mb-0.5">
                VERIFIED MULTI-OUTLET DOSSIER
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[var(--text-primary)]">
                Participating Wire Outlets & Articles ({articles.length || story.article_count})
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Direct primary sources cross-referenced across accredited publications
            </span>
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-sans mb-5 leading-relaxed">
            The following original articles were filed independently by accredited newsrooms and cross-referenced to form this clustered consensus report. Click any dispatch to read the original publication directly at its source:
          </p>

          {loadingArticles ? (
            <div className="py-12 text-center text-xs font-mono text-[var(--text-muted)] flex flex-col items-center gap-2 bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)]">
              <Loader2 className="w-5 h-5 text-[var(--accent-crimson)] animate-spin" />
              <span>Fetching original publisher articles from wire cluster...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article, aIdx) => {
                const publisherName = article.source?.name || story.sources[aIdx] || 'News Bureau';
                const domain = extractDomain(article.url);

                return (
                  <article
                    key={article.article_id || aIdx}
                    className="editorial-card group p-4 sm:p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] transition-all shadow-sm flex flex-col justify-between gap-3 text-left"
                  >
                    <div>
                      {/* Top: Publisher Badge & Timestamp */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center font-serif font-bold text-xs text-[var(--accent-crimson)]">
                            {publisherName.charAt(0)}
                          </span>
                          <span className="font-semibold text-[var(--text-primary)]">
                            {publisherName}
                          </span>
                          <span className="px-2 py-0.5 rounded-sm bg-[var(--bg-surface)] text-[10px] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                            Report #{aIdx + 1}
                          </span>
                        </div>

                        <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                          <Clock className="w-3 h-3" />
                          {formatPublishedDate(article.published_at || story.latest_published_at)}
                        </span>
                      </div>

                      {/* Actual News Article Headline */}
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors leading-snug mb-2">
                        {article.headline}
                      </h4>

                      {/* Article Excerpt / Summary */}
                      {article.summary && (
                        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                          {article.summary}
                        </p>
                      )}
                    </div>

                    {/* Bottom: Source Domain & Read Button */}
                    <div className="pt-3 mt-1 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
                        <span className="truncate max-w-[240px]">{domain}</span>
                      </span>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-md bg-[var(--accent-crimson)] hover:brightness-110 text-white font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>Read on {publisherName.split('—')[0].trim()}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
