// KAALVATRA v2.0 - Complete Geographic and Editorial State Profiles Database

export interface StateStory {
  cat: string;
  date: string;
  read: string;
  by: string;
  h: string;
  dek: string;
  body: string[];
}

export interface StateProfile {
  id: string;
  name: string;
  plain?: string;
  displayName: string;
  ep: string;
  cap: string;
  a: string;
  stand: string;
  marks?: any[];
  motif: 'taj' | 'gateway' | 'peaks' | 'fort' | 'temple' | 'minarets' | 'arch' | 'coast' | string;
  art?: any;
  stories: StateStory[];
  facts: [string, string][];
  coords: number[] | number[][];
}

export const STATES_DATA: Record<string, StateProfile> = {
  "jammu-kashmir": {
    "name": "Jammu &amp; Kashmir",
    "plain": "Jammu & Kashmir",
    "ep": "The vale",
    "cap": "Srinagar / Jammu",
    "a": "#7C93A8",
    "stand": "Two capitals, one summer and one winter, and an administration still working out what a union territory is allowed to decide for itself.",
    "marks": [
      [
        "Srinagar",
        74.8,
        34.08
      ],
      [
        "Jammu",
        74.86,
        32.73
      ],
      [
        "Anantnag",
        75.15,
        33.73
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.6,
      "y": 0.14
    },
    "stories": [
      {
        "cat": "Economy",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Ruhi Andrabi",
        "h": "Horticulture cold chain finally reaches the orchard gate",
        "dek": "Twelve new controlled-atmosphere stores in the valley let growers hold apples past the glut. The fruit mandis are still setting the terms.",
        "body": [
          "A grower who once sold at whatever the October price happened to be can now hold stock into February. Roughly a fifth of the valley's crop went into store this season.",
          "The commission agents have adjusted. Advances are smaller, contracts longer, and the argument has moved from price to who pays the electricity bill on the chiller."
        ]
      },
      {
        "cat": "Tourism",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Imtiyaz Wani",
        "h": "The valley's season stretches into a second winter month",
        "dek": "Snow arriving later has pushed the Gulmarg ski calendar into March. Hoteliers are pleased; the people who read the snowpack are not.",
        "body": [
          "Occupancy figures for the last two seasons show the shoulder weeks doing the work the peak once did. Bookings now spread across eleven weeks instead of six.",
          "Hydrologists tracking the Jhelum's spring flow describe the same data less happily. A later, thinner snowpack is a longer season and a shorter river."
        ]
      },
      {
        "cat": "Politics",
        "date": "19 Sep",
        "read": "5 min",
        "by": "Nadia Qadri",
        "h": "Delimitation's arithmetic arrives at the panchayat level",
        "dek": "Redrawn constituencies are now filtering down into block and panchayat boundaries, and local bodies are discovering they represent different places.",
        "body": [
          "The exercise was framed as housekeeping. In practice it merges wards that have never shared a budget line or a road-repair contractor.",
          "Panchayat heads across four districts have asked for a year's grace before the next devolution cycle. The administration has offered six months."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Bashir Lone",
        "h": "All-weather road links are changing who counts as remote",
        "dek": "Tunnels have cut the Srinagar–Jammu run to under five hours in good weather. The towns in between are recalculating what they are for.",
        "body": [
          "Places that lived on stranded traffic — tea, repairs, a bed for the night — now watch it pass. Two have applied for logistics-park status instead.",
          "The road's own engineers are candid that the harder problem is slope stability above it, not capacity on it."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "14M"
      ],
      [
        "Districts",
        "20"
      ],
      [
        "Capital",
        "Srinagar / Jammu"
      ],
      [
        "Languages spoken",
        "Kashmiri · Dogri · Urdu"
      ]
    ],
    "id": "jammu-kashmir",
    "coords": [
      74.3,
      32.28,
      73.85,
      32.5,
      73.4,
      32.8,
      73.15,
      33.15,
      73.25,
      33.5,
      73.47,
      33.85,
      73.47,
      34.37,
      73.3,
      34.75,
      73.65,
      35.15,
      74,
      35.55,
      73.75,
      36.15,
      73.55,
      36.55,
      74.15,
      36.95,
      75,
      37.05,
      75.65,
      36.7,
      76.1,
      36.2,
      76,
      35.65,
      75.85,
      35.1,
      76.3,
      34.7,
      76.15,
      34.2,
      76.45,
      33.75,
      76.8,
      33.35,
      76.7,
      32.95,
      76.35,
      32.72,
      75.98,
      32.52,
      75.62,
      32.3,
      75.3,
      32.32,
      74.95,
      32.3,
      74.62,
      32.26
    ],
    "displayName": "Jammu & Kashmir"
  },
  "ladakh": {
    "name": "Ladakh",
    "ep": "High desert",
    "cap": "Leh",
    "a": "#93A0AB",
    "stand": "The largest district in the country by area and one of the smallest by population, arguing about who gets to write its land and employment rules.",
    "marks": [
      [
        "Leh",
        77.58,
        34.16
      ],
      [
        "Kargil",
        76.13,
        34.56
      ],
      [
        "Diskit",
        77.55,
        34.55
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.58,
      "y": 0.15
    },
    "stories": [
      {
        "cat": "Politics",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Tsering Angmo",
        "h": "The Sixth Schedule demand returns to the negotiating table",
        "dek": "Hill councils in Leh and Kargil have filed a joint position for the first time, asking for constitutional protection over land, jobs and cultural practice.",
        "body": [
          "The two councils have rarely agreed on anything in public. A shared draft, circulated in August, runs to nine pages and concedes very little.",
          "Officials describe the talks as exploratory. The councils describe them as the only item on the agenda."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Stanzin Dorje",
        "h": "Glacier-fed villages take their water accounting seriously",
        "dek": "Artificial ice reservoirs now supply spring irrigation to more than forty settlements. The measurements matter more than the ice.",
        "body": [
          "Each structure stores winter stream water as a cone that melts exactly when the barley needs it. Volumes are logged by village committees and published.",
          "The engineering is simple and old. The data set it has produced is the most detailed record of high-altitude water stress anyone here has kept."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Rigzin Namgyal",
        "h": "Solar capacity is outgrowing the wire that carries it",
        "dek": "Ladakh's irradiance is the best in the country. Its transmission corridor is a single line, and everything queues behind it.",
        "body": [
          "Projects cleared on paper are waiting on evacuation capacity that will not exist for several years. Developers have begun asking about storage instead.",
          "Local demand is a fraction of what the plateau could generate, which makes every megawatt an export question first."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Deachen Palmo",
        "h": "Monastery archives are being read by their own communities",
        "dek": "A cataloguing project has put several thousand manuscripts into a searchable register, run by the gompas rather than by visiting scholars.",
        "body": [
          "Monks trained in the last three years now do the photography, the indexing and the condition reports themselves.",
          "The first practical result has been mundane and useful: four monasteries discovered they hold duplicate texts and have started lending."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "0.3M"
      ],
      [
        "Districts",
        "7"
      ],
      [
        "Capital",
        "Leh"
      ],
      [
        "Languages spoken",
        "Ladakhi · Urdu · Hindi"
      ]
    ],
    "id": "ladakh",
    "coords": [
      75.85,
      35.1,
      76.3,
      35.55,
      77,
      35.8,
      77.8,
      35.85,
      78.6,
      35.7,
      79.3,
      35.85,
      80,
      35.5,
      80.4,
      34.9,
      80.2,
      34.2,
      79.8,
      33.6,
      79.5,
      33,
      79.15,
      32.7,
      78.95,
      32.5,
      78.75,
      32.45,
      78.3,
      32.58,
      77.85,
      32.65,
      77.35,
      32.8,
      76.7,
      32.95,
      76.8,
      33.35,
      76.45,
      33.75,
      76.15,
      34.2,
      76.3,
      34.7
    ],
    "displayName": "Ladakh"
  },
  "himachal-pradesh": {
    "name": "Himachal Pradesh",
    "ep": "Hill country",
    "cap": "Shimla",
    "a": "#5C8090",
    "stand": "A state that sells water, apples and altitude, and spends most of its administrative energy on the roads that connect all three.",
    "marks": [
      [
        "Shimla",
        77.17,
        31.1
      ],
      [
        "Dharamshala",
        76.32,
        32.22
      ],
      [
        "Manali",
        77.19,
        32.24
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.58,
      "y": 0.12
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Aarti Thakur",
        "h": "After the landslides, a slope-by-slope audit of the hill roads",
        "dek": "Engineers are re-surveying cut slopes along three national highways. The findings are changing how new alignments are approved.",
        "body": [
          "Nearly a third of the audited cuts were steeper than the design standard allowed, most of them widened after the original approval.",
          "The department has begun refusing widening requests without a fresh geotechnical report, which has slowed eleven projects."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Vikram Chauhan",
        "h": "Apple growers move to high-density planting, with reservations",
        "dek": "Dwarf rootstock orchards crop in three years instead of eight. The catch is that they need irrigation the old orchards never did.",
        "body": [
          "Early adopters in Kinnaur report yields per hectare roughly double the traditional standard, provided water arrives on schedule.",
          "Growers on rain-fed slopes are watching rather than converting. Their calculation is about drought years, not average ones."
        ]
      },
      {
        "cat": "Tourism",
        "date": "19 Sep",
        "read": "5 min",
        "by": "Nisha Verma",
        "h": "Vehicle caps arrive in the hill towns, quietly",
        "dek": "Manali and Shimla have begun limiting daily entries during peak weeks. The scheme is deliberately unadvertised.",
        "body": [
          "Authorities set the cap using parking capacity rather than headline visitor numbers, which is why nobody has published a figure.",
          "Hotel associations were initially opposed and are now the loudest defenders, having discovered that a full town books better than a jammed one."
        ]
      },
      {
        "cat": "Energy",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Rohit Sharma",
        "h": "Small hydro's share is falling and nobody planned for it",
        "dek": "Run-of-river projects built in the 2010s are generating below projection as stream flows shift. The state's revenue model assumed otherwise.",
        "body": [
          "Several plants now run at partial capacity through what used to be their strongest months.",
          "The tariff agreements were written for a hydrology that the last decade has not delivered, and renegotiation is the only remedy on the table."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "7.5M"
      ],
      [
        "Districts",
        "12"
      ],
      [
        "Capital",
        "Shimla"
      ],
      [
        "Languages spoken",
        "Hindi · Pahari"
      ]
    ],
    "id": "himachal-pradesh",
    "coords": [
      75.62,
      32.3,
      75.98,
      32.52,
      76.35,
      32.72,
      76.7,
      32.95,
      77.35,
      32.8,
      77.85,
      32.65,
      78.3,
      32.58,
      78.75,
      32.45,
      78.95,
      32.05,
      79.05,
      31.6,
      78.8,
      31.3,
      78.6,
      31.15,
      78.3,
      31,
      78.05,
      30.75,
      77.9,
      30.5,
      77.75,
      30.48,
      77.58,
      30.42,
      77.35,
      30.55,
      77.1,
      30.65,
      76.85,
      30.72,
      76.55,
      31,
      76.2,
      31.35,
      75.98,
      31.72,
      75.82,
      32.02
    ],
    "displayName": "Himachal Pradesh"
  },
  "punjab": {
    "name": "Punjab",
    "ep": "Five rivers",
    "cap": "Chandigarh",
    "a": "#B8813B",
    "stand": "The state that fed the country through the Green Revolution and is now being asked to change the crop that made it possible.",
    "marks": [
      [
        "Ludhiana",
        75.85,
        30.9
      ],
      [
        "Amritsar",
        74.87,
        31.63
      ],
      [
        "Patiala",
        76.4,
        30.34
      ]
    ],
    "motif": "river",
    "art": {
      "s": 0.62,
      "y": 0.14
    },
    "stories": [
      {
        "cat": "Agriculture",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Manpreet Gill",
        "h": "The paddy-to-maize switch stalls at the mandi",
        "dek": "Diversification incentives are in place and the agronomy works. What is missing is a guaranteed buyer at a known price.",
        "body": [
          "Farmers who trialled maize last season report comparable margins only where a processor contracted the crop in advance.",
          "Without assured procurement the switch is a private bet against a public guarantee, and almost nobody is taking it."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Harleen Kaur",
        "h": "Groundwater blocks slip from 'critical' to 'over-exploited'",
        "dek": "Water-table readings in central Punjab have fallen again. The map of safe blocks is now smaller than the map of unsafe ones.",
        "body": [
          "Submersible pumps in several districts are being deepened by a few metres every second or third year, a cost that compounds quietly.",
          "The state's own assessment is blunt about the trajectory. The remedies it lists are all slower than the decline it measures."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Gurpreet Sandhu",
        "h": "Ludhiana's hosiery cluster retools for a shorter season",
        "dek": "Warmer winters have compressed the selling window for knitwear. The cluster is moving to lighter blends and faster runs.",
        "body": [
          "Units that once took eight-week orders now quote three. Fabric buying has shifted from bulk to rolling.",
          "The bigger firms have absorbed it. The job-work shops that supply them are carrying the inventory risk instead."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Simran Bedi",
        "h": "Village libraries become the state's quiet infrastructure",
        "dek": "More than a thousand reading rooms have opened in rural Punjab since 2020, most funded by diaspora families and run by local committees.",
        "body": [
          "The buildings are small and the collections uneven, but the opening hours are long and the electricity is reliable.",
          "Their unplanned function has turned out to be exam preparation, which is what most of the people inside are doing."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "31M"
      ],
      [
        "Districts",
        "23"
      ],
      [
        "Capital",
        "Chandigarh"
      ],
      [
        "Languages spoken",
        "Punjabi"
      ]
    ],
    "id": "punjab",
    "coords": [
      73.88,
      30.45,
      74.05,
      30.75,
      74.3,
      31.05,
      74.6,
      31.35,
      74.55,
      31.72,
      74.15,
      31.95,
      74.3,
      32.28,
      74.62,
      32.26,
      74.95,
      32.3,
      75.3,
      32.32,
      75.62,
      32.3,
      75.82,
      32.02,
      75.98,
      31.72,
      76.2,
      31.35,
      76.55,
      31,
      76.85,
      30.72,
      76.7,
      30.55,
      76.35,
      30.35,
      75.95,
      30.15,
      75.55,
      29.95,
      75.2,
      29.72,
      74.7,
      29.95,
      74.3,
      30.15
    ],
    "displayName": "Punjab"
  },
  "haryana": {
    "name": "Haryana",
    "ep": "The plain",
    "cap": "Chandigarh",
    "a": "#A8894E",
    "stand": "Wheat, wrestling academies and a corporate skyline that grew on farmland — a state whose two halves are measured in different currencies.",
    "marks": [
      [
        "Gurugram",
        77.03,
        28.46
      ],
      [
        "Faridabad",
        77.32,
        28.41
      ],
      [
        "Hisar",
        75.72,
        29.15
      ]
    ],
    "motif": "fort",
    "art": {
      "s": 0.58,
      "y": 0.2
    },
    "stories": [
      {
        "cat": "Cities",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Anjali Yadav",
        "h": "Gurugram's drainage master plan meets its own topography",
        "dek": "A decade of building on natural drains has left the city solving in concrete what the land used to do for free.",
        "body": [
          "The revised plan restores three stormwater channels and buys back land along a fourth, which is where the cost sits.",
          "Engineers say the design storm has been revised upward twice since 2019, and expect to revise it again."
        ]
      },
      {
        "cat": "Sport",
        "date": "19 Sep",
        "read": "5 min",
        "by": "Rakesh Phogat",
        "h": "The akhara pipeline adds a sports-science layer",
        "dek": "Village wrestling academies that produced a generation of medallists are adding physiotherapists and load monitoring.",
        "body": [
          "Coaches who trained on volume alone have been the hardest to convince, and the most effective once convinced.",
          "Injury data collected over two seasons is now being shared between eleven academies, which is new."
        ]
      },
      {
        "cat": "Agriculture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Dinesh Malik",
        "h": "Direct seeding of rice spreads where the canal arrives late",
        "dek": "Farmers at the tail end of canal systems have adopted dry seeding faster than anyone at the head, for reasons of timing rather than water saving.",
        "body": [
          "The technique gets the crop in before the monsoon rather than waiting for a release that may not come.",
          "Yields are slightly lower and weed pressure higher, which the adopters treat as the price of certainty."
        ]
      },
      {
        "cat": "Politics",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Suman Rathee",
        "h": "Panchayat reservation rules face their second election cycle",
        "dek": "Rules reserving seats for women and backward classes are producing a cohort of second-term sarpanches who now know the budget lines.",
        "body": [
          "Researchers tracking the same forty panchayats since 2016 report the sharpest change in water and school spending.",
          "The pattern is not universal. Where a seat rotates every term, the learning resets with it."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "30M"
      ],
      [
        "Districts",
        "22"
      ],
      [
        "Capital",
        "Chandigarh"
      ],
      [
        "Languages spoken",
        "Hindi · Punjabi"
      ]
    ],
    "id": "haryana",
    "coords": [
      75.2,
      29.72,
      75.55,
      29.95,
      75.95,
      30.15,
      76.35,
      30.35,
      76.7,
      30.55,
      76.85,
      30.72,
      77.1,
      30.65,
      77.35,
      30.55,
      77.58,
      30.42,
      77.52,
      30.08,
      77.4,
      29.7,
      77.28,
      29.38,
      77.32,
      29.05,
      77.55,
      28.78,
      77.6,
      28.5,
      77.45,
      28.25,
      77.3,
      27.95,
      77.15,
      27.7,
      76.65,
      27.95,
      76.3,
      28.2,
      75.9,
      28.55,
      75.4,
      28.95,
      75.05,
      29.35
    ],
    "displayName": "Haryana"
  },
  "delhi": {
    "name": "Delhi",
    "ep": "The capital",
    "cap": "New Delhi",
    "a": "#C24A46",
    "stand": "A city that is also a state that is also a capital, arguing with itself about air, water and who signs which file.",
    "marks": [
      [
        "New Delhi",
        77.21,
        28.61
      ],
      [
        "Najafgarh",
        76.98,
        28.61
      ],
      [
        "Narela",
        77.09,
        28.85
      ]
    ],
    "motif": "arch",
    "art": {
      "s": 0.7,
      "y": 0.26
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Kabir Sethi",
        "h": "The winter air plan is published in September for once",
        "dek": "Emergency measures have been announced before the season rather than during it, which changes what enforcement can look like.",
        "body": [
          "Construction dust rules, fuel switching at industrial units and a fleet audit are all scheduled rather than triggered.",
          "The unresolved part remains the same as every year: most of the particulate load arrives from outside the city's jurisdiction."
        ]
      },
      {
        "cat": "Cities",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Ritu Bhargava",
        "h": "Yamuna floodplain restoration runs into its own maps",
        "dek": "Biodiversity parks have reclaimed several stretches of floodplain. Deciding where the floodplain legally ends is the slower work.",
        "body": [
          "Survey records, satellite imagery and revenue maps disagree by hundreds of metres in places, all of them built on.",
          "The restored stretches have measurably improved groundwater recharge, which is the argument the project now leads with."
        ]
      },
      {
        "cat": "Transport",
        "date": "19 Sep",
        "read": "5 min",
        "by": "Aman Khurana",
        "h": "Bus ridership overtakes its pre-pandemic peak",
        "dek": "Electrification and a flat fare have pushed daily bus trips past their old ceiling, while metro growth has flattened.",
        "body": [
          "The buses are cheaper and now reliable enough that the trade-off has shifted for short trips.",
          "Depot charging capacity is the constraint. Two depots are running fleets larger than their connections were designed for."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Shreya Kapoor",
        "h": "The city's stepwells get a second life as public space",
        "dek": "Restoration of three baolis has turned archaeological sites into evening spaces, which was not the original brief.",
        "body": [
          "Conservation architects wanted stabilisation. The neighbourhoods wanted somewhere to sit, and largely got it.",
          "Footfall data has been used to argue for four more, with lighting and access budgeted from the start this time."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "21M"
      ],
      [
        "Districts",
        "11"
      ],
      [
        "Capital",
        "New Delhi"
      ],
      [
        "Languages spoken",
        "Hindi · English · Punjabi"
      ]
    ],
    "id": "delhi",
    "coords": [
      76.86,
      28.62,
      76.94,
      28.88,
      77.18,
      28.92,
      77.34,
      28.74,
      77.36,
      28.5,
      77.16,
      28.38,
      76.92,
      28.46
    ],
    "displayName": "Delhi"
  },
  "uttarakhand": {
    "name": "Uttarakhand",
    "ep": "Source of rivers",
    "cap": "Dehradun",
    "a": "#6E8A6A",
    "stand": "Source of two rivers that organise half a subcontinent, and a state that has to decide how many people its slopes can carry.",
    "marks": [
      [
        "Dehradun",
        78.03,
        30.32
      ],
      [
        "Haridwar",
        78.16,
        29.95
      ],
      [
        "Nainital",
        79.45,
        29.38
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.6,
      "y": 0.12
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Meera Negi",
        "h": "Joshimath's subsidence study becomes a template",
        "dek": "The instrumentation installed after the 2023 cracks is now a permanent monitoring network, and four other towns have asked for one.",
        "body": [
          "Ground movement is logged continuously and published monthly, which has changed how construction permissions are argued locally.",
          "The study's uncomfortable finding is that the loading, not the geology, is the variable anyone can still control."
        ]
      },
      {
        "cat": "Tourism",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Pankaj Rawat",
        "h": "Char Dham registration caps hold for a second season",
        "dek": "Daily limits at the four shrines were expected to be quietly relaxed. They were not, and the pilgrimage has adjusted around them.",
        "body": [
          "Arrivals are more evenly spread across the season, and the mountain towns report fewer days of total gridlock.",
          "Tour operators who built around peak-week volume have been the loudest objectors and the slowest to adapt."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Deepa Bisht",
        "h": "Hill migration reverses, slightly, and mostly on paper",
        "dek": "Census-adjacent surveys show a small net return to some hill blocks. Whether the returnees stay through a winter is the open question.",
        "body": [
          "Remote work and homestay income explain most of the movement, concentrated in a handful of accessible valleys.",
          "Blocks without road access or a functioning school show no reversal at all."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Harish Joshi",
        "h": "Village temple carpentry finds apprentices again",
        "dek": "A documentation project has turned into a training programme, with restoration contracts going to local carpenters rather than outside firms.",
        "body": [
          "The joinery used in Kumaoni temples was undocumented until three years ago and is now taught from measured drawings.",
          "Eleven apprentices have completed the course. Two have gone back to a trade their fathers left."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "11M"
      ],
      [
        "Districts",
        "13"
      ],
      [
        "Capital",
        "Dehradun"
      ],
      [
        "Languages spoken",
        "Hindi · Garhwali · Kumaoni"
      ]
    ],
    "id": "uttarakhand",
    "coords": [
      77.9,
      30.5,
      78.05,
      30.75,
      78.3,
      31,
      78.6,
      31.15,
      78.8,
      31.3,
      79.2,
      31.4,
      79.6,
      31.05,
      80.05,
      30.75,
      80.35,
      30.45,
      80.75,
      30.35,
      81.05,
      30.2,
      80.75,
      29.85,
      80.5,
      29.55,
      80.25,
      29.2,
      80.1,
      28.9,
      79.7,
      29.2,
      79.25,
      29.45,
      78.85,
      29.75,
      78.45,
      30,
      78.1,
      30.25
    ],
    "displayName": "Uttarakhand"
  },
  "uttar-pradesh": {
    "name": "Uttar Pradesh",
    "ep": "The heartland",
    "cap": "Lucknow",
    "a": "#C05A2A",
    "stand": "Two hundred and forty million people, four river systems and the country's densest grid of small cities. Uttar Pradesh rarely moves quietly — when it changes its mind about anything, the rest of India reads the result.",
    "marks": [
      [
        "Agra",
        78.02,
        27.18
      ],
      [
        "Lucknow",
        80.95,
        26.85
      ],
      [
        "Kanpur",
        80.35,
        26.45
      ],
      [
        "Prayagraj",
        81.85,
        25.44
      ],
      [
        "Varanasi",
        83.01,
        25.32
      ]
    ],
    "motif": "taj",
    "art": {
      "s": 0.72,
      "y": 0.3
    },
    "stories": [
      {
        "cat": "Tourism",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Ira Mahajan",
        "h": "Agra prepares for a new chapter in heritage tourism",
        "dek": "A visitor-management plan two years in the drafting would cap crowds at the Taj Mahal, reroute traffic away from the east gate and push the city to sell more than one monument.",
        "body": [
          "The draft circulating among hoteliers this month is less about the monument than about the eleven kilometres around it. Timed entry, a shuttle spine along the Yamuna and a levy on same-day coach tours are all in the text.",
          "Agra's own guides are split. A cap protects the marble and the queue, but it also caps the day's earnings for the roughly forty thousand people who work the heritage economy without a salary."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Devesh Rathi",
        "h": "New expressway corridors redraw the map of eastern Uttar Pradesh",
        "dek": "Six-lane links have cut the Lucknow–Ghazipur run to a morning. The harder question is which towns along the route get an exit, and which get a flyover.",
        "body": [
          "Land along the interchanges has repriced three times since the alignment was notified. Districts that expected industrial parks are still waiting for the water and power that would make them usable.",
          "Planners describe the corridor as a spine. The towns describe it as a wall, and the difference between those two readings is now a live political argument."
        ]
      },
      {
        "cat": "Technology",
        "date": "19 Sep",
        "read": "5 min",
        "by": "Sana Qureshi",
        "h": "Lucknow emerges as a growing technology and innovation hub",
        "dek": "A cluster of defence-electronics suppliers, a state data centre and cheap graduate hiring have given the capital something it has not had before: a reason for engineers to stay.",
        "body": [
          "The pitch is straightforward. Salaries roughly two-thirds of Bengaluru's, rents roughly a third, and a two-hour flight to either coast. Retention, so far, is the metric that has surprised employers.",
          "What the city still lacks is a second round of capital. Nearly every firm here is profitable and small, and almost none has raised money outside the state."
        ]
      },
      {
        "cat": "Culture",
        "date": "19 Sep",
        "read": "8 min",
        "by": "Rohit Banerji",
        "h": "In Varanasi, the ghats become a year-round stage",
        "dek": "Municipal permits for evening performance have quadrupled since 2023, and the city's oldest music families are arguing about what belongs on a riverfront.",
        "body": [
          "The corridor rebuilt around the temple gave the city a plaza it never had. It also gave promoters a venue with a view, and a calendar that no longer empties between festivals.",
          "Older gharanas are not opposed to the audience. They are opposed to the amplification, the ticketing and the forty-minute set."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Meher Sethi",
        "h": "Kanpur's leather belt bets on a cleaner, costlier future",
        "dek": "Effluent rules that closed tanneries in 2019 are now the basis of the sector's export pitch. The plants that survived are bigger, fewer and audited by their buyers.",
        "body": [
          "A shared treatment facility at Jajmau processes the load that individual units could never afford to handle. Compliance costs about eleven per cent of margin, and buyers in Europe now ask to see the records.",
          "The employment maths is less comfortable. The belt supports roughly half the workers it did a decade ago, at roughly double the productivity."
        ]
      },
      {
        "cat": "Politics",
        "date": "18 Sep",
        "read": "7 min",
        "by": "Anand Tiwari",
        "h": "A quiet redistricting debate is reshaping local power in the Doab",
        "dek": "Ward boundaries in eleven municipal bodies are being redrawn before next year's civic polls. Almost nobody is campaigning on it, and almost everybody is watching it.",
        "body": [
          "The commission's brief is technical: equalise ward populations after a decade of growth on the urban edge. The effect is not technical at all.",
          "Councillors who built careers on a single dense neighbourhood are being handed wards that now stretch into new colonies with entirely different demands."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "241M"
      ],
      [
        "Districts",
        "75"
      ],
      [
        "Capital",
        "Lucknow"
      ],
      [
        "Languages spoken",
        "Hindi · Urdu"
      ]
    ],
    "id": "uttar-pradesh",
    "coords": [
      77.58,
      30.42,
      77.75,
      30.48,
      77.9,
      30.5,
      78.1,
      30.25,
      78.45,
      30,
      78.85,
      29.75,
      79.25,
      29.45,
      79.7,
      29.2,
      80.1,
      28.9,
      80.5,
      28.65,
      80.9,
      28.45,
      81.45,
      28.2,
      82,
      27.95,
      82.55,
      27.7,
      83.1,
      27.5,
      83.6,
      27.4,
      84.15,
      27.05,
      84.65,
      26.75,
      84.55,
      26.4,
      84.4,
      26.05,
      84.2,
      25.7,
      83.95,
      25.35,
      84.1,
      25,
      84,
      24.65,
      83.85,
      24.35,
      83.6,
      24.2,
      83.4,
      23.95,
      83.15,
      24.1,
      82.8,
      24.15,
      82.45,
      24.1,
      82,
      24.15,
      81.5,
      24.2,
      81,
      24.35,
      80.55,
      24.6,
      80.1,
      24.8,
      79.7,
      25.05,
      79.3,
      25.4,
      78.95,
      25.65,
      78.6,
      25.9,
      78.25,
      25.95,
      78.05,
      26.35,
      77.75,
      26.7,
      77.45,
      27.05,
      77.25,
      27.4,
      77.15,
      27.7,
      77.3,
      27.95,
      77.45,
      28.25,
      77.6,
      28.5,
      77.55,
      28.78,
      77.32,
      29.05,
      77.28,
      29.38,
      77.4,
      29.7,
      77.52,
      30.08
    ],
    "displayName": "Uttar Pradesh"
  },
  "rajasthan": {
    "name": "Rajasthan",
    "ep": "Desert kingdoms",
    "cap": "Jaipur",
    "a": "#D98A3B",
    "stand": "The largest state by area, most of it dry, running an economy on solar irradiance, tourism and the memory of caravan routes.",
    "marks": [
      [
        "Jaipur",
        75.79,
        26.91
      ],
      [
        "Jodhpur",
        73.02,
        26.24
      ],
      [
        "Udaipur",
        73.71,
        24.58
      ]
    ],
    "motif": "fort",
    "art": {
      "s": 0.58,
      "y": 0.18
    },
    "stories": [
      {
        "cat": "Energy",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Pooja Rathore",
        "h": "The desert's solar parks outgrow their land settlements",
        "dek": "Rajasthan hosts more installed solar capacity than any other state. The disputes now are about grazing commons, not about panels.",
        "body": [
          "Village councils that leased pasture in the early 2010s are renegotiating as tariffs fall and developers consolidate.",
          "Several districts have begun insisting on revenue-share clauses rather than one-time payments, which developers describe as a material change."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Arun Bhati",
        "h": "Traditional water harvesting is measured, at last",
        "dek": "Johads and tankas restored over two decades now have piezometer data attached. The numbers support what the villages have been claiming.",
        "body": [
          "In three catchments, wells within two kilometres of a restored structure hold water roughly two months longer into the dry season.",
          "The finding has changed how the state's watershed budget is allocated, away from single large works and toward dense small ones."
        ]
      },
      {
        "cat": "Tourism",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Nidhi Shekhawat",
        "h": "Heritage hotels confront their own conservation bills",
        "dek": "Converted forts and havelis carried tourism through the lean years. The structures are now due the repairs that tariffs were meant to fund.",
        "body": [
          "Lime plaster, stone replacement and drainage are expensive and unglamorous, and none of it photographs well.",
          "A state conservation subsidy announced in July requires matching private spend, which the smaller properties say they cannot raise."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Vikas Jangid",
        "h": "Marble and sandstone clusters clean up under buyer pressure",
        "dek": "Export buyers now audit slurry disposal at quarries in Rajsamand and Kishangarh. Compliance has become a commercial requirement.",
        "body": [
          "Slurry that was dumped for decades is being reprocessed into board and tile by a handful of new units.",
          "The reprocessing margin is thin, and it exists only because disposal is now expensive."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "82M"
      ],
      [
        "Districts",
        "50"
      ],
      [
        "Capital",
        "Jaipur"
      ],
      [
        "Languages spoken",
        "Hindi · Rajasthani"
      ]
    ],
    "id": "rajasthan",
    "coords": [
      73.88,
      30.45,
      74.3,
      30.15,
      74.7,
      29.95,
      75.2,
      29.72,
      75.05,
      29.35,
      75.4,
      28.95,
      75.9,
      28.55,
      76.3,
      28.2,
      76.65,
      27.95,
      77.15,
      27.7,
      77.25,
      27.4,
      77.45,
      27.05,
      77.75,
      26.7,
      78.05,
      26.35,
      78.25,
      25.95,
      77.95,
      25.55,
      77.6,
      25.15,
      77.25,
      24.75,
      76.85,
      24.45,
      76.4,
      24.2,
      75.95,
      23.95,
      75.5,
      23.7,
      75.05,
      23.6,
      74.6,
      23.55,
      74.25,
      23.25,
      73.9,
      23.4,
      73.55,
      23.7,
      73.25,
      24.05,
      72.95,
      24.35,
      72.55,
      24.45,
      72.1,
      24.55,
      71.55,
      24.6,
      71.05,
      24.45,
      70.65,
      24.8,
      70.35,
      25.3,
      70,
      25.75,
      69.55,
      26.25,
      69.85,
      26.75,
      70.35,
      27.35,
      70.95,
      27.7,
      71.55,
      27.85,
      71.9,
      28.25,
      72.3,
      28.8,
      72.9,
      29.3,
      73.4,
      29.95
    ],
    "displayName": "Rajasthan"
  },
  "gujarat": {
    "name": "Gujarat",
    "ep": "The long coast",
    "cap": "Gandhinagar",
    "a": "#C9A227",
    "stand": "Sixteen hundred kilometres of coastline, the country's busiest cargo ports and a manufacturing belt that treats logistics as a competitive sport.",
    "marks": [
      [
        "Ahmedabad",
        72.58,
        23.02
      ],
      [
        "Surat",
        72.83,
        21.17
      ],
      [
        "Rajkot",
        70.8,
        22.3
      ]
    ],
    "motif": "port",
    "art": {
      "s": 0.52,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Business",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Hetal Desai",
        "h": "Surat's diamond district diversifies into lab-grown stones",
        "dek": "Polishing units that cut mined rough for forty years are now running parallel lines for synthetics, and the export code has had to catch up.",
        "body": [
          "Lab-grown volume from the cluster has risen sharply while the value per carat has fallen, which makes revenue comparisons unhelpful.",
          "The workforce question is the sharp one: synthetics need fewer hands per carat, and the cluster employs several hundred thousand of them."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Jignesh Patel",
        "h": "Port-led logistics parks push inland along the freight corridor",
        "dek": "Container volumes at Mundra and Kandla have outgrown their immediate hinterland. The response is a chain of inland yards up the corridor.",
        "body": [
          "Dedicated freight track has cut the Mundra–Delhi transit time enough that shippers now treat inland yards as extensions of the quay.",
          "Land acquisition for the third yard has been slower than the rail, which is the usual sequence in reverse."
        ]
      },
      {
        "cat": "Environment",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Rina Solanki",
        "h": "Mangrove cover grows, and the accounting gets careful",
        "dek": "Gujarat holds the second-largest mangrove area in the country and is adding to it. The new plantations are being audited for survival, not planting.",
        "body": [
          "Three-year survival rates in the Gulf of Kachchh plantings are being published for the first time, and they vary widely by site.",
          "Where creek hydrology was restored first, survival is roughly double. Where saplings went into unmodified mudflat, most did not last a monsoon."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Bhavna Trivedi",
        "h": "Kutch weaving cooperatives set their own price floor",
        "dek": "Artisan groups in Bhuj have agreed a minimum rate card for hand-woven work, and the buyers have largely accepted it.",
        "body": [
          "The card covers loom time rather than finished pieces, which is what made it possible to agree at all.",
          "Volumes dipped for a season and recovered. Several cooperatives report their first year of rising per-weaver income since 2019."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "71M"
      ],
      [
        "Districts",
        "33"
      ],
      [
        "Capital",
        "Gandhinagar"
      ],
      [
        "Languages spoken",
        "Gujarati · Hindi"
      ]
    ],
    "id": "gujarat",
    "coords": [
      71.05,
      24.45,
      70.5,
      24.32,
      69.9,
      24.28,
      69.3,
      24.25,
      68.75,
      24.22,
      68.35,
      24.05,
      68.18,
      23.78,
      68.5,
      23.6,
      69,
      23.3,
      69.45,
      23.05,
      69.95,
      23,
      70.4,
      23.1,
      70.75,
      22.95,
      70.4,
      22.55,
      69.9,
      22.4,
      69.4,
      22.3,
      68.97,
      22.2,
      69.15,
      21.85,
      69.6,
      21.6,
      70.05,
      21.15,
      70.5,
      20.85,
      71,
      20.7,
      71.5,
      20.78,
      71.95,
      21,
      72.1,
      21.4,
      72.2,
      21.8,
      72.45,
      22.15,
      72.6,
      22.4,
      72.85,
      22.1,
      72.95,
      21.7,
      72.78,
      21.3,
      72.9,
      20.95,
      72.85,
      20.5,
      72.8,
      20.15,
      73.15,
      20.35,
      73.5,
      20.7,
      73.75,
      21.05,
      74.05,
      21.5,
      74.35,
      21.85,
      74.55,
      22.25,
      74.5,
      22.7,
      74.25,
      23.25,
      73.9,
      23.4,
      73.55,
      23.7,
      73.25,
      24.05,
      72.95,
      24.35,
      72.55,
      24.45,
      72.1,
      24.55,
      71.55,
      24.6
    ],
    "displayName": "Gujarat"
  },
  "madhya-pradesh": {
    "name": "Madhya Pradesh",
    "ep": "The centre",
    "cap": "Bhopal",
    "a": "#8C6A3F",
    "stand": "The geographic centre of the country, holding a third of its tiger habitat and a river system that four other states argue about.",
    "marks": [
      [
        "Bhopal",
        77.41,
        23.26
      ],
      [
        "Indore",
        75.86,
        22.72
      ],
      [
        "Jabalpur",
        79.93,
        23.18
      ]
    ],
    "motif": "fort",
    "art": {
      "s": 0.62,
      "y": 0.22
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Kavita Chouhan",
        "h": "Tiger numbers rise and the corridors do not",
        "dek": "Madhya Pradesh holds the largest tiger population in the country. Its reserves are increasingly islands connected by disputed land.",
        "body": [
          "Camera-trap data shows young males dispersing into farmland because the forest routes between reserves are broken in eleven places.",
          "Corridor notification would restrict mining and highway alignment, which is why the corridor maps have been under review for six years."
        ]
      },
      {
        "cat": "Agriculture",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Sunil Dangi",
        "h": "Soy belt farmers hedge back toward pulses",
        "dek": "A run of erratic Septembers has made soybean a gamble at the moment of harvest. Acreage is shifting, quietly and unevenly.",
        "body": [
          "Pulses tolerate a late monsoon better and fetch a price that the state procures, which soybean growers have noticed.",
          "The processing industry built around soy is lobbying hard, because its crushing capacity assumes an acreage that is no longer guaranteed."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Alka Mishra",
        "h": "Indore's waste system becomes an export product",
        "dek": "The city's segregation model is now being licensed to municipalities in four other states, with staff seconded to run the first year.",
        "body": [
          "The transferable part turned out to be the route planning and the enforcement calendar, not the equipment.",
          "Cities that bought the trucks without the supervision structure have not replicated the results."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Ramesh Baghel",
        "h": "Bundelkhand's stepwells get a water-department budget",
        "dek": "Historic baolis are being restored as functioning water infrastructure rather than as monuments, with a line item to match.",
        "body": [
          "Seventeen structures have been desilted and reconnected to their catchments. Six now supply usable water through May.",
          "The archaeology department objected to the modifications and was overruled, which the engineers concede may prove short-sighted."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "87M"
      ],
      [
        "Districts",
        "55"
      ],
      [
        "Capital",
        "Bhopal"
      ],
      [
        "Languages spoken",
        "Hindi"
      ]
    ],
    "id": "madhya-pradesh",
    "coords": [
      74.25,
      23.25,
      74.6,
      23.55,
      75.05,
      23.6,
      75.5,
      23.7,
      75.95,
      23.95,
      76.4,
      24.2,
      76.85,
      24.45,
      77.25,
      24.75,
      77.6,
      25.15,
      77.95,
      25.55,
      78.25,
      25.95,
      78.6,
      25.9,
      78.95,
      25.65,
      79.3,
      25.4,
      79.7,
      25.05,
      80.1,
      24.8,
      80.55,
      24.6,
      81,
      24.35,
      81.5,
      24.2,
      82,
      24.15,
      82.45,
      24.1,
      82.8,
      24.15,
      82.75,
      23.85,
      82.55,
      23.45,
      82.25,
      23.05,
      81.95,
      22.7,
      81.6,
      22.35,
      81.25,
      22.05,
      80.9,
      21.75,
      80.55,
      21.45,
      80,
      21.35,
      79.5,
      21.35,
      79,
      21.4,
      78.5,
      21.45,
      78,
      21.4,
      77.5,
      21.45,
      77,
      21.4,
      76.5,
      21.45,
      76,
      21.5,
      75.5,
      21.65,
      75,
      21.75,
      74.5,
      21.65,
      74.05,
      21.5,
      74.35,
      21.85,
      74.55,
      22.25,
      74.5,
      22.7
    ],
    "displayName": "Madhya Pradesh"
  },
  "chhattisgarh": {
    "name": "Chhattisgarh",
    "ep": "Forest and ore",
    "cap": "Raipur",
    "a": "#7B4B2A",
    "stand": "Forest, coal and iron ore in roughly equal measure, and a long argument about who the revenue from all three belongs to.",
    "marks": [
      [
        "Raipur",
        81.63,
        21.25
      ],
      [
        "Bilaspur",
        82.15,
        22.08
      ],
      [
        "Jagdalpur",
        82.02,
        19.08
      ]
    ],
    "motif": "fort",
    "art": {
      "s": 0.56,
      "y": 0.18
    },
    "stories": [
      {
        "cat": "Economy",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Sujata Netam",
        "h": "Tendu leaf rates rise and the collection season shortens",
        "dek": "Minor forest produce rates were revised upward this year. Collectors report the higher rate arriving alongside a shorter, hotter picking window.",
        "body": [
          "Roughly a million households in the state depend on some part of the forest-produce calendar for a share of annual income.",
          "The cooperative federation now publishes daily rates by district, which has narrowed the gap between what traders and societies pay."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Anil Kashyap",
        "h": "Hasdeo's coal blocks and the community-consent question",
        "dek": "Gram sabha resolutions opposing new mining in the Hasdeo Arand forest have been passed, contested and passed again.",
        "body": [
          "The legal question is whether consent recorded under forest-rights law binds a mining clearance issued under a different statute.",
          "Both sides now cite the same Supreme Court language, which is generally a sign that the matter will be back in court."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Deepak Sahu",
        "h": "Bastar's road programme reaches the last blocks",
        "dek": "Blocks that had no metalled road a decade ago now have one. What arrives with it is being watched closely by the people who asked for it.",
        "body": [
          "Health referral times in three districts have fallen sharply, which is the outcome the programme was defended on.",
          "Market access has cut both ways: prices for forest produce improved, and outside traders arrived first."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Priyanka Markam",
        "h": "Bastar's iron casters find a market that pays for time",
        "dek": "Dhokra casting has moved from tourist-stall pricing to commissioned work, and the makers are choosing which commissions to take.",
        "body": [
          "A cooperative in Kondagaon now quotes by casting weeks rather than by piece, which has roughly tripled realised prices.",
          "The constraint is apprenticeship. There are fewer than sixty casters working at the level the commissions require."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "31M"
      ],
      [
        "Districts",
        "33"
      ],
      [
        "Capital",
        "Raipur"
      ],
      [
        "Languages spoken",
        "Hindi · Chhattisgarhi"
      ]
    ],
    "id": "chhattisgarh",
    "coords": [
      82.8,
      24.15,
      83.15,
      24.1,
      83.4,
      23.95,
      83.75,
      23.7,
      84.05,
      23.35,
      84.35,
      22.9,
      84.2,
      22.45,
      83.85,
      22.1,
      83.55,
      21.7,
      83.2,
      21.25,
      82.9,
      20.8,
      82.7,
      20.3,
      82.45,
      19.85,
      82.2,
      19.4,
      81.95,
      18.95,
      81.8,
      18.35,
      81.55,
      18.05,
      81.3,
      17.85,
      80.95,
      18.2,
      80.6,
      18.55,
      80.3,
      18.85,
      80.4,
      19.3,
      80.3,
      19.8,
      80.4,
      20.3,
      80.45,
      20.85,
      80.55,
      21.45,
      80.9,
      21.75,
      81.25,
      22.05,
      81.6,
      22.35,
      81.95,
      22.7,
      82.25,
      23.05,
      82.55,
      23.45,
      82.75,
      23.85
    ],
    "displayName": "Chhattisgarh"
  },
  "jharkhand": {
    "name": "Jharkhand",
    "ep": "The plateau",
    "cap": "Ranchi",
    "a": "#5E6B3A",
    "stand": "A plateau that supplies the country's steel and carries the highest mineral royalty receipts per capita, without the roads to show for it.",
    "marks": [
      [
        "Ranchi",
        85.31,
        23.34
      ],
      [
        "Jamshedpur",
        86.2,
        22.8
      ],
      [
        "Dhanbad",
        86.43,
        23.8
      ]
    ],
    "motif": "fort",
    "art": {
      "s": 0.58,
      "y": 0.2
    },
    "stories": [
      {
        "cat": "Economy",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Sanjay Oraon",
        "h": "District mineral funds face their first serious audit",
        "dek": "Royalty-funded district trusts hold substantial balances. An audit of four districts has asked where the money actually went.",
        "body": [
          "The rules require spending in mining-affected areas. The audit found a majority of sanctioned works in district headquarters instead.",
          "Trust boards have been asked to re-map affected wards before the next sanction cycle, which will take most of a year."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Nivedita Munda",
        "h": "Jharia's underground fires burn into a second century",
        "dek": "Coalfield fires that began in 1916 are still moving. The relocation programme is now larger than the mining operation above it.",
        "body": [
          "Subsidence surveys have expanded the unsafe zone twice since 2021, each time adding settlements to the list.",
          "Families offered housing outside the field often return, because the work has not moved with them."
        ]
      },
      {
        "cat": "Business",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Amit Tirkey",
        "h": "Jamshedpur's supplier base moves up the value chain",
        "dek": "Component firms that made castings for a single steel buyer are now shipping machined assemblies to three sectors.",
        "body": [
          "The shift required tooling investment that only a handful of the older units could finance.",
          "Those that made it report margins roughly double their casting business and order books that no longer track one customer's cycle."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Rashmi Horo",
        "h": "Sohrai painting gets a geographic indication and a problem",
        "dek": "Wall painting from the Hazaribagh belt now carries a GI tag. Enforcement is proving harder than registration.",
        "body": [
          "Printed reproductions sold as handmade have appeared in three metro markets, and the registry has no field staff.",
          "Artist collectives have started issuing their own certificates, which is what the tag was supposed to make unnecessary."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "40M"
      ],
      [
        "Districts",
        "24"
      ],
      [
        "Capital",
        "Ranchi"
      ],
      [
        "Languages spoken",
        "Hindi · Santali"
      ]
    ],
    "id": "jharkhand",
    "coords": [
      83.4,
      23.95,
      83.6,
      24.2,
      83.85,
      24.35,
      84.35,
      24.55,
      84.85,
      24.7,
      85.35,
      24.85,
      85.85,
      24.95,
      86.35,
      24.9,
      86.85,
      24.75,
      87.35,
      24.65,
      87.85,
      24.6,
      87.5,
      24.15,
      87.15,
      23.75,
      86.85,
      23.3,
      86.65,
      22.85,
      86.45,
      22.4,
      86,
      22.15,
      85.5,
      22.05,
      85,
      22,
      84.55,
      22.2,
      84.2,
      22.45,
      84.35,
      22.9,
      84.05,
      23.35,
      83.75,
      23.7
    ],
    "displayName": "Jharkhand"
  },
  "bihar": {
    "name": "Bihar",
    "ep": "River country",
    "cap": "Patna",
    "a": "#9C7B2E",
    "stand": "The most densely populated state in the country, rebuilt every year by rivers that arrive from Nepal and leave through Bengal.",
    "marks": [
      [
        "Patna",
        85.14,
        25.59
      ],
      [
        "Gaya",
        85,
        24.79
      ],
      [
        "Muzaffarpur",
        85.39,
        26.12
      ]
    ],
    "motif": "river",
    "art": {
      "s": 0.55,
      "y": 0.22
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Shalini Jha",
        "h": "The Kosi's embankments hold, and the silt keeps rising",
        "dek": "A flood season without a major breach is now unusual enough to report. The riverbed inside the embankments has risen again.",
        "body": [
          "Cross-section surveys show the channel perched several metres above the surrounding fields in three reaches.",
          "Engineers describe the structure as buying time. The disagreement is about what the time is being used for."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Rajeev Ranjan",
        "h": "Makhana moves from pond to processing line",
        "dek": "Fox-nut cultivation in the Mithila belt has a GI tag, an export code and, for the first time, mechanised popping units.",
        "body": [
          "Manual popping is skilled, hot and badly paid. The machines change the labour question more than the yield question.",
          "Growers now sell graded output rather than raw nut, which has roughly doubled the share of value staying in the district."
        ]
      },
      {
        "cat": "Education",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Nutan Kumari",
        "h": "Coaching towns spread beyond Patna",
        "dek": "Test-preparation clusters have appeared in half a dozen district towns, following cheap rent and returning teachers.",
        "body": [
          "The model runs on hostel occupancy as much as tuition, which is why the buildings arrived before the faculty.",
          "Regulators have begun asking for fee transparency, prompted less by students than by the banks financing the hostels."
        ]
      },
      {
        "cat": "Politics",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Ashok Prasad",
        "h": "Panchayat finance reform reaches the third tier",
        "dek": "Untied funds now reach gram panchayats directly. The accounting capacity to spend them has not arrived at the same speed.",
        "body": [
          "Several thousand panchayats ended the year with unspent balances and an audit query rather than a road.",
          "Block-level accountants have been sanctioned. Recruitment is the step that has slipped twice."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "128M"
      ],
      [
        "Districts",
        "38"
      ],
      [
        "Capital",
        "Patna"
      ],
      [
        "Languages spoken",
        "Hindi · Urdu · Maithili"
      ]
    ],
    "id": "bihar",
    "coords": [
      83.85,
      24.35,
      84,
      24.65,
      84.1,
      25,
      83.95,
      25.35,
      84.2,
      25.7,
      84.4,
      26.05,
      84.55,
      26.4,
      84.65,
      26.75,
      85.2,
      27.1,
      85.75,
      26.9,
      86.3,
      26.7,
      86.85,
      26.55,
      87.35,
      26.4,
      87.85,
      26.45,
      88.15,
      26.55,
      88.05,
      26.15,
      87.95,
      25.75,
      87.85,
      25.35,
      87.9,
      24.95,
      87.85,
      24.6,
      87.35,
      24.65,
      86.85,
      24.75,
      86.35,
      24.9,
      85.85,
      24.95,
      85.35,
      24.85,
      84.85,
      24.7,
      84.35,
      24.55
    ],
    "displayName": "Bihar"
  },
  "west-bengal": {
    "name": "West Bengal",
    "ep": "Delta and hills",
    "cap": "Kolkata",
    "a": "#2F5E7E",
    "stand": "A delta, a coalfield and a Himalayan ridge inside one boundary, joined by a corridor twenty kilometres wide.",
    "marks": [
      [
        "Kolkata",
        88.36,
        22.57
      ],
      [
        "Siliguri",
        88.43,
        26.73
      ],
      [
        "Durgapur",
        87.32,
        23.52
      ]
    ],
    "motif": "river",
    "art": {
      "s": 0.5,
      "y": 0.28
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Ananya Ghosh",
        "h": "The Sundarbans measures its own retreat",
        "dek": "Island-by-island erosion data collected by local volunteers now covers fifteen years, and it is more granular than the official series.",
        "body": [
          "Four inhabited islands have lost more than a fifth of their area in that period, mostly on the seaward faces.",
          "Embankment repair follows a schedule set in Kolkata. The volunteers' maps show where the next breach is likely, and rarely match it."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Sourav Dutta",
        "h": "Kolkata's leather cluster clears its effluent backlog",
        "dek": "Common treatment capacity at Bantala has been expanded after a decade of notices. Tanneries are being metered individually for the first time.",
        "body": [
          "Metering has already changed behaviour: water use per hide has fallen because it now appears on a bill.",
          "The cluster's export buyers have started asking for the discharge data directly, which is a faster enforcement mechanism than the notices were."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Piyali Sen",
        "h": "Durga Puja's heritage listing changes the commissioning season",
        "dek": "UNESCO recognition has professionalised the pandal economy. Artists now sign contracts in February for work delivered in October.",
        "body": [
          "Budgets for the largest pujas have risen faster than the fees paid to the people who build them, which is now a public argument.",
          "A collective of art directors published a rate card this year. Roughly a third of the big committees have adopted it."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Tanmoy Roy",
        "h": "The Siliguri corridor gets a second road",
        "dek": "Everything moving between the Northeast and the rest of the country passes through a narrow neck. A parallel alignment is finally under construction.",
        "body": [
          "The existing highway carries freight, tourism and military traffic on the same two lanes through a town centre.",
          "The new alignment bypasses the town, which the town's traders have opposed for eleven years and have now stopped opposing."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "100M"
      ],
      [
        "Districts",
        "23"
      ],
      [
        "Capital",
        "Kolkata"
      ],
      [
        "Languages spoken",
        "Bengali · Hindi · Nepali"
      ]
    ],
    "id": "west-bengal",
    "coords": [
      88.15,
      26.55,
      88.05,
      26.8,
      88.1,
      27.05,
      88.15,
      27.15,
      88.5,
      27.3,
      88.85,
      27.1,
      89.15,
      26.85,
      89.45,
      26.78,
      89.85,
      26.7,
      89.95,
      26.4,
      89.9,
      26.05,
      89.8,
      25.95,
      89.35,
      26,
      88.95,
      26.15,
      88.65,
      26.3,
      88.42,
      26.55,
      88.25,
      26.35,
      88.32,
      25.95,
      88.42,
      25.55,
      88.2,
      25.15,
      88.35,
      24.75,
      88.15,
      24.4,
      88.35,
      24,
      88.75,
      23.6,
      88.62,
      23.15,
      88.85,
      22.75,
      89,
      22.4,
      89.05,
      22.1,
      88.85,
      21.75,
      88.55,
      21.65,
      88.3,
      21.55,
      88,
      21.65,
      87.7,
      21.6,
      87.35,
      21.55,
      87.05,
      21.9,
      86.75,
      22.15,
      86.45,
      22.4,
      86.65,
      22.85,
      86.85,
      23.3,
      87.15,
      23.75,
      87.5,
      24.15,
      87.85,
      24.6,
      87.9,
      24.95,
      87.85,
      25.35,
      87.95,
      25.75,
      88.05,
      26.15
    ],
    "displayName": "West Bengal"
  },
  "sikkim": {
    "name": "Sikkim",
    "ep": "The ridge",
    "cap": "Gangtok",
    "a": "#5B8F7A",
    "stand": "The smallest state by population, entirely organic by law, and the country's cleanest experiment in what a mountain economy can be.",
    "marks": [
      [
        "Gangtok",
        88.61,
        27.33
      ],
      [
        "Namchi",
        88.35,
        27.17
      ],
      [
        "Pelling",
        88.24,
        27.3
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.58,
      "y": 0.12
    },
    "stories": [
      {
        "cat": "Agriculture",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Pema Lepcha",
        "h": "A decade on, the organic mandate counts its costs",
        "dek": "Sikkim banned chemical inputs in 2016. Yields fell, premiums arrived late, and the policy survived both.",
        "body": [
          "Large cardamom and ginger now command certified prices that make the arithmetic work for export crops.",
          "Cereal growers, who have no premium market, carried the yield loss without compensation and remain the policy's weakest point."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Karma Bhutia",
        "h": "Glacial lake monitoring expands after South Lhonak",
        "dek": "The 2023 outburst flood destroyed a dam and rewrote the hazard register. Twelve more lakes are now instrumented.",
        "body": [
          "Early-warning sirens have been installed in four valley settlements, with drills run twice a year.",
          "The harder question is what the warning time actually is, and the honest answers are measured in minutes."
        ]
      },
      {
        "cat": "Tourism",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Dechen Subba",
        "h": "Homestays overtake hotels in registered beds",
        "dek": "Village homestay registration has grown fast enough that the state now has more family-run beds than commercial ones.",
        "body": [
          "The licensing regime was deliberately light, which produced the growth and also the inconsistency.",
          "A grading scheme introduced this year is voluntary, and roughly half the registered homestays have signed up."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Sonam Gyatso",
        "h": "Lepcha language teaching returns to primary school",
        "dek": "A curriculum built with community elders is now taught in state schools in four subdivisions.",
        "body": [
          "The script had fewer than a thousand fluent readers by most estimates when the project began.",
          "Teacher supply is the constraint, and the first cohort trained specifically for it graduates next year."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "0.7M"
      ],
      [
        "Districts",
        "6"
      ],
      [
        "Capital",
        "Gangtok"
      ],
      [
        "Languages spoken",
        "Nepali · Sikkimese · English"
      ]
    ],
    "id": "sikkim",
    "coords": [
      88.85,
      27.1,
      88.92,
      27.45,
      88.75,
      27.85,
      88.5,
      28.1,
      88.15,
      27.95,
      88.05,
      27.55,
      88.15,
      27.15,
      88.5,
      27.3
    ],
    "displayName": "Sikkim"
  },
  "assam": {
    "name": "Assam",
    "ep": "The Brahmaputra",
    "cap": "Dispur",
    "a": "#4A7A4A",
    "stand": "A valley built by one river, carrying half the country's tea and most of its arguments about who belongs where.",
    "marks": [
      [
        "Guwahati",
        91.74,
        26.14
      ],
      [
        "Dibrugarh",
        94.9,
        27.47
      ],
      [
        "Silchar",
        92.8,
        24.83
      ]
    ],
    "motif": "river",
    "art": {
      "s": 0.42,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Bornali Saikia",
        "h": "Brahmaputra erosion swallows another eight villages",
        "dek": "Bank erosion, not flooding, is the river's most permanent damage. The land it takes is not returned when the water drops.",
        "body": [
          "Satellite comparison shows the channel widening in five reaches, with char islands forming and dissolving on a yearly cycle.",
          "Compensation rules cover flood loss and not erosion loss, which is a distinction the affected districts have been contesting for years."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Pranab Gogoi",
        "h": "Tea gardens face a wage bill and a weather bill at once",
        "dek": "A revised daily wage for garden workers arrives in a season when the second flush was short and the auction price soft.",
        "body": [
          "Smallholder growers, who now supply a majority of the state's leaf, are outside the wage agreement and undercutting it.",
          "The bought-leaf factories in between are where the pressure is landing, and several have cut collection days."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Rituparna Das",
        "h": "Majuli's satras document themselves",
        "dek": "Monastic institutions on the river island have begun digitising manuscripts and mask-making techniques as the island shrinks.",
        "body": [
          "Four satras have relocated in living memory. The archives have moved with them, sometimes twice.",
          "The project has produced the first complete inventory of what the island's institutions actually hold."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Hiren Barua",
        "h": "River transport returns to the Brahmaputra, slowly",
        "dek": "Cargo terminals at Pandu and Jogighopa have reopened to scheduled barge traffic after a long gap.",
        "body": [
          "Dredging cost and seasonal draft remain the reason most shippers still use the road.",
          "For heavy, non-urgent cargo the economics now work, which is a narrower use case than the terminals were built for."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "36M"
      ],
      [
        "Districts",
        "35"
      ],
      [
        "Capital",
        "Dispur"
      ],
      [
        "Languages spoken",
        "Assamese · Bengali · Bodo"
      ]
    ],
    "id": "assam",
    "coords": [
      89.85,
      26.7,
      90.2,
      26.75,
      90.7,
      26.75,
      91.2,
      26.8,
      91.7,
      26.8,
      92.2,
      26.85,
      92.7,
      26.9,
      93.2,
      26.95,
      93.7,
      27.1,
      94.2,
      27.35,
      94.7,
      27.45,
      95.2,
      27.55,
      95.7,
      27.7,
      96.15,
      27.55,
      95.8,
      27.25,
      95.45,
      27,
      95.05,
      26.8,
      94.75,
      26.55,
      94.45,
      26.3,
      94.2,
      26,
      93.9,
      25.7,
      93.55,
      25.45,
      93.4,
      25.15,
      93.2,
      24.85,
      93,
      24.5,
      92.65,
      24.35,
      92.3,
      24.2,
      92.25,
      24.35,
      92.15,
      24.5,
      92.25,
      24.7,
      92.45,
      24.9,
      92.5,
      25.1,
      92.6,
      25.55,
      92.3,
      25.9,
      91.85,
      26.05,
      91.35,
      26.05,
      90.85,
      25.95,
      90.35,
      25.8,
      89.9,
      25.55,
      89.85,
      25.75,
      89.8,
      25.95,
      89.9,
      26.05,
      89.95,
      26.4
    ],
    "displayName": "Assam"
  },
  "meghalaya": {
    "name": "Meghalaya",
    "ep": "Cloud plateau",
    "cap": "Shillong",
    "a": "#4E8070",
    "stand": "A plateau that receives more rain than almost anywhere on earth and spends the dry months looking for water.",
    "marks": [
      [
        "Shillong",
        91.88,
        25.57
      ],
      [
        "Tura",
        90.22,
        25.51
      ],
      [
        "Cherrapunji",
        91.72,
        25.3
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.55,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Wanda Kharkongor",
        "h": "The wettest place on earth runs dry in March",
        "dek": "Sohra receives eleven metres of rain a year and pipes drinking water in during the dry season. The plateau does not hold what falls on it.",
        "body": [
          "Deforestation and quarrying have reduced infiltration on the catchment slopes, and the springs that villages relied on are failing earlier.",
          "Spring-shed mapping now covers sixty catchments, and the restoration work is being done by the village councils that own the land."
        ]
      },
      {
        "cat": "Culture",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Banri Syiem",
        "h": "Living root bridges enter a conservation register",
        "dek": "Bridges grown from fig roots over decades are being mapped and their maintenance traditions recorded before the knowledge thins.",
        "body": [
          "More than a hundred structures have been documented, with growth histories taken from the families who tend them.",
          "Visitor pressure at the best-known ones has already required rebuilding of approach paths, which is not a traditional problem."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Donald Marak",
        "h": "Coal's shadow economy meets a new regulatory frame",
        "dek": "Scientific mining licences have been issued after a long ban on rat-hole extraction. Compliance is being tested rather than assumed.",
        "body": [
          "Legal output remains a fraction of what the ban was meant to replace.",
          "District administrations report that transport checkpoints, not mine inspections, are doing most of the enforcement."
        ]
      },
      {
        "cat": "Politics",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Ibansuk Lyngdoh",
        "h": "Traditional councils and elected councils share a district",
        "dek": "Dorbar shnong and autonomous district councils hold overlapping authority over land. A new land-records project is forcing the question.",
        "body": [
          "Registering community land in a state register alters what community ownership means, which is the objection.",
          "A pilot in two blocks has proceeded with council consent and a clause that keeps titles collective."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "3.4M"
      ],
      [
        "Districts",
        "12"
      ],
      [
        "Capital",
        "Shillong"
      ],
      [
        "Languages spoken",
        "English · Khasi · Garo"
      ]
    ],
    "id": "meghalaya",
    "coords": [
      89.9,
      25.55,
      90.35,
      25.8,
      90.85,
      25.95,
      91.35,
      26.05,
      91.85,
      26.05,
      92.3,
      25.9,
      92.6,
      25.55,
      92.5,
      25.1,
      92.45,
      24.9,
      92.1,
      24.95,
      91.65,
      25.1,
      91.2,
      25.1,
      90.75,
      25.15,
      90.3,
      25.2
    ],
    "displayName": "Meghalaya"
  },
  "arunachal-pradesh": {
    "name": "Arunachal Pradesh",
    "ep": "First light",
    "cap": "Itanagar",
    "a": "#3E6E5E",
    "stand": "The first place in the country to see the sun, with more languages than districts and roads arriving in both.",
    "marks": [
      [
        "Itanagar",
        93.61,
        27.1
      ],
      [
        "Tawang",
        91.86,
        27.59
      ],
      [
        "Pasighat",
        95.33,
        28.07
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.5,
      "y": 0.05
    },
    "stories": [
      {
        "cat": "Infrastructure",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Tage Nada",
        "h": "The frontier highway reaches its hardest stretch",
        "dek": "A road along the northern districts has been under construction for a decade. The remaining sections are the ones that justify it.",
        "body": [
          "Each kilometre through the eastern gorges costs several times the national average and takes two working seasons.",
          "Villages along the alignment have gained day-long access to district headquarters, and lost the isolation that kept their forests intact."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Yapi Riba",
        "h": "Hydropower's cumulative impact gets one assessment",
        "dek": "Dozens of projects have been cleared on the Siang and its tributaries individually. A basin-level study is finally under way.",
        "body": [
          "Downstream communities in Assam have pressed for it longer than the state's own districts have.",
          "The study's terms of reference include sediment transport, which previous project-level clearances largely did not."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Moji Riba",
        "h": "Twenty-six tribes, one orthography problem",
        "dek": "Languages without a settled script are being written down, and the choice of script has become a political question.",
        "body": [
          "Roman, Devanagari and Tai-derived options are all in use, sometimes for the same language in neighbouring villages.",
          "A state language board has stopped trying to standardise and started funding whichever version a community documents."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Techi Anu",
        "h": "Kiwi and large cardamom find a buyer beyond the state",
        "dek": "Horticulture from the western districts now reaches metro markets by air cargo out of a small airport that opened in 2022.",
        "body": [
          "The volumes are trivial nationally and transformative locally.",
          "The constraint is cold storage at the airstrip, which currently fits about a fifth of a day's harvest."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "1.6M"
      ],
      [
        "Districts",
        "25"
      ],
      [
        "Capital",
        "Itanagar"
      ],
      [
        "Languages spoken",
        "English · Nyishi · Adi"
      ]
    ],
    "id": "arunachal-pradesh",
    "coords": [
      91.7,
      26.8,
      91.65,
      27.2,
      91.9,
      27.65,
      92.3,
      27.9,
      92.75,
      28.2,
      93.2,
      28.5,
      93.7,
      28.75,
      94.2,
      29.05,
      94.7,
      29.3,
      95.25,
      29.15,
      95.75,
      29.05,
      96.25,
      29.2,
      96.75,
      28.75,
      97.15,
      28.35,
      97.4,
      28,
      97,
      27.55,
      96.55,
      27.2,
      96.05,
      26.95,
      95.55,
      26.85,
      95.05,
      26.8,
      95.45,
      27,
      95.8,
      27.25,
      96.15,
      27.55,
      95.7,
      27.7,
      95.2,
      27.55,
      94.7,
      27.45,
      94.2,
      27.35,
      93.7,
      27.1,
      93.2,
      26.95,
      92.7,
      26.9,
      92.2,
      26.85
    ],
    "displayName": "Arunachal Pradesh"
  },
  "nagaland": {
    "name": "Nagaland",
    "ep": "The hills",
    "cap": "Kohima",
    "a": "#6A8F5E",
    "stand": "Sixteen recognised tribes, a festival that carries the tourism calendar, and a peace process older than most of the people waiting on it.",
    "marks": [
      [
        "Kohima",
        94.11,
        25.67
      ],
      [
        "Dimapur",
        93.73,
        25.91
      ],
      [
        "Mokokchung",
        94.52,
        26.32
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.5,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Politics",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Along Jamir",
        "h": "The framework agreement's unresolved clauses, in public",
        "dek": "Nearly a decade after it was signed, the terms of the Naga political agreement are still being disputed in summary form.",
        "body": [
          "The unresolved items are a separate flag and constitution, and neither side has moved publicly.",
          "Tribal hohos have begun issuing their own statements, which had not happened in the earlier rounds."
        ]
      },
      {
        "cat": "Culture",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Vikuolie Rutsa",
        "h": "Hornbill Festival tries to be less of a single week",
        "dek": "The December festival carries a disproportionate share of the state's visitor economy. Organisers are trying to spread it.",
        "body": [
          "Village-level events through the year are being funded to build capacity that does not evaporate in January.",
          "The risk, which the organisers acknowledge, is diluting the one event everyone already knows about."
        ]
      },
      {
        "cat": "Agriculture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Imlisanen Ao",
        "h": "Jhum cycles shorten and the fallow science catches up",
        "dek": "Shifting cultivation fallows that once ran twelve years now run five. Soil studies are measuring what that costs.",
        "body": [
          "Yields in the second cropping year have fallen measurably where the cycle is shortest.",
          "Alder-based systems that fix nitrogen during fallow are being revived in two districts, on land that never abandoned them."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Kevi Zhimomi",
        "h": "Dimapur becomes the Northeast's quiet freight node",
        "dek": "The state's only rail head handles cargo for three states. Its capacity has become everyone's problem.",
        "body": [
          "Warehousing has grown around it faster than the road that serves it.",
          "A second goods yard has been sanctioned, and the land for it is under acquisition."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "2.2M"
      ],
      [
        "Districts",
        "16"
      ],
      [
        "Capital",
        "Kohima"
      ],
      [
        "Languages spoken",
        "English · Naga languages"
      ]
    ],
    "id": "nagaland",
    "coords": [
      95.05,
      26.8,
      94.75,
      26.55,
      94.45,
      26.3,
      94.2,
      26,
      93.9,
      25.7,
      93.55,
      25.45,
      93.85,
      25.35,
      94.2,
      25.3,
      94.5,
      25.2,
      94.7,
      25.45,
      94.95,
      25.75,
      95.15,
      26.1,
      95.25,
      26.5
    ],
    "displayName": "Nagaland"
  },
  "manipur": {
    "name": "Manipur",
    "ep": "The valley",
    "cap": "Imphal",
    "a": "#8A6E4A",
    "stand": "A valley ringed by hills, where almost every question about land, jobs and representation is also a question about which of the two you live in.",
    "marks": [
      [
        "Imphal",
        93.94,
        24.82
      ],
      [
        "Churachandpur",
        93.68,
        24.33
      ],
      [
        "Ukhrul",
        94.36,
        25.1
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.55,
      "y": 0.12
    },
    "stories": [
      {
        "cat": "Politics",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Thoibi Devi",
        "h": "Relief camps enter a second year and a third budget",
        "dek": "Displacement across the valley and hills has outlasted the emergency framing. Camp administration is now a standing line item.",
        "body": [
          "Schooling for camp children has been the hardest service to restore, and the least reported.",
          "Civil society groups on both sides have begun meeting on logistics, which is the only agenda anyone has agreed to."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Ningthem Singh",
        "h": "Loktak's fishing communities and the hydro reservoir",
        "dek": "Water levels held for power generation determine what the lake's phumdi islands do, and therefore what can be fished.",
        "body": [
          "A management authority has been asked to publish its drawdown schedule in advance, which it has begun doing.",
          "Fishing households report that predictability matters more to them than the level itself."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Sanatombi Chanu",
        "h": "Manipuri dance schools reopen on a shorter calendar",
        "dek": "Institutions that teach Ras Leela and Thang-Ta have resumed teaching with reduced cohorts and outside funding.",
        "body": [
          "Several senior gurus have been teaching remotely to students who have not returned to the valley.",
          "The repertoire being taught has narrowed to what can be learned without a full ensemble."
        ]
      },
      {
        "cat": "Environment",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Kaka Shimray",
        "h": "Hill terracing gets a state subsidy",
        "dek": "Terrace construction in the hill districts is being supported as erosion control rather than as agriculture.",
        "body": [
          "The distinction matters because it opens a different funding window with fewer land-title requirements.",
          "Uptake has been fastest in villages that already had community labour arrangements for the work."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "3.2M"
      ],
      [
        "Districts",
        "16"
      ],
      [
        "Capital",
        "Imphal"
      ],
      [
        "Languages spoken",
        "Meitei · English"
      ]
    ],
    "id": "manipur",
    "coords": [
      93.55,
      25.45,
      93.85,
      25.35,
      94.2,
      25.3,
      94.5,
      25.2,
      94.7,
      24.9,
      94.6,
      24.55,
      94.35,
      24.2,
      94.1,
      23.9,
      93.7,
      23.95,
      93.35,
      24.05,
      93.25,
      24.3,
      93,
      24.5,
      93.2,
      24.85,
      93.4,
      25.15
    ],
    "displayName": "Manipur"
  },
  "mizoram": {
    "name": "Mizoram",
    "ep": "Ridge villages",
    "cap": "Aizawl",
    "a": "#5E7F8A",
    "stand": "Ridge-top villages, near-universal literacy, and a border that runs through families on both sides of it.",
    "marks": [
      [
        "Aizawl",
        92.72,
        23.73
      ],
      [
        "Lunglei",
        92.73,
        22.88
      ],
      [
        "Champhai",
        93.33,
        23.47
      ]
    ],
    "motif": "peaks",
    "art": {
      "s": 0.5,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Politics",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Lalrinpuii Sailo",
        "h": "Cross-border kinship meets a fenced frontier",
        "dek": "Free movement along the Myanmar border has been restricted. Families and markets that spanned it are adjusting badly.",
        "body": [
          "The state government has asked for a permit regime rather than a fence, citing shared clan territory.",
          "Trade at the Zokhawthar crossing has fallen sharply, and informal routes have not fully replaced it."
        ]
      },
      {
        "cat": "Agriculture",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Vanlalruata Chhangte",
        "h": "Bamboo flowering's fifty-year clock starts again",
        "dek": "The gregarious flowering that triggers rodent booms and famine is due within the decade. Preparation has started early this time.",
        "body": [
          "Bamboo-based industry is being expanded specifically to consume the culms before they die back.",
          "Historical records of the 1959 and 2006 events are being used to model where the flowering front will move first."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Zothanpuii Ralte",
        "h": "The Kaladan corridor waits on the far bank",
        "dek": "A multimodal route meant to reach the sea through Myanmar is complete on the Indian side and stalled beyond it.",
        "body": [
          "Road capacity built in anticipation now carries local traffic only.",
          "Planners have begun describing the corridor as a long-term asset, which is a change in tense."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Lalhmangaihi Pachuau",
        "h": "Church choirs become the state's music infrastructure",
        "dek": "Congregational singing has produced a recording and arranging scene with no commercial label behind it.",
        "body": [
          "Choir competitions now draw entries from more than four hundred congregations.",
          "The arrangers involved have started writing for secular ensembles, which the churches have taken calmly."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "1.2M"
      ],
      [
        "Districts",
        "11"
      ],
      [
        "Capital",
        "Aizawl"
      ],
      [
        "Languages spoken",
        "Mizo · English"
      ]
    ],
    "id": "mizoram",
    "coords": [
      93,
      24.5,
      93.25,
      24.3,
      93.35,
      24.05,
      93.3,
      23.6,
      93.15,
      23.15,
      92.95,
      22.7,
      92.75,
      22.25,
      92.6,
      21.95,
      92.4,
      22.35,
      92.25,
      22.8,
      92.15,
      23.15,
      91.95,
      23.2,
      92.15,
      23.55,
      92.25,
      23.9,
      92.3,
      24.2,
      92.65,
      24.35
    ],
    "displayName": "Mizoram"
  },
  "tripura": {
    "name": "Tripura",
    "ep": "Border country",
    "cap": "Agartala",
    "a": "#A0674A",
    "stand": "Surrounded on three sides by another country, closer to Chittagong port than to its own rail head until recently.",
    "marks": [
      [
        "Agartala",
        91.28,
        23.83
      ],
      [
        "Udaipur",
        91.49,
        23.53
      ],
      [
        "Kailashahar",
        92.01,
        24.32
      ]
    ],
    "motif": "river",
    "art": {
      "s": 0.55,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Infrastructure",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Sujit Debbarma",
        "h": "The Agartala–Akhaura link changes the freight map",
        "dek": "A short cross-border rail connection puts Tripura within a few hours of a seaport that was always nearby and unreachable.",
        "body": [
          "Cargo that travelled sixteen hundred kilometres through the Siliguri corridor can now travel a fraction of that.",
          "Volumes remain small because the customs infrastructure on both sides is sized for passengers."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Ratna Sarkar",
        "h": "Rubber plantations mature into a processing question",
        "dek": "Tripura is the country's second-largest natural rubber producer. Nearly all of it leaves the state unprocessed.",
        "body": [
          "Two crumb-rubber units have been commissioned, which would absorb roughly a fifth of output.",
          "Growers' societies want a price-sharing formula before committing supply, and negotiations are in their third round."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Bikash Jamatia",
        "h": "Bamboo craft moves from handicraft to building material",
        "dek": "Treated bamboo from the state is being specified in construction rather than sold as souvenirs.",
        "body": [
          "A treatment plant near Agartala now certifies culms to a structural standard.",
          "Architects in three metros have specified it, which has done more for volumes than a decade of craft fairs."
        ]
      },
      {
        "cat": "Environment",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Priyanka Reang",
        "h": "The state maps its own water bodies",
        "dek": "A survey of tanks and ponds has found several thousand more than the revenue records show, many of them silted.",
        "body": [
          "Restoration is being run through village committees with a maintenance clause attached to the grant.",
          "Fish yields are the metric being used, because they are the one the committees already track."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "4.2M"
      ],
      [
        "Districts",
        "8"
      ],
      [
        "Capital",
        "Agartala"
      ],
      [
        "Languages spoken",
        "Bengali · Kokborok · English"
      ]
    ],
    "id": "tripura",
    "coords": [
      92.3,
      24.2,
      92.25,
      23.9,
      92.15,
      23.55,
      91.95,
      23.2,
      91.65,
      23,
      91.4,
      22.98,
      91.2,
      23.25,
      91.1,
      23.6,
      91.25,
      23.95,
      91.4,
      24.15,
      91.7,
      24.35,
      92,
      24.45,
      92.15,
      24.5,
      92.25,
      24.35
    ],
    "displayName": "Tripura"
  },
  "odisha": {
    "name": "Odisha",
    "ep": "Temple coast",
    "cap": "Bhubaneswar",
    "a": "#2E6F6B",
    "stand": "Five hundred kilometres of cyclone-exposed coast and the best-drilled evacuation system in the country, built out of one bad night in 1999.",
    "marks": [
      [
        "Bhubaneswar",
        85.82,
        20.27
      ],
      [
        "Rourkela",
        84.85,
        22.25
      ],
      [
        "Puri",
        85.83,
        19.81
      ]
    ],
    "motif": "temple",
    "art": {
      "s": 0.55,
      "y": 0.2
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Sasmita Behera",
        "h": "Cyclone shelters become year-round buildings",
        "dek": "Multipurpose shelters built after 1999 sat empty between storms. Districts have started using them as schools and clinics.",
        "body": [
          "Occupancy keeps the buildings maintained, which is the failure mode single-use shelters always had.",
          "The evacuation protocol has not changed. What has changed is that people know the route to a building they already use."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Pradeep Mohanty",
        "h": "Bauxite royalties and the district that produces them",
        "dek": "Odisha mines a large share of the country's bauxite and alumina. The revenue flows upward faster than the infrastructure flows back.",
        "body": [
          "District mineral funds hold significant balances in Koraput and Rayagada, spent mostly on health and road works.",
          "Community consent processes for new leases have become the binding constraint, and both sides now prepare for them years ahead."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Lipsa Panda",
        "h": "Pattachitra painters register their own designs",
        "dek": "Artists in Raghurajpur have begun filing design registrations individually rather than relying on a village GI tag.",
        "body": [
          "Mass-printed reproductions had made the collective tag hard to enforce.",
          "Individual registration is expensive and slow, and a cooperative is now filing on members' behalf in batches."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Bibhu Nayak",
        "h": "Paradip's port expansion tests the coastline",
        "dek": "Deeper berths mean more dredging, and more dredging means moving sediment that the coast south of the port depends on.",
        "body": [
          "Shoreline change studies commissioned by the port itself show accretion north and erosion south.",
          "Sand bypassing has been proposed and costed. It has not been funded."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "47M"
      ],
      [
        "Districts",
        "30"
      ],
      [
        "Capital",
        "Bhubaneswar"
      ],
      [
        "Languages spoken",
        "Odia · English"
      ]
    ],
    "id": "odisha",
    "coords": [
      86.45,
      22.4,
      86.75,
      22.15,
      87.05,
      21.9,
      87.35,
      21.55,
      87,
      21.25,
      86.75,
      20.85,
      86.55,
      20.55,
      86.85,
      20.25,
      86.5,
      19.95,
      86.1,
      19.7,
      85.7,
      19.55,
      85.3,
      19.45,
      84.95,
      19.35,
      84.75,
      19.1,
      84.25,
      19.05,
      83.85,
      18.85,
      83.5,
      18.6,
      83.1,
      18.55,
      82.75,
      18.5,
      82.35,
      18.4,
      81.8,
      18.35,
      81.95,
      18.95,
      82.2,
      19.4,
      82.45,
      19.85,
      82.7,
      20.3,
      82.9,
      20.8,
      83.2,
      21.25,
      83.55,
      21.7,
      83.85,
      22.1,
      84.2,
      22.45,
      84.55,
      22.2,
      85,
      22,
      85.5,
      22.05,
      86,
      22.15
    ],
    "displayName": "Odisha"
  },
  "maharashtra": {
    "name": "Maharashtra",
    "ep": "Deccan and sea",
    "cap": "Mumbai",
    "a": "#A6322E",
    "stand": "India's largest economy, its loudest stock exchange and its most crowded local train, held together by a state that begins at the Arabian Sea and ends in the cotton fields of Vidarbha.",
    "marks": [
      [
        "Mumbai",
        72.88,
        19.08
      ],
      [
        "Pune",
        73.86,
        18.52
      ],
      [
        "Nashik",
        73.79,
        20
      ],
      [
        "Nagpur",
        79.09,
        21.15
      ],
      [
        "Kolhapur",
        74.24,
        16.7
      ]
    ],
    "motif": "gateway",
    "art": {
      "s": 0.5,
      "y": -0.08
    },
    "stories": [
      {
        "cat": "Business",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Farah Dalal",
        "h": "Mumbai's financial district plans its next skyline",
        "dek": "With the eastern waterfront opening up, the city is deciding whether its next cluster of towers goes to finance, to housing, or to the port workers who were promised both.",
        "body": [
          "Two hundred and sixty hectares of dock land is the largest single parcel the island city has released in a century. Every proposal so far assumes offices at the centre and housing at the edge.",
          "Unions representing port labour have asked for the reverse, and for the first time they have a seat on the planning committee that decides."
        ]
      },
      {
        "cat": "Cities",
        "date": "20 Sep",
        "read": "5 min",
        "by": "Nikhil Salgaonkar",
        "h": "Pune's mobility experiment moves from pilot to policy",
        "dek": "Three years of bus lanes, signal priority and a flat fare have produced a measurable thing: the first year since 2011 in which private-vehicle registrations fell.",
        "body": [
          "The corridor along Nagar Road carries more people per hour than the six general lanes beside it. That statistic is now printed on the buses themselves.",
          "Scaling it means taking road space in neighbourhoods that have not yet had the argument, which is where the pilot's political goodwill will actually be tested."
        ]
      },
      {
        "cat": "Technology",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Priya Kulkarni",
        "h": "Nagpur becomes an unlikely testbed for cargo autonomy",
        "dek": "Sitting at the intersection of two national corridors, the city has quietly become the place where freight software gets driven for ten thousand kilometres before anyone sees it.",
        "body": [
          "The appeal is geography and boredom: long straight highway, predictable weather, a freight terminal that does not mind an odd fleet.",
          "Drivers in the test convoys are not being replaced, and their union negotiated that clause first. What the systems are learning to do is the last hour of a fourteen-hour shift."
        ]
      },
      {
        "cat": "Culture",
        "date": "19 Sep",
        "read": "8 min",
        "by": "Aditi Rane",
        "h": "The Western Ghats' monsoon festivals find a new audience",
        "dek": "Village performance calendars that once emptied in June are now the peak season, and the hill roads are carrying more visitors than the water systems were built for.",
        "body": [
          "Four districts have started issuing weekend permits for the most-visited valleys. The revenue is small; the point is the count.",
          "Performers describe the change carefully. The audience has never been bigger and has never known less about what it is watching."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "7 min",
        "by": "Zain Merchant",
        "h": "Coastal road, reclaimed edge: the city argues with the sea",
        "dek": "The southern stretch has cut a forty-minute commute to twelve. Oceanographers are still publishing on what the reclamation did to the sediment that fed the beaches north of it.",
        "body": [
          "Traffic counts have met projections. Fishing communities at Worli report the loss of a landing beach that no environmental clearance accounted for.",
          "The next phase will be built under a revised coastal-zone rule that the city itself asked for, after losing the first round in court."
        ]
      },
      {
        "cat": "Politics",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Sameer Deshpande",
        "h": "Municipal reform returns to the floor in Nagpur's winter session",
        "dek": "A bill to give large municipal corporations their own revenue powers has been drafted four times in nine years. This version arrives with the finance department's signature on it.",
        "body": [
          "Cities currently collect roughly a fifth of what they spend. The rest arrives as transfers, late, and with conditions attached.",
          "Mayors across party lines support the principle. The disagreement, as always, is over which tax the state gives up first."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "126M"
      ],
      [
        "Districts",
        "36"
      ],
      [
        "Capital",
        "Mumbai"
      ],
      [
        "Languages spoken",
        "Marathi · Hindi"
      ]
    ],
    "id": "maharashtra",
    "coords": [
      72.8,
      20.15,
      73.15,
      20.35,
      73.5,
      20.7,
      73.75,
      21.05,
      74.05,
      21.5,
      74.5,
      21.65,
      75,
      21.75,
      75.5,
      21.65,
      76,
      21.5,
      76.5,
      21.45,
      77,
      21.4,
      77.5,
      21.45,
      78,
      21.4,
      78.5,
      21.45,
      79,
      21.4,
      79.5,
      21.35,
      80,
      21.35,
      80.55,
      21.45,
      80.45,
      20.85,
      80.4,
      20.3,
      80.3,
      19.8,
      80.4,
      19.3,
      80.3,
      18.85,
      79.9,
      19.1,
      79.45,
      19.35,
      79,
      19.55,
      78.55,
      19.45,
      78.1,
      19.25,
      77.75,
      19,
      77.5,
      18.65,
      77.1,
      18.3,
      76.7,
      18,
      76.25,
      17.75,
      75.8,
      17.55,
      75.35,
      17.3,
      74.95,
      17,
      74.65,
      16.65,
      74.45,
      16.25,
      74.3,
      15.78,
      73.95,
      15.72,
      73.7,
      15.72,
      73.55,
      16.05,
      73.4,
      16.4,
      73.3,
      16.8,
      73.25,
      17.2,
      73.15,
      17.6,
      72.95,
      18,
      72.85,
      18.45,
      72.8,
      18.9,
      72.7,
      19.25,
      72.75,
      19.7
    ],
    "displayName": "Maharashtra"
  },
  "goa": {
    "name": "Goa",
    "ep": "The small coast",
    "cap": "Panaji",
    "a": "#C08A4A",
    "stand": "Two districts, a hundred kilometres of coast and a resident population outnumbered several times over by its visitors.",
    "marks": [
      [
        "Panaji",
        73.83,
        15.49
      ],
      [
        "Margao",
        73.96,
        15.28
      ],
      [
        "Ponda",
        74.01,
        15.4
      ]
    ],
    "motif": "coast",
    "art": {
      "s": 0.62,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Rhea Fernandes",
        "h": "Khazan fields, the tidal farming the state forgot",
        "dek": "Centuries-old sluice systems that let farmers work saline floodplain are failing where their community management has lapsed.",
        "body": [
          "Roughly a third of the khazan area is now waterlogged or abandoned, which also removes a flood buffer.",
          "A restoration programme has been funded, and the difficult part is reconstituting the village bodies that operated the gates."
        ]
      },
      {
        "cat": "Tourism",
        "date": "19 Sep",
        "read": "5 min",
        "by": "Dinesh Naik",
        "h": "Beach shack licences move to a longer cycle",
        "dek": "Annual licensing kept shack operators from investing in anything that could not be dismantled. A five-year term changes that calculus.",
        "body": [
          "Waste handling and toilet provision have been written into the longer licence as conditions.",
          "Operators who have held the same stretch for decades welcomed it. New entrants find the barrier higher."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Savio D'Souza",
        "h": "Mining's long pause reshapes the interior",
        "dek": "Iron ore extraction has been suspended for most of a decade. The talukas that lived on it have found partial replacements.",
        "body": [
          "Truck fleets financed on ore haulage were the first casualty and have largely been absorbed into construction.",
          "Auctions for fresh leases are proceeding, and the villages nearest the pits are no longer uniformly in favour."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Maria Pereira",
        "h": "Konkani publishing finds a small, steady floor",
        "dek": "Books in Konkani, in both scripts, are being printed in short runs that actually sell out.",
        "body": [
          "Library procurement and school prescription account for most of it, which publishers treat as a stable base rather than a limitation.",
          "The unexpected growth has been in audio, where script choice stops mattering."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "1.6M"
      ],
      [
        "Districts",
        "2"
      ],
      [
        "Capital",
        "Panaji"
      ],
      [
        "Languages spoken",
        "Konkani · Marathi · English"
      ]
    ],
    "id": "goa",
    "coords": [
      73.7,
      15.72,
      73.95,
      15.72,
      74.3,
      15.78,
      74.25,
      15.4,
      74.05,
      15.05,
      73.92,
      14.9,
      73.85,
      15.15,
      73.75,
      15.45
    ],
    "displayName": "Goa"
  },
  "karnataka": {
    "name": "Karnataka",
    "ep": "Plateau and shore",
    "cap": "Bengaluru",
    "a": "#B4603F",
    "stand": "The country's software balance sheet, its second-driest farmland and a coastline in between, all reporting to one capital that cannot be reached at rush hour.",
    "marks": [
      [
        "Bengaluru",
        77.59,
        12.97
      ],
      [
        "Mysuru",
        76.64,
        12.3
      ],
      [
        "Hubballi",
        75.12,
        15.36
      ]
    ],
    "motif": "fort",
    "art": {
      "s": 0.58,
      "y": 0.18
    },
    "stories": [
      {
        "cat": "Technology",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Divya Rao",
        "h": "Bengaluru's firms start hiring in the second-tier cities",
        "dek": "Rent, commute and attrition have pushed a meaningful share of new technology hiring to Mysuru, Hubballi and Mangaluru.",
        "body": [
          "The offices are small, deliberately, and staffed by people who did not want to move to the capital.",
          "Retention in these centres runs well above the Bengaluru average, which is the number finance directors have noticed."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Ravi Kulkarni",
        "h": "Bengaluru's lakes are rehabilitated one catchment at a time",
        "dek": "Restoring a lake without fixing its inflow produces a clean tank that fills with sewage. Several projects have now been sequenced properly.",
        "body": [
          "Catchment-first restoration takes roughly three times as long and costs less to maintain afterwards.",
          "Citizen groups hold the monitoring data, and in two cases have used it to stop a handover to a developer."
        ]
      },
      {
        "cat": "Agriculture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Shashikala Patil",
        "h": "North Karnataka's drought belt turns to millets, again",
        "dek": "Government procurement of millets has made an old crop viable on land that never suited sugarcane.",
        "body": [
          "Acreage in four districts has risen for three consecutive seasons, which has not happened since the 1980s.",
          "The processing gap remains: most of the grain is sold raw because dehulling capacity sits elsewhere."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Anand Hegde",
        "h": "Yakshagana troupes negotiate with the night",
        "dek": "All-night coastal performance is being compressed into three-hour shows for audiences that will not stay until dawn.",
        "body": [
          "Senior performers object to the cuts and perform them anyway, because the alternative is empty ground.",
          "A handful of troupes still stage full-length productions once a season, and those tickets sell first."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "68M"
      ],
      [
        "Districts",
        "31"
      ],
      [
        "Capital",
        "Bengaluru"
      ],
      [
        "Languages spoken",
        "Kannada · English"
      ]
    ],
    "id": "karnataka",
    "coords": [
      74.3,
      15.78,
      74.45,
      16.25,
      74.65,
      16.65,
      74.95,
      17,
      75.35,
      17.3,
      75.8,
      17.55,
      76.25,
      17.75,
      76.7,
      18,
      77.1,
      18.3,
      77.5,
      18.65,
      77.45,
      17.6,
      77.45,
      17.1,
      77.35,
      16.65,
      77.4,
      16.2,
      77.55,
      15.75,
      77.7,
      15.3,
      77.9,
      14.9,
      78.1,
      14.45,
      78.3,
      14,
      78.3,
      13.55,
      78.05,
      13.15,
      77.75,
      12.95,
      77.55,
      12.6,
      77.35,
      12.2,
      77,
      11.9,
      76.65,
      11.75,
      76.25,
      11.7,
      75.95,
      11.95,
      75.7,
      12.25,
      75.45,
      12.6,
      75.15,
      12.9,
      74.85,
      12.75,
      74.75,
      13.1,
      74.65,
      13.4,
      74.5,
      13.7,
      74.35,
      14,
      74.2,
      14.3,
      74.05,
      14.6,
      73.92,
      14.9,
      74.05,
      15.05,
      74.25,
      15.4
    ],
    "displayName": "Karnataka"
  },
  "telangana": {
    "name": "Telangana",
    "ep": "The high Deccan",
    "cap": "Hyderabad",
    "a": "#7A5C86",
    "stand": "A decade-old state with a thousand-year-old capital, running on software services, pharmaceuticals and a rain shadow.",
    "marks": [
      [
        "Hyderabad",
        78.47,
        17.38
      ],
      [
        "Warangal",
        79.59,
        17.97
      ],
      [
        "Nizamabad",
        78.09,
        18.67
      ]
    ],
    "motif": "minarets",
    "art": {
      "s": 0.55,
      "y": 0.18
    },
    "stories": [
      {
        "cat": "Business",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Sravani Reddy",
        "h": "Hyderabad's pharma corridor faces its effluent bill",
        "dek": "Bulk drug manufacturing around the city has grown faster than the treatment capacity underneath it.",
        "body": [
          "A dedicated pharma city with common effluent infrastructure has been planned for years and acquired land in stages.",
          "Firms in the older industrial estates say relocation costs more than compliance, which is precisely the problem."
        ]
      },
      {
        "cat": "Agriculture",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Mallesh Goud",
        "h": "The Kaleshwaram lift and the cost of pumped water",
        "dek": "Lifting river water several hundred metres has irrigated land that never had a canal. The electricity bill arrives every month regardless of rainfall.",
        "body": [
          "Operating costs are borne by the state rather than the farmer, which is why the debate is fiscal rather than agricultural.",
          "In wet years the pumps run less and the debt service does not, which is the structural issue the project has yet to resolve."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Anusha Rao",
        "h": "Bathukamma goes from courtyard to stadium and back",
        "dek": "The flower festival became a state-scale spectacle after 2014. Neighbourhood observance has quietly reasserted itself.",
        "body": [
          "Municipal events still draw the crowds and the cameras, and the songs that carry the ritual are sung in lanes.",
          "Folklorists recording the repertoire report more variants collected in the last five years than in the previous fifty."
        ]
      },
      {
        "cat": "Technology",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Kiran Yadav",
        "h": "A data-centre cluster meets a groundwater table",
        "dek": "Hyderabad's server capacity is expanding rapidly, and the cooling water has to come from somewhere.",
        "body": [
          "Operators have begun specifying closed-loop and air-cooled systems, which cost more and use a fraction of the water.",
          "The state has made water disclosure a condition of new land allotments in the IT corridor."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "38M"
      ],
      [
        "Districts",
        "33"
      ],
      [
        "Capital",
        "Hyderabad"
      ],
      [
        "Languages spoken",
        "Telugu · Urdu"
      ]
    ],
    "id": "telangana",
    "coords": [
      77.55,
      15.75,
      77.4,
      16.2,
      77.35,
      16.65,
      77.45,
      17.1,
      77.45,
      17.6,
      77.5,
      18.65,
      77.75,
      19,
      78.1,
      19.25,
      78.55,
      19.45,
      79,
      19.55,
      79.45,
      19.35,
      79.9,
      19.1,
      80.3,
      18.85,
      80.6,
      18.55,
      80.95,
      18.2,
      81.3,
      17.85,
      81,
      17.55,
      80.7,
      17.25,
      80.4,
      16.95,
      80.1,
      16.7,
      79.75,
      16.45,
      79.35,
      16.25,
      78.95,
      16.15,
      78.55,
      15.95,
      78.15,
      15.8
    ],
    "displayName": "Telangana"
  },
  "andhra-pradesh": {
    "name": "Andhra Pradesh",
    "ep": "The eastern shore",
    "cap": "Amaravati",
    "a": "#6E7F3F",
    "stand": "Nine hundred kilometres of coast, two river deltas and a capital that has been argued about since the state was divided.",
    "marks": [
      [
        "Visakhapatnam",
        83.3,
        17.69
      ],
      [
        "Vijayawada",
        80.65,
        16.51
      ],
      [
        "Tirupati",
        79.42,
        13.63
      ]
    ],
    "motif": "temple",
    "art": {
      "s": 0.52,
      "y": 0.18
    },
    "stories": [
      {
        "cat": "Politics",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Sarita Naidu",
        "h": "Three capitals, one decade, no building",
        "dek": "The question of where the state's administration sits has outlasted two governments and several court rulings.",
        "body": [
          "Farmers who pooled land at Amaravati are into their tenth year of waiting, holding development rights against an unbuilt plan.",
          "Whatever is decided, the land-pooling contract is the part that will be studied afterwards."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Ravi Teja Rao",
        "h": "Aquaculture's export dependency gets a stress test",
        "dek": "Shrimp ponds across the delta districts supply a market concentrated in a handful of buyers and one currency.",
        "body": [
          "A tariff change abroad moves farmgate prices here within a fortnight, and farmers carry the whole of that.",
          "Cooperative cold storage and a domestic market push are the hedges being attempted, so far at small scale."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Lakshmi Prasad",
        "h": "Visakhapatnam's port city plan meets its own shoreline",
        "dek": "Industrial expansion north of the port has run into coastal-zone rules and a fishing harbour that predates all of it.",
        "body": [
          "The revised plan moves bulk handling inland and keeps the waterfront for the harbour.",
          "Trawler owners have accepted the layout and are disputing the compensation schedule."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Padma Sarma",
        "h": "Kuchipudi's home village trains outside its lineage",
        "dek": "The village that gave the dance form its name now teaches students with no family connection to it, which is recent.",
        "body": [
          "Residential courses run twice a year and are oversubscribed.",
          "Senior gurus describe the change as survival rather than reform, and teach the full repertoire regardless."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "54M"
      ],
      [
        "Districts",
        "26"
      ],
      [
        "Capital",
        "Amaravati"
      ],
      [
        "Languages spoken",
        "Telugu · Urdu"
      ]
    ],
    "id": "andhra-pradesh",
    "coords": [
      84.75,
      19.1,
      84.35,
      18.7,
      83.95,
      18.3,
      83.55,
      17.95,
      83.25,
      17.7,
      82.85,
      17.35,
      82.55,
      17,
      82.3,
      16.75,
      81.95,
      16.45,
      81.6,
      16.25,
      81.2,
      16.05,
      80.85,
      15.85,
      80.55,
      15.75,
      80.25,
      15.5,
      80.1,
      15.1,
      80.05,
      14.7,
      80.05,
      14.25,
      80.15,
      13.85,
      80.2,
      13.5,
      79.8,
      13.45,
      79.4,
      13.35,
      78.95,
      13.3,
      78.55,
      13.2,
      78.05,
      13.15,
      78.3,
      13.55,
      78.3,
      14,
      78.1,
      14.45,
      77.9,
      14.9,
      77.7,
      15.3,
      77.55,
      15.75,
      78.15,
      15.8,
      78.55,
      15.95,
      78.95,
      16.15,
      79.35,
      16.25,
      79.75,
      16.45,
      80.1,
      16.7,
      80.4,
      16.95,
      80.7,
      17.25,
      81,
      17.55,
      81.3,
      17.85,
      81.55,
      18.05,
      81.8,
      18.35,
      82.35,
      18.4,
      82.75,
      18.5,
      83.1,
      18.55,
      83.5,
      18.6,
      83.85,
      18.85,
      84.25,
      19.05
    ],
    "displayName": "Andhra Pradesh"
  },
  "tamil-nadu": {
    "name": "Tamil Nadu",
    "ep": "The south",
    "cap": "Chennai",
    "a": "#7E3A56",
    "stand": "The most urbanised large state, with an automobile belt, a temple economy and a water year that ends when the north-east monsoon decides.",
    "marks": [
      [
        "Chennai",
        80.27,
        13.08
      ],
      [
        "Coimbatore",
        76.96,
        11.02
      ],
      [
        "Madurai",
        78.12,
        9.93
      ]
    ],
    "motif": "temple",
    "art": {
      "s": 0.58,
      "y": 0.12
    },
    "stories": [
      {
        "cat": "Business",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Meenakshi Sundaram",
        "h": "The auto belt retools for batteries, cautiously",
        "dek": "Suppliers around Chennai and Hosur are being asked to make cells and packs for customers who are also their competitors.",
        "body": [
          "Tier-two firms with engine-component tooling face a capital decision with a ten-year horizon and a three-year order book.",
          "The state's incentive package is generous on land and thin on skills funding, which is what the firms keep raising."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Kalpana Iyer",
        "h": "Chennai's water year is planned like a balance sheet",
        "dek": "After 2019 the city built desalination, revived tanks and metered bulk supply. The plan now assumes a failed monsoon every few years.",
        "body": [
          "Reservoir operating rules have been rewritten to hold water later into the year rather than spill early.",
          "Groundwater in the southern suburbs remains the weak point, and extraction there is still largely unmeasured."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Gowri Ramnath",
        "h": "The December season adds a daytime circuit",
        "dek": "Chennai's music season has grown a parallel programme of smaller venues, younger performers and afternoon slots.",
        "body": [
          "Sabha halls that once booked only senior artists now run two-tier calendars.",
          "Audience data collected by three organisations suggests the new slots are bringing in people who do not attend the evening concerts at all."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Arul Selvan",
        "h": "Tiruppur's knitwear cluster prices in compliance",
        "dek": "Zero liquid discharge was imposed on the cluster's dyeing units by court order and has become its marketing position.",
        "body": [
          "Recovered water now covers most of the cluster's dyeing demand, and salt recovery offsets part of the cost.",
          "Buyers pay a premium that does not fully cover it, which the association has stopped pretending otherwise."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "77M"
      ],
      [
        "Districts",
        "38"
      ],
      [
        "Capital",
        "Chennai"
      ],
      [
        "Languages spoken",
        "Tamil · English"
      ]
    ],
    "id": "tamil-nadu",
    "coords": [
      76.25,
      11.7,
      76.55,
      11.35,
      76.9,
      11,
      77.2,
      10.6,
      77.25,
      10.15,
      77.15,
      9.7,
      77.3,
      9.25,
      77.25,
      8.8,
      77.2,
      8.4,
      77.55,
      8.08,
      77.95,
      8.35,
      78.25,
      8.65,
      78.55,
      9.05,
      78.95,
      9.25,
      79.35,
      9.28,
      79.15,
      9.65,
      79.35,
      9.95,
      79.7,
      10.25,
      79.85,
      10.55,
      79.8,
      11,
      79.95,
      11.5,
      80.1,
      12,
      80.25,
      12.6,
      80.2,
      13.1,
      80.2,
      13.5,
      79.8,
      13.45,
      79.4,
      13.35,
      78.95,
      13.3,
      78.55,
      13.2,
      78.05,
      13.15,
      77.75,
      12.95,
      77.55,
      12.6,
      77.35,
      12.2,
      77,
      11.9,
      76.65,
      11.75
    ],
    "displayName": "Tamil Nadu"
  },
  "kerala": {
    "name": "Kerala",
    "ep": "Backwater state",
    "cap": "Thiruvananthapuram",
    "a": "#3F7A55",
    "stand": "A coastal strip with the country's highest literacy, its oldest ageing curve and an economy running substantially on money sent home.",
    "marks": [
      [
        "Kochi",
        76.27,
        9.93
      ],
      [
        "Thiruvananthapuram",
        76.95,
        8.52
      ],
      [
        "Kozhikode",
        75.78,
        11.26
      ]
    ],
    "motif": "coast",
    "art": {
      "s": 0.72,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Economy",
        "date": "20 Sep",
        "read": "6 min",
        "by": "Ann Mary Joseph",
        "h": "Remittance inflows plateau and the state notices",
        "dek": "Money sent home from the Gulf has underwritten Kerala's consumption for forty years. The curve has flattened.",
        "body": [
          "Return migration and slower hiring abroad have changed the composition of the flow more than the total.",
          "District cooperative banks report deposit growth slowing first in the districts that sent the most workers."
        ]
      },
      {
        "cat": "Environment",
        "date": "19 Sep",
        "read": "7 min",
        "by": "Nikhil Menon",
        "h": "After the landslides, a slope-risk map with teeth",
        "dek": "Hazard zonation for the Western Ghats districts has been redrawn and, for the first time, linked to building permission.",
        "body": [
          "Panchayats in the highest category cannot sanction new construction without a geotechnical report.",
          "The mapping has been contested by plantation owners and upheld twice, which is why permissions are now actually being refused."
        ]
      },
      {
        "cat": "Health",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Sheela Thomas",
        "h": "The ageing state builds palliative care into panchayats",
        "dek": "Kerala's community palliative network is the largest in the country and is being formally funded through local bodies.",
        "body": [
          "Roughly two thousand panchayats now budget for home-based care visits.",
          "Staffing is volunteer-heavy, and the programme's own review names that as the risk it has not solved."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Rajesh Warrier",
        "h": "Kathakali's night-long form gets a festival of its own",
        "dek": "Full-length performances that run until dawn are being programmed deliberately, against the trend toward excerpts.",
        "body": [
          "Temple committees in three districts have funded a season of complete plays.",
          "Audiences are smaller and stay longer, which the performers say changes what they can do in the second half."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "35M"
      ],
      [
        "Districts",
        "14"
      ],
      [
        "Capital",
        "Thiruvananthapuram"
      ],
      [
        "Languages spoken",
        "Malayalam · English"
      ]
    ],
    "id": "kerala",
    "coords": [
      74.85,
      12.75,
      75.15,
      12.9,
      75.45,
      12.6,
      75.7,
      12.25,
      75.95,
      11.95,
      76.25,
      11.7,
      76.55,
      11.35,
      76.9,
      11,
      77.2,
      10.6,
      77.25,
      10.15,
      77.15,
      9.7,
      77.3,
      9.25,
      77.25,
      8.8,
      77.2,
      8.4,
      76.85,
      8.65,
      76.55,
      9.05,
      76.3,
      9.55,
      76.15,
      10.05,
      75.95,
      10.55,
      75.7,
      11.1,
      75.45,
      11.6,
      75.15,
      12.1,
      74.95,
      12.45
    ],
    "displayName": "Kerala"
  },
  "andaman-nicobar": {
    "name": "Andaman &amp; Nicobar",
    "plain": "Andaman & Nicobar",
    "ep": "Bay islands",
    "cap": "Port Blair",
    "a": "#3A6E80",
    "stand": "Eight hundred islands, thirty-odd inhabited, closer to Southeast Asia than to the mainland and governed from it.",
    "marks": [
      [
        "Port Blair",
        92.74,
        11.62
      ],
      [
        "Diglipur",
        92.98,
        13.26
      ],
      [
        "Car Nicobar",
        92.79,
        9.17
      ]
    ],
    "motif": "coast",
    "art": {
      "s": 0.55,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Nandini Rao",
        "h": "Coral bleaching returns to the reefs off Havelock",
        "dek": "Sea-surface temperatures crossed the bleaching threshold again this year. Recovery from the last event was incomplete.",
        "body": [
          "Dive operators now collect standardised survey data, which has produced a longer record than any research programme here.",
          "Reef fish landings have fallen in the areas with the worst bleaching, which is the effect fishing communities report first."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Arjun Nair",
        "h": "A transshipment port at Great Nicobar divides the islands",
        "dek": "A deep-water port and airport proposed for the southernmost island would put it on the main east–west shipping lane.",
        "body": [
          "The project area overlaps tribal reserve land and one of the country's least disturbed rainforests.",
          "Clearances have been granted with conditions, and the conditions are what the litigation is about."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Leela Ekka",
        "h": "The islands' languages are counted properly",
        "dek": "A linguistic survey has documented the Nicobarese and Great Andamanese language families in detail for the first time in decades.",
        "body": [
          "One language is down to a handful of speakers, all of them elderly.",
          "Recordings are being lodged with the community as well as the archive, which was the condition for making them."
        ]
      },
      {
        "cat": "Economy",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Shibu Varghese",
        "h": "Inter-island shipping is the whole economy",
        "dek": "Everything that moves between the islands moves by boat on a schedule that weather rewrites weekly.",
        "body": [
          "Two new vessels have cut the northern run, and the southern group remains dependent on a single ship.",
          "Traders on the smaller islands price goods by expected delay rather than by distance."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "0.4M"
      ],
      [
        "Districts",
        "3"
      ],
      [
        "Capital",
        "Port Blair"
      ],
      [
        "Languages spoken",
        "Hindi · Bengali · English"
      ]
    ],
    "id": "andaman-nicobar",
    "coords": [
      [
        92.78,
        13.58,
        93.02,
        13.4,
        93.06,
        13.05,
        92.96,
        12.82,
        92.78,
        12.95,
        92.7,
        13.25
      ],
      [
        92.62,
        12.68,
        92.86,
        12.5,
        92.92,
        12.15,
        92.86,
        11.72,
        92.72,
        11.52,
        92.58,
        11.72,
        92.56,
        12.2
      ],
      [
        92.5,
        10.88,
        92.7,
        10.78,
        92.76,
        10.55,
        92.62,
        10.42,
        92.48,
        10.58
      ],
      [
        92.72,
        9.28,
        92.9,
        9.2,
        92.92,
        9.02,
        92.76,
        8.96,
        92.66,
        9.12
      ],
      [
        93.72,
        7.28,
        93.92,
        7.22,
        94,
        6.98,
        93.86,
        6.78,
        93.68,
        6.92,
        93.62,
        7.12
      ]
    ],
    "displayName": "Andaman & Nicobar"
  },
  "lakshadweep": {
    "name": "Lakshadweep",
    "ep": "Coral atolls",
    "cap": "Kavaratti",
    "a": "#4E8A8A",
    "stand": "Thirty-six coral islands with a combined land area smaller than most municipalities, and a lagoon economy that depends entirely on the reef.",
    "marks": [
      [
        "Kavaratti",
        72.68,
        10.98
      ],
      [
        "Agatti",
        72.2,
        11.63
      ],
      [
        "Minicoy",
        72.26,
        8.36
      ]
    ],
    "motif": "coast",
    "art": {
      "s": 0.5,
      "y": 0.1
    },
    "stories": [
      {
        "cat": "Environment",
        "date": "20 Sep",
        "read": "7 min",
        "by": "Fathima Koya",
        "h": "The reef is the island, and it is thinning",
        "dek": "Every island here sits on coral. Reef health is not an environmental question but a land-area one.",
        "body": [
          "Surveys after the last bleaching event recorded live coral cover at roughly half its 1998 level on the western reefs.",
          "Sand supply to the beaches comes from the reef, which is why shoreline loss tracks bleaching with a lag of years."
        ]
      },
      {
        "cat": "Economy",
        "date": "19 Sep",
        "read": "6 min",
        "by": "Abdul Rahman",
        "h": "Tuna pole-and-line fishing holds its certification",
        "dek": "The island fleet catches skipjack one fish at a time, which is slow, selective and now commercially valuable.",
        "body": [
          "Certified pole-and-line tuna reaches European buyers at a premium that supports the method.",
          "Live-bait availability in the lagoons is the constraint, and it is a reef-health question again."
        ]
      },
      {
        "cat": "Infrastructure",
        "date": "18 Sep",
        "read": "5 min",
        "by": "Hassan Ali",
        "h": "Desalination and the freshwater lens",
        "dek": "Groundwater on a coral island is a thin lens of rainwater floating on seawater. Over-extraction ruins it permanently.",
        "body": [
          "Low-temperature desalination plants now supply several islands, reducing draw on the lens.",
          "Power for the plants is the remaining dependency, and it currently arrives as diesel by ship."
        ]
      },
      {
        "cat": "Culture",
        "date": "18 Sep",
        "read": "6 min",
        "by": "Mariyam Beevi",
        "h": "Jazeeri drumming is taught outside the family again",
        "dek": "Island percussion traditions passed through households are now being taught in schools on three islands.",
        "body": [
          "The repertoire had narrowed to wedding performance within living memory.",
          "Students have begun composing in the form, which the senior players describe as the point."
        ]
      }
    ],
    "facts": [
      [
        "Population",
        "0.07M"
      ],
      [
        "Districts",
        "1"
      ],
      [
        "Capital",
        "Kavaratti"
      ],
      [
        "Languages spoken",
        "Malayalam · Mahl · English"
      ]
    ],
    "id": "lakshadweep",
    "coords": [
      [
        72.16,
        11.78,
        72.34,
        11.72,
        72.36,
        11.54,
        72.18,
        11.52
      ],
      [
        72.6,
        11.12,
        72.76,
        11.06,
        72.78,
        10.88,
        72.6,
        10.86
      ],
      [
        73,
        10.18,
        73.18,
        10.12,
        73.2,
        9.92,
        73.02,
        9.9
      ],
      [
        72.18,
        8.48,
        72.34,
        8.42,
        72.36,
        8.24,
        72.18,
        8.26
      ]
    ],
    "displayName": "Lakshadweep"
  }
};

export const ALL_STATE_IDS = Object.keys(STATES_DATA);
