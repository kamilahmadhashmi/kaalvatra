import React, { useState, useRef, useMemo, useEffect, memo } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Clock, 
  Radio, 
  X,
  BookOpen,
  Volume2,
  VolumeX
} from 'lucide-react';
import { STATES_DATA, ALL_STATE_IDS } from '../data/statesData';
import type { StateProfile } from '../data/statesData';
import type { ClusteredStory, SupportedLanguage, MarketSnapshot } from '../types';
import { getStateStories } from '../services/api';
import { ArchitecturalMotif } from './ArchitecturalMotif';
import { t, getLocalizedStateName, getLocalizedStory } from '../i18n/translations';
import { formatRecentDispatchDate } from '../utils/dateUtils';

interface AtlasMapProps {
  activeStateId: string | null;
  onSelectState: (stateId: string) => void;
  dispatchesCountMap: Record<string, number>;
  onSelectStory?: (story: ClusteredStory) => void;
  onOpenDeepDesk?: (stateId: string) => void;
  onStateDeselect?: () => void;
  language?: SupportedLanguage;
  market?: MarketSnapshot | null;
  onOpenMarketDrawer?: () => void;
}

// Projection functions
const lonToX = (lon: number) => (lon - 67.2) * 28;
const latToY = (lat: number) => (37.6 - lat) * 30;

export interface StateVisualIdentity {
  color: string;
  pattern: 'peaks' | 'waves' | 'river' | 'jaali' | 'weave' | 'temple' | 'crosshatch' | 'dots' | 'port' | 'capital';
  patternName: string;
  badge: string;
}

export const STATE_VISUAL_IDENTITIES: Record<string, StateVisualIdentity> = {
  'jammu-kashmir': { color: '#6A8CA8', pattern: 'peaks', patternName: 'Himalayan Ridge Chevrons', badge: '🏔️ Alpine Peaks' },
  'ladakh': { color: '#8E9EAA', pattern: 'peaks', patternName: 'High-Altitude Cold Desert Relief', badge: '🏔️ Glacial Pass' },
  'himachal-pradesh': { color: '#4E7F93', pattern: 'peaks', patternName: 'Deodar Conifer Mountain Relief', badge: '🌲 Conifer Valleys' },
  'punjab': { color: '#D48B30', pattern: 'river', patternName: 'Five Rivers Alluvial Striations', badge: '🌾 Golden Wheat' },
  'haryana': { color: '#B39147', pattern: 'dots', patternName: 'Kurukshetra Bronze Stipple', badge: '🌾 Fertile Plains' },
  'delhi': { color: '#D1423D', pattern: 'capital', patternName: 'Imperial Sandstone Radial Grid', badge: '🏛️ Imperial Capital' },
  'uttarakhand': { color: '#5B8C65', pattern: 'peaks', patternName: 'Devbhoomi Pine Peak Relief', badge: '🏔️ Devbhoomi Peaks' },
  'uttar-pradesh': { color: '#D95C2B', pattern: 'jaali', patternName: 'Mughal Sandstone Jaali Lattice', badge: '🕌 Sandstone Jaali' },
  'rajasthan': { color: '#E58A2B', pattern: 'jaali', patternName: 'Thar Desert Sandstone Lattice', badge: '🏰 Rajput Fort Lattice' },
  'gujarat': { color: '#D4A41B', pattern: 'port', patternName: 'Kathiawar Maritime Trade Grid', badge: '🧭 Maritime Grid' },
  'madhya-pradesh': { color: '#9B6E38', pattern: 'jaali', patternName: 'Vindhya Teak Plateau Lattice', badge: '❖ Central Plateau' },
  'chhattisgarh': { color: '#8A4F2A', pattern: 'dots', patternName: 'Bastar Mineral & Sal Forest Stipple', badge: '⛏️ Mineral Forest' },
  'jharkhand': { color: '#6B7A35', pattern: 'dots', patternName: 'Chota Nagpur Plateau Stipple', badge: '⛏️ Plateau Ore' },
  'bihar': { color: '#A88328', pattern: 'river', patternName: 'Magadha Gangetic Silt Currents', badge: '〰️ Gangetic Currents' },
  'west-bengal': { color: '#276C94', pattern: 'river', patternName: 'Sundarbans Delta River Alluvium', badge: '🌊 Delta Alluvium' },
  'sikkim': { color: '#4E9680', pattern: 'peaks', patternName: 'Kanchenjunga Alpine Shading', badge: '🏔️ Kanchenjunga' },
  'assam': { color: '#3F8749', pattern: 'river', patternName: 'Brahmaputra Valley River Weave', badge: '🍵 Tea Garden River' },
  'meghalaya': { color: '#3F8E7C', pattern: 'weave', patternName: 'Khasi Hills Bamboo Basket Weave', badge: '🌧️ Cloud Hills Weave' },
  'arunachal-pradesh': { color: '#337D6B', pattern: 'peaks', patternName: 'Eastern Himalayan Ridge Relief', badge: '☀️ Dawn-Lit Peaks' },
  'nagaland': { color: '#5E9B4F', pattern: 'weave', patternName: 'Naga Shawl Geometric Weave', badge: '◈ Naga Shawl Weave' },
  'manipur': { color: '#9B7443', pattern: 'weave', patternName: 'Loktak Floating Reed Weave', badge: '◈ Loktak Weave' },
  'mizoram': { color: '#538FA1', pattern: 'weave', patternName: 'Bamboo Dance Cross-Loom Weave', badge: '◈ Bamboo Loom' },
  'tripura': { color: '#B36742', pattern: 'river', patternName: 'Ujjayanta Cane & River Striations', badge: '〰️ Cane & River' },
  'odisha': { color: '#277D77', pattern: 'temple', patternName: 'Kalinga Stone Gopuram Carvings', badge: '🛕 Kalinga Carvings' },
  'maharashtra': { color: '#B82E28', pattern: 'crosshatch', patternName: 'Deccan Basalt Plateau Crosshatch', badge: '🛡️ Maratha Basalt' },
  'goa': { color: '#D9913D', pattern: 'waves', patternName: 'Konkan Golden Coast Ripples', badge: '⛵ Konkan Coast' },
  'karnataka': { color: '#C45D33', pattern: 'crosshatch', patternName: 'Vijayanagara Stone Crosshatch', badge: '🏛️ Vijayanagara Stone' },
  'telangana': { color: '#885D99', pattern: 'crosshatch', patternName: 'Charminar Granite Crosshatch', badge: '🕌 Deccan Granite' },
  'andhra-pradesh': { color: '#748E33', pattern: 'temple', patternName: 'Tirupati Temple Stepped Gopuram', badge: '🛕 Dravidian Gopuram' },
  'tamil-nadu': { color: '#91335A', pattern: 'temple', patternName: 'Brihadisvara Dravidian Gopuram', badge: '🛕 Chola Temple Tiers' },
  'kerala': { color: '#318552', pattern: 'waves', patternName: 'Malabar Spice Coast Wave Ripples', badge: '🌴 Malabar Ripples' },
  'andaman-nicobar': { color: '#2E7A94', pattern: 'waves', patternName: 'Bay of Bengal Oceanic Wave Graticule', badge: '🏝️ Oceanic Ripples' },
  'lakshadweep': { color: '#3E9E9E', pattern: 'waves', patternName: 'Arabian Sea Coral Lagoon Ripples', badge: '🪸 Coral Lagoon' },
};

