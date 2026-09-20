// KAALVATRA v2.0 - Comprehensive Multi-Lingual Translation System
// Supported: English (default), Hindi (हिन्दी), Bengali (বাংলা), Marathi (मराठी), Telugu (తెలుగు), Tamil (தமிழ்)

import type { SupportedLanguage, ClusteredStory } from '../types';

export const LANGUAGES: { code: SupportedLanguage; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
];

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    tagline: 'The Living Annals of Bharat — Regional Truths, Sovereign Consensus.',
    nav_atlas: 'Interactive Bharat Atlas',
    nav_frontpage: 'The Front Page',
    nav_pipeline: 'The Machine (Pipeline)',
    nav_national: 'National Desk',
    nav_topology: 'AWS Topology',
    search_atlas: 'Search atlas',
    morning_digest: 'Morning Digest',
    morning_press: 'Morning Press (PDF)',
    newsprint: 'Newsprint',
    midnight: 'Midnight',
    live_telemetry: 'LIVE TELEMETRY',
    active_dispatches: 'ACTIVE DISPATCHES',
    market_desk: 'Market Desk',
    exploring_atlas: 'Exploring Bharat Atlas',
    hover_coords: 'Hover states to explore coordinates',
    focused: 'Focused',
    interactive_desks: 'Interactive State Desks',
    click_zoom_hint: 'Click any state to smoothly zoom into its territory with the map outline as your backdrop.',
    click_bg_reset: 'Click background or reset button to zoom out',
    return_to_atlas: 'Return to All India',
    reset_camera: 'Reset Camera',
    open_dedicated_desk: 'Open Dedicated Desk',
    state_bureau: 'State Bureau',
    capital: 'Capital',
    active_dispatches_heading: 'State Wire Dispatches',
    click_to_read: 'Click to read full article',
    read_full_story: 'Read Full Broadsheet Story',
    read_article: 'Read',
    state_directory: 'STATE DIRECTORY',
    quick_fly: 'Quick Fly to State Desks',
    quick_fly_hint: 'Click any state to trigger camera zoom on the map above',
    reports: 'reports',
    vol_no: 'VOL. CVII NO. 248',
    daily_broadsheet: 'DAILY MORNING BROADSHEET',
    price_tag: 'PRICE: ₹5.00',
    latest_edition: 'LATEST EDITION PRINT RUN',
    editorial_notebook: 'Editorial Notebook',
    commerce_indices: 'COMMERCE & INDICES',
    regional_wire: 'REGIONAL DESK WIRE',
    dispatches_capitals: 'Dispatches from the Capitals',
    explore_desk: 'Explore Desk',
    additional_wires: 'ADDITIONAL WIRES',
    read_complete_investigation: 'Read Complete Investigation',
    major_dispatches: 'Major Wire Dispatches',
    sources: 'Sources',
    verification_rationale: 'Story Graph Verification Rationale',
    participating_outlets: 'Participating Wire Outlets & Articles',
    open_wire: 'Open Wire',
    close_reader: 'Close Reader',
    key_testimony: 'KEY EDITORIAL TESTIMONY',
    live_wire_lead: 'National Wire Lead',
    featured_desk: 'FEATURED DESK',
    machine_title: 'THE MACHINE BEHIND THE PAPER',
    machine_subtitle: 'How raw signals become state-wise stories',
    launch_sandbox: 'Launch Pipeline Sandbox →',
    all_desks: 'All Desks (36)',
    back_to_atlas: 'Back to Atlas',
  },
  hi: {
    tagline: 'भारत का जीवंत इतिहास — ३६ राज्यों और क्षेत्रों से निष्पक्ष संपादकीय वृत्तांत।',
    nav_atlas: 'इंटरैक्टिव भारत एटलस',
    nav_frontpage: 'मुख्य पृष्ठ (द फ्रंट पेज)',
    nav_pipeline: 'द मशीन (पाइपलाइन)',
    nav_national: 'राष्ट्रीय डेस्क',
    nav_topology: 'एडब्ल्यूएस टोपोलॉजी',
    search_atlas: 'एटलस खोजें',
    morning_digest: 'प्रातःकालीन डाइजेस्ट',
    morning_press: 'प्रभात प्रेस (PDF)',
    newsprint: 'न्यूजप्रिंट',
    midnight: 'मिडनाइट',
    live_telemetry: 'लाइव टेलीमेट्री',
    active_dispatches: 'सक्रिय समाचार',
    market_desk: 'बाजार डेस्क',
    exploring_atlas: 'भारत एटलस का अन्वेषण',
    hover_coords: 'निर्देशांक देखने के लिए राज्यों पर कर्सर ले जाएं',
    focused: 'केंद्रित',
    interactive_desks: 'इंटरैक्टिव राज्य डेस्क',
    click_zoom_hint: 'किसी भी राज्य पर क्लिक करें; राज्य का नक्शा जूम होकर पृष्ठभूमि बन जाएगा।',
    click_bg_reset: 'ज़ूम आउट करने के लिए बैकग्राउंड या रीसेट पर क्लिक करें',
    return_to_atlas: 'अखिल भारतीय एटलस पर लौटें',
    reset_camera: 'कैमरा रीसेट करें',
    open_dedicated_desk: 'समर्पित डेस्क खोलें',
    state_bureau: 'राज्य ब्यूरो',
    capital: 'राजधानी',
    active_dispatches_heading: 'राज्य वायर समाचार',
    click_to_read: 'पूरा लेख पढ़ने के लिए क्लिक करें',
    read_full_story: 'पूरी विस्तृत खबर पढ़ें',
    read_article: 'पढ़ें',
    state_directory: 'राज्य निर्देशिका',
    quick_fly: 'राज्य डेस्क पर त्वरित पहुंच',
    quick_fly_hint: 'नक्शे पर कैमरा ज़ूम करने के लिए किसी भी राज्य पर क्लिक करें',
    reports: 'रिपोर्ट्स',
    vol_no: 'खंड CVII संख्या 248',
    daily_broadsheet: 'दैनिक प्रातःकालीन ब्रॉडशीट',
    price_tag: 'मूल्य: ₹5.00',
    latest_edition: 'नवीनतम संस्करण मुद्रण',
    editorial_notebook: 'संपादकीय नोटबुक',
    commerce_indices: 'वाणिज्य और सूचकांक',
    regional_wire: 'क्षेत्रीय डेस्क वायर',
    dispatches_capitals: 'राजधानियों से समाचार',
    explore_desk: 'डेस्क देखें',
    additional_wires: 'अतिरिक्त वायर रिपोर्ट्स',
    read_complete_investigation: 'पूरी पड़ताल पढ़ें',
    major_dispatches: 'प्रमुख वायर समाचार',
    sources: 'स्रोत',
    verification_rationale: 'स्टोरी ग्राफ सत्यापन तर्क',
    participating_outlets: 'सहभागी समाचार पत्र और लेख',
    open_wire: 'मूल वायर खोलें',
    close_reader: 'रीडर बंद करें',
    key_testimony: 'प्रमुख संपादकीय उद्धरण',
    live_wire_lead: 'राष्ट्रीय वायर लीड',
    featured_desk: 'प्रमुख डेस्क',
    machine_title: 'अखबार के पीछे की मशीन',
    machine_subtitle: 'कच्चे संकेतों से राज्यवार कहानियां कैसे बनती हैं',
    launch_sandbox: 'पाइपलाइन सैंडबॉक्स शुरू करें →',
    all_desks: 'सभी डेस्क (36)',
    back_to_atlas: 'एटलस पर लौटें',
  },
  bn: {
    tagline: 'ভারতের জীবন্ত ইতিহাস — ৩৬টি রাজ্য ও অঞ্চলের অবিচল সংবাদ।',
    nav_atlas: 'ইন্টারেক্টিভ ভারত অ্যাটলাস',
    nav_frontpage: 'প্রথম পাতা (ফ্রন্ট পেজ)',
    nav_pipeline: 'দ্য মেশিন (পাইপলাইন)',
    nav_national: 'জাতীয় ডেস্ক',
    nav_topology: 'এডব্লিউএস টপোলজি',
    search_atlas: 'অ্যাটলাস অনুসন্ধান',
    morning_digest: 'সকালের ডাইজেস্ট',
    morning_press: 'সকালের প্রেস (PDF)',
    newsprint: 'নিউজপ্রিন্ট',
    midnight: 'মিডনাইট',
    live_telemetry: 'লাইভ টেলিমেট্রি',
    active_dispatches: 'সক্রিয় সংবাদ',
    market_desk: 'বাজার ডেস্ক',
    exploring_atlas: 'ভারত অ্যাটলাস অন্বেষণ',
    hover_coords: 'স্থানাঙ্ক দেখতে রাজ্যের উপর কার্সার রাখুন',
    focused: 'কেন্দ্রবিন্দু',
    interactive_desks: 'ইন্টারেক্টিভ রাজ্য ডেস্ক',
    click_zoom_hint: 'যেকোনো রাজ্যে ক্লিক করুন; রাজ্যের সীমারেখা জুম হয়ে পটভূমিতে পরিণত হবে।',
    click_bg_reset: 'জুম আউট করতে ব্যাকগ্রাউন্ড বা রিসেটে ক্লিক করুন',
    return_to_atlas: 'সমগ্র ভারত অ্যাটলাসে ফিরুন',
    reset_camera: 'ক্যামেরা রিসেট করুন',
    open_dedicated_desk: 'ডেডিকেটেড ডেস্ক খুলুন',
    state_bureau: 'রাজ্য ব্যুরো',
    capital: 'রাজধানী',
    active_dispatches_heading: 'রাজ্য সংবাদ বিবরণী',
    click_to_read: 'সম্পূর্ণ প্রতিবেদন পড়তে ক্লিক করুন',
    read_full_story: 'সম্পূর্ণ ব্রডশিট প্রতিবেদন পড়ুন',
    read_article: 'পড়ুন',
    state_directory: 'রাজ্য ডিরেক্টরি',
    quick_fly: 'রাজ্য ডেস্কে দ্রুত যান',
    quick_fly_hint: 'মানচিত্রে ক্যামেরা জুম করতে যেকোনো রাজ্যে ক্লিক করুন',
    reports: 'প্রতিবেদন',
    vol_no: 'খণ্ড CVII সংখ্যা ২৪৮',
    daily_broadsheet: 'দৈনিক প্রাতঃকালীন ব্রডশিট',
    price_tag: 'মূল্য: ₹৫.০০',
    latest_edition: 'সর্বশেষ সংস্করণ মুদ্রণ',
    editorial_notebook: 'সম্পাদকীয় নোটবুক',
    commerce_indices: 'বাণিজ্য ও সূচক',
    regional_wire: 'আঞ্চলিক ডেস্ক ওয়্যার',
    dispatches_capitals: 'রাজধানীগুলোর সংবাদ',
    explore_desk: 'ডেস্ক দেখুন',
    additional_wires: 'অতিরিক্ত ওয়্যার রিপোর্ট',
    read_complete_investigation: 'সম্পূর্ণ তদন্ত প্রতিবেদন পড়ুন',
    major_dispatches: 'প্রধান ওয়্যার সংবাদ',
    sources: 'উৎসসমূহ',
    verification_rationale: 'স্টোরি গ্রাফ যাচাইকরণ যুক্তি',
    participating_outlets: 'অংশগ্রহণকারী সংবাদমাধ্যম ও নিবন্ধ',
    open_wire: 'মূল ওয়্যার দেখুন',
    close_reader: 'রিডার বন্ধ করুন',
    key_testimony: 'মূল সম্পাদকীয় সাক্ষ্য',
    live_wire_lead: 'জাতীয় ওয়্যার লিড',
    featured_desk: 'নির্বাচিত ডেস্ক',
    machine_title: 'সংবাদপত্রের পেছনের প্রযুক্তি',
    machine_subtitle: 'কীভাবে কাঁচা সংকেত থেকে রাজ্যভিত্তিক গল্প তৈরি হয়',
    launch_sandbox: 'পাইপলাইন স্যান্ডবক্স শুরু করুন →',
    all_desks: 'সবগুলো ডেস্ক (৩৬)',
    back_to_atlas: 'অ্যাটলাসে ফিরুন',
  },
  mr: {
    tagline: 'भारताची जिवंत गाथा — ३६ राज्ये आणि प्रदेशांमधून प्रादेशिक सत्य.',
    nav_atlas: 'परस्परसंवादी भारत ॲटलस',
    nav_frontpage: 'मुखपृष्ठ (द फ्रंट पेज)',
    nav_pipeline: 'द मशीन (पाइपलाइन)',
    nav_national: 'राष्ट्रीय डेस्क',
    nav_topology: 'एडब्ल्यूएस टोपोलॉजी',
    search_atlas: 'ॲटलस शोधा',
    morning_digest: 'सकाळचा डायजेस्ट',
    morning_press: 'सकाळची प्रेस (PDF)',
    newsprint: 'न्यूजप्रिंट',
    midnight: 'मिडनाइट',
    live_telemetry: 'थेट टेलिमेट्री',
    active_dispatches: 'सक्रिय वृत्त',
    market_desk: 'बाजार डेस्क',
    exploring_atlas: 'भारत ॲटलसचा शोध',
    hover_coords: 'अक्षांश-रेखांश पाहण्यासाठी राज्यांवर कर्सर फिरवा',
    focused: 'केंद्रस्थ',
    interactive_desks: 'परस्परसंवादी राज्य डेस्क',
    click_zoom_hint: 'स्थानिक बातम्या पाहण्यासाठी कोणत्याही राज्यावर क्लिक करा; राज्याची बाह्यरेषा पार्श्वभूमी बनेल.',
    click_bg_reset: 'झूम कमी करण्यासाठी पार्श्वभूमीवर किंवा रीसेटवर क्लिक करा',
    return_to_atlas: 'अखिल भारतीय ॲटलसवर परत या',
    reset_camera: 'कॅमेरा पूर्ववत करा',
    open_dedicated_desk: 'स्वतंत्र डेस्क उघडा',
    state_bureau: 'राज्य ब्युरो',
    capital: 'राजधानी',
    active_dispatches_heading: 'राज्य वृत्त वार्तापत्र',
    click_to_read: 'संपूर्ण लेख वाचण्यासाठी क्लिक करा',
    read_full_story: 'संपूर्ण बातमी वाचा',
    read_article: 'वाचा',
    state_directory: 'राज्य सूची',
    quick_fly: 'राज्य डेस्कवर त्वरित जा',
    quick_fly_hint: 'नकाशा झूम करण्यासाठी कोणत्याही राज्यावर क्लिक करा',
    reports: 'वृत्ते',
    vol_no: 'खंड CVII अंक २४८',
    daily_broadsheet: 'दैनिक सकाळचे ब्रॉडशीट',
    price_tag: 'किंमत: ₹५.००',
    latest_edition: 'नवीनतम आवृत्ती मुद्रण',
    editorial_notebook: 'संपादकीय नोंदवही',
    commerce_indices: 'व्यापार व निर्देशांक',
    regional_wire: 'प्रादेशिक डेस्क वायर',
    dispatches_capitals: 'राजधानीतून आलेली वृत्ते',
    explore_desk: 'डेस्क पहा',
    additional_wires: 'इतर वायर वृत्ते',
    read_complete_investigation: 'संपूर्ण तपास वाचा',
    major_dispatches: 'प्रमुख वायर वृत्ते',
    sources: 'स्रोत',
    verification_rationale: 'कथा आलेख पडताळणी तर्क',
    participating_outlets: 'सहभागी वृत्तसंस्था व लेख',
    open_wire: 'मूळ वायर उघडा',
    close_reader: 'वाचन कक्ष बंद करा',
    key_testimony: 'प्रमुख संपादकीय मत',
    live_wire_lead: 'राष्ट्रीय वायर मुख्य बातमी',
    featured_desk: 'विशेष डेस्क',
    machine_title: 'वृत्तपत्रामागील यंत्रणा',
    machine_subtitle: 'कच्च्या माहितीचे रूपांतर राज्यवार बातम्यांमध्ये कसे होते',
    launch_sandbox: 'पाइपलाइन सँडबॉक्स सुरू करा →',
    all_desks: 'सर्व डेस्क (३६)',
    back_to_atlas: 'ॲटलसवर परत जा',
  },
  te: {
    tagline: 'భారత సజీవ చరిత్ర — 36 రాష్ట్రాలు మరియు ప్రాంతాల నిష్పక్షపాత వార్తా సంకలనం.',
    nav_atlas: 'ఇంటరాక్టివ్ భారత్ అట్లాస్',
    nav_frontpage: 'ముఖచిత్ర పేజీ (ఫ్రంట్ పేజీ)',
    nav_pipeline: 'ది మెషిన్ (పైప్‌లైన్)',
    nav_national: 'జాతీయ డెస్క్',
    nav_topology: 'ఏడబ్ల్యూఎస్ టోపాలజీ',
    search_atlas: 'అట్లాస్ శోధించండి',
    morning_digest: 'మార్నింగ్ డైజెస్ట్',
    morning_press: 'మార్నింగ్ ప్రెస్ (PDF)',
    newsprint: 'న్యూస్‌ప్రింట్',
    midnight: 'మిడ్‌నైట్',
    live_telemetry: 'లైవ్ టెలిమెట్రీ',
    active_dispatches: 'యాక్టివ్ వార్తలు',
    market_desk: 'మార్కెట్ డెస్క్',
    exploring_atlas: 'భారత్ అట్లాస్ అన్వేషణ',
    hover_coords: 'కోఆర్డినేట్ల కోసం రాష్ట్రాలపై మౌస్ ఉంచండి',
    focused: 'కేంద్రీకృత',
    interactive_desks: 'ఇంటరాక్టివ్ రాష్ట్ర డెస్క్‌లు',
    click_zoom_hint: 'ఏదైనా రాష్ట్రంపై క్లిక్ చేయండి; రాష్ట్ర సరిహద్దు జూమ్ అయి వార్తల నేపథ్యంగా మారుతుంది.',
    click_bg_reset: 'జూమ్ అవుట్ చేయడానికి బ్యాక్‌గ్రౌండ్ లేదా రీసెట్ క్లిక్ చేయండి',
    return_to_atlas: 'అఖిల భారత అట్లాస్‌కు తిరిగి వెళ్ళండి',
    reset_camera: 'కెమెరా రీసెట్',
    open_dedicated_desk: 'ప్రత్యేక డెస్క్ తెరవండి',
    state_bureau: 'రాష్ట్ర బ్యూరో',
    capital: 'రాజధాని',
    active_dispatches_heading: 'రాష్ట్ర వార్తా నివేదికలు',
    click_to_read: 'పూర్తి కథనం చదవడానికి క్లిక్ చేయండి',
    read_full_story: 'పూర్తి వార్తా కథనాన్ని చదవండి',
    read_article: 'చదవండి',
    state_directory: 'రాష్ట్రాల జాబితా',
    quick_fly: 'రాష్ట్ర డెస్క్‌లకు త్వరిత నావిగేషన్',
    quick_fly_hint: 'మ్యాప్‌ను జూమ్ చేయడానికి ఏదైనా రాష్ట్రంపై క్లిక్ చేయండి',
    reports: 'నివేదికలు',
    vol_no: 'సంపుటి CVII సంచిక 248',
    daily_broadsheet: 'రోజువారీ ఉదయపు బ్రాడ్‌షీట్',
    price_tag: 'ధర: ₹5.00',
    latest_edition: 'తాజా ముద్రణ సంచిక',
    editorial_notebook: 'సంపాదకీయ నోట్‌బుక్',
    commerce_indices: 'వాణిజ్యం & సూచీలు',
    regional_wire: 'ప్రాంతీయ డెస్క్ వైర్',
    dispatches_capitals: 'రాజధానుల నుండి వార్తలు',
    explore_desk: 'డెస్క్ చూడండి',
    additional_wires: 'అదనపు వైర్ నివేదికలు',
    read_complete_investigation: 'పూర్తి పరిశోధనా కథనం చదవండి',
    major_dispatches: 'ప్రధాన వైర్ వార్తలు',
    sources: 'మూలాలు',
    verification_rationale: 'స్టోరీ గ్రాఫ్ ధృవీకరణ కారణాలు',
    participating_outlets: 'పాల్గొన్న వార్తా సంస్థలు & కథనాలు',
    open_wire: 'అసలు వైర్ తెరవండి',
    close_reader: 'రీడర్ మూసివేయండి',
    key_testimony: 'కీలక సంపాదకీయ వ్యాఖ్య',
    live_wire_lead: 'జాతీయ వైర్ ప్రధాన వార్త',
    featured_desk: 'ప్రత్యేక డెస్క్',
    machine_title: 'వార్తాపత్రిక వెనుక ఉన్న సాంకేతికత',
    machine_subtitle: 'ముడి సంకేతాలు ఎలా రాష్ట్రాల వారీ కథనాలుగా మారతాయి',
    launch_sandbox: 'పైప్‌లైన్ శాండ్‌బాక్స్ ప్రారంభించండి →',
    all_desks: 'అన్ని డెస్క్‌లు (36)',
    back_to_atlas: 'అట్లాస్‌కు తిరిగి వెళ్ళండి',
  },
  ta: {
    tagline: 'பாரதத்தின் நேரடி வரலாறு — 36 மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களின் அதிகாரப்பூர்வ செய்திகள்.',
    nav_atlas: 'ஊடாடும் பாரத வரைபடம்',
    nav_frontpage: 'முதல் பக்கம் (Front Page)',
    nav_pipeline: 'இயந்திர அமைப்பு (Pipeline)',
    nav_national: 'தேசியப் பிரிவு',
    nav_topology: 'AWS கட்டமைப்பு',
    search_atlas: 'வரைபடத்தைத் தேடு',
    morning_digest: 'காலைத் தொகுப்பு',
    morning_press: 'காலை பிரஸ் (PDF)',
    newsprint: 'செய்தித்தாள்',
    midnight: 'நள்ளிரவு',
    live_telemetry: 'நேரடித் தரவு',
    active_dispatches: 'நடப்பு செய்திகள்',
    market_desk: 'சந்தை நிலவரம்',
    exploring_atlas: 'பாரத வரைபட ஆய்வு',
    hover_coords: 'அமைவிடங்களை அறிய மாநிலங்களின் மீது நகர்த்தவும்',
    focused: 'கவனம் செலுத்தப்பட்டது',
    interactive_desks: 'ஊடாடும் மாநிலப் பிரிவுகள்',
    click_zoom_hint: 'உள்ளூர் செய்திகளைப் பார்க்க ஏதேனும் ஒரு மாநிலத்தைக் கிளிக் செய்க; மாநில எல்லை பின்புலமாக மாறும்.',
    click_bg_reset: 'பெரிதாக்கலை மீட்டமைக்க பின்னணியைக் கிளிக் செய்யவும்',
    return_to_atlas: 'அனைத்திந்திய வரைபடத்திற்குத் திரும்பு',
    reset_camera: 'கேமராவை மீட்டமை',
    open_dedicated_desk: 'தனிப்பிரிவைத் திறக்க',
    state_bureau: 'மாநிலப் பிரிவு',
    capital: 'தலைநகரம்',
    active_dispatches_heading: 'மாநிலச் செய்தி அறிக்கைகள்',
    click_to_read: 'முழு செய்தியைப் படிக்க கிளிக் செய்யவும்',
    read_full_story: 'முழு செய்தித்தாள் கட்டுரையைப் படியுங்கள்',
    read_article: 'படிக்க',
    state_directory: 'மாநில அட்டவணை',
    quick_fly: 'மாநிலப் பிரிவுகளுக்கு விரைந்து செல்க',
    quick_fly_hint: 'வரைபடத்தை பெரிதாக்க ஏதேனும் ஒரு மாநிலத்தைக் கிளிக் செய்க',
    reports: 'செய்திகள்',
    vol_no: 'தொகுதி CVII இதழ் 248',
    daily_broadsheet: 'தினசரி காலை நாளிதழ்',
    price_tag: 'விலை: ₹5.00',
    latest_edition: 'சமீபத்திய பதிப்பு அச்சிடல்',
    editorial_notebook: 'தலையங்கக் குறிப்பேடு',
    commerce_indices: 'வணிகம் & குறியீடுகள்',
    regional_wire: 'மண்டலப் பிரிவு செய்திகள்',
    dispatches_capitals: 'தலைநகரங்களில் இருந்து வரும் செய்திகள்',
    explore_desk: 'பிரிவை ஆராய்க',
    additional_wires: 'கூடுதல் செய்தி அறிக்கைகள்',
    read_complete_investigation: 'முழு ஆய்வுக் கட்டுரையைப் படிக்கவும்',
    major_dispatches: 'முக்கியச் செய்தி அறிக்கைகள்',
    sources: 'ஆதாரங்கள்',
    verification_rationale: 'செய்தி வரைபட சரிபார்ப்பு விளக்கம்',
    participating_outlets: 'பங்கேற்கும் செய்தி நிறுவனங்கள்',
    open_wire: 'அசல் செய்தியைத் திற',
    close_reader: 'மூடுக',
    key_testimony: 'முக்கியத் தலையங்க உரை',
    live_wire_lead: 'தேசிய முதன்மைச் செய்தி',
    featured_desk: 'சிறப்புப் பிரிவு',
    machine_title: 'செய்தித்தாளுக்குப் பின்னால் உள்ள தொழில்நுட்பம்',
    machine_subtitle: 'தகவல் குறிப்புகள் எவ்வாறு மாநிலச் செய்திகளாக மாறுகின்றன',
    launch_sandbox: 'பைப்லைன் ஆய்வுக்கூடத்தைத் தொடங்கு →',
    all_desks: 'அனைத்துப் பிரிவுகளும் (36)',
    back_to_atlas: 'வரைபடத்திற்குத் திரும்பு',
  }
};

