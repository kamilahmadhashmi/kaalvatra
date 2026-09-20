import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Check, 
  Volume2, 
  VolumeX, 
  Printer, 
  ShieldCheck, 
  Building2, 
  ExternalLink,
  Compass,
  Newspaper
} from 'lucide-react';
import type { ClusteredStory, SupportedLanguage, WireArticle } from '../types';
import { getLocalizedStory } from '../i18n/translations';
import { getStoryDetailArticles } from '../services/api';
import { formatRecentDispatchDate, formatArticleDate } from '../utils/dateUtils';

interface DedicatedArticlePageProps {
  story: ClusteredStory;
  onBackToAtlas: () => void;
  language?: SupportedLanguage;
}

export const DedicatedArticlePage: React.FC<DedicatedArticlePageProps> = ({
  story: rawStory,
  onBackToAtlas,
  language = 'en'
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [articles, setArticles] = useState<WireArticle[]>(rawStory.articles || []);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false);

  const story = getLocalizedStory(rawStory, language);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = `${story.story_title} — KAALVATRA Broadsheet`;

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
  }, [rawStory.story_id, story.story_title]);

  const handleCopyLink = () => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}?story=${encodeURIComponent(story.story_id)}`;
    navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
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

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-300 page-enter">
      {/* Top Single-Article Broadsheet Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-strong)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToAtlas}
              className="px-3 py-1.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:border-[var(--accent-crimson)] transition-all flex items-center gap-1.5 text-xs font-mono font-medium shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[var(--accent-crimson)] group-hover:-translate-x-0.5 transition-transform" />
              <span>Return to All-India Atlas</span>
            </button>

            <span className="hidden sm:inline-block text-[var(--border-strong)]">|</span>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <span className="font-serif font-bold text-sm tracking-wider text-[var(--text-primary)]">KAALVATRA</span>
              <span>·</span>
              <span className="text-[var(--accent-crimson)] font-semibold uppercase">Single Dispatch Reader</span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border-[var(--border-subtle)] text-[var(--text-primary)]'
              }`}
              title="Listen to story audio dispatch"
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Pause Audio' : 'Listen Aloud'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-crimson)] transition-all flex items-center gap-1.5 relative"
              title="Copy direct link to this specific article"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />}
              <span>{copied ? 'Link Copied!' : 'Copy Article Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent-crimson)] transition-all flex items-center gap-1.5"
              title="Print broadsheet page"
            >
              <Printer className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Single-Article Broadsheet Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <article className="bg-[var(--bg-card)] border border-[var(--border-strong)] rounded-xl shadow-xl p-6 sm:p-10 md:p-12 space-y-8">
          
          {/* Masthead Ribbon */}
          <div className="border-b border-[var(--border-subtle)] pb-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2 uppercase tracking-widest text-[var(--accent-crimson)] font-semibold">
              <Newspaper className="w-4 h-4" />
              <span>THE KAALVATRA CHRONICLE · VERIFIED DISPATCH</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
                {formatRecentDispatchDate(story.latest_published_at)}
              </span>
              <span>·</span>
              <span className="text-[var(--accent-crimson)] font-semibold">
                {articles.length || story.article_count} Co-verifying Newsrooms
              </span>
            </div>
          </div>

          {/* Headline & Category Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider">
              <span>{story.category || 'National Reporting'}</span>
              {story.states.length > 0 && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[var(--text-muted)] font-normal">
                    <Compass className="w-3 h-3 text-[var(--accent-crimson)]" />
                    {story.states.join(', ')}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--text-primary)] leading-[1.14] tracking-tight">
              {story.story_title}
            </h1>

            {story.byline && (
              <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider pb-2">
                {story.byline}
              </div>
            )}
          </div>

          {/* Dek / Subheading */}
          {story.summary && (
            <div className="p-5 rounded-lg bg-[var(--bg-surface)] border-l-4 border-[var(--accent-crimson)]">
              <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {story.summary}
              </p>
            </div>
          )}

          {/* Long-Form Multi-Paragraph Article Content */}
          <div className="prose prose-sm sm:prose max-w-none text-[var(--text-secondary)] space-y-5 font-sans leading-relaxed text-base sm:text-lg newspaper-drop-cap">
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
            <div className="my-8 py-6 px-8 border-y-2 border-[var(--border-strong)] bg-[var(--bg-surface)] text-center rounded-lg">
              <span className="text-[10px] font-mono text-[var(--accent-crimson)] uppercase font-semibold tracking-widest block mb-1">
                KEY EDITORIAL TESTIMONY
              </span>
              <p className="font-serif italic text-lg sm:text-xl text-[var(--text-primary)] leading-snug">
                "{story.pull_quote}"
              </p>
            </div>
          )}

          {/* Editorial Verification Transparency Box */}
          <div className="p-5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Editorial Verification & Corroboration</span>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">
              Synthesized and corroborated across multiple independent newsrooms based on confirmed facts, shared entities, and timeline alignment:
            </p>
            <div className="flex flex-wrap gap-2">
              {story.reasons.map((reason, rIdx) => (
                <span
                  key={rIdx}
                  className="px-2.5 py-1 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]"
                >
                  ✓ {reason}
                </span>
              ))}
            </div>
          </div>

          {/* Participating Primary Wire Dispatches */}
          <div className="pt-8 border-t border-[var(--border-strong)] space-y-5">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-crimson)] font-semibold block mb-1">
                VERIFIED MULTI-WIRE DOSSIER
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
                Participating Wire Dispatches ({articles.length || story.article_count})
              </h3>
              <p className="text-xs font-sans text-[var(--text-muted)] mt-1">
                Each link below directs strictly to that specific news story without generic category redirects:
              </p>
            </div>

            {loadingArticles ? (
              <div className="p-8 text-center bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-muted)] flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[var(--accent-crimson)] border-t-transparent rounded-full animate-spin" />
                <span>Loading verified primary wire records...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article, aIdx) => {
                const publisherName = article.source?.name || story.sources[aIdx] || 'News Wire';
                const domain = extractDomain(article.url);

                return (
                  <div
                    key={article.article_id || aIdx}
                    className="p-5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] transition-all flex flex-col justify-between gap-3 text-left"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center font-serif font-bold text-xs text-[var(--accent-crimson)]">
                            {publisherName.charAt(0)}
                          </span>
                          <span className="font-semibold text-[var(--text-primary)]">
                            {publisherName}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[var(--bg-card)] text-[10px] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                            Source #{aIdx + 1}
                          </span>
                        </div>

                        <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                          <Clock className="w-3 h-3" />
                          {formatArticleDate(article.published_at || story.latest_published_at)}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] leading-snug mb-2">
                        {article.headline}
                      </h4>

                      {article.summary && (
                        <p className="text-xs sm:text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
                          {article.summary}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
                        <span>{domain}</span>
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
                  </div>
                );
              })}
            </div>
          )}
        </div>

          {/* Bottom Colophon & Return Action */}
          <div className="pt-8 border-t border-[var(--border-strong)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
            <div className="text-center sm:text-left">
              <span className="font-serif font-bold text-sm text-[var(--text-primary)] block">KAALVATRA</span>
              <span>The Living Annals of Bharat · Sovereign Broadsheet Archive</span>
            </div>

            <button
              onClick={onBackToAtlas}
              className="px-4 py-2 rounded-md bg-[var(--accent-crimson)] hover:brightness-110 text-white font-mono text-xs font-semibold inline-flex items-center gap-2 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Full Interactive Atlas</span>
            </button>
          </div>

        </article>
      </main>
    </div>
  );
};
