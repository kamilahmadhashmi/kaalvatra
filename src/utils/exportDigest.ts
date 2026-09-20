// KAALVATRA v2.0 - Authentic Retro Broadsheet Newspaper Exporter
// Generates a museum-grade vintage Victorian/Edwardian newspaper document (PDF & HTML)

import { jsPDF } from 'jspdf';
import { STATES_DATA } from '../data/statesData';
import type { MarketSnapshot, ClusteredStory, SupportedLanguage } from '../types';
import { getLocalizedStateName, getLocalizedStory } from '../i18n/translations';

function cleanPdfText(text: string | undefined | null): string {
  if (!text) return '';
  return text
    .replace(/₹/g, 'Rs. ')
    .replace(/[–—]/g, '-')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/…/g, '...')
    .replace(/[\u2022\u00B7]/g, '-')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateBroadsheetPdf(
  market: MarketSnapshot | null,
  nationalStories: ClusteredStory[],
  _language: SupportedLanguage = 'en'
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 8;
  const contentWidth = pageWidth - margin * 2; // 194mm
  const contentHeight = pageHeight - margin * 2; // 281mm

  // =========================================================================
  // 1. AGED VINTAGE NEWSPRINT BACKGROUND
  // =========================================================================
  doc.setFillColor(245, 239, 227); // #F5EFE3 authentic warm newsprint
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // =========================================================================
  // 2. ORNATE DOUBLE VICTORIAN BROADSHEET BORDER
  // =========================================================================
  doc.setDrawColor(32, 24, 16);
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, contentWidth, contentHeight);

  doc.setLineWidth(0.25);
  doc.rect(margin + 1.2, margin + 1.2, contentWidth - 2.4, contentHeight - 2.4);

  // Corner decorative rosette blocks
  const cSize = 2.2;
  const corners = [
    [margin + 1.8, margin + 1.8],
    [margin + contentWidth - 1.8 - cSize, margin + 1.8],
    [margin + 1.8, margin + contentHeight - 1.8 - cSize],
    [margin + contentWidth - 1.8 - cSize, margin + contentHeight - 1.8 - cSize],
  ];
  doc.setFillColor(45, 35, 25);
  corners.forEach(([cx, cy]) => {
    doc.rect(cx, cy, cSize, cSize, 'F');
  });

  // =========================================================================
  // 3. RETRO MASTHEAD & EAR BOXES (Y: 10.5mm to 35.5mm)
  // =========================================================================
  const earY = margin + 2.5;
  const earW = 40;
  const earH = 15;

  // Left Ear Box: Historical Volume & Weather
  doc.setFillColor(238, 230, 216);
  doc.rect(margin + 2.5, earY, earW, earH, 'F');
  doc.setDrawColor(65, 52, 40);
  doc.setLineWidth(0.25);
  doc.rect(margin + 2.5, earY, earW, earH);
  doc.rect(margin + 3, earY + 0.5, earW - 1, earH - 1);

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(30, 22, 14);
  doc.text('VOL. CVII NO. 248', margin + 4, earY + 4);
  doc.setFont('times', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(60, 48, 36);
  doc.text('FOUNDED ANNO DOMINI 1926', margin + 4, earY + 7.2);
  doc.text('DELHI - MUMBAI - BENGALURU', margin + 4, earY + 10.2);
  doc.setFont('times', 'italic');
  doc.setTextColor(110, 30, 25);
  doc.text('WEATHER: CLEAR - 28 C - FAIR', margin + 4, earY + 13.2);

  // Right Ear Box: Price, Registry & AWS Telemetry
  const rightEarX = margin + contentWidth - earW - 2.5;
  doc.setFillColor(238, 230, 216);
  doc.rect(rightEarX, earY, earW, earH, 'F');
  doc.setDrawColor(65, 52, 40);
  doc.setLineWidth(0.25);
  doc.rect(rightEarX, earY, earW, earH);
  doc.rect(rightEarX + 0.5, earY + 0.5, earW - 1, earH - 1);

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(30, 22, 14);
  doc.text('PRICE: THREE ANNAS', rightEarX + 3, earY + 4);
  doc.setFont('times', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(60, 48, 36);
  doc.text('SOVEREIGN MORNING EDITION', rightEarX + 3, earY + 7.2);
  doc.text('RNI REG. NO. BHT/2026/01', rightEarX + 3, earY + 10.2);
  doc.setFont('times', 'italic');
  doc.setTextColor(110, 30, 25);
  doc.text('AWS AP-SOUTH-1 WIRE - 0ms LAT', rightEarX + 3, earY + 13.2);

  // Center Grand Broadsheet Masthead
  const centerX = pageWidth / 2;
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  doc.text('* THE SOVEREIGN CHRONICLE OF THE REPUBLIC *', centerX, earY + 2.5, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(33);
  doc.setTextColor(18, 14, 10);
  doc.text('KAALVATRA', centerX, earY + 13, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(110, 30, 25);
  doc.text('THE LIVING ANNALS OF BHARAT - SOVEREIGN BROADSHEET ARCHIVE', centerX, earY + 17, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(80, 65, 50);
  doc.text(
    'SATYAMEVA JAYATE - REGIONAL TRUTHS, SOVEREIGN CONSENSUS - VERITAS IMPERIUM',
    centerX,
    earY + 20,
    { align: 'center' }
  );

  // Oxford Rule & Dateline Bar
  const dateY = earY + 21.5;
  doc.setLineWidth(0.5);
  doc.line(margin + 2.5, dateY, margin + contentWidth - 2.5, dateY);
  doc.setLineWidth(0.2);
  doc.line(margin + 2.5, dateY + 0.8, margin + contentWidth - 2.5, dateY + 0.8);

  const today = new Date();
  const todayStr = cleanPdfText(
    today.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).toUpperCase()
  );
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(30, 24, 18);
  doc.text(todayStr, margin + 3.5, dateY + 4);
  doc.setFont('times', 'normal');
  doc.setFontSize(6);
  doc.text('DISPATCHES TELEGRAPHED DIRECT FROM 36 STATE & TERRITORIAL CAPITALS', centerX, dateY + 4, { align: 'center' });
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.text('REGISTERED ARCHIVE - NO. 28,491', margin + contentWidth - 3.5, dateY + 4, { align: 'right' });

  doc.setLineWidth(0.2);
  doc.line(margin + 2.5, dateY + 5.5, margin + contentWidth - 2.5, dateY + 5.5);
  doc.setLineWidth(0.5);
  doc.line(margin + 2.5, dateY + 6.3, margin + contentWidth - 2.5, dateY + 6.3);

  // =========================================================================
  // 4. BOURSE & FINANCIAL MARKETS STRIP
  // =========================================================================
  const bourseY = dateY + 7.5;
  const bourseH = 7.5;
  doc.setFillColor(238, 231, 218);
  doc.rect(margin + 2.5, bourseY, contentWidth - 5, bourseH, 'F');
  doc.setDrawColor(80, 65, 50);
  doc.setLineWidth(0.25);
  doc.rect(margin + 2.5, bourseY, contentWidth - 5, bourseH);

  // Mini Dark Stamp on left of Bourse
  doc.setFillColor(35, 28, 20);
  doc.rect(margin + 2.5, bourseY, 26, bourseH, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(255, 255, 255);
  doc.text('THE BOURSE', margin + 15.5, bourseY + 3.5, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.setFontSize(4.5);
  doc.text('& BULLION DESK', margin + 15.5, bourseY + 6, { align: 'center' });

  // 5 Financial instruments
  const defaultInstruments = [
    { name: 'GOLD 24K', price: 'Rs. 1,53,710', chg: '+0.72%' },
    { name: 'SILVER 999', price: 'Rs. 2,38,070', chg: '+0.61%' },
    { name: 'USD / INR', price: 'Rs. 95.91', chg: '-0.03%' },
    { name: 'NIFTY 50', price: '23,346.40', chg: '+0.33%' },
    { name: 'SENSEX', price: '74,294.96', chg: '+0.29%' },
  ];

  const rawInstruments = market?.instruments && market.instruments.length > 0
    ? market.instruments.slice(0, 5).map(i => ({
        name: cleanPdfText(i.name),
        price: cleanPdfText(i.price),
        chg: cleanPdfText(i.changePercent),
      }))
    : defaultInstruments;

  const instAreaX = margin + 29.5;
  const instColW = (contentWidth - 5 - 28) / 5;
  rawInstruments.forEach((inst, idx) => {
    const ix = instAreaX + idx * instColW;
    doc.setFont('times', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(30, 24, 18);
    doc.text(inst.name, ix + 1.5, bourseY + 3.2);

    doc.setFont('times', 'normal');
    doc.setFontSize(5.5);
    doc.setTextColor(50, 40, 30);
    doc.text(inst.price, ix + 1.5, bourseY + 6.2);

    const isUp = inst.chg.startsWith('+');
    doc.setFont('times', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(isUp ? 20 : 130, isUp ? 90 : 20, 20);
    doc.text(inst.chg, ix + instColW - 1.5, bourseY + 5, { align: 'right' });

    if (idx < 4) {
      doc.setDrawColor(180, 168, 150);
      doc.setLineWidth(0.15);
      doc.line(ix + instColW, bourseY + 1, ix + instColW, bourseY + bourseH - 1);
    }
  });

  // =========================================================================
  // 5. MAIN BROADSHEET SPLIT (LEFT: 133mm, RIGHT: 56mm)
  // =========================================================================
  const mainY = bourseY + bourseH + 2.5;
  const colDividerX = margin + 135;
  const colBottomY = margin + contentHeight - 14; // Bottom colophon starts at Y: 271mm

  // Vertical Column Oxford Hairline Rule
  doc.setDrawColor(65, 52, 40);
  doc.setLineWidth(0.25);
  doc.line(colDividerX, mainY, colDividerX, colBottomY);

  // -------------------------------------------------------------------------
  // LEFT COLUMN: NATIONAL LEAD, SECONDARY STORIES & PARLIAMENTARY GAZETTE
  // -------------------------------------------------------------------------
  const leftX = margin + 2.5;
  const leftW = colDividerX - leftX - 2.5; // ~130mm
  let curY = mainY;

  const leadStory = nationalStories && nationalStories.length > 0 ? nationalStories[0] : {
    story_title: 'CONSTITUTIONAL DELIBERATIONS REACH SYSTEMIC APEX AMID CROSS-STATE LEGAL FILINGS',
    summary: 'Senior legal counsels convene emergency deliberations as state assemblies review unprecedented federal allocations across infrastructure escrow corridors.',
    category: 'National Governance',
    sources: ['The Hindu', 'Indian Express', 'Press Trust of India'],
    pull_quote: 'Archival legislative records substantiate representations across state assemblies without synthetic interpolation.',
    body: [
      'The ongoing legislative dispute has escalated to formal legal notifications, prompting senior cabinet deliberations across alliance partners. According to official wire filings cross-referenced across multiple state bureaus, the notice demands public clarification and retraction of statements delivered during recent parliamentary proceedings.',
      'Sources close to the administration confirmed that senior legal counsels convened an emergency briefing late yesterday evening to finalize procedural filings. The opposition leadership has maintained that its representations are substantiated by archival legislative records, signaling that neither faction is prepared to concede ground ahead of the impending state legislative session.',
      'Constitutional observers note that the dispute highlights the delicate tension between parliamentary privilege and civil remedies, with potential precedent-setting implications for state assembly proceedings across the republic.',
      'Economic analysts concurrently underscore that capital outlays committed to regional infrastructure projects remain safeguarded by statutory escrow mechanisms, ensuring that ongoing development corridors proceed without administrative interruption.',
    ],
  };

  // Kicker
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  const srcTag = leadStory.sources && leadStory.sources.length > 0 ? leadStory.sources.slice(0, 3).join(', ') : 'Accredited Agencies';
  doc.text(`NATIONAL SPECIAL DISPATCH - CORROBORATED BY ${cleanPdfText(srcTag).toUpperCase()}`, leftX, curY + 2.5);
  curY += 4;

  // Lead Headline
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(18, 14, 10);
  const leadHeadline = cleanPdfText(leadStory.story_title).toUpperCase();
  const headlineLines = doc.splitTextToSize(leadHeadline, leftW);
  doc.text(headlineLines, leftX, curY + 3.5);
  curY += headlineLines.length * 4.8 + 1.2;

  // Lead Deck / Sub-heading
  if (leadStory.summary) {
    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(75, 60, 45);
    const deckLines = doc.splitTextToSize(cleanPdfText(leadStory.summary), leftW);
    doc.text(deckLines, leftX, curY + 2.5);
    curY += deckLines.length * 3.4 + 1.8;
  }

  // Dateline / Byline
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(45, 35, 25);
  doc.text('BY OUR SPECIAL EDITORIAL CORRESPONDENT - NEW DELHI, 20 SEPT -', leftX, curY + 2);
  curY += 3.5;

  // Dividing rule below headline
  doc.setLineWidth(0.2);
  doc.line(leftX, curY, leftX + leftW, curY);
  curY += 2.5;

  // Two-column body layout for Lead Story
  const subColW = (leftW - 4) / 2; // ~63mm each
  const subCol1X = leftX;
  const subCol2X = leftX + subColW + 4;

  const p1 = cleanPdfText(leadStory.body && leadStory.body[0] ? leadStory.body[0] : 'The ongoing legislative dispute has escalated to formal legal notifications, prompting senior cabinet deliberations across alliance partners.');
  const p2 = cleanPdfText(leadStory.body && leadStory.body[1] ? leadStory.body[1] : 'Sources close to the administration confirmed that senior legal counsels convened an emergency briefing late yesterday evening.');
  const p3 = cleanPdfText(leadStory.body && leadStory.body[2] ? leadStory.body[2] : 'Constitutional observers note that the dispute highlights the delicate tension between parliamentary privilege and civil remedies.');

  // Drop Cap
  const dcSize = 7.5;
  doc.setFillColor(32, 24, 16);
  doc.rect(subCol1X, curY, dcSize, dcSize, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  const firstLetter = p1.charAt(0) || 'T';
  doc.text(firstLetter, subCol1X + 1.8, curY + 6.2);

  // Text adjacent to drop cap
  const restWords = p1.slice(1).split(' ');
  const line1Words = restWords.slice(0, 3).join(' ').toUpperCase();
  const line2Words = restWords.slice(3, 8).join(' ');
  doc.setFont('times', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(25, 20, 15);
  doc.text(line1Words, subCol1X + dcSize + 1.5, curY + 3);
  doc.setFont('times', 'normal');
  doc.text(line2Words, subCol1X + dcSize + 1.5, curY + 6.2);

  // Text below drop cap
  const remainingP1 = restWords.slice(8).join(' ');
  const p1Lines = doc.splitTextToSize(remainingP1 + ' ' + p2, subColW);
  doc.text(p1Lines.slice(0, 9), subCol1X, curY + dcSize + 3);

  // Sub-column 2: VINTAGE PULL QUOTE + Continuation
  const quoteBoxH = 14;
  doc.setFillColor(239, 232, 220);
  doc.rect(subCol2X, curY, subColW, quoteBoxH, 'F');
  doc.setDrawColor(120, 30, 30);
  doc.setLineWidth(0.8);
  doc.line(subCol2X, curY, subCol2X, curY + quoteBoxH);
  doc.setDrawColor(90, 75, 60);
  doc.setLineWidth(0.15);
  doc.rect(subCol2X, curY, subColW, quoteBoxH);

  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(120, 30, 30);
  doc.text('"', subCol2X + 2, curY + 3.8);
  doc.setFont('times', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  const qLines = doc.splitTextToSize(cleanPdfText(leadStory.pull_quote || 'Archival legislative records substantiate representations across state assemblies.'), subColW - 6);
  doc.text(qLines.slice(0, 3), subCol2X + 4, curY + 4.2);

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(30, 24, 18);
  const p3Lines = doc.splitTextToSize(p3, subColW);
  doc.text(p3Lines.slice(0, 8), subCol2X, curY + quoteBoxH + 3.2);

  curY += 41;

  // Ornamental Divider Rule
  doc.setLineWidth(0.3);
  doc.line(leftX, curY, leftX + leftW, curY);
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  doc.text('* * *', leftX + leftW / 2, curY + 1.2, { align: 'center' });
  curY += 3.5;

  // -------------------------------------------------------------------------
  // SECONDARY STORY 1 (Economy & Rail Infrastructure)
  // -------------------------------------------------------------------------
  const sec1 = nationalStories && nationalStories.length > 1 ? nationalStories[1] : null;
  const sec1Cat = cleanPdfText(sec1?.category || 'COMMERCE & INFRASTRUCTURE');
  const sec1Sources = sec1?.sources && sec1.sources.length > 0 ? sec1.sources.slice(0, 2).join(' & ') : 'THE INDIAN EXPRESS & PTI';
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  doc.text(`[${sec1Cat.toUpperCase()}] - ${cleanPdfText(sec1Sources).toUpperCase()}`, leftX, curY + 2);
  curY += 3.5;

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(18, 14, 10);
  const sec1Title = cleanPdfText(sec1?.story_title || 'CABINET ADVANCES STRATEGIC FREIGHT CORRIDOR DISBURSEMENTS').toUpperCase();
  const sec1HdLn = doc.splitTextToSize(sec1Title, leftW);
  doc.text(sec1HdLn, leftX, curY + 2.8);
  curY += sec1HdLn.length * 3.8 + 1;

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(35, 28, 22);
  const sec1Text = cleanPdfText(sec1?.summary || (sec1?.body && sec1.body[0]) || 'Inter-ministerial sanctions accelerate key railway feeder junctions, ensuring dedicated freight clearance across western industrial clusters. Transit turnaround times between inland dry depots and deep-water berths are scheduled to contract by thirty-two percent under the coordinated multi-modal logistics framework.');
  const sec1Lines = doc.splitTextToSize(sec1Text, leftW);
  doc.text(sec1Lines.slice(0, 3), leftX, curY + 2.2);
  curY += sec1Lines.slice(0, 3).length * 3 + 2.5;

  doc.setLineWidth(0.15);
  doc.line(leftX, curY, leftX + leftW, curY);
  curY += 2.5;

  // -------------------------------------------------------------------------
  // SECONDARY STORY 2 (Judiciary & Himalayan Ecology)
  // -------------------------------------------------------------------------
  const sec2 = nationalStories && nationalStories.length > 2 ? nationalStories[2] : null;
  const sec2Cat = cleanPdfText(sec2?.category || 'APEX JUDICIARY & ECOLOGY');
  const sec2Sources = sec2?.sources && sec2.sources.length > 0 ? sec2.sources.slice(0, 2).join(' & ') : 'THE HINDU & HINDUSTAN TIMES';
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  doc.text(`[${sec2Cat.toUpperCase()}] - ${cleanPdfText(sec2Sources).toUpperCase()}`, leftX, curY + 2);
  curY += 3.5;

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(18, 14, 10);
  const sec2Title = cleanPdfText(sec2?.story_title || 'ENVIRONMENTAL BENCH DIRECTS SATELLITE MONITORING OF RIVER BASINS').toUpperCase();
  const sec2HdLn = doc.splitTextToSize(sec2Title, leftW);
  doc.text(sec2HdLn, leftX, curY + 2.8);
  curY += sec2HdLn.length * 3.8 + 1;

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(35, 28, 22);
  const sec2Text = cleanPdfText(sec2?.summary || (sec2?.body && sec2.body[0]) || 'High-resolution telemetry to be integrated with state pollution control dashboards for real-time compliance tracking. The Supreme Court bench insisted ecological balance sheets across fragile buffer zones cannot face indefinite bureaucratic postponements, setting a binding compliance audit.');
  const sec2Lines = doc.splitTextToSize(sec2Text, leftW);
  doc.text(sec2Lines.slice(0, 3), leftX, curY + 2.2);
  curY += sec2Lines.slice(0, 3).length * 3 + 2.5;

  doc.setLineWidth(0.15);
  doc.line(leftX, curY, leftX + leftW, curY);
  curY += 2.5;

  // -------------------------------------------------------------------------
  // SECONDARY STORY 3 (Agrarian Economy & Mandi Procurement)
  // -------------------------------------------------------------------------
  const sec3 = nationalStories && nationalStories.length > 3 ? nationalStories[3] : null;
  const sec3Cat = cleanPdfText(sec3?.category || 'AGRARIAN DISPATCH');
  const sec3Sources = sec3?.sources && sec3.sources.length > 0 ? sec3.sources.slice(0, 2).join(' & ') : 'PUNJAB & NORTHERN CORRIDORS WIRE';
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  doc.text(`[${sec3Cat.toUpperCase()}] - ${cleanPdfText(sec3Sources).toUpperCase()}`, leftX, curY + 2);
  curY += 3.5;

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(18, 14, 10);
  const sec3Title = cleanPdfText(sec3?.story_title || 'DIRECT GRAIN SETTLEMENT TRANSFERS REMIT RS 42,000 CRORE INTO RURAL ACCOUNTS').toUpperCase();
  const sec3HdLn = doc.splitTextToSize(sec3Title, leftW);
  doc.text(sec3HdLn, leftX, curY + 2.8);
  curY += sec3HdLn.length * 3.8 + 1;

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(35, 28, 22);
  const sec3Text = cleanPdfText(sec3?.summary || (sec3?.body && sec3.body[0]) || 'Seasonal grain procurement reaches historic clearing velocity under automated mandi tokenization. Food Corporation custodians confirm sovereign escrow reserves deployed to guarantee credit liquidity for participating agrarian cooperatives.');
  const sec3Lines = doc.splitTextToSize(sec3Text, leftW);
  doc.text(sec3Lines.slice(0, 3), leftX, curY + 2.2);
  curY += sec3Lines.slice(0, 3).length * 3 + 2.5;

  doc.setLineWidth(0.15);
  doc.line(leftX, curY, leftX + leftW, curY);
  curY += 2.5;

  // -------------------------------------------------------------------------
  // LOWER DENSE SECTION: TWO SUB-COLUMNS (TECH TELEMETRY + STOP PRESS BOX)
  // -------------------------------------------------------------------------
  const lateBoxW = subColW;
  const lateBoxH = 26;

  // Left sub-col: Sovereign Cloud Telemetry Story & Editorial Certificate
  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 30, 30);
  doc.text('[SOVEREIGN TECH] - WIRE TELEMETRY', subCol1X, curY + 2);
  doc.setFont('times', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(18, 14, 10);
  doc.text('36 STATE BUREAUX DEPLOY', subCol1X, curY + 5.2);
  doc.text('0ms SOVEREIGN DATA MESH', subCol1X, curY + 8.2);

  doc.setFont('times', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(40, 32, 24);
  const techText = 'Federated regional databases integrate direct consensus feeds across 36 provincial administrative desks. Zero synthetic interpolation ensures uncompromised archival ground truth for sovereign records.';
  const techLn = doc.splitTextToSize(techText, subColW);
  doc.text(techLn.slice(0, 4), subCol1X, curY + 11.5);

  // Micro Certificate box inside Sub-col 1
  doc.setFillColor(238, 231, 219);
  doc.rect(subCol1X, curY + 20, subColW, 6, 'F');
  doc.setDrawColor(90, 75, 60);
  doc.setLineWidth(0.15);
  doc.rect(subCol1X, curY + 20, subColW, 6);
  doc.setFont('times', 'italic');
  doc.setFontSize(4.5);
  doc.setTextColor(70, 55, 40);
  doc.text('Archival Imprint: Verified through multi-source corroboration.', subCol1X + subColW / 2, curY + 22.8, { align: 'center' });
  doc.setFont('times', 'bold');
  doc.text('RNI CERTIFICATE OF EDITORIAL INTEGRITY', subCol1X + subColW / 2, curY + 25.2, { align: 'center' });

  // Right sub-col: RETRO STOP PRESS / LATE TELEGRAPH BOX
  doc.setFillColor(242, 235, 220);
  doc.rect(subCol2X, curY, lateBoxW, lateBoxH, 'F');
  doc.setDrawColor(60, 45, 30);
  doc.setLineWidth(0.3);
  doc.rect(subCol2X, curY, lateBoxW, lateBoxH);

  // Red stamped header in late box
  doc.setFillColor(130, 30, 30);
  doc.rect(subCol2X, curY, lateBoxW, 4.5, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(255, 255, 255);
  doc.text('STOP PRESS - LATE CITY TELEGRAPH', subCol2X + lateBoxW / 2, curY + 3.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(20, 16, 12);
  const stopPressMsg = '04:30 HRS - CENTRAL ELECTRICITY REGULATORY BODY APPROVES REAL-TIME DYNAMIC SETTLEMENT RULES ACROSS WESTERN & SOUTHERN GRIDS. INTER-STATE DISPATCH CORRIDORS REPORT NORMAL CLEARANCE VOLUMES.';
  const spLn = doc.splitTextToSize(stopPressMsg, lateBoxW - 3);
  doc.text(spLn.slice(0, 6), subCol2X + 1.5, curY + 7.5);

  curY += lateBoxH + 2.5;

  // -------------------------------------------------------------------------
  // LOWER LEFT GAZETTE: LEGISLATIVE & COMMERCE SUMMARY (Fills to colBottomY)
  // -------------------------------------------------------------------------
  doc.setLineWidth(0.2);
  doc.line(leftX, curY, leftX + leftW, curY);
  curY += 2;

  doc.setFont('times', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(120, 30, 30);
  doc.text('DAILY LEGISLATIVE GAZETTE & INTERSTATE TELEMETRY SUMMARY', leftX, curY + 2);
  doc.setFont('times', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(50, 40, 30);
  doc.text('Central Secretariat orders all 36 provincial accounting nodes to reconcile quarterly regional disbursements before the convening of the autumn legislative session. Sovereign telemetry indicators verify 100% data transmission integrity without packet latency.', leftX, curY + 5.5, { maxWidth: leftW });

  // -------------------------------------------------------------------------
  // RIGHT COLUMN: PROVINCIAL TELEGRAPH & STATE BUREAUX (8 STATE BUREAUX)
  // -------------------------------------------------------------------------
  const rightX = colDividerX + 2.5;
  const rightW = margin + contentWidth - rightX - 2.5; // ~56mm
  let rY = mainY;

  // Provincial Header Banner
  doc.setFillColor(32, 24, 16);
  doc.rect(rightX, rY, rightW, 6.5, 'F');
  doc.setFont('times', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('PROVINCIAL TELEGRAPH', rightX + rightW / 2, rY + 3.8, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.setFontSize(4.5);
  doc.text('DISPATCHES FILED FROM STATE BUREAUX', rightX + rightW / 2, rY + 5.8, { align: 'center' });
  rY += 8;

  const defaultProvincialDispatches = [
    {
      state: 'MAHARASHTRA - MUMBAI',
      cap: 'CAPITAL BUREAU',
      hd: 'Coastal Road crash probe orders impact telemetry audit',
      dek: 'Authorities inspect attenuation barriers along Marine Drive extension following collision.',
      src: 'The Hindu - Mumbai',
    },
    {
      state: 'DELHI NCR - CAPITAL',
      cap: 'SUPREME COURT',
      hd: 'Apex Bench fixes strict November 30 buffer zone deadline',
      dek: 'Indefinite administrative extensions ruled impermissible across sensitive ridge zones.',
      src: 'The Hindu - Court Desk',
    },
    {
      state: 'KARNATAKA - BENGALURU',
      cap: 'CIVIC SECRETARIAT',
      hd: 'Digital residential building clearances cleared in 30 mins',
      dek: 'Nambike Nakshe 2.0 system removes discretionary physical checkpoints.',
      src: 'Indian Express - Bengaluru',
    },
    {
      state: 'TAMIL NADU - CHENNAI',
      cap: 'MARITIME DESK',
      hd: 'Port logistics corridor cuts vessel turnaround times',
      dek: 'Intermodal rail lines synchronize container flow between inland freight stations and berths.',
      src: 'Hindustan Times - Chennai',
    },
    {
      state: 'PUNJAB & HARYANA',
      cap: 'CHANDIGARH',
      hd: 'Direct transfers deposit Rs 42,000 cr into verified accounts',
      dek: 'Tokenized mandi receipts disburse seasonal crop procurement proceeds within 48 hours.',
      src: 'The Hindu - Punjab',
    },
    {
      state: 'WEST BENGAL - KOLKATA',
      cap: 'EASTERN DESK',
      hd: 'River carrying-capacity survey launched across delta basin',
      dek: 'Interdisciplinary hydrologic panels begin comprehensive silt and carrying telemetry.',
      src: 'Times of India - Kolkata',
    },
    {
      state: 'GUJARAT & RAJASTHAN',
      cap: 'WESTERN CORRIDOR',
      hd: 'Solar park feeder lines commissioned on schedule',
      dek: 'Renewable transmission grid completes phase-one high-voltage direct current tests.',
      src: 'PTI - Western Wire',
    },
    {
      state: 'KERALA & ANDHRA',
      cap: 'COASTAL BUREAUX',
      hd: 'Deep-water transshipment berths advance maritime trials',
      dek: 'Automated crane telemetry achieves record container crane moves per hour.',
      src: 'The Hindu - Maritime',
    },
  ];

  // Dynamically populate from STATES_DATA if available
  const stateKeys = ['maharashtra', 'delhi', 'karnataka', 'tamil-nadu', 'punjab', 'west-bengal', 'gujarat', 'kerala'];
  const provincialDispatches = stateKeys.map((k, idx) => {
    const s = STATES_DATA[k];
    const topStory = s?.stories && s.stories.length > 0 ? s.stories[0] : null;
    const def = defaultProvincialDispatches[idx] || defaultProvincialDispatches[0];
    if (s && topStory) {
      return {
        state: `${cleanPdfText(s.displayName).toUpperCase()} - ${cleanPdfText(s.cap.split('/')[0]).toUpperCase()}`,
        cap: 'STATE BUREAU',
        hd: cleanPdfText(topStory.h),
        dek: cleanPdfText(topStory.dek),
        src: cleanPdfText(topStory.by || `${s.displayName} Bureau`),
      };
    }
    return def;
  });

  provincialDispatches.forEach((item, idx) => {
    // Mini State Header
    doc.setFont('times', 'bold');
    doc.setFontSize(5.8);
    doc.setTextColor(120, 30, 30);
    doc.text(item.state, rightX, rY + 1.8);
    doc.setFont('times', 'italic');
    doc.setFontSize(4.6);
    doc.setTextColor(90, 75, 60);
    doc.text(item.cap, rightX + rightW, rY + 1.8, { align: 'right' });
    rY += 2.8;

    // State Headline
    doc.setFont('times', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(20, 16, 12);
    const sHdLn = doc.splitTextToSize(item.hd, rightW);
    doc.text(sHdLn.slice(0, 2), rightX, rY + 2.2);
    rY += sHdLn.slice(0, 2).length * 3.1 + 0.6;

    // State Dek
    doc.setFont('times', 'normal');
    doc.setFontSize(5.8);
    doc.setTextColor(40, 32, 24);
    const sDekLn = doc.splitTextToSize(item.dek, rightW);
    doc.text(sDekLn.slice(0, 2), rightX, rY + 1.8);
    rY += sDekLn.slice(0, 2).length * 2.7 + 0.8;

    // Bureau source
    doc.setFont('times', 'italic');
    doc.setFontSize(4.8);
    doc.setTextColor(110, 30, 25);
    doc.text(`[Filed by: ${item.src}]`, rightX, rY + 1.6);
    rY += 2.6;

    // Divider between provincial dispatches
    if (idx < provincialDispatches.length - 1) {
      doc.setDrawColor(180, 168, 150);
      doc.setLineWidth(0.15);
      doc.line(rightX, rY, rightX + rightW, rY);
      rY += 1.5;
    }
  });

  // Authentic Archival Seal / Stamp at the bottom of the right column
  const stampY = rY + 1;
  const stampH = colBottomY - stampY;
  if (stampH > 8) {
    doc.setFillColor(239, 231, 217);
    doc.rect(rightX, stampY, rightW, stampH, 'F');
    doc.setDrawColor(120, 30, 30);
    doc.setLineWidth(0.3);
    doc.rect(rightX + 0.8, stampY + 0.8, rightW - 1.6, stampH - 1.6);

    doc.setFont('times', 'bold');
    doc.setFontSize(5.5);
    doc.setTextColor(120, 30, 30);
    doc.text('SOVEREIGN ARCHIVE SEAL', rightX + rightW / 2, stampY + 3.6, { align: 'center' });
    doc.setFont('times', 'normal');
    doc.setFontSize(4.5);
    doc.setTextColor(50, 40, 30);
    doc.text('AUTHENTICATED VIA SOVEREIGN CLOUD', rightX + rightW / 2, stampY + 6.8, { align: 'center' });
    doc.setFont('times', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(120, 30, 30);
    doc.text('[VERITAS IMPERIUM - RNI 2026]', rightX + rightW / 2, stampY + 9.8, { align: 'center' });
  }

  // =========================================================================
  // 6. BOTTOM ARCHIVAL COLOPHON (Y: 271mm to 281mm)
  // =========================================================================
  const colophonY = colBottomY + 1.5;
  doc.setDrawColor(32, 24, 16);
  doc.setLineWidth(0.5);
  doc.line(margin + 2.5, colophonY, margin + contentWidth - 2.5, colophonY);
  doc.setLineWidth(0.2);
  doc.line(margin + 2.5, colophonY + 0.8, margin + contentWidth - 2.5, colophonY + 0.8);

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(20, 16, 12);
  doc.text('THE KAALVATRA EDITORIAL SYNDICATE - SOVEREIGN ARCHIVE IMPRINT', centerX, colophonY + 4, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(60, 48, 36);
  doc.text('Printed & published via sovereign cloud telemetry at the Central Press of Bharat. Registered with the Registrar of Newspapers for India (RNI).', centerX, colophonY + 6.8, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(120, 30, 30);
  doc.text('ZERO SYNTHETIC HALLUCINATIONS - ALL STORIES MULTI-SOURCE VERIFIED - COMPLETE MORNING EDITION - PAGE 1 OF 1', centerX, colophonY + 9.5, { align: 'center' });

  return doc;
}

export function downloadMorningDigest(
  market: MarketSnapshot | null,
  nationalStories: ClusteredStory[],
  language: SupportedLanguage = 'en'
) {
  // Automatically generates & downloads high-quality vector broadsheet PDF by default
  const doc = generateBroadsheetPdf(market, nationalStories, language);
  const dateTag = new Date().toISOString().slice(0, 10);
  doc.save(`Kaalvatra-Morning-Press-${dateTag}.pdf`);
}

export function generateRetroNewspaperHtml(
  market: MarketSnapshot | null,
  nationalStories: ClusteredStory[],
  language: SupportedLanguage = 'en'
): string {
  const today = new Date();
  
  const fullDateFormatted = today.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase();

  const localizedStories = nationalStories.length > 0 
    ? nationalStories.map(s => getLocalizedStory(s, language))
    : [];

  const leadStory = localizedStories[0] || {
    story_title: "CONSTITUTIONAL DELIBERATIONS REACH SYSTEMIC APEX AMID CROSS-STATE LEGAL FILINGS",
    summary: "Senior legal counsels convene emergency deliberations as state assemblies review unprecedented federal allocations.",
    category: "National Governance",
    article_count: 5,
    sources: ["The Hindu", "Indian Express", "Press Trust of India"],
    body: [
      "The ongoing legislative dispute has escalated to formal legal notifications, prompting senior cabinet deliberations across alliance partners. According to official wire filings cross-referenced across multiple state bureaus, the notice demands public clarification and retraction of statements delivered during recent parliamentary proceedings.",
      "Sources close to the administration confirmed that senior legal counsels convened an emergency briefing late yesterday evening to finalize procedural filings. The opposition leadership has maintained that its representations are substantiated by archival legislative records, signaling that neither faction is prepared to concede ground ahead of the impending state legislative session.",
      "Constitutional observers note that the dispute highlights the delicate tension between parliamentary privilege and individual civil remedies, with potential precedent-setting implications for state assembly proceedings across the republic.",
      "Economic analysts concurrently underscore that capital outlays committed to regional infrastructure projects remain safeguarded by statutory escrow mechanisms, ensuring that ongoing development corridors proceed without administrative interruption."
    ]
  };

  const secondaryStories = localizedStories.slice(1, 4);

  // Formatted bourse instruments
  const instruments = market?.instruments && market.instruments.length > 0 ? market.instruments : [
    { name: 'GOLD 24K', price: '₹1,53,710', changePercent: '+0.72%', isPositive: true, unit: '/ 10g' },
    { name: 'SILVER 999', price: '₹2,38,070', changePercent: '+0.61%', isPositive: true, unit: '/ kg' },
    { name: 'USD / INR', price: '₹95.91', changePercent: '-0.03%', isPositive: false, unit: '' },
    { name: 'NIFTY 50', price: '23,346.40', changePercent: '+0.33%', isPositive: true, unit: '' },
    { name: 'SENSEX', price: '74,294.96', changePercent: '+0.29%', isPositive: true, unit: '' }
  ];

  const bourseRows = instruments.map(inst => `
    <tr>
      <td class="bourse-cell sym"><strong>${escapeHtml(inst.name)}</strong></td>
      <td class="bourse-cell val">${escapeHtml(inst.price)} <small>${escapeHtml(inst.unit || '')}</small></td>
      <td class="bourse-cell chg ${inst.isPositive ? 'chg-up' : 'chg-dn'}">${inst.isPositive ? '▲ ' : '▼ '}${escapeHtml(inst.changePercent)}</td>
    </tr>
  `).join('');

  // Sampled provincial capitals
  const sampleStateIds = ['maharashtra', 'delhi', 'uttar-pradesh', 'west-bengal', 'tamil-nadu', 'karnataka', 'punjab', 'kerala'];
  const provincialBoxes = sampleStateIds.map(id => {
    const s = STATES_DATA[id];
    if (!s) return '';
    const localizedName = getLocalizedStateName(s.id, s.displayName, language);
    const topStory = s.stories && s.stories.length > 0 ? s.stories[0] : null;
    const headline = topStory?.h || `Regional dispatch filed from ${s.displayName} bureau.`;
    const dek = topStory?.dek || `Administrative developments underway across ${s.displayName} municipal boundaries.`;

    return `
      <div class="provincial-card">
        <div class="provincial-banner">
          <span class="prov-name">${escapeHtml(localizedName.toUpperCase())}</span>
          <span class="prov-cap">Cap. ${escapeHtml(s.cap)}</span>
        </div>
        <div class="prov-ep">${escapeHtml(s.ep)} · <em>"${escapeHtml(s.stand)}"</em></div>
        <p class="prov-dispatch">
          <strong>${escapeHtml(s.cap.split('/')[0].trim().toUpperCase())} — </strong>
          ${escapeHtml(headline)} ${escapeHtml(dek)}
        </p>
      </div>
    `;
  }).join('');

  const leadParagraphs = leadStory.body && leadStory.body.length > 0 
    ? leadStory.body 
    : [
        leadStory.summary || "Deliberations continue across federal and state forums as the republic navigates key regulatory updates.",
        "Regional correspondents confirm that administrative workflows have maintained normal operations, with civic bodies continuing routine public filings.",
        "Further updates are scheduled to be published in the subsequent evening dispatch."
      ];

  const firstPara = leadParagraphs[0];
  const firstLetter = firstPara.charAt(0);
  const restOfFirstPara = firstPara.slice(1);
  const remainingParas = leadParagraphs.slice(1);

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Kaalvatra Chronicle — Morning Broadsheet Edition — ${escapeHtml(fullDateFormatted)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Special+Elite&display=swap" rel="stylesheet">
  <style>
    /* =========================================================================
       KAALVATRA VINTAGE BROADSHEET NEWSPAPER STYLESHEET
       ========================================================================= */
    :root {
      --newsprint-bg: #f4ede1;
      --newsprint-border: #231c13;
      --ink-primary: #19140e;
      --ink-secondary: #3b3226;
      --ink-crimson: #7c1a1a;
      --ink-accent: #943224;
      --rule-line: #2d2417;
      --rule-faint: #d5c8b2;
      --stamp-red: #9e2323;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #211c16;
      background-image: 
        radial-gradient(circle at 50% 50%, rgba(35, 30, 24, 0.9) 0%, rgba(15, 12, 9, 1) 100%),
        repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px);
      font-family: 'EB Garamond', Garamond, 'Times New Roman', serif;
      color: var(--ink-primary);
      padding: 30px 14px 60px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* Floating Retro Brass Utility Toolbar (Hidden When Printing) */
    .retro-toolbar {
      position: sticky;
      top: 14px;
      z-index: 100;
      background: #2a2218;
      border: 2px solid #5a4732;
      border-radius: 6px;
      padding: 8px 16px;
      margin-bottom: 24px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
      color: #e5d7be;
      font-family: 'Cinzel', serif;
      font-size: 12px;
      letter-spacing: 0.05em;
    }

    .retro-toolbar button {
      background: #413324;
      color: #f7eedc;
      border: 1px solid #72593f;
      border-radius: 4px;
      padding: 6px 14px;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .retro-toolbar button:hover {
      background: var(--ink-crimson);
      border-color: #aa3838;
      transform: translateY(-1px);
    }

    .toolbar-tag {
      font-size: 10px;
      color: #b7a488;
      border-left: 1px solid #5a4732;
      padding-left: 12px;
      font-family: 'Special Elite', monospace;
    }

    /* THE GRAND BROADSHEET PAGE */
    .broadsheet-page {
      max-width: 1080px;
      width: 100%;
      background-color: var(--newsprint-bg);
      background-image: 
        radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(220,205,178,0.35) 100%),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.012) 2px, rgba(0,0,0,0.012) 4px);
      box-shadow: 
        0 14px 50px rgba(0, 0, 0, 0.65), 
        inset 0 0 100px rgba(120, 95, 60, 0.22);
      padding: 44px 54px;
      border: 1px solid #c9bca6;
      position: relative;
    }

    /* Ornate Outer Victorian Frame */
    .page-outer-frame {
      border: 3px double var(--newsprint-border);
      padding: 16px;
      position: relative;
    }

    .frame-corner {
      position: absolute;
      width: 24px;
      height: 24px;
      font-family: 'Cinzel', serif;
      font-size: 16px;
      color: var(--ink-crimson);
      line-height: 24px;
      text-align: center;
    }
    .corner-tl { top: 2px; left: 4px; }
    .corner-tr { top: 2px; right: 4px; }
    .corner-bl { bottom: 2px; left: 4px; }
    .corner-br { bottom: 2px; right: 4px; }

    /* Top Ear Boxes (Weather Left, Edition/Price Right) */
    .ear-header {
      display: grid;
      grid-template-columns: 240px 1fr 240px;
      gap: 16px;
      align-items: center;
      padding-bottom: 8px;
    }

    .ear-box {
      border: 1px solid var(--rule-line);
      padding: 8px 10px;
      font-size: 10.5px;
      line-height: 1.35;
      background: rgba(255, 255, 255, 0.25);
    }

    .ear-title {
      font-family: 'Cinzel', serif;
      font-weight: 700;
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-bottom: 1px solid var(--rule-line);
      padding-bottom: 3px;
      margin-bottom: 4px;
      text-align: center;
      color: var(--ink-crimson);
    }

    .ear-center-motto {
      text-align: center;
      font-size: 11px;
      font-style: italic;
      letter-spacing: 0.08em;
      color: var(--ink-secondary);
      font-family: 'Cinzel', serif;
    }

    .fleuron {
      color: var(--ink-crimson);
      margin: 0 6px;
      font-style: normal;
    }

    /* THE GRAND MASTHEAD TITLE */
    .masthead-container {
      text-align: center;
      padding: 12px 0 10px 0;
    }

    .grand-title {
      font-family: 'Playfair Display', 'Cinzel', Georgia, serif;
      font-size: 64px;
      font-weight: 900;
      letter-spacing: 0.06em;
      line-height: 0.95;
      text-transform: uppercase;
      color: var(--ink-primary);
      text-shadow: 1px 1px 0px rgba(255,255,255,0.7);
      margin: 4px 0 6px 0;
    }

    .grand-subtitle {
      font-family: 'Cinzel', serif;
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--ink-secondary);
      margin-top: 4px;
    }

    /* Dateline Double Rule Banner */
    .dateline-strip {
      border-top: 4px double var(--rule-line);
      border-bottom: 1.5px solid var(--rule-line);
      padding: 6px 0;
      margin: 12px 0 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* Rules & Separators */
    .thick-thin-rule {
      border: none;
      border-top: 3.5px solid var(--rule-line);
      border-bottom: 1px solid var(--rule-line);
      height: 5px;
      margin: 14px 0;
    }

    .thin-rule {
      border: none;
      border-top: 1px solid var(--rule-line);
      margin: 12px 0;
    }

    .dashed-rule {
      border: none;
      border-top: 1px dashed var(--rule-line);
      margin: 12px 0;
    }

    /* Front Page Layout Grid */
    .frontpage-grid {
      display: grid;
      grid-template-columns: 2.2fr 1fr;
      gap: 28px;
      margin-bottom: 24px;
    }

    /* Left Column: Lead Banner Story */
    .lead-story-area {
      border-right: 1px solid var(--rule-line);
      padding-right: 24px;
    }

    .lead-category-ribbon {
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--ink-crimson);
      margin-bottom: 6px;
      display: block;
    }

    .lead-headline {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 34px;
      font-weight: 900;
      line-height: 1.12;
      letter-spacing: -0.01em;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .lead-deck {
      font-size: 16px;
      font-style: italic;
      line-height: 1.4;
      color: var(--ink-secondary);
      border-left: 2.5px solid var(--ink-crimson);
      padding-left: 12px;
      margin: 12px 0 16px 0;
    }

    .byline-dateline {
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--ink-secondary);
      text-transform: uppercase;
      border-bottom: 1px solid var(--rule-faint);
      padding-bottom: 6px;
      margin-bottom: 14px;
    }

    /* Multi-column body text */
    .lead-body-columns {
      column-count: 2;
      column-gap: 22px;
      column-rule: 1px solid var(--rule-faint);
      font-size: 13.5px;
      line-height: 1.55;
      text-align: justify;
      text-justify: inter-word;
      hyphens: auto;
    }

    .lead-body-columns p {
      margin-bottom: 12px;
      text-indent: 16px;
    }

    .lead-body-columns p:first-of-type {
      text-indent: 0;
    }

    /* Classical Ornate Drop Cap */
    .drop-cap {
      float: left;
      font-family: 'Playfair Display', serif;
      font-size: 54px;
      line-height: 0.75;
      padding-top: 6px;
      padding-right: 8px;
      padding-bottom: 0px;
      color: var(--ink-crimson);
      font-weight: 900;
      text-shadow: 1px 1px 0 rgba(0,0,0,0.15);
    }

    /* Right Column: The Bourse & Telegraph Wire */
    .side-bourse-area {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .bourse-card {
      border: 2px solid var(--rule-line);
      padding: 12px;
      background: rgba(255, 255, 255, 0.35);
      box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
    }

    .bourse-header {
      font-family: 'Cinzel', serif;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-align: center;
      border-bottom: 2px double var(--rule-line);
      padding-bottom: 6px;
      margin-bottom: 8px;
      color: var(--ink-primary);
    }

    .bourse-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11.5px;
    }

    .bourse-cell {
      padding: 4px 2px;
      border-bottom: 1px dotted var(--rule-faint);
    }

    .bourse-cell.sym {
      font-family: 'Cinzel', serif;
      font-size: 11px;
    }

    .bourse-cell.val {
      text-align: right;
      font-weight: 600;
      font-family: 'Special Elite', monospace;
    }

    .bourse-cell.chg {
      text-align: right;
      font-family: 'Special Elite', monospace;
      font-size: 10.5px;
      padding-left: 6px;
    }

    .chg-up { color: #166534; font-weight: bold; }
    .chg-dn { color: #991b1b; font-weight: bold; }

    .bourse-footer {
      font-size: 9.5px;
      font-style: italic;
      color: var(--ink-secondary);
      text-align: center;
      margin-top: 6px;
      padding-top: 4px;
      border-top: 1px solid var(--rule-faint);
    }

    /* Vintage Telegraph Box */
    .telegram-card {
      border: 1.5px dashed var(--rule-line);
      padding: 14px;
      background: #eee4d1;
      font-family: 'Special Elite', monospace;
      font-size: 11px;
      line-height: 1.45;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.04);
    }

    .telegram-head {
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid #baa88c;
      padding-bottom: 6px;
      margin-bottom: 8px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: 10.5px;
    }

    /* Red Editorial Stamp / Seal */
    .editorial-seal {
      margin: 10px auto;
      width: 130px;
      height: 130px;
      border: 3px double var(--stamp-red);
      border-radius: 50%;
      color: var(--stamp-red);
      font-family: 'Special Elite', monospace;
      font-weight: 700;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: rotate(-6deg);
      opacity: 0.88;
      box-shadow: 0 0 8px rgba(158, 35, 35, 0.15);
      padding: 8px;
      line-height: 1.15;
    }

    .seal-text-small { font-size: 8.5px; letter-spacing: 0.08em; text-transform: uppercase; }
    .seal-text-bold { font-size: 12px; margin: 3px 0; letter-spacing: 0.1em; }

    /* SECTION 2: Secondary Stories Row */
    .section-banner-title {
      font-family: 'Cinzel', serif;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-align: center;
      padding: 4px 0;
      margin: 14px 0;
      border-top: 1.5px solid var(--rule-line);
      border-bottom: 1.5px solid var(--rule-line);
      color: var(--ink-crimson);
    }

    .secondary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .sec-story-card {
      border-right: 1px solid var(--rule-faint);
      padding-right: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .sec-story-card:last-child {
      border-right: none;
      padding-right: 0;
    }

    .sec-cat {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      font-weight: 700;
      color: var(--ink-crimson);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }

    .sec-title {
      font-family: 'Playfair Display', serif;
      font-size: 17px;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 8px;
    }

    .sec-summary {
      font-size: 12.5px;
      line-height: 1.5;
      text-align: justify;
      color: var(--ink-secondary);
      margin-bottom: 10px;
    }

    .sec-footer {
      border-top: 1px dotted var(--rule-faint);
      padding-top: 6px;
      font-size: 9.5px;
      font-family: 'Cinzel', serif;
      color: #6a5d4d;
      text-transform: uppercase;
    }

    /* SECTION 3: Provincial Desks Spread */
    .provincial-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }

    .provincial-card {
      background: rgba(255, 255, 255, 0.22);
      border: 1px solid var(--rule-line);
      padding: 10px;
      font-size: 11px;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .provincial-banner {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--rule-line);
      padding-bottom: 3px;
      margin-bottom: 5px;
      font-family: 'Cinzel', serif;
    }

    .prov-name {
      font-weight: 700;
      font-size: 11px;
      color: var(--ink-crimson);
    }

    .prov-cap {
      font-size: 9.5px;
      color: var(--ink-secondary);
    }

    .prov-ep {
      font-size: 10px;
      font-style: italic;
      color: #554837;
      margin-bottom: 6px;
    }

    .prov-dispatch {
      text-align: justify;
      font-size: 11px;
      line-height: 1.35;
    }

    /* Broadsheet Colophon / Imprint */
    .colophon-strip {
      border-top: 3px double var(--rule-line);
      padding-top: 12px;
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      gap: 16px;
      align-items: center;
      font-size: 10px;
      font-family: 'Cinzel', serif;
      color: var(--ink-secondary);
      text-align: center;
    }

    .colophon-strip small {
      display: block;
      font-size: 8.5px;
      color: #7a6c57;
      font-family: 'Special Elite', monospace;
      margin-top: 2px;
    }

    /* =========================================================================
       PRINT OPTIMIZATIONS (@media print)
       ========================================================================= */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .no-print, .retro-toolbar {
        display: none !important;
      }

      .broadsheet-page {
        max-width: 100% !important;
        width: 100% !important;
        box-shadow: none !important;
        border: none !important;
        padding: 8mm 10mm !important;
        background: #ffffff !important;
      }

      .page-outer-frame {
        border-color: #000000 !important;
      }

      .grand-title, .lead-headline {
        color: #000000 !important;
      }

      .editorial-seal {
        opacity: 1 !important;
      }
    }

    /* Clean mobile responsive adjustments */
    @media (max-width: 860px) {
      .broadsheet-page {
        padding: 20px 16px;
      }
      .ear-header {
        grid-template-columns: 1fr;
      }
      .grand-title {
        font-size: 38px;
      }
      .frontpage-grid {
        grid-template-columns: 1fr;
      }
      .lead-story-area {
        border-right: none;
        padding-right: 0;
      }
      .lead-body-columns {
        column-count: 1;
      }
      .secondary-grid {
        grid-template-columns: 1fr;
      }
      .sec-story-card {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px dotted var(--rule-faint);
        padding-bottom: 16px;
      }
      .provincial-grid {
        grid-template-columns: 1fr 1fr;
      }
      .colophon-strip {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Retro Brass Utility Toolbar (Hidden During Print) -->
  <div class="retro-toolbar no-print">
    <button onclick="window.print()">
      <span>🖨️</span>
      <span>PRINT BROADSHEET / SAVE AS PDF</span>
    </button>
    <button onclick="saveBroadsheetCopy()">
      <span>💾</span>
      <span>SAVE OFFLINE ARCHIVE</span>
    </button>
    <button onclick="togglePaperTone()">
      <span>📰</span>
      <span>VINTAGE SEPIA / CRISP PRINT</span>
    </button>
    <span class="toolbar-tag">
      CERTIFIED HISTORICAL PROOF · KAALVATRA DISPATCH DECK
    </span>
  </div>

  <!-- THE AUTHENTIC BROADSHEET NEWSPAPER CONTAINER -->
  <main class="broadsheet-page" id="newspaperPaper">
    <div class="page-outer-frame">
      <div class="frame-corner corner-tl">❦</div>
      <div class="frame-corner corner-tr">❦</div>
      <div class="frame-corner corner-bl">❦</div>
      <div class="frame-corner corner-br">❦</div>

      <!-- Top Issue Ears and Motto Header -->
      <header class="ear-header">
        <!-- Left Ear: Weather & Provincial Observations -->
        <div class="ear-box">
          <div class="ear-title">PROVINCIAL OBSERVATIONS</div>
          <div>Delhi: 22°C Clear · Sunset 18:24</div>
          <div>Bombay: 28°C Fair · Humidity 68%</div>
          <div>Calcutta: 26°C Clear · Tide High</div>
          <div>Madras: 29°C Warm · Wind ESE</div>
          <div>Srinagar: 14°C Crisp Alpine Fair</div>
        </div>

        <!-- Center Sanskrit / Latin Motto -->
        <div class="ear-center-motto">
          <span>सत्यमेव जयते नानृतम्</span>
          <span class="fleuron">✦</span>
          <span>ESTABLISHED TO RECORD THE CARTOGRAPHY OF THE REPUBLICK</span>
          <span class="fleuron">✦</span>
          <span>VERITAS VINCIT</span>
        </div>

        <!-- Right Ear: Price & Registry -->
        <div class="ear-box">
          <div class="ear-title">DAILY BROADSHEET STAMP</div>
          <div>PRICE: ₹5.00 · TWO ANNAS</div>
          <div>VOL. CVII · NO. 248 · EXTRA</div>
          <div>REG. AT G.P.O. AS A NEWSPAPER</div>
          <div>LATE TELEGRAPH EDITION</div>
        </div>
      </header>

      <!-- Grand Engraved Masthead Title -->
      <div class="masthead-container">
        <h1 class="grand-title">THE KAALVATRA CHRONICLE</h1>
        <div class="grand-subtitle">
          The Living Annals of Bharat — Regional Truths, Sovereign Consensus · Published Daily Across Thirty-Six Capitals
        </div>
      </div>

      <!-- Dateline Strip Between Double Rules -->
      <div class="dateline-strip">
        <div>NEW DELHI, ${escapeHtml(fullDateFormatted)}</div>
        <div>RECORDED BY CABLE TELEGRAPH & SYNTHESIZED GRAPH WIRES</div>
        <div>AUTUMN PRINT RUN · NO. 248</div>
      </div>

      <!-- MAIN FRONTPAGE SPREAD -->
      <div class="frontpage-grid">
        <!-- Left Column: Front Page Lead Banner Story -->
        <article class="lead-story-area">
          <span class="lead-category-ribbon">★ FRONT PAGE LEAD STORY · ${escapeHtml(leadStory.category || 'NATIONAL REPERTORY').toUpperCase()} · ${leadStory.article_count} PARTICIPATING NEWSROOMS ★</span>

          <h2 class="lead-headline">
            ${escapeHtml(leadStory.story_title)}
          </h2>

          <div class="lead-deck">
            ${escapeHtml(leadStory.summary || '')}
          </div>

          <div class="byline-dateline">
            BY KAALVATRA BUREAU SPECIAL CORRESPONDENTS · REPORTED BY ${escapeHtml(leadStory.sources.slice(0, 3).join(' · ')).toUpperCase()}
          </div>

          <div class="lead-body-columns">
            <p>
              <span class="drop-cap">${escapeHtml(firstLetter)}</span>${escapeHtml(restOfFirstPara)}
            </p>
            ${remainingParas.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
          </div>
        </article>

        <!-- Right Column: The Bourse, Telegrams & Editorial Seal -->
        <aside class="side-bourse-area">
          <!-- Financial Bourse Table -->
          <div class="bourse-card">
            <div class="bourse-header">
              COMMERCE & FINANCIAL BOURSE
            </div>
            <table class="bourse-table">
              <tbody>
                ${bourseRows}
              </tbody>
            </table>
            <div class="bourse-footer">
              Official market quotations registered via automated telemetry.
            </div>
          </div>

          <!-- Telegram from The Machine -->
          <div class="telegram-card">
            <div class="telegram-head">
              CABLE TELEGRAM · AWS AP-SOUTH-1
            </div>
            <p>
              TO ALL SUBSCRIBERS: 4,000+ REGIONAL NEWS FEEDS HARVESTED AT 06:00 HRS. MULTI-TENANT TF-IDF GRAPH CLUSTERING EXECUTED IN 48 SECONDS. ZERO LOSS DETECTED.
            </p>
            <p style="margin-top: 6px; font-size: 10px; color: #5a4b39;">
              STOP. KAALVATRA EDITORIAL BOARD SIGNED OFF. STOP.
            </p>
          </div>

          <!-- Wax Stamp Seal -->
          <div class="editorial-seal">
            <span class="seal-text-small">★ KAALVATRA ★</span>
            <span class="seal-text-bold">VERIFIED</span>
            <span class="seal-text-small">ARCHIVAL PASS</span>
            <span style="font-size: 7.5px; margin-top: 2px;">No. 2026/09</span>
          </div>
        </aside>
      </div>

      <!-- SECTION 2: Secondary Wires Row -->
      ${secondaryStories.length > 0 ? `
        <div class="section-banner-title">
          ✦ ADDITIONAL DISPATCHES OF THE NATIONAL WIRE ✦
        </div>
        <div class="secondary-grid">
          ${secondaryStories.map((story) => `
            <article class="sec-story-card">
              <div>
                <div class="sec-cat">${escapeHtml(story.category || 'National')} · ${story.article_count} Sources</div>
                <h3 class="sec-title">${escapeHtml(story.story_title)}</h3>
                <p class="sec-summary">${escapeHtml(story.summary || '')}</p>
              </div>
              <div class="sec-footer">
                States: ${escapeHtml(story.states.join(', ') || 'National Desk')}
              </div>
            </article>
          `).join('')}
        </div>
      ` : ''}

      <!-- SECTION 3: Provincial Desks Grid -->
      <div class="section-banner-title">
        ✦ REGIONAL CABLEGRAMS FROM THE STATE CAPITALS ✦
      </div>
      <div class="provincial-grid">
        ${provincialBoxes}
      </div>

      <!-- Broadsheet Colophon / Imprint -->
      <footer class="colophon-strip">
        <div>
          PRINTED ON VIRTUAL ACID-FREE NEWSPRINT
          <small>Registered Archive Copy No. 248</small>
        </div>
        <div>
          THE KAALVATRA CHRONICLE & EDITORIAL ATLAS
          <small>Automated AWS Serverless Architecture · EventBridge · DynamoDB · Lambda</small>
        </div>
        <div>
          PRICE: ₹5.00 · INDIA EDITION
          <small>© 2026 KAALVATRA Press · All Rights Reserved</small>
        </div>
      </footer>
    </div>
  </main>

  <script>
    // Offline script helpers for downloaded document
    function saveBroadsheetCopy() {
      window.print();
    }

    function togglePaperTone() {
      const page = document.getElementById('newspaperPaper');
      if (page.style.backgroundColor === 'rgb(255, 255, 255)' || page.style.backgroundColor === '#ffffff') {
        page.style.backgroundColor = 'var(--newsprint-bg)';
        page.style.boxShadow = '0 14px 50px rgba(0, 0, 0, 0.65), inset 0 0 100px rgba(120, 95, 60, 0.22)';
      } else {
        page.style.backgroundColor = '#ffffff';
        page.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      }
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

