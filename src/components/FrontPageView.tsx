import React from 'react';
import { 
  Radio, 
  ArrowRight
} from 'lucide-react';
import type { ClusteredStory, MarketSnapshot, SupportedLanguage } from '../types';
import { STATES_DATA } from '../data/statesData';
import { t, getLocalizedStateName, getLocalizedStory } from '../i18n/translations';

interface FrontPageViewProps {
  nationalStories: ClusteredStory[];
  market: MarketSnapshot | null;
  onSelectStory: (story: ClusteredStory) => void;
  onJumpToState: (stateId: string) => void;
  language?: SupportedLanguage;
}

export const FrontPageView: React.FC<FrontPageViewProps> = ({
  nationalStories,
  onSelectStory,
  onJumpToState,
  language = 'en',
}) => {
  const leadStory = nationalStories[0] ? getLocalizedStory(nationalStories[0], language) : null;
  const secondaryStories = nationalStories.slice(1, 4).map(s => getLocalizedStory(s, language));
  const wireStories = nationalStories.slice(4).map(s => getLocalizedStory(s, language));

  const todayFormatted = new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 page-enter">
      {/* Newspaper Top Issue Strip */}
      <div className="border-y border-[var(--border-strong)] py-2 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--text-primary)]">VOL. CVII NO. 248</span>
          <span>·</span>
          <span>DAILY MORNING BROADSHEET</span>
          <span>·</span>
          <span>PRICE: ₹5.00</span>
          <span>·</span>
          <span>{todayFormatted}</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] hidden md:flex">
          <span>Delhi: 22°C Clear</span>
          <span>·</span>
          <span>Mumbai: 28°C Humid</span>
          <span>·</span>
          <span>Kolkata: 26°C Fair</span>
          <span>·</span>
          <span>Bengaluru: 24°C Pleasant</span>
          <span>·</span>
          <span>Sunset 18:24 IST</span>
        </div>

        <div className="flex items-center gap-2 text-[var(--accent-crimson)] font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>LATEST EDITION PRINT RUN</span>
        </div>
      </div>

      {/* Main Front Page Broadsheet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: Editorial Column & Financial Benchmarks */}
        <div className="lg:col-span-3 space-y-8 lg:border-r border-[var(--border-subtle)] lg:pr-8">
          {/* Editorial Column Note */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono text-[var(--accent-crimson)] font-bold uppercase tracking-widest block">
              Editorial Notebook
            </span>
            <h3 className="font-serif font-bold text-xl text-[var(--text-primary)] leading-snug">
              The Architecture of Federal Consensus
            </h3>
            <div className="text-xs font-sans text-[var(--text-secondary)] space-y-2.5 leading-relaxed newspaper-drop-cap">
              <p>
                In a subcontinent spanning twenty-eight states and eight union territories, consensus is rarely an accident of administration. It is the hard-won dividend of persistent institutional friction, where regional aspirations repeatedly encounter constitutional frameworks.
              </p>
              <p>
                As fiscal transfers, judicial directions, and inter-state infrastructure corridors increasingly cross state boundaries, the records kept by individual state capitals reveal a complex republic negotiating its present tense in real time.
              </p>
            </div>
            <div className="pt-2 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
              By KAALVATRA Editorial Board · National Bureau
            </div>
          </div>

          <div className="editorial-rule" />

          {/* Bureau Despatches Note */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase tracking-wider">
                BUREAU DESPATCHES
              </span>
              <span className="text-[10px] font-mono text-[var(--accent-crimson)] font-semibold">Continuous Wire</span>
            </div>

            <div className="space-y-3 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <strong className="font-mono text-[var(--accent-crimson)] block text-[11px] mb-1 uppercase">Parliamentary Watch</strong>
                Statutory standing committees convened special review sittings on inter-state revenue shares and renewable grid integration.
              </div>
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <strong className="font-mono text-[var(--accent-crimson)] block text-[11px] mb-1 uppercase">Judicial Inquiries</strong>
                Constitutional benches delivered consequential interim orders regarding municipal autonomy and civic infrastructure mandates.
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: The Lead Banner Story & Sub-Leads */}
        <div className="lg:col-span-6 space-y-8">
          {leadStory && (
            <article 
              onClick={() => onSelectStory(leadStory)}
              className="group cursor-pointer space-y-4 border-b border-[var(--border-strong)] pb-8"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-crimson)] font-semibold uppercase tracking-wider">
                <span>FRONT PAGE LEAD STORY</span>
                <span>·</span>
                <span>{leadStory.category || 'National Governance'}</span>
                <span>·</span>
                <span>{leadStory.article_count} Co-verifying Desks</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors leading-[1.12] tracking-tight">
                {leadStory.story_title}
              </h2>

              <p className="font-serif italic text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {leadStory.summary}
              </p>

              <div className="p-5 rounded-lg bg-[var(--bg-surface)] border-l-2 border-[var(--accent-crimson)] text-xs font-sans text-[var(--text-secondary)] space-y-3 leading-relaxed newspaper-drop-cap">
                <p>
                  <strong className="font-mono text-[var(--accent-crimson)] uppercase font-semibold">NEW DELHI / MUMBAI — </strong>
                  The ongoing legislative dispute has escalated to formal legal notifications, prompting senior cabinet deliberations across alliance partners. According to official wire filings cross-referenced across multiple state bureaus, the notice demands public clarification and retraction of statements delivered during recent parliamentary proceedings.
                </p>
                <p>
                  Sources close to the administration confirmed that senior legal counsels convened an emergency briefing late yesterday evening to finalize procedural filings. The opposition leadership has maintained that its representations are substantiated by archival legislative records, signaling that neither faction is prepared to concede ground ahead of the impending state legislative session.
                </p>
                <p>
                  Constitutional observers note that the dispute highlights the delicate tension between parliamentary privilege and individual civil remedies, with potential precedent-setting implications for state assembly proceedings across the republic.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <div className="text-[var(--text-muted)]">
                  Reported by {leadStory.sources.slice(0, 3).join(' · ')}
                </div>
                <span className="font-bold text-[var(--accent-crimson)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Complete Wire Investigation →
                </span>
              </div>
            </article>
          )}

          {/* Secondary Sub-Lead Stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {secondaryStories.map((story) => (
              <div
                key={story.story_id}
                onClick={() => onSelectStory(story)}
                className="editorial-card group p-5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--accent-crimson)] mb-2 font-semibold uppercase">
                    <span>{story.category || 'National'}</span>
                    <span>·</span>
                    <span>{story.article_count} Sources</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors leading-snug mb-2">
                    {story.story_title}
                  </h3>

                  <p className="text-xs font-sans text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[var(--text-muted)] truncate max-w-[140px]">
                    {story.states.join(', ') || 'National'}
                  </span>
                  <span className="font-semibold text-[var(--accent-crimson)] group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Wire Reports */}
          {wireStories.length > 0 && (
            <div className="border-t border-[var(--border-strong)] pt-6 space-y-3">
              <span className="text-[11px] font-mono text-[var(--accent-crimson)] font-bold uppercase tracking-wider block">
                ADDITIONAL WIRES
              </span>
              <div className="space-y-2.5">
                {wireStories.map((ws) => (
                  <div
                    key={ws.story_id}
                    onClick={() => onSelectStory(ws)}
                    className="editorial-card p-3 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] cursor-pointer flex items-center justify-between gap-4 transition-colors group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-medium">
                        {ws.category || 'Wire'} · {ws.states.join(', ')}
                      </span>
                      <h4 className="font-serif font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors">
                        {ws.story_title}
                      </h4>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-crimson)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: State Wire Highlights & Territory Spotlights */}
        <div className="lg:col-span-3 space-y-6 lg:border-l border-[var(--border-subtle)] lg:pl-8">
          <div className="border-b border-[var(--border-strong)] pb-3">
            <span className="text-[11px] font-mono text-[var(--accent-crimson)] font-bold uppercase tracking-widest block mb-1">
              {t('regional_wire', language)}
            </span>
            <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
              {t('dispatches_capitals', language)}
            </h3>
          </div>

          <div className="space-y-4">
            {['maharashtra', 'delhi', 'uttar-pradesh', 'kerala', 'west-bengal', 'punjab'].map((stateId) => {
              const s = STATES_DATA[stateId];
              if (!s) return null;
              const topStory = s.stories && s.stories.length > 0 ? s.stories[0] : null;

              return (
                <div
                  key={stateId}
                  onClick={() => onJumpToState(stateId)}
                  className="editorial-card p-3.5 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-crimson)] cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-1">
                    <span className="font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-crimson)] transition-colors">
                      {getLocalizedStateName(s.id, s.displayName, language).toUpperCase()}
                    </span>
                    <span className="text-[10px] text-[var(--accent-crimson)]">
                      {s.cap}
                    </span>
                  </div>

                  <p className="text-xs font-serif font-semibold text-[var(--text-primary)] line-clamp-2 leading-snug">
                    {topStory?.h || `Regional dispatch filed from ${s.displayName} bureau.`}
                  </p>

                  <div className="mt-2 text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                    <span className="truncate max-w-[140px]">{s.ep}</span>
                    <span className="text-[var(--accent-crimson)] group-hover:translate-x-0.5 transition-transform">
                      {t('explore_desk', language)} →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Gazette Stamp */}
          <div className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center text-xs font-mono text-[var(--text-muted)]">
            <div className="font-serif font-bold text-sm tracking-wider text-[var(--text-primary)] mb-1">
              THE KAALVATRA CHRONICLE
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Published continuously across 36 regional bureaus and national wire services. Fact-checked and corroborated in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
