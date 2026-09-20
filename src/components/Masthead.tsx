import React from 'react';
import { 
  Sun, 
  Moon, 
  Search, 
  Download, 
  Radio, 
  Newspaper, 
  Map, 
  Globe2, 
  Languages,
  Cpu,
  Layers
} from 'lucide-react';
import type { Theme, SupportedLanguage } from '../types';
import { LANGUAGES, t } from '../i18n/translations';

interface MastheadProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenNational: () => void;
  onOpenArchitecture: () => void;
  onOpenPipeline?: () => void;
  onOpenSearch: () => void;
  onExportDigest: () => void;
  activeStoryCount: number;
  currentView: 'frontpage' | 'atlas' | 'pipeline';
  pipelineTab?: 'sandbox' | 'architecture';
  onSelectView: (view: 'frontpage' | 'atlas' | 'pipeline') => void;
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

export const Masthead: React.FC<MastheadProps> = ({
  theme,
  onToggleTheme,
  onOpenNational,
  onOpenArchitecture,
  onOpenPipeline,
  onOpenSearch,
  onExportDigest,
  activeStoryCount,
  currentView,
  pipelineTab,
  onSelectView,
  language,
  onSelectLanguage,
}) => {
  const todayDate = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="border-b border-[var(--border-strong)] bg-[var(--bg-surface)] transition-colors duration-300">
      {/* Top utility row - Full width edge-to-edge pushing controls to the far side */}
      <div className="w-full px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-crimson)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            {t('live_telemetry', language)}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">National Bureau · New Delhi</span>
          <span>·</span>
          <span>{todayDate}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Hard Language Switcher Dropdown */}
          <div className="h-8 inline-flex items-center gap-1.5 px-2.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] transition-colors shadow-sm">
            <Languages className="w-3.5 h-3.5 text-[var(--accent-crimson)] shrink-0" />
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-mono font-medium text-[var(--text-primary)] focus:outline-none cursor-pointer pr-1 leading-none"
              aria-label="Select Translation Language"
              title="Select Language / भाषा चुनें"
            >
              {LANGUAGES.map((lang) => (
                <option 
                  key={lang.code} 
                  value={lang.code}
                  className="bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans py-1"
                >
                  {lang.nativeName} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenSearch}
            className="h-8 inline-flex items-center gap-1.5 px-2.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors text-[var(--text-primary)] text-xs font-mono"
            title="Search all dispatches & states (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('search_atlas', language)}</span>
            <kbd className="text-[10px] bg-[var(--bg-base)] px-1 rounded border border-[var(--border-subtle)] leading-tight">⌘K</kbd>
          </button>

          <button
            onClick={onToggleTheme}
            className="h-8 inline-flex items-center gap-1.5 px-2.5 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors text-[var(--text-primary)] text-xs font-mono"
            title={theme === 'midnight' ? 'Switch to Morning Newsprint' : 'Switch to Midnight Broadsheet'}
          >
            {theme === 'midnight' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span className="hidden md:inline">{t('newsprint', language)}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />
                <span className="hidden md:inline">{t('midnight', language)}</span>
              </>
            )}
          </button>

          {/* Minute Judge Controls: Pipeline Demonstration & AWS Infrastructure */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-[var(--border-subtle)]">
            <button
              onClick={onOpenPipeline || (() => onSelectView('pipeline'))}
              className={`h-7 px-2 rounded text-[10px] sm:text-[11px] font-mono inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                currentView === 'pipeline' && pipelineTab === 'sandbox'
                  ? 'bg-[var(--accent-crimson)] text-white font-semibold border border-[var(--accent-crimson)]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-[var(--text-primary)]'
              }`}
              title="Pipeline Demonstration (for judges)"
            >
              <Cpu className="w-3 h-3 text-[var(--accent-gold)] shrink-0" />
              <span>Pipeline</span>
              <span className="text-[9px] text-[var(--accent-gold)] font-sans font-medium">(for judges)</span>
            </button>

            <button
              onClick={onOpenArchitecture}
              className={`h-7 px-2 rounded text-[10px] sm:text-[11px] font-mono inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                currentView === 'pipeline' && pipelineTab === 'architecture'
                  ? 'bg-[var(--accent-crimson)] text-white font-semibold border border-[var(--accent-crimson)]'
                  : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-sky-500 text-[var(--text-primary)]'
              }`}
              title="AWS Architecture & Cloud Infrastructure (for judges)"
            >
              <Layers className="w-3 h-3 text-sky-400 shrink-0" />
              <span>AWS</span>
              <span className="text-[9px] text-sky-400 font-sans font-medium">(for judges)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Broadsheet Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center relative">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-crimson)]">
            <span>National Edition</span>
            <span>·</span>
            <span>Annals of Bharat</span>
            <span>·</span>
            <span className="bg-[var(--accent-crimson)]/10 text-[var(--accent-crimson)] px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider">
              {activeStoryCount} {t('active_dispatches', language)}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight font-medium text-[var(--text-primary)] leading-none my-1 select-none">
            KAALVATRA
          </h1>

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mt-2 max-w-xl font-light">
            {t('tagline', language)}
          </p>
        </div>

        {/* Broadsheet Section Navigation Tabs (Clean Editorial Newspaper Front) */}
        <nav aria-label="Broadsheet Sections" className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-mono">
          <button
            onClick={() => onSelectView('atlas')}
            className={`h-9 px-4 rounded-md font-medium transition-all inline-flex items-center gap-2 ${
              currentView === 'atlas'
                ? 'bg-[var(--accent-crimson)] text-white shadow-sm border border-[var(--accent-crimson)]'
                : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-strong)] text-[var(--text-primary)]'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>{t('nav_atlas', language)}</span>
          </button>

          <button
            onClick={() => onSelectView('frontpage')}
            className={`h-9 px-4 rounded-md font-medium transition-all inline-flex items-center gap-2 ${
              currentView === 'frontpage'
                ? 'bg-[var(--accent-crimson)] text-white shadow-sm border border-[var(--accent-crimson)]'
                : 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-strong)] text-[var(--text-primary)]'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>{t('nav_frontpage', language)}</span>
          </button>

          <button
            onClick={onOpenNational}
            className="h-9 px-4 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all inline-flex items-center gap-2"
            title="View National Wire Modal"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>{t('nav_national', language)}</span>
          </button>

          <button
            onClick={onExportDigest}
            className="h-9 px-4 rounded-md bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all inline-flex items-center gap-2 shadow-xs group cursor-pointer"
            title="Download Daily Morning Press Edition in PDF format"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent-crimson)] group-hover:translate-y-0.5 transition-transform" />
            <span className="font-semibold">{t('morning_press', language)}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