type NavPhase = 'idle' | 'zooming-in' | 'focused' | 'fading-news' | 'zooming-out';

export const AtlasMap: React.FC<AtlasMapProps> = memo(({
  activeStateId,
  onSelectState,
  dispatchesCountMap,
  onSelectStory,
  onOpenDeepDesk,
  onStateDeselect,
  language = 'en',
}) => {
  const [navPhase, setNavPhase] = useState<NavPhase>('idle');
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [focusedStateId, setFocusedStateId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // News dispatches for focused state
  const [stateStories, setStateStories] = useState<ClusteredStory[]>([]);
  const [loadingStories, setLoadingStories] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cachedRectRef = useRef<DOMRect | null>(null);

  // Timers for choreographed transition sequencing
  const zoomTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRequestedStateIdRef = useRef<string | null>(null);

  // Pre-generate SVG paths once
  const statePaths = useMemo(() => {
    const paths: Record<string, { d: string; bbox: { x: number; y: number; w: number; h: number; cx: number; cy: number } }> = {};
    
    for (const [id, state] of Object.entries(STATES_DATA)) {
      const coords = state.coords;
      if (!coords || coords.length === 0) continue;

      let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
      let d = '';

      const rings: number[][] = Array.isArray(coords[0]) ? (coords as any) : [coords];

      rings.forEach(ring => {
        let ringD = '';
        for (let i = 0; i < ring.length; i += 2) {
          const x = lonToX(ring[i]);
          const y = latToY(ring[i + 1]);
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;

          ringD += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
        }
        ringD += 'Z ';
        d += ringD;
      });

      paths[id] = {
        d,
        bbox: {
          x: minX,
          y: minY,
          w: maxX - minX,
          h: maxY - minY,
          cx: (minX + maxX) / 2,
          cy: (minY + maxY) / 2
        }
      };
    }
    return paths;
  }, []);

  // Cleanup pending timeouts and speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /**
   * ENTERING A STATE (Cinematic Zoom-in Sequence):
   * 1. Smoothly zooms into the selected state outline from full India map.
   * 2. Continues until state completely fills the viewport (~75-85% coverage).
   * 3. During zoom-in, gradually fades out state's filled landmass to near-invisibility (opacity 0.018).
   * 4. Leaves only a very faint, subtle outline of the state as a background watermark.
   * 5. Once camera reaches final position (~800ms), smoothly transitions state news interface into view.
   */
  const zoomToState = (stateId: string) => {
    const pathInfo = statePaths[stateId];
    if (!pathInfo) return;

    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
      zoomTimeoutRef.current = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const { bbox } = pathInfo;
    const maxDim = Math.max(bbox.w, bbox.h);

    // Responsive target zoom: selected state expands to fill the central screen focus
    const targetZoom = Math.min(6.5, Math.max(2.4, 540 / Math.max(maxDim, 65)));

    // Perfect centering on SVG canvas coordinate space (440, 480)
    const targetCenterX = 440;
    const targetCenterY = 480;

    const targetPanX = targetCenterX - bbox.cx * targetZoom;
    const targetPanY = targetCenterY - bbox.cy * targetZoom;

    setFocusedStateId(stateId);
    setNavPhase('zooming-in');
    setZoom(targetZoom);
    setPan({ x: targetPanX, y: targetPanY });

    // Concurrently fetch dispatches and wipe previous stories to prevent stale content
    setStateStories([]);
    setLoadingStories(true);
    lastRequestedStateIdRef.current = stateId;

    getStateStories(stateId).then((stories) => {
      if (lastRequestedStateIdRef.current === stateId) {
        setStateStories(stories);
        setLoadingStories(false);
      }
    });

    // Step 2: Smooth auto-align so map stage is cleanly framed right below sticky market desk without clipping
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const marketDeskHeight = 42;
      if (Math.abs(rect.top - marketDeskHeight) > 6) {
        const targetScrollY = window.scrollY + rect.top - marketDeskHeight;
        window.scrollTo({ top: Math.max(0, targetScrollY), behavior: 'smooth' });
      }
    }

    // Step 3: Once zoom flight reaches close-up position (~700ms), reveal the news overlay smoothly
    zoomTimeoutRef.current = setTimeout(() => {
      setNavPhase('focused');
    }, 700);
  };

  /**
   * EXITING THE STATE (Smooth Reverse Camera Flight):
   * 1. Gracefully fades out the news interface over 200ms.
   * 2. Smoothly flies the camera back out to full India map over 850ms.
   * 3. Simultaneously restores all state fills and cultural patterns.
   */
  const zoomOutToAtlas = () => {
    if (navPhase === 'idle' || navPhase === 'fading-news' || navPhase === 'zooming-out' || !focusedStateId) return;

    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
      zoomTimeoutRef.current = null;
    }
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Step 1: Fade out news interface
    setNavPhase('fading-news');

    // Step 2: After 200ms pause, smoothly zoom camera out and restore all states & fills
    exitTimeoutRef.current = setTimeout(() => {
      setNavPhase('zooming-out');
      setZoom(1);
      setPan({ x: 0, y: 0 });

      // Step 3: Once camera finishes zooming out (850ms later), complete reset to idle
      exitTimeoutRef.current = setTimeout(() => {
        setNavPhase('idle');
        setFocusedStateId(null);
        setStateStories([]);
        if (onStateDeselect) {
          onStateDeselect();
        }
      }, 850);
    }, 200);
  };

  // Sync external activeStateId prop (single source of truth)
  useEffect(() => {
    if (activeStateId) {
      if (activeStateId !== focusedStateId || (navPhase !== 'focused' && navPhase !== 'zooming-in')) {
        zoomToState(activeStateId);
      }
    } else if (focusedStateId && (navPhase === 'focused' || navPhase === 'zooming-in')) {
      zoomOutToAtlas();
    }
  }, [activeStateId]);

  // Keyboard shortcut: Escape smoothly reverses out to Atlas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (navPhase === 'focused' || navPhase === 'zooming-in')) {
        zoomOutToAtlas();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navPhase, focusedStateId]);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      cachedRectRef.current = containerRef.current.getBoundingClientRect();
    }
  };

  // Direct DOM updates: 0 React re-renders on mousemove
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = cachedRectRef.current || containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY - 16}px, 0)`;
    }

    const scaleFactor = 880 / rect.width;

    if (isDragging) {
      const dx = (e.clientX - dragStart.x) * scaleFactor;
      const dy = (e.clientY - dragStart.y) * (960 / rect.height);
      setPan(prev => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && navPhase === 'idle') {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.4, 5.0));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.4, 0.75));
  };

  const handleResetZoom = () => {
    zoomOutToAtlas();
  };

  const toggleAudioBriefing = (stateObj: StateProfile) => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech synthesis is not supported in this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = `${stateObj.displayName}. Capital: ${stateObj.cap}. ${stateObj.ep}. ${stateObj.stand}. Reporting ${stateStories.length} local dispatches today.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const hoveredState: StateProfile | undefined = hoveredStateId ? STATES_DATA[hoveredStateId] : undefined;
  const focusedState: StateProfile | undefined = focusedStateId ? STATES_DATA[focusedStateId] : undefined;

  // Previous & Next state index navigation
  const currentIndex = focusedStateId ? ALL_STATE_IDS.indexOf(focusedStateId) : -1;
  const prevStateId = currentIndex >= 0 ? ALL_STATE_IDS[(currentIndex - 1 + ALL_STATE_IDS.length) % ALL_STATE_IDS.length] : null;
  const nextStateId = currentIndex >= 0 ? ALL_STATE_IDS[(currentIndex + 1) % ALL_STATE_IDS.length] : null;

  return (
    <div className="w-full flex flex-col">
      {/* Dynamic Cartographic Map Hero Stage */}
      <div
        ref={containerRef}
        className={`relative w-full transition-[height] duration-500 bg-[var(--bg-base)] overflow-hidden flex items-center justify-center select-none border-b border-[var(--border-strong)] ${
          focusedStateId ? 'h-[calc(100vh-42px)] min-h-[620px]' : 'h-[680px] sm:h-[780px] lg:h-[860px]'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setHoveredStateId(null);
          cachedRectRef.current = null;
        }}
      >
        {/* Background Subtle Watermark */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] text-[var(--text-primary)] font-serif text-[18vw] font-bold tracking-widest uppercase select-none"
        >
          BHARAT
        </div>

        {/* Top Floating Atlas Controls (Idle Mode) */}
        {!focusedState && (
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-strong)] rounded-lg p-1.5 shadow-lg">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors"
              title="Reset map perspective"
              aria-label="Reset perspective"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}


        {/* Bottom Floating Legend & Hint (Idle Mode) */}
        {!focusedState && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-20 flex items-center justify-between sm:justify-start gap-4 bg-[var(--bg-card)]/90 backdrop-blur border border-[var(--border-subtle)] rounded-lg px-3.5 py-2 text-xs font-mono text-[var(--text-secondary)] shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-crimson)]" />
              <span>{t('interactive_desks', language)}</span>
            </div>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[11px] text-[var(--text-muted)] hidden md:inline">
              {t('click_zoom_hint', language)}
            </span>
          </div>
        )}

      {/* SVG Map Canvas with Smooth Camera Animation */}
      <svg
        viewBox="0 0 880 960"
        className="w-full h-full max-h-[95vh] cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          if (focusedStateId && !isDragging && (navPhase === 'focused' || navPhase === 'zooming-in')) {
            const target = e.target as SVGElement;
            if (target.id === 'map-backdrop' || target.tagName === 'svg') {
              zoomOutToAtlas();
            }
          }
        }}
        role="region"
        aria-label="Interactive map of India"
      >
        <defs>
          {/* 1. Peaks (Himalayan Ridge Chevrons) */}
          <pattern id="pat-peaks" width="16" height="12" patternUnits="userSpaceOnUse">
            <path d="M0,12 L8,2 L16,12 M0,5 L8,-5 L16,5" fill="none" stroke="rgba(0,0,0,0.38)" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M0,13 L8,3 L16,13" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" strokeLinecap="round" />
          </pattern>

          {/* 2. Waves (Coastal / Maritime Ripples) */}
          <pattern id="pat-waves" width="18" height="10" patternUnits="userSpaceOnUse">
            <path d="M0,5 Q4.5,1 9,5 T18,5 M0,10 Q4.5,6 9,10 T18,10" fill="none" stroke="rgba(0,0,0,0.36)" strokeWidth="0.9" />
            <path d="M0,6 Q4.5,2 9,6 T18,6" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.6" />
          </pattern>

          {/* 3. River (Meandering Alluvial Currents) */}
          <pattern id="pat-river" width="22" height="11" patternUnits="userSpaceOnUse">
            <path d="M0,3 Q5.5,8 11,3 T22,3 M0,9 Q5.5,14 11,9 T22,9" fill="none" stroke="rgba(0,0,0,0.34)" strokeWidth="0.85" />
            <path d="M0,4 Q5.5,9 11,4 T22,4" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
          </pattern>

          {/* 4. Jaali (Sandstone Diamond Lattice) */}
          <pattern id="pat-jaali" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M6,0 L12,6 L6,12 L0,6 Z" fill="none" stroke="rgba(0,0,0,0.36)" strokeWidth="0.85" />
            <circle cx="6" cy="6" r="1.2" fill="rgba(0,0,0,0.35)" />
            <path d="M6,1 L11,6 L6,11 L1,6 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </pattern>

          {/* 5. Weave (Handloom Textile / Bamboo Loom) */}
          <pattern id="pat-weave" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0,0 L14,14 M14,0 L0,14" fill="none" stroke="rgba(0,0,0,0.34)" strokeWidth="0.8" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" strokeDasharray="2 2" />
            <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" strokeDasharray="2 2" />
          </pattern>

          {/* 6. Temple (Dravidian Gopuram Stepped Tiers) */}
          <pattern id="pat-temple" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M7,1 L13,7 L10,7 L10,13 L4,13 L4,7 L1,7 Z" fill="none" stroke="rgba(0,0,0,0.36)" strokeWidth="0.85" />
            <line x1="4" y1="10" x2="10" y2="10" stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />
            <path d="M7,2 L12,7" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
          </pattern>

          {/* 7. Crosshatch (Deccan Basalt Plateau Engraving) */}
          <pattern id="pat-crosshatch" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M0,0 L10,10 M10,0 L0,10" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" />
            <path d="M0,1 L9,10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </pattern>

          {/* 8. Dots (Alluvial Mineral Stipple) */}
          <pattern id="pat-dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.3" fill="rgba(0,0,0,0.38)" />
            <circle cx="8" cy="8" r="1.3" fill="rgba(0,0,0,0.38)" />
            <circle cx="3.5" cy="3.5" r="0.8" fill="rgba(255,255,255,0.25)" />
          </pattern>

          {/* 9. Port (Nautical Trade Meridian Grid) */}
          <pattern id="pat-port" width="14" height="14" patternUnits="userSpaceOnUse">
            <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(0,0,0,0.32)" strokeWidth="0.8" />
            <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(0,0,0,0.32)" strokeWidth="0.8" />
            <circle cx="7" cy="7" r="3.2" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="0.75" />
            <circle cx="7" cy="7" r="1.2" fill="rgba(0,0,0,0.4)" />
          </pattern>

          {/* 10. Capital (Imperial Radial Lutyens Rings) */}
          <pattern id="pat-capital" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="5" fill="none" stroke="rgba(0,0,0,0.38)" strokeWidth="0.8" />
            <circle cx="7" cy="7" r="2.2" fill="rgba(0,0,0,0.45)" />
            <line x1="0" y1="7" x2="14" y2="7" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" strokeDasharray="1 2" />
            <line x1="7" y1="0" x2="7" y2="14" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" strokeDasharray="1 2" />
          </pattern>
        </defs>

        {/* Transparent Ocean Backdrop to click-to-reset when focused */}
        <rect id="map-backdrop" width="880" height="960" fill="transparent" />

        {/* CAMERA VIEWPORT GROUP: Hardware-accelerated SVG transform in exact canvas coordinates */}
        <g
          id="map-camera"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging
              ? 'none'
              : 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        >
          {/* Graticule Longitude & Latitude Lines */}
          <g 
            className="transition-opacity duration-700"
            style={{ opacity: focusedStateId ? 0.04 : 0.25 }} 
            stroke="var(--border-subtle)" 
            strokeWidth="0.8" 
            strokeDasharray="3 3"
          >
            {[70, 75, 80, 85, 90, 95].map(lon => {
              const x = lonToX(lon);
              return (
                <g key={`lon-${lon}`}>
                  <line x1={x} y1={40} x2={x} y2={920} />
                  <text x={x + 4} y={940} fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
                    {lon}°E
                  </text>
                </g>
              );
            })}
            {[10, 15, 20, 25, 30, 35].map(lat => {
              const y = latToY(lat);
              return (
                <g key={`lat-${lat}`}>
                  <line x1={40} y1={y} x2={840} y2={y} />
                  <text x={44} y={y - 4} fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
                    {lat}°N
                  </text>
                </g>
              );
            })}
          </g>

          {/* Subtle Watermark Label behind news in zoomed state */}
          {focusedState && (navPhase === 'zooming-in' || navPhase === 'focused' || navPhase === 'fading-news') && (
            <g 
              className="pointer-events-none transition-opacity duration-1000 select-none"
              style={{ opacity: navPhase === 'focused' ? 0.08 : 0.03 }}
            >
              <text
                x={statePaths[focusedState.id]?.bbox.cx || 440}
                y={statePaths[focusedState.id]?.bbox.cy || 480}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={Math.max(26, Math.min(52, (statePaths[focusedState.id]?.bbox.w || 80) * 0.4))}
                fontFamily="var(--font-serif)"
                fontWeight="bold"
                fill="var(--text-primary)"
                letterSpacing="6"
                className="uppercase"
              >
                {focusedState.displayName}
              </text>
            </g>
          )}

          {/* State Polygons with Unique Visual Identities (Colors + Patterns) */}
          <g className="states-group">
            {Object.entries(STATES_DATA).map(([id, state]) => {
              const pathInfo = statePaths[id];
              if (!pathInfo) return null;

              const identity = STATE_VISUAL_IDENTITIES[id] || {
                color: state.a || '#b64232',
                pattern: 'crosshatch',
                patternName: 'Engraved Hatching',
                badge: '🏛️ State Desk'
              };

              const isHovered = hoveredStateId === id;
              const isSelected = focusedStateId === id;
              const isOther = focusedStateId !== null && !isSelected;
              const dispatchCount = dispatchesCountMap[id] || (state.stories ? state.stories.length : 0);

              const stateColor = identity.color;

              // Other states smoothly dim during focus, restore when zooming out
              const otherOpacity = navPhase === 'zooming-out' ? 1 : 0.18;
              const stateOpacity = isSelected ? 1 : (isOther ? otherOpacity : 1);

              return (
                <g
                  key={id}
                  className="state-shape-group cursor-pointer"
                  onMouseEnter={() => {
                    if (navPhase === 'idle') setHoveredStateId(id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (navPhase === 'idle' || focusedStateId !== id) {
                      zoomToState(id);
                      if (onSelectState) onSelectState(id);
                    }
                  }}
                >
                  {/* 1. Base Distinct Regional Color Fill */}
                  <path
                    d={pathInfo.d}
                    fill={stateColor}
                    stroke={stateColor}
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      opacity: stateOpacity,
                      fillOpacity: isSelected ? 0.88 : isHovered ? 0.86 : isOther ? 0.22 : 0.44,
                      transition: 'fill-opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* 2. Intricate Cartographic Relief Pattern Overlay */}
                  <path
                    d={pathInfo.d}
                    fill={`url(#pat-${identity.pattern})`}
                    stroke="none"
                    pointerEvents="none"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      opacity: stateOpacity,
                      fillOpacity: isSelected ? 0.82 : isHovered ? 0.94 : isOther ? 0.15 : 0.72,
                      transition: 'fill-opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />

                  {/* 3. Outer Boundary Hairline & Interactive Hit-Area */}
                  <path
                    d={pathInfo.d}
                    fill="none"
                    stroke={isSelected ? 'var(--accent-crimson)' : isHovered ? 'var(--accent-crimson)' : stateColor}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth={isSelected ? 2.4 : isHovered ? 2.6 : 1.25}
                    strokeOpacity={isSelected ? 1 : isHovered ? 1 : isOther ? 0.3 : 0.9}
                    style={{
                      opacity: stateOpacity,
                      filter: (isSelected || isHovered) ? `drop-shadow(0 0 6px ${identity.color})` : 'none',
                      transition: 'stroke-width 0.3s ease, stroke 0.3s ease, stroke-opacity 0.7s ease, filter 0.3s ease, opacity 0.7s ease',
                    }}
                    tabIndex={navPhase === 'idle' ? 0 : -1}
                    role="button"
                    aria-label={`${state.displayName}, ${dispatchCount} dispatches, ${identity.patternName}`}
                    onKeyDown={(e) => {
                      if (navPhase === 'idle' && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        zoomToState(id);
                      }
                    }}
                  />

                  {/* State Labels (only shown when map is in idle full-view mode) */}
                  {navPhase === 'idle' && !focusedStateId && pathInfo.bbox.w > 25 && pathInfo.bbox.h > 25 && (
                    <text
                      x={pathInfo.bbox.cx}
                      y={pathInfo.bbox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isHovered ? 'var(--accent-crimson)' : 'var(--text-primary)'}
                      fontSize={pathInfo.bbox.w > 60 ? '9' : '7.5'}
                      fontFamily="var(--font-mono)"
                      fontWeight="600"
                      style={{
                        opacity: 0.9,
                        textShadow: '0 1px 3px rgba(0,0,0,0.6)',
                        transition: 'opacity 0.4s ease, fill 0.2s ease',
                      }}
                      className="pointer-events-none select-none uppercase tracking-wider"
                    >
                      {getLocalizedStateName(state.id, state.displayName, language).slice(0, 10)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating Dynamic Tooltip HUD when hovering across map in idle mode */}
      <div
        ref={tooltipRef}
        className={`fixed top-0 left-0 z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 px-3.5 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-lg text-left transition-opacity duration-150 ${
          hoveredState && navPhase === 'idle' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        {hoveredState && (() => {
          const identity = STATE_VISUAL_IDENTITIES[hoveredState.id] || {
            color: hoveredState.a || 'var(--accent-crimson)',
            pattern: 'crosshatch',
            patternName: 'Engraved Relief',
            badge: '🏛️ State Desk'
          };

          return (
            <>
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full border border-white/40 shadow-sm shrink-0" 
                  style={{ backgroundColor: identity.color }} 
                />
                <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">
                  {getLocalizedStateName(hoveredState.id, hoveredState.displayName, language)}
                </h4>
                <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-medium border bg-[var(--bg-card)] text-[var(--text-secondary)]">
                  {identity.badge}
                </span>
              </div>
              <p className="text-[11px] font-mono text-[var(--text-secondary)] mt-1">
                {hoveredState.ep} · {t('capital', language)}: {hoveredState.cap}
              </p>
              <div className="mt-2 flex items-center justify-between gap-4 text-[10px] font-mono text-[var(--accent-crimson)] border-t border-[var(--border-subtle)] pt-1.5">
                <span>{dispatchesCountMap[hoveredState.id] || hoveredState.stories?.length || 0} {t('active_dispatches', language).toLowerCase()}</span>
                <span>Click to explore desk →</span>
              </div>
            </>
          );
        })()}
      </div>

      {/* CARTOGRAPHIC NEWS OVERLAY: News articles overlay directly on top of the zoomed-in state! */}
      {focusedState && (navPhase === 'focused' || navPhase === 'zooming-in' || navPhase === 'fading-news') && (
        <div
          className={`absolute inset-0 z-30 overflow-y-auto scroll-smooth transition-all duration-500 select-text ${
            navPhase === 'focused' 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
          style={{
            backgroundColor: 'rgba(10, 9, 8, 0.52)',
            backdropFilter: 'blur(2.5px)',
            WebkitBackdropFilter: 'blur(2.5px)',
          }}
        >
          {/* Top Sticky Navigation Bar of the State Desk Overlay */}
          <div className="sticky top-0 z-40 bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-strong)] px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shadow-md">
            {/* Return to Full Map Button */}
            <button
              onClick={zoomOutToAtlas}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-strong)] text-xs font-mono text-[var(--accent-crimson)] font-semibold transition-colors shadow-sm cursor-pointer shrink-0"
              title="Return to Bharat Atlas (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('return_to_atlas', language)}</span>
              <span className="hidden sm:inline text-[10px] text-[var(--text-muted)] font-normal ml-1">[Esc]</span>
            </button>

            {/* State Title & Capital Badge */}
            <div className="flex items-center gap-2.5 truncate">
              <span 
                className="w-3 h-3 rounded-full shrink-0 border border-white/30 shadow-sm" 
                style={{ backgroundColor: focusedState.a || 'var(--accent-crimson)' }} 
              />
              <div className="truncate text-left">
                <h3 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] leading-tight truncate">
                  {getLocalizedStateName(focusedState.id, focusedState.displayName, language)}
                </h3>
                <span className="text-[10px] font-mono text-[var(--text-muted)] hidden md:inline truncate">
                  {focusedState.ep} · {t('capital', language)}: {focusedState.cap}
                </span>
              </div>
              <div className="hidden sm:block shrink-0 pl-2 border-l border-[var(--border-subtle)]">
                <ArchitecturalMotif motif={focusedState.motif} className="w-5 h-5" color={focusedState.a || 'var(--text-primary)'} />
              </div>
            </div>

            {/* Controls: Prev/Next State, Audio Briefing, Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              {prevStateId && (
                <button
                  onClick={() => {
                    zoomToState(prevStateId);
                    if (onSelectState) onSelectState(prevStateId);
                  }}
                  className="p-1.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title={`Previous: ${STATES_DATA[prevStateId]?.displayName}`}
                  aria-label="Previous territory"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {nextStateId && (
                <button
                  onClick={() => {
                    zoomToState(nextStateId);
                    if (onSelectState) onSelectState(nextStateId);
                  }}
                  className="p-1.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title={`Next: ${STATES_DATA[nextStateId]?.displayName}`}
                  aria-label="Next territory"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => toggleAudioBriefing(focusedState)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
                  isSpeaking 
                    ? 'bg-[var(--accent-crimson)] text-white border-[var(--accent-crimson)] animate-pulse'
                    : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                }`}
                title={isSpeaking ? 'Stop narration' : 'Listen to audio briefing'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[var(--accent-crimson)]" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Audio'}</span>
              </button>

              <button
                onClick={zoomOutToAtlas}
                className="p-1.5 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Close news overlay"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Overlay Content: News Articles with State in Background */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-32 sm:pb-44 space-y-6">
            {/* Top Stage Header Row: Motto & Quick Facts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5 rounded-lg bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-subtle)] shadow-md text-left">
              <div className="lg:col-span-2 space-y-2.5">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider font-semibold text-[var(--accent-crimson)]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: focusedState.a || 'var(--accent-crimson)' }} />
                  <span>{t('state_bureau', language)} · {focusedState.ep}</span>
                </div>
                <p className="text-sm sm:text-base font-serif italic text-[var(--text-secondary)] border-l-2 border-[var(--accent-crimson)] pl-3 leading-relaxed">
                  "{focusedState.stand}"
                </p>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">Territory Factsheet</span>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                  {focusedState.facts.slice(0, 3).map(([lbl, val]) => (
                    <div key={lbl} className="bg-[var(--bg-surface)]/85 p-2 rounded-md border border-[var(--border-subtle)]">
                      <span className="block uppercase text-[9px] text-[var(--text-muted)] truncate">{lbl}</span>
                      <span className="font-semibold text-[var(--text-primary)] truncate block">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Dispatches Section Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-xs font-mono text-[var(--accent-crimson)] uppercase font-semibold">
              <span className="flex items-center gap-2 text-sm">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>{t('active_dispatches_heading', language)} ({stateStories.length})</span>
              </span>
              <span className="text-xs text-[var(--text-muted)] font-normal normal-case">
                {t('click_to_read', language)}
              </span>
            </div>

            {/* Stories Grid */}
            {loadingStories ? (
              <div className="py-20 text-center text-xs font-mono text-[var(--text-muted)] flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[var(--accent-crimson)] border-t-transparent rounded-full animate-spin" />
                <span>Loading verified state dispatches...</span>
              </div>
            ) : stateStories.length === 0 ? (
              <div className="p-8 rounded-lg bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-center text-xs font-mono text-[var(--text-muted)]">
                No active dispatches currently filed for this desk today. Regional correspondents standing by.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {stateStories.map((rawStory, index) => {
                  const story = getLocalizedStory(rawStory, language);
                  const isLeadStory = index === 0;
                  return (
                    <article
                      key={story.story_id}
                      onClick={() => onSelectStory && onSelectStory(rawStory)}
                      className={`editorial-card group p-5 rounded-lg bg-[var(--bg-card)]/90 hover:bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] cursor-pointer transition-all flex flex-col justify-between shadow-md text-left ${
                        isLeadStory && stateStories.length > 2 ? 'md:col-span-2 lg:col-span-3' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                          <span className="px-2.5 py-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-crimson)] font-semibold uppercase">
                            {story.category || 'State Desk'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatRecentDispatchDate(story.latest_published_at)}
                          </span>
                        </div>

                        <h4 className={`font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors leading-snug ${
                          isLeadStory && stateStories.length > 2 ? 'text-xl sm:text-2xl' : 'text-lg'
                        }`}>
                          {story.story_title}
                        </h4>

                        {story.byline && (
                          <div className="text-xs font-mono text-[var(--text-muted)]">
                            {story.byline}
                          </div>
                        )}

                        <p className="text-sm font-sans text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                          {story.summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--accent-crimson)] font-semibold">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>{t('read_full_story', language)}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Broadsheet Footer Actions */}
            <div className="pt-6 pb-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={zoomOutToAtlas}
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('return_to_atlas', language)}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('stateDirectorySection');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-md bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1.5"
                  title="Scroll down to all 36 state & territory desks"
                >
                  <span>{t('state_directory', language)}</span>
                  <span>↓</span>
                </button>

                <button
                  onClick={() => {
                    if (!focusedStateId) return;
                    if (onOpenDeepDesk) {
                      onOpenDeepDesk(focusedStateId);
                    } else {
                      onSelectState(focusedStateId);
                    }
                  }}
                  className="px-4 py-2 rounded-md bg-[var(--accent-crimson)] text-white hover:brightness-110 font-mono text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>{t('open_dedicated_desk', language)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
});