// Localized state names in all 6 languages
export const STATE_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  maharashtra: { en: 'Maharashtra', hi: 'महाराष्ट्र', bn: 'মহারাষ্ট্র', mr: 'महाराष्ट्र', te: 'మహారాష్ట్ర', ta: 'மகாராஷ்டிரா' },
  delhi: { en: 'Delhi', hi: 'दिल्ली', bn: 'দিল্লি', mr: 'दिल्ली', te: 'ఢిల్లీ', ta: 'தில்லி' },
  'uttar-pradesh': { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', bn: 'উত্তর প্রদেশ', mr: 'उत्तर प्रदेश', te: 'ఉత్తర ప్రదేశ్', ta: 'உத்தரப் பிரதேசம்' },
  'west-bengal': { en: 'West Bengal', hi: 'पश्चिम बंगाल', bn: 'পশ্চিমবঙ্গ', mr: 'पश्चिम बंगाल', te: 'పశ్చిమ బెంగాల్', ta: 'மேற்கு வங்கம்' },
  'tamil-nadu': { en: 'Tamil Nadu', hi: 'तमिलनाडु', bn: 'তামিলনাড়ু', mr: 'तामिळनाडू', te: 'తమిళనాడు', ta: 'தமிழ்நாடு' },
  karnataka: { en: 'Karnataka', hi: 'कर्नाटक', bn: 'কর্ণাটক', mr: 'कर्नाटक', te: 'కర్ణాటక', ta: 'கர்நாடகா' },
  'andhra-pradesh': { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश', bn: 'অন্ধ্র প্রদেশ', mr: 'आंध्र प्रदेश', te: 'ఆంధ్రప్రదేశ్', ta: 'ஆந்திரப் பிரதேசம்' },
  telangana: { en: 'Telangana', hi: 'तेलंगाना', bn: 'তেলেঙ্গানা', mr: 'तेलंगणा', te: 'తెలంగాణ', ta: 'தெலங்கானா' },
  kerala: { en: 'Kerala', hi: 'केरल', bn: 'কেরালা', mr: 'केरळ', te: 'కేరళ', ta: 'கேரளா' },
  gujarat: { en: 'Gujarat', hi: 'गुजरात', bn: 'গুজরাত', mr: 'गुजरात', te: 'గుజరాత్', ta: 'குஜராத்' },
  rajasthan: { en: 'Rajasthan', hi: 'राजस्थान', bn: 'রাজস্থান', mr: 'राजस्थान', te: 'రాజస్థాన్', ta: 'ராஜஸ்தான்' },
  punjab: { en: 'Punjab', hi: 'पंजाब', bn: 'পাঞ্জাব', mr: 'पंजाब', te: 'పంజాబ్', ta: 'பஞ்சாப்' },
  haryana: { en: 'Haryana', hi: 'हरियाणा', bn: 'হরিয়ানা', mr: 'हरयाणा', te: 'హర్యానా', ta: 'ஹரியானா' },
  bihar: { en: 'Bihar', hi: 'बिहार', bn: 'বিহার', mr: 'बिहार', te: 'బీహార్', ta: 'பீகார்' },
  odisha: { en: 'Odisha', hi: 'ओडिशा', bn: 'ওড়িশা', mr: 'ओडिशा', te: 'ఒడిశా', ta: 'ஒடிசா' },
  'madhya-pradesh': { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', bn: 'মধ্যপ্রদেশ', mr: 'मध्य प्रदेश', te: 'మధ్యప్రదేశ్', ta: 'மத்தியப் பிரதேசம்' },
  assam: { en: 'Assam', hi: 'असम', bn: 'আসাম', mr: 'आसाम', te: 'అసోం', ta: 'அசாம்' },
  'jammu-kashmir': { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर', bn: 'জম্মু ও কাশ্মীর', mr: 'जम्मू आणि काश्मीर', te: 'జమ్మూ కాశ్మీర్', ta: 'ஜம்மு காஷ்மீர்' },
  ladakh: { en: 'Ladakh', hi: 'लद्दाख', bn: 'লাদাখ', mr: 'लडाख', te: 'లడఖ్', ta: 'லடாக்' },
  'himachal-pradesh': { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश', bn: 'হিমাচল প্রদেশ', mr: 'हिमाचल प्रदेश', te: 'హిమాచల్ ప్రదేశ్', ta: 'இமாச்சலப் பிரதேசம்' },
  uttarakhand: { en: 'Uttarakhand', hi: 'उत्तराखंड', bn: 'উত্তরাখণ্ড', mr: 'उत्तराखंड', te: 'ఉత్తరాఖండ్', ta: 'உத்தராகண்ட்' },
  goa: { en: 'Goa', hi: 'गोवा', bn: 'গোয়া', mr: 'गोवा', te: 'గోవా', ta: 'கோவா' },
  chhattisgarh: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़', bn: 'ছত্তিশগড়', mr: 'छत्तीसगड', te: 'ఛత్తీస్‌గఢ్', ta: 'சத்தீஸ்கர்' },
  jharkhand: { en: 'Jharkhand', hi: 'झारखंड', bn: 'ঝাড়খণ্ড', mr: 'झारखंड', te: 'జార్ఖండ్', ta: 'ஜார்க்கண்ட்' },
  sikkim: { en: 'Sikkim', hi: 'सिक्किम', bn: 'সিকিম', mr: 'सिक्कीम', te: 'సిక్కిం', ta: 'சிக்கிம்' },
  'arunachal-pradesh': { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश', bn: 'অরুণাচল প্রদেশ', mr: 'अरुणाचल प्रदेश', te: 'అరుణాచల్ ప్రదేశ్', ta: 'அருணாச்சலப் பிரதேசம்' },
  nagaland: { en: 'Nagaland', hi: 'नागालैंड', bn: 'নাগাল্যান্ড', mr: 'नागालँड', te: 'నాగాలాండ్', ta: 'நாகாலாந்து' },
  manipur: { en: 'Manipur', hi: 'मणिपुर', bn: 'মণিপুর', mr: 'मणिपूर', te: 'మణిపూర్', ta: 'மணிப்பூர்' },
  mizoram: { en: 'Mizoram', hi: 'मिजोरम', bn: 'মিজোরাম', mr: 'मिझोरम', te: 'మిజోరం', ta: 'மிசோரம்' },
  tripura: { en: 'Tripura', hi: 'त्रिपुरा', bn: 'ত্রিপুরা', mr: 'त्रिपुरा', te: 'త్రిపుర', ta: 'திரிபுரா' },
  meghalaya: { en: 'Meghalaya', hi: 'मेघालय', bn: 'মেঘালয়', mr: 'मेघालय', te: 'మేఘాలయ', ta: 'மேகாலயா' },
  puducherry: { en: 'Puducherry', hi: 'पुडुचेरी', bn: 'পুদুচেরি', mr: 'पुडुचेरी', te: 'పుదుచ్చేరి', ta: 'புதுச்சேரி' },
  chandigarh: { en: 'Chandigarh', hi: 'चंडीगढ़', bn: 'চণ্ডীগড়', mr: 'चंदीगड', te: 'చండీగఢ్', ta: 'சண்டிகர்' },
  'andaman-nicobar': { en: 'Andaman & Nicobar', hi: 'अंडमान और निकोबार', bn: 'আন্দামান ও নিকোবর', mr: 'अंदमान आणि निकोबार', te: 'అండమాన్ నికోబార్', ta: 'அந்தமான் நிக்கோபார்' },
  lakshadweep: { en: 'Lakshadweep', hi: 'लक्षद्वीप', bn: 'লাক্ষাদ্বীপ', mr: 'लक्षद्वीप', te: 'లక్షద్వీప్', ta: 'லட்சத்தீவு' },
  'dadra-nagar-haveli': { en: 'Dadra & Nagar Haveli', hi: 'दादरा और नगर हवेली', bn: 'দাদরা ও নগর হাভেলি', mr: 'दादरा आणि नगर हवेली', te: 'దాద్రా నగర్ హవేలీ', ta: 'தாத்ரா நகர் ஹவேலி' },
};

// Translated National Stories
export const STORY_TRANSLATIONS: Record<string, Record<SupportedLanguage, { title: string; summary: string; dateline: string }>> = {
  'story-1': {
    en: {
      title: 'Drama at Matoshree as defamation notices served in high-profile political dispute',
      summary: 'High-voltage political friction in Mumbai deepens as formal legal notices demand unconditional retraction over controversial statements regarding historic state inquiry findings.',
      dateline: 'MUMBAI — '
    },
    hi: {
      title: 'मातोश्री पर नाटकीय घटनाक्रम: ऐतिहासिक जांच बयानों पर मानहानि नोटिस से राजनीतिक विवाद गहराया',
      summary: 'मुंबई में राजनीतिक हलचल तेज हो गई है क्योंकि ऐतिहासिक राज्य आयोग के निष्कर्षों पर विवादित बयानों को लेकर औपचारिक कानूनी नोटिस भेजकर 48 घंटे में बिना शर्त माफी की मांग की गई है।',
      dateline: 'मुंबई — '
    },
    bn: {
      title: 'মাতোশ্রীতে নাটকীয় পরিস্থিতি: ঐতিহাসিক তদন্তের মন্তব্যে মানহানির নোটিশে রাজনৈতিক বিতর্ক তুঙ্গে',
      summary: 'মুম্বাইয়ের রাজনৈতিক টানাপোড়েন তীব্র আকার ধারণ করেছে, ঐতিহাসিক কমিশন রিপোর্ট সংক্রান্ত বিতর্কিত মন্তব্যের কারণে নিঃশর্ত প্রত্যাহারের দাবিতে আনুষ্ঠানিক আইনি নোটিশ পাঠানো হয়েছে।',
      dateline: 'মুম্বাই — '
    },
    mr: {
      title: 'मातोश्रीवर राजकीय खळबळ: ऐतिहासिक चौकशी विधानांवरून मानहानीच्या नोटिसा, कायदेशीर संघर्ष पेटला',
      summary: 'मुंबईतील राजकीय वातावरण चांगलेच तापले असून ऐतिहासिक राज्य आयोगाच्या निष्कर्षांवरील विधानांवरून ४८ तासांत बिनशर्त माफी मागण्याची नोटीस बजावण्यात आली आहे.',
      dateline: 'मुंबई — '
    },
    te: {
      title: 'మాతోశ్రీ వద్ద హైడ్రామా: చారిత్రక విచారణ వ్యాఖ్యలపై పరువు నష్టం నోటీసులతో రాజకీయ వేడి',
      summary: 'చారిత్రక విచారణ కమిషన్ వివరాలపై చేసిన వివాదాస్పద వ్యాఖ్యలపై బేషరతు క్షమాపణ కోరుతూ లీగల్ నోటీసులు జారీ కావడంతో ముంబై రాజకీయ వర్గాల్లో తీవ్ర ఉత్కంఠ నెలకొంది.',
      dateline: 'ముంబై — '
    },
    ta: {
      title: 'மாதோஸ்ரீயில் அரசியல் பரபரப்பு: வரலாற்று விசாரணை கருத்துக்களுக்கு அவதூறு நோட்டீஸ்',
      summary: 'வரலாற்று விசாரணை ஆணையக் கண்டுபிடிப்புகள் தொடர்பான சர்ச்சை அறிக்கைகளுக்கு நிபந்தனையற்ற மன்னிப்பு கோரி முறையான நோட்டீஸ் அனுப்பப்பட்டதால் மும்பையில் அரசியல் பதற்றம் அதிகரித்துள்ளது.',
      dateline: 'மும்பை — '
    }
  },
  'story-2': {
    en: {
      title: 'Apex Court seeks comprehensive environmental impact audit on upper Himalayan river infrastructure',
      summary: 'A three-judge Supreme Court bench commands the Central Water Commission and state authorities to file ecological balance sheets for riverbed construction.',
      dateline: 'NEW DELHI — '
    },
    hi: {
      title: 'सर्वोच्च न्यायालय ने ऊपरी हिमालयी नदी अवसंरचना पर समग्र पर्यावरणीय प्रभाव ऑडिट की मांग की',
      summary: 'सुप्रीम कोर्ट की तीन सदस्यीय पीठ ने केंद्रीय जल आयोग और राज्य अधिकारियों को नदी तट निर्माण के लिए पारिस्थितिक संतुलन पत्र प्रस्तुत करने का आदेश दिया।',
      dateline: 'नई दिल्ली — '
    },
    bn: {
      title: 'উচ্চ হিমালয় নদী পরিকাঠামোয় পরিবেশগত প্রভাবের বিস্তারিত অডিট চাইল সুপ্রিম কোর্ট',
      summary: 'সুপ্রিম কোর্টের তিন বিচারপতির বেঞ্চ নদী অববাহিকা নির্মাণের পরিবেশগত ভারসাম্য পত্র দাখিলের জন্য কেন্দ্রীয় জল কমিশন ও রাজ্য কর্তৃপক্ষকে নির্দেশ দিয়েছে।',
      dateline: 'নয়াদিল্লি — '
    },
    mr: {
      title: 'सर्वोच्च न्यायालयाचे आदेश: हिमालयातील नदी प्रकल्पांचे सर्वसमावेशक पर्यावरण ऑडिट सादर करा',
      summary: 'सर्वोच्च न्यायालयाच्या तीन न्यायमूर्तींच्या खंडपीठाने केंद्रीय जल आयोग व राज्य सरकारला नदीपात्रातील बांधकामांचे पर्यावरण संतुलन पत्र सादर करण्याचे निर्देश दिले.',
      dateline: 'नवी दिल्ली — '
    },
    te: {
      title: 'హిమాలయ నదీ మౌలిక వసతులపై పర్యావరణ ప్రభావ ఆడిట్‌ను కోరిన సుప్రీంకోర్టు',
      summary: 'నదీ పరీవాహక ప్రాంత నిర్మాణాలపై సమగ్ర పర్యావరణ నివేదికను సమర్పించాలని కేంద్ర జల సంఘం, రాష్ట్ర అధికారులను సుప్రీంకోర్టు ధర్మాసనం ఆదేశించింది.',
      dateline: 'న్యూఢిల్లీ — '
    },
    ta: {
      title: 'இமயமலை நதி உள்கட்டமைப்புகள் குறித்த விரிவான சுற்றுச்சூழல் தணிக்கையைக் கோரியது உச்ச நீதிமன்றம்',
      summary: 'ஆற்றுப்படுகை கட்டுமானங்களுக்கான சுற்றுச்சூழல் சமநிலை அறிக்கையைத் தாக்கல் செய்ய மத்திய நீர் ஆணையத்திற்கும் மாநில அதிகாரிகளுக்கும் உச்ச நீதிமன்றம் உத்தரவிட்டுள்ளது.',
      dateline: 'புது தில்லி — '
    }
  },
  'story-3': {
    en: {
      title: 'Reserve Bank monitors liquidity as foreign institutional inflows touch monthly high',
      summary: 'Indian benchmark indices steady near historic highs as domestic manufacturing PMI signals broad-based industrial expansion and foreign capital inflows swell.',
      dateline: 'MUMBAI — '
    },
    hi: {
      title: 'विदेशी संस्थागत निवेश मासिक उच्च स्तर पर, रिजर्व बैंक ने तरलता की निगरानी बढ़ाई',
      summary: 'भारतीय बेंचमार्क सूचकांक ऐतिहासिक ऊंचाई के करीब स्थिर हैं, क्योंकि घरेलू विनिर्माण पीएमआई ने व्यापक औद्योगिक विस्तार और विदेशी पूंजी प्रवाह के संकेत दिए हैं।',
      dateline: 'मुंबई — '
    },
    bn: {
      title: 'বিদেশি প্রাতিষ্ঠানিক বিনিয়োগের ঊর্ধ্বগতিতে তারল্য নজরদারি বাড়াল রিজার্ভ ব্যাঙ্ক',
      summary: 'ভারতীয় সূচকসমূহ ঐতিহাসিক উচ্চতার কাছাকাছি স্থিতিশীল, উৎপাদন সূচক শক্তিশালী অর্থনৈতিক বৃদ্ধি এবং উল্লেখযোগ্য মূলধন প্রবাহের ইঙ্গিত দিচ্ছে।',
      dateline: 'মুম্বাই — '
    },
    mr: {
      title: 'परदेशी संस्थागत गुंतवणूक विक्रमी पातळीवर; रिझर्व्ह बँकेचे भांडवली तरलतेवर बारकाईने लक्ष',
      summary: 'भारतीय निर्देशांक ऐतिहासिक उच्चांकाजवळ स्थिरावले असून, देशांतर्गत उत्पादन पीएमआय आणि वाढत्या परदेशी गुंतवणुकीमुळे बाजारपेठेत तेजीचे वातावरण आहे.',
      dateline: 'मुंबई — '
    },
    te: {
      title: 'విదేశీ పెట్టుబడులు గరిష్ట స్థాయికి చేరడంతో లిక్విడిటీని పర్యవేక్షిస్తున్న రిజర్వ్ బ్యాంక్',
      summary: 'భారతీయ స్టాక్ సూచీలు చారిత్రక గరిష్టాల వద్ద స్థిరంగా ఉన్నాయి, తయారీ రంగం వేగవంతమైన వృద్ధిని మరియు విస్తృత విదేశీ మూలధనాన్ని నమోదు చేస్తోంది.',
      dateline: 'ముంబై — '
    },
    ta: {
      title: 'வெளிநாட்டு நிறுவன முதலீடுகள் மாதாந்திர உச்சத்தை எட்டியதால் பணப்புழக்கத்தைக் கண்காணிக்கும் ரிசர்வ் வங்கி',
      summary: 'இந்திய பங்குச் சந்தைக் குறியீடுகள் வரலாற்று உச்சத்திற்கு அருகில் நிலைபெற்றுள்ளன; உற்பத்தி வளர்ச்சி மற்றும் வெளிநாட்டு மூலதன வரத்து தொடர்ந்து உயர்ந்து வருகிறது.',
      dateline: 'மும்பை — '
    }
  },
  'story-4': {
    en: {
      title: 'Southern logistics corridor expands freight rail throughput across industrial belts',
      summary: 'Dedicated freight corridor connectivity links port terminals with inland dry depots, cutting cargo turnaround times by thirty percent across southern manufacturing belts.',
      dateline: 'BENGALURU — '
    },
    hi: {
      title: 'दक्षिणी लॉजिस्टिक्स कॉरिडोर ने औद्योगिक क्षेत्रों में माल ढुलाई क्षमता का विस्तार किया',
      summary: 'समर्पित फ्रेट कॉरिडोर कनेक्टिविटी बंदरगाह टर्मिनलों को अंतर्देशीय डिपो से जोड़ती है, जिससे दक्षिणी विनिर्माण बेल्ट में कार्गो टर्नअराउंड समय में तीस प्रतिशत की कटौती हुई है।',
      dateline: 'बेंगलुरु — '
    },
    bn: {
      title: 'দক্ষিণী লজিস্টিক করিডোর শিল্পাঞ্চল জুড়ে মালবাহী রেলের পরিবহন ক্ষমতা প্রসারিত করেছে',
      summary: 'ডেডিকেটেড মালবাহী করিডোর বন্দর টার্মিনালগুলিকে অভ্যন্তরীণ ডিপোগুলির সাথে সংযুক্ত করে পণ্য পরিবহন সময় ত্রিশ শতাংশ হ্রাস করেছে।',
      dateline: 'বেঙ্গালুরু — '
    },
    mr: {
      title: 'दक्षिण लॉजिस्टिक कॉरिडॉरमुळे औद्योगिक पट्ट्यात मालवाहतूक रेल्वेची क्षमता वाढली',
      summary: 'विशेष मालवाहतूक कॉरिडॉरमुळे बंदरे आणि देशांतर्गत डेपो जोडले गेले असून, दक्षिण भारतातील कारखान्यांचा मालवाहतूक वेळ ३० टक्क्यांनी कमी झाला आहे.',
      dateline: 'बंगळुरू — '
    },
    te: {
      title: 'పారిశ్రామిక ప్రాంతాల్లో సరుకు రవాణా రైలు సామర్థ్యాన్ని విస్తరించిన దక్షిణ లాజిస్టిక్స్ కారిడార్',
      summary: 'ప్రత్యేక సరుకు రవాణా కారిడార్ ఓడరేవులను లోతట్టు డిపోలతో అనుసంధానించడం ద్వారా సరుకు రవాణా సమయాన్ని ముప్పై శాతం తగ్గించింది.',
      dateline: 'బెంగళూరు — '
    },
    ta: {
      title: 'தெற்கு சரக்குப் போக்குவரத்து பாதை தொழிற்பேட்டைகளில் சரக்கு ரயில் சேவையை விரிவுபடுத்துகிறது',
      summary: 'துறைமுகங்களை உள்நாட்டு முனையங்களுடன் இணைக்கும் பிரத்யேக சரக்கு பாதை, தென் பிராந்திய உற்பத்தி மையங்களில் சரக்குக் கையாளும் நேரத்தை 30% குறைத்துள்ளது.',
      dateline: 'பெங்களூரு — '
    }
  },
  'story-5': {
    en: {
      title: 'Agricultural mandis report record winter harvest arrivals amid stabilized grain procurement',
      summary: 'Direct electronic remittance systems register peak volumes as farmers conclude seasonal produce offloading across state border mandis with direct 48-hour settlements.',
      dateline: 'CHANDIGARH — '
    },
    hi: {
      title: 'स्थिर अनाज खरीद के बीच कृषि मंडियों में शीतकालीन फसल की रिकॉर्ड आवक दर्ज',
      summary: 'किसानों को 48 घंटे के भीतर प्रत्यक्ष बैंक भुगतान सुनिश्चित होने के साथ राज्य सीमा मंडियों में मौसमी उपज की रिकॉर्ड आवक दर्ज की गई है।',
      dateline: 'चंडीगढ़ — '
    },
    bn: {
      title: 'স্থিতিশীল শস্য সংগ্রহের মধ্যে কৃষি মান্ডিতে শীতকালীন ফসলের রেকর্ড আমদানি',
      summary: 'কৃষকদের ৪৮ ঘণ্টার মধ্যে সরাসরি ব্যাংক অ্যাকাউন্টে অর্থ পরিশোধের মাধ্যমে বিভিন্ন রাজ্যের সীমান্ত মান্ডিতে সর্বোচ্চ ফলন পৌঁছাচ্ছে।',
      dateline: 'চণ্ডীগড় — '
    },
    mr: {
      title: 'स्थिर धान्य खरेदी दरम्यान कृषी उत्पन्न बाजार समित्यांमध्ये रब्बी हंगामाची विक्रमी आवक',
      summary: 'शेतकऱ्यांना ४८ तासांत थेट बँक खात्यात मोबदला मिळत असल्याने सीमावर्ती बाजार समित्यांमध्ये शेतमालाची विक्रमी आवक नोंदवली गेली आहे.',
      dateline: 'चंदीगड — '
    },
    te: {
      title: 'స్థిరీకరించిన ధాన్యం సేకరణ మధ్య వ్యవసాయ మార్కెట్లలో రికార్డు స్థాయి శీతాకాల దిగుబడులు',
      summary: 'రైతులకు 48 గంటల్లో ప్రత్యక్ష నగదు బదిలీ విధానం ద్వారా సరిహద్దు మార్కెట్లలో రికార్డు పరిమాణంలో ధాన్యం సేకరణ జరుగుతోంది.',
      dateline: 'చండీగఢ్ — '
    },
    ta: {
      title: 'நிலையான தானியக் கொள்முதலுக்கு மத்தியில் வேளாண் சந்தைகளில் சாதனை அளவிலான குளிர்கால அறுவடை வருகை',
      summary: 'விவசாயிகளுக்கு 48 மணி நேரத்திற்குள் நேரடி வங்கிக் கணக்கு வரவு வழங்கப்படுவதால், மாநில எல்லைச் சந்தைகளில் விளைபொருட்கள் வரத்து அதிகரித்துள்ளது.',
      dateline: 'சண்டிகர் — '
    }
  }
};

export function t(key: string, lang: SupportedLanguage): string {
  if (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][key]) {
    return UI_TRANSLATIONS[lang][key];
  }
  return UI_TRANSLATIONS['en'][key] || key;
}

export function getLocalizedStateName(stateId: string, defaultName: string, lang: SupportedLanguage): string {
  if (lang === 'en') return defaultName;
  const stateEntry = STATE_NAMES[stateId.toLowerCase()];
  if (stateEntry && stateEntry[lang]) {
    return stateEntry[lang];
  }
  return defaultName;
}

export function getLocalizedStory(story: ClusteredStory, lang: SupportedLanguage): ClusteredStory {
  if (lang === 'en') return story;

  const translation = STORY_TRANSLATIONS[story.story_id]?.[lang];
  if (translation) {
    const localizedBody = story.body ? [...story.body] : [];
    if (localizedBody.length > 0) {
      // Prepend translated dateline and summary
      localizedBody[0] = `${translation.dateline}${translation.summary} ${localizedBody[0].split('—')[1] || localizedBody[0]}`;
    }
    return {
      ...story,
      story_title: translation.title,
      summary: translation.summary,
      dateline: translation.dateline,
      body: localizedBody.length > 0 ? localizedBody : [translation.summary],
    };
  }

  return story;
}
