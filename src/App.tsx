import { useState, useEffect, useMemo, useCallback } from 'react';
import { Masthead } from './components/Masthead';
import { PersistentMarketDesk } from './components/PersistentMarketDesk';
import { MarketDrawer } from './components/MarketDrawer';
import { AtlasMap } from './components/AtlasMap';
import { StateDesk } from './components/StateDesk';
import { FrontPageView } from './components/FrontPageView';
import { StoryReader } from './components/StoryReader';
import { DedicatedArticlePage } from './components/DedicatedArticlePage';
import { NationalDeskModal } from './components/NationalDeskModal';
import { PipelineSandbox } from './components/PipelineSandbox';
import { AWSArchitectureView } from './components/AWSArchitectureView';
import { SearchModal } from './components/SearchModal';
import { StateSwitcherModal } from './components/StateSwitcherModal';
import { CurtainTransition } from './components/CurtainTransition';
import { STATES_DATA, ALL_STATE_IDS } from './data/statesData';
import { getNationalStories, getMarketData, findStoryById } from './services/api';
import { downloadMorningDigest } from './utils/exportDigest';
import { resolveCanonicalStateId, parseCurrentRoute, syncRouteToUrl } from './utils/stateUtils';
import type { Theme, ClusteredStory, MarketSnapshot, SupportedLanguage } from './types';
import { t, getLocalizedStateName } from './i18n/translations';
import { 
  Cpu, 
  Layers, 
  ArrowRight
} from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState<Theme>('midnight');
  const initialRoute = useMemo(() => parseCurrentRoute(), []);
  const [currentView, setCurrentView] = useState<'frontpage' | 'atlas' | 'pipeline'>(initialRoute.view);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [selectedStateId, setSelectedStateId] = useState<string | null>(initialRoute.stateId);
  const [isDedicatedDesk, setIsDedicatedDesk] = useState<boolean>(initialRoute.isDeepDesk);
  const [nationalStories, setNationalStories] = useState<ClusteredStory[]>([]);
  const [marketData, setMarketData] = useState<MarketSnapshot | null>(null);
  const [lastMarketRefresh, setLastMarketRefresh] = useState<string>('just now');
  const [isMarketRefreshing, setIsMarketRefreshing] = useState<boolean>(false);
  const [isMarketDrawerOpen, setIsMarketDrawerOpen] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<ClusteredStory | null>(null);
  const [standaloneStory, setStandaloneStory] = useState<ClusteredStory | null>(null);
  const [loadingStandaloneStory, setLoadingStandaloneStory] = useState<boolean>(Boolean(initialRoute.storyId));
  
  // Modals
  const [isNationalOpen, setIsNationalOpen] = useState<boolean>(false);
  const [pipelineTab, setPipelineTab] = useState<'sandbox' | 'architecture'>('sandbox');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState<boolean>(false);
  const [curtainState, setCurtainState] = useState<'idle' | 'up' | 'down'>('idle');
  const [curtainColor, setCurtainColor] = useState<string>('#b64232');

  const handleOpenArchitecture = useCallback(() => {
    setCurrentView('pipeline');
    setPipelineTab('architecture');
    setTimeout(() => {
      const el = document.getElementById('pipelineConsole');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  const handleOpenPipeline = useCallback(() => {
    setCurrentView('pipeline');
    setPipelineTab('sandbox');
    setTimeout(() => {
      const el = document.getElementById('pipelineConsole');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  // Unified single source of truth handler for selecting any state
  const handleSelectState = useCallback((rawId: string, deepDesk = false) => {
    const canonicalId = resolveCanonicalStateId(rawId);
    if (!canonicalId) return;

    setSelectedStateId(canonicalId);
    setIsDedicatedDesk(deepDesk);
    setCurrentView('atlas');
    syncRouteToUrl(canonicalId, 'atlas', deepDesk, true);
  }, []);

  const handleDeselectState = useCallback(() => {
    setSelectedStateId(null);
    setIsDedicatedDesk(false);
    syncRouteToUrl(null, currentView, false, true);
  }, [currentView]);

  const handleOpenDedicatedDesk = useCallback((rawId: string) => {
    const canonicalId = resolveCanonicalStateId(rawId) || selectedStateId;
    if (!canonicalId) return;

    const color = STATES_DATA[canonicalId]?.a || '#b64232';
    setCurtainColor(color);
    setCurtainState('up');
    setTimeout(() => {
      setSelectedStateId(canonicalId);
      setIsDedicatedDesk(true);
      syncRouteToUrl(canonicalId, 'atlas', true, true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCurtainState('down');
      setTimeout(() => {
        setCurtainState('idle');
      }, 480);
    }, 400);
  }, [selectedStateId]);

  const handleBackToAtlasFromDesk = useCallback(() => {
    setCurtainColor('#b64232');
    setCurtainState('up');
    setTimeout(() => {
      setIsDedicatedDesk(false);
      setCurrentView('atlas');
      syncRouteToUrl(selectedStateId, 'atlas', false, true);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setCurtainState('down');
      setTimeout(() => {
        setCurtainState('idle');
      }, 480);
    }, 400);
  }, [selectedStateId]);

  // Resolve initial article link (?story=... or ?article=...)
  useEffect(() => {
    if (initialRoute.storyId) {
      setLoadingStandaloneStory(true);
      findStoryById(initialRoute.storyId)
        .then((story) => {
          if (story) {
            setStandaloneStory(story);
          }
          setLoadingStandaloneStory(false);
        })
        .catch(() => {
          setLoadingStandaloneStory(false);
        });
    }
  }, [initialRoute.storyId]);

  // Handle browser Back / Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute();
      setCurrentView(route.view);
      setSelectedStateId(route.stateId);
      setIsDedicatedDesk(route.isDeepDesk);

      if (route.storyId) {
        findStoryById(route.storyId).then((story) => {
          if (story) setStandaloneStory(story);
        });
      } else {
        setStandaloneStory(null);
        setSelectedStory(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectStory = useCallback((story: ClusteredStory) => {
    setSelectedStory(story);
    syncRouteToUrl(selectedStateId, currentView, isDedicatedDesk, true, story.story_id);
  }, [selectedStateId, currentView, isDedicatedDesk]);

  const handleCloseStory = useCallback(() => {
    setSelectedStory(null);
    syncRouteToUrl(selectedStateId, currentView, isDedicatedDesk, true, null);
  }, [selectedStateId, currentView, isDedicatedDesk]);

  const handleOpenDedicatedPage = useCallback((story: ClusteredStory) => {
    setSelectedStory(null);
    setStandaloneStory(story);
    syncRouteToUrl(selectedStateId, currentView, isDedicatedDesk, true, story.story_id);
  }, [selectedStateId, currentView, isDedicatedDesk]);

  const handleBackToAtlasFromStandalone = useCallback(() => {
    setStandaloneStory(null);
    setSelectedStory(null);
    syncRouteToUrl(selectedStateId, currentView, isDedicatedDesk, true, null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [selectedStateId, currentView, isDedicatedDesk]);

  const refreshMarketData = useCallback(async () => {
    setIsMarketRefreshing(true);
    try {
      const data = await getMarketData();
      setMarketData(data);
      setLastMarketRefresh(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST'
      );
    } finally {
      setTimeout(() => setIsMarketRefreshing(false), 400);
    }
  }, []);

  useEffect(() => {
    // Set theme attribute on document root
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let mounted = true;
    getNationalStories().then((res) => {
      if (mounted) setNationalStories(res.stories);
    });

    const pollMarket = async () => {
      const data = await getMarketData();
      if (mounted) {
        setMarketData(data);
        setLastMarketRefresh(
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST'
        );
      }
    };

    pollMarket();
    const interval = setInterval(pollMarket, 30000); // 30s persistent live market telemetry polling
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'midnight' ? 'newsprint' : 'midnight'));
  };

  // Compute story count per state
  const dispatchesCountMap = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const id of ALL_STATE_IDS) {
      const state = STATES_DATA[id];
      counts[id] = state.stories ? state.stories.length : 0;
    }
    // Also include live national stories matching this state
    for (const story of nationalStories) {
      for (const st of story.states) {
        const matchedId = ALL_STATE_IDS.find(
          id => STATES_DATA[id].displayName.toLowerCase() === st.toLowerCase()
        );
        if (matchedId) {
          counts[matchedId] = (counts[matchedId] || 0) + 1;
        }
      }
    }
    return counts;
  }, [nationalStories]);

  const handleExport = () => {
    downloadMorningDigest(marketData, nationalStories, language);
  };

  // If opening via a dedicated article link (?story=... or ?article=...)
  if (loadingStandaloneStory) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col items-center justify-center p-8 text-center selection:bg-[var(--accent-crimson)] selection:text-white">
        <div className="w-12 h-12 border-2 border-[var(--accent-crimson)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-2xl font-bold text-[var(--text-primary)] tracking-wide">KAALVATRA</p>
        <p className="text-xs font-mono text-[var(--accent-crimson)] uppercase tracking-wider mt-1">THE SOVEREIGN BROADSHEET OF BHARAT</p>
        <p className="text-xs font-mono text-[var(--text-muted)] mt-4">Retrieving dedicated article dispatch...</p>
      </div>
    );
  }

  // The link of the article contains ONLY the news of that specific article
  if (standaloneStory) {
    return (
      <DedicatedArticlePage
        story={standaloneStory}
        onBackToAtlas={handleBackToAtlasFromStandalone}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent-crimson)] selection:text-white transition-colors duration-300">
      {/* Top Masthead with Section Switcher & Utilities */}
      <Masthead
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenNational={() => setIsNationalOpen(true)}
        onOpenArchitecture={handleOpenArchitecture}
        onOpenPipeline={handleOpenPipeline}
        onOpenSearch={() => setIsSearchOpen(true)}
        onExportDigest={handleExport}
        activeStoryCount={nationalStories.length}
        currentView={currentView}
        pipelineTab={pipelineTab}
        onSelectView={(view) => {
          setSelectedStateId(null);
          setIsDedicatedDesk(false);
          setCurrentView(view);
          syncRouteToUrl(null, view, false, true);
        }}
        language={language}
        onSelectLanguage={setLanguage}
      />

      {/* Permanently Docked Sticky Market Desk (Never goes off when switching pages or scrolling) */}
      <PersistentMarketDesk
        market={marketData}
        lastRefreshed={lastMarketRefresh}
        onOpenDrawer={() => setIsMarketDrawerOpen(true)}
        onRefresh={refreshMarketData}
        isRefreshing={isMarketRefreshing}
        language={language}
      />

      {/* Main View Router */}
      {isDedicatedDesk && selectedStateId ? (
        <StateDesk
          stateId={selectedStateId}
          onBackToAtlas={handleBackToAtlasFromDesk}
          onSelectState={(id) => handleSelectState(id, true)}
          onSelectStory={handleSelectStory}
          onOpenStateSwitcher={() => setIsSwitcherOpen(true)}
          language={language}
          market={marketData}
          onOpenMarketDrawer={() => setIsMarketDrawerOpen(true)}
        />
      ) : currentView === 'frontpage' ? (
        <main className="page-enter">
          {/* THE FRONTPAGE BROADSHEET VIEW */}
          <FrontPageView
            nationalStories={nationalStories}
            market={marketData}
            onSelectStory={handleSelectStory}
            onJumpToState={(stateId) => {
              handleSelectState(stateId, false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
          />

          {/* All 36 States Directory on Front Page */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-[var(--border-strong)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-crimson)] font-semibold block mb-1">
                  REGIONAL REPOSITORY INDEX
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--text-primary)]">
                  All 36 State & Territory Broadsheet Desks
                </h2>
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)]">
                Click any territory to zoom into its cartographic desk
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ALL_STATE_IDS.map((id) => {
                const s = STATES_DATA[id];
                return (
                  <button
                    key={id}
                    onClick={() => {
                      handleSelectState(id, false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="editorial-card p-3 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors truncate">
                          {getLocalizedStateName(s.id, s.displayName, language)}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: s.a || 'var(--accent-crimson)' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] block truncate">
                        {s.ep}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                      <span>{dispatchesCountMap[id] || 0} {t('reports', language)}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--accent-crimson)] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      ) : currentView === 'atlas' ? (
        <main className="page-enter">
          {/* GRAND BHARAT ATLAS STAGE */}
          <div id="atlasStage" className="relative border-b border-[var(--border-strong)] bg-[var(--bg-surface)] scroll-mt-[44px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-subtle)]">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-crimson)] font-semibold block mb-1">
                  {t('nav_atlas', language).toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--text-primary)]">
                  Explore 36 Regional Editorial Desks
                </h2>
              </div>
              <p className="text-xs font-mono text-[var(--text-muted)] max-w-md md:text-right">
                Click any state on the map to smoothly zoom into its territory, reveal active broadsheet dispatches, and inspect architectural motifs.
              </p>
            </div>

            {/* Spacious Full Map Canvas with Zoom & News Drawer */}
            <div className="w-full relative">
              <AtlasMap
                activeStateId={selectedStateId}
                onSelectState={(stateId) => handleSelectState(stateId, false)}
                onOpenDeepDesk={(stateId) => handleOpenDedicatedDesk(stateId)}
                onStateDeselect={handleDeselectState}
                onSelectStory={handleSelectStory}
                dispatchesCountMap={dispatchesCountMap}
                language={language}
                market={marketData}
                onOpenMarketDrawer={() => setIsMarketDrawerOpen(true)}
              />
            </div>
          </div>

          {/* ALL 36 STATES DIRECTORY GRID */}
          <section id="stateDirectorySection" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-[54px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent-crimson)] font-semibold block mb-1">
                  {t('state_directory', language)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[var(--text-primary)]">
                  {t('quick_fly', language)}
                </h2>
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)]">
                {t('quick_fly_hint', language)}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ALL_STATE_IDS.map((id) => {
                const s = STATES_DATA[id];
                return (
                  <button
                    key={id}
                    onClick={() => {
                      handleSelectState(id, false);
                      const el = document.getElementById('atlasStage');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="editorial-card p-3 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-serif font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors truncate">
                          {getLocalizedStateName(s.id, s.displayName, language)}
                        </span>
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: s.a || 'var(--accent-crimson)' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] block truncate">
                        {s.ep}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                      <span>{dispatchesCountMap[id] || 0} {t('reports', language)}</span>
                      <ArrowRight className="w-3 h-3 text-[var(--accent-crimson)] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      ) : (
        <main className="page-enter">
          {/* THE MACHINE BEHIND THE PAPER — PRINTING PRESS & PIPELINE SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-b border-[var(--border-strong)]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-crimson)] font-semibold block mb-2">
                  THE MACHINE BEHIND THE PAPER
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[var(--text-primary)] tracking-tight">
                  How raw signals become state-wise stories
                </h2>
              </div>

              <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] p-1 rounded-md border border-[var(--border-strong)] shadow-sm">
                <button
                  onClick={() => {
                    setPipelineTab('sandbox');
                    const el = document.getElementById('pipelineConsole');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`h-8 px-3.5 rounded-md font-mono text-xs font-medium flex items-center gap-2 transition-all ${
                    pipelineTab === 'sandbox'
                      ? 'bg-[var(--accent-crimson)] text-white shadow-sm'
                      : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>Pipeline Sandbox</span>
                </button>

                <button
                  onClick={() => {
                    setPipelineTab('architecture');
                    const el = document.getElementById('pipelineConsole');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`h-8 px-3.5 rounded-md font-mono text-xs font-medium flex items-center gap-2 transition-all ${
                    pipelineTab === 'architecture'
                      ? 'bg-[var(--accent-crimson)] text-white shadow-sm'
                      : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Layers className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>AWS Architecture</span>
                </button>
              </div>
            </div>

            {/* Visual Process Pipeline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                onClick={() => {
                  setPipelineTab('sandbox');
                  const el = document.getElementById('pipelineConsole');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="editorial-card p-6 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-sm group"
              >
                <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold mb-2">
                  01 · RSS INGESTION
                </div>
                <h3 className="font-serif font-semibold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-crimson)] transition-colors">
                  4,000+ News Feeds
                </h3>
                <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  Automated EventBridge schedules trigger high-concurrency ingestion from major national newsrooms and state publications.
                </p>
              </div>

              <div 
                onClick={() => {
                  setPipelineTab('sandbox');
                  const el = document.getElementById('pipelineConsole');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="editorial-card p-6 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-sm group"
              >
                <div className="text-xs font-mono text-[var(--accent-gold)] font-semibold mb-2">
                  02 · TF-IDF RETRIEVAL
                </div>
                <h3 className="font-serif font-semibold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-gold)] transition-colors">
                  464,213 Pairs Scored
                </h3>
                <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  Sparse vector retrieval evaluates lexical overlaps, publication timelines, and common named entities across newsrooms.
                </p>
              </div>

              <div 
                onClick={() => {
                  setPipelineTab('sandbox');
                  const el = document.getElementById('pipelineConsole');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="editorial-card p-6 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-sm group"
              >
                <div className="text-xs font-mono text-emerald-500 font-semibold mb-2">
                  03 · GRAPH CLUSTERING
                </div>
                <h3 className="font-serif font-semibold text-lg text-[var(--text-primary)] mb-2 group-hover:text-emerald-500 transition-colors">
                  Consensus Partitioning
                </h3>
                <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  Connected components and community detection algorithms partition the multi-source graph into coherent narrative units.
                </p>
              </div>

              <div 
                onClick={() => {
                  setPipelineTab('architecture');
                  const el = document.getElementById('pipelineConsole');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="editorial-card p-6 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-sm group"
              >
                <div className="text-xs font-mono text-[var(--accent-crimson)] font-semibold mb-2">
                  04 · STATE ROUTING
                </div>
                <h3 className="font-serif font-semibold text-lg text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-crimson)] transition-colors">
                  DynamoDB Broadsheet
                </h3>
                <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  Geographic router assigns stories to state desks, persisting indexed dispatches to DynamoDB for sub-second frontend delivery.
                </p>
              </div>
            </div>

            {/* Embedded In-Page Pipeline / Architecture Console (Natural Page Scroll) */}
            <div id="pipelineConsole" className="mt-12 pt-8 border-t border-[var(--border-subtle)] scroll-mt-[54px]">
              {pipelineTab === 'sandbox' ? (
                <PipelineSandbox isOpen={true} onClose={() => {}} embedded={true} />
              ) : (
                <AWSArchitectureView isOpen={true} onClose={() => {}} embedded={true} />
              )}
            </div>
          </section>
        </main>
      )}

      {/* FOOTER CHROME */}
      <footer className="border-t border-[var(--border-strong)] bg-[var(--bg-surface)] py-8 text-xs font-mono text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-serif font-bold text-base tracking-wider text-[var(--text-primary)]">KAALVATRA</span>
              <span>·</span>
              <span className="text-[11px] text-[var(--text-secondary)]">The Living Annals of Bharat</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              Continuous regional dispatches filed across 28 States and 8 Union Territories.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button 
              onClick={handleOpenArchitecture} 
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="View AWS System Architecture & Topology"
            >
              Colophon & System Architecture
            </button>
            <span>·</span>
            <button 
              onClick={handleOpenPipeline} 
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="View Machine Pipeline Sandbox"
            >
              Pipeline Telemetry
            </button>
            <span>·</span>
            <button 
              onClick={handleExport} 
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              title="Download Daily Morning Press Edition in PDF format"
            >
              Export Morning Press (PDF)
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS (Only focused tasks; no trapped nested windows) */}
      <StoryReader
        story={selectedStory}
        onClose={handleCloseStory}
        language={language}
        onOpenDedicatedPage={handleOpenDedicatedPage}
      />

      <NationalDeskModal
        isOpen={isNationalOpen}
        onClose={() => setIsNationalOpen(false)}
        stories={nationalStories}
        onSelectStory={handleSelectStory}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        nationalStories={nationalStories}
        onSelectState={(id) => {
          handleSelectState(id, false);
          setIsSearchOpen(false);
        }}
        onSelectStory={(story) => {
          handleSelectStory(story);
          setIsSearchOpen(false);
        }}
      />

      <StateSwitcherModal
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        activeStateId={selectedStateId}
        onSelectState={(id) => {
          handleSelectState(id, isDedicatedDesk);
          setIsSwitcherOpen(false);
        }}
      />

      {/* Slide-over Market Broadsheet Drawer */}
      <MarketDrawer
        isOpen={isMarketDrawerOpen}
        onClose={() => setIsMarketDrawerOpen(false)}
        market={marketData}
        lastRefreshed={lastMarketRefresh}
        onRefresh={refreshMarketData}
        isRefreshing={isMarketRefreshing}
        language={language}
      />

      {/* Cinematic Transition Curtain */}
      <CurtainTransition curtainState={curtainState} color={curtainColor} />
    </div>
  );
}

export default App;
