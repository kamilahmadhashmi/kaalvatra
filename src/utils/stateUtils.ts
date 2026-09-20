import { STATES_DATA, ALL_STATE_IDS } from '../data/statesData';

// Common aliases mapping to canonical hyphenated keys in STATES_DATA
const STATE_ALIASES: Record<string, string> = {
  'orissa': 'odisha',
  'kashmir': 'jammu-kashmir',
  'jk': 'jammu-kashmir',
  'j&k': 'jammu-kashmir',
  'up': 'uttar-pradesh',
  'mp': 'madhya-pradesh',
  'wb': 'west-bengal',
  'tn': 'tamil-nadu',
  'ap': 'andhra-pradesh',
  'dnh': 'dadra-nagar-haveli',
  'andaman': 'andaman-nicobar',
  'pondicherry': 'puducherry',
};

/**
 * Resolves any raw state string (id, slug, display name, plain name, alias)
 * to the canonical key used in STATES_DATA. Returns null if not found.
 */
export function resolveCanonicalStateId(raw?: string | null): string | null {
  if (!raw || typeof raw !== 'string') return null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  // 1. Direct match in STATES_DATA
  if (STATES_DATA[trimmed]) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();

  // 2. Direct lowercase match
  if (STATES_DATA[lower]) {
    return lower;
  }

  // 3. Slugified match
  const slugified = lower
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

  if (STATES_DATA[slugified]) {
    return slugified;
  }

  // 4. Alias lookup
  if (STATE_ALIASES[lower]) {
    return STATE_ALIASES[lower];
  }
  if (STATE_ALIASES[slugified]) {
    return STATE_ALIASES[slugified];
  }

  // 5. Match by displayName or plain name
  for (const id of ALL_STATE_IDS) {
    const s = STATES_DATA[id];
    if (s.displayName.toLowerCase() === lower) return id;
    if (s.plain && s.plain.toLowerCase() === lower) return id;
    if (s.name && s.name.toLowerCase() === lower) return id;
  }

  // 6. Loose substring match
  for (const id of ALL_STATE_IDS) {
    if (id.includes(slugified) || slugified.includes(id)) {
      return id;
    }
  }

  return null;
}

export interface RouteState {
  view: 'frontpage' | 'atlas' | 'pipeline';
  stateId: string | null;
  isDeepDesk: boolean;
  storyId: string | null;
}

/**
 * Parses initial route from URL (search params, hash, or path)
 */
export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'atlas', stateId: null, isDeepDesk: false, storyId: null };
  }

  let rawState: string | null = null;
  let rawView: string | null = null;
  let rawStory: string | null = null;
  let isDeepDesk = false;

  // 1. Check search query params (e.g. ?story=story-1 or ?article=story-1 or ?state=odisha&view=atlas)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('story')) {
      rawStory = searchParams.get('story');
    } else if (searchParams.has('article')) {
      rawStory = searchParams.get('article');
    }

    if (searchParams.has('state')) {
      rawState = searchParams.get('state');
    } else if (searchParams.has('desk')) {
      rawState = searchParams.get('desk');
      isDeepDesk = true;
    }
    if (searchParams.has('view')) {
      rawView = searchParams.get('view');
    }
  } catch {
    // Ignore URL parsing errors
  }

  // 2. Check hash route (e.g. #story/story-1 or #state/odisha)
  if (window.location.hash) {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('story/')) {
      rawStory = hash.replace('story/', '');
    } else if (hash.startsWith('article/')) {
      rawStory = hash.replace('article/', '');
    } else if (hash.startsWith('state/')) {
      rawState = hash.replace('state/', '');
    } else if (hash.startsWith('desk/')) {
      rawState = hash.replace('desk/', '');
      isDeepDesk = true;
    } else if (hash.startsWith('state=')) {
      const p = new URLSearchParams(hash);
      rawState = p.get('state');
      if (p.has('story')) rawStory = p.get('story');
    } else if (hash === 'frontpage' || hash === 'atlas' || hash === 'pipeline') {
      rawView = hash;
    }
  }

  // 3. Check pathname (e.g. /story/story-1 or /state/odisha)
  if (window.location.pathname) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if ((parts[0] === 'story' || parts[0] === 'article') && parts[1]) {
      rawStory = parts[1];
    } else if (parts[0] === 'state' && parts[1]) {
      rawState = parts[1];
    } else if (parts[0] === 'desk' && parts[1]) {
      rawState = parts[1];
      isDeepDesk = true;
    }
  }

  const canonicalState = resolveCanonicalStateId(rawState);

  let view: 'frontpage' | 'atlas' | 'pipeline' = 'atlas';
  if (canonicalState) {
    view = 'atlas';
  } else if (rawView === 'frontpage') {
    view = 'frontpage';
  } else if (rawView === 'pipeline') {
    view = 'pipeline';
  }

  return {
    view,
    stateId: canonicalState,
    isDeepDesk,
    storyId: rawStory ? decodeURIComponent(rawStory).trim() : null
  };
}

/**
 * Synchronizes browser URL history with state, view, and specific story
 */
export function syncRouteToUrl(
  stateId: string | null,
  view: 'frontpage' | 'atlas' | 'pipeline',
  isDeepDesk = false,
  push = true,
  storyId: string | null = null
) {
  if (typeof window === 'undefined') return;

  let newUrl = window.location.pathname;

  if (storyId) {
    newUrl = `?story=${encodeURIComponent(storyId)}`;
  } else if (stateId) {
    const paramKey = isDeepDesk ? 'desk' : 'state';
    newUrl = `?${paramKey}=${encodeURIComponent(stateId)}`;
  } else if (view !== 'atlas') {
    newUrl = `?view=${encodeURIComponent(view)}`;
  } else {
    newUrl = window.location.pathname;
  }

  const stateObj = { stateId, view, isDeepDesk, storyId };

  // Only push if URL actually changes
  const currentQuery = window.location.search || '';
  if (newUrl !== currentQuery && newUrl !== window.location.pathname + currentQuery) {
    if (push) {
      window.history.pushState(stateObj, '', newUrl);
    } else {
      window.history.replaceState(stateObj, '', newUrl);
    }
  }
}
