import { WorkerProfile, JobPost, Conversation, ChatMessage, EscrowProject, Review } from '../types';

export const POPULAR_SKILLS: string[] = [
  'Brickwork & Plaster',
  'Tile & Italian Marble',
  'Concealed Wiring',
  'Royale Luxury Paint',
  'Modular Kitchen',
  'Turnkey Construction',
  'Sanitary & Plumbing',
  'False Ceiling Gypsum',
  'Boundary Wall & RCC',
  'Waterproofing',
  'Smart Home Switches',
  'PU Wood Polish'
];

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'w1',
    name: 'Ramesh Kumar Mistri',
    nameHindi: 'रमेश कुमार मिस्त्री',
    trade: 'Rajmistri / Mason',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    city: 'Delhi NCR',
    area: 'Noida Sector 62 & Indirapuram',
    phone: '+91 98112 34567',
    rating: 4.9,
    reviewCount: 48,
    experienceYears: 14,
    dailyWage: 950,
    unitRate: '₹950/day (Team: ₹3,500/day with 3 Beldars)',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 98,
    completedProjects: 86,
    teamSize: 6,
    bio: 'Specialist in foundation, brickwork, plastering, boundary walls, and tile fitting. 14 years on-site experience across Noida, Greater Noida, and Ghaziabad.',
    bioHindi: 'नींव, चिनाई, प्लास्टर, बाउंड्री वॉल और टाइल फिटिंग के माहिर। 14 साल का ऑन-साइट अनुभव।',
    skills: ['Brickwork & Plaster', 'Boundary Wall & RCC', 'Tile & Italian Marble', 'Waterproofing', 'Level Tube Inspection'],
    availability: 'immediate',
    toolsEquipment: ['Concrete Mixer', 'Vibrator', 'Level Tube', 'Plaster Trowels', 'Angle Grinder'],
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Top Rated Thekedaar', '100% On-Time', 'DigiLocker Verified', 'Zero Dispute Record'],
    availableNow: true,
    distanceKm: 2.4,
    reviews: [
      {
        id: 'rev-1',
        workerId: 'w1',
        hirerName: 'Sanjay Aggarwal (Homeowner, Sector 78)',
        rating: 5,
        title: 'Outstanding Masonry and Boundary Wall Construction',
        comment: 'Ramesh ji and his team did an outstanding job on our 1800 sq ft boundary wall and exterior plastering. Finished right on schedule, daily site cleanup was done, and the escrow milestone payment gave us total peace of mind.',
        createdAt: '10 days ago',
        projectTitle: 'Boundary Wall & Plastering Project',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      },
      {
        id: 'rev-2',
        workerId: 'w1',
        hirerName: 'Pooja Singhal (Villa Owner, Indirapuram)',
        rating: 5,
        title: 'Very disciplined team and honest pricing',
        comment: 'Arrived at 9 AM sharp every day with all tools and level apparatus. Cement and sand mixing ratios were perfectly followed without material wastage. Highly recommended.',
        createdAt: '3 weeks ago',
        projectTitle: 'First Floor Brickwork Extension',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      },
      {
        id: 'rev-3',
        workerId: 'w1',
        hirerName: 'Col. R.K. Varma (Retd.)',
        rating: 4.8,
        title: 'Solid craftsmanship and polite demeanor',
        comment: 'Professional thekedaar. Handled our terrace tile fitting and parapet wall renovation with skill.',
        createdAt: '1 month ago',
        projectTitle: 'Terrace Waterproofing & Parapet Wall',
        qualityRating: 5,
        punctualityRating: 4,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w2',
    name: 'Mohd. Imran Khan',
    nameHindi: 'मोहम्मद इमरान खान',
    trade: 'Painter & Polish',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    city: 'Delhi NCR',
    area: 'South Delhi & Gurugram',
    phone: '+91 98710 44321',
    rating: 4.8,
    reviewCount: 62,
    experienceYears: 9,
    dailyWage: 800,
    unitRate: '₹14 - ₹22 / sq.ft (Asian Paints / Nerolac)',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 95,
    completedProjects: 112,
    teamSize: 4,
    bio: 'Professional interior & exterior painting, Royale luxury finish, stencil design, PU wood polish, and waterproof priming.',
    bioHindi: 'इंटीरियर और एक्सटीरियर पेंटिंग, रॉयल फिनिश, स्टेंसिल डिजाइन और पीयू वुड पॉलिश के विशेषज्ञ।',
    skills: ['Royale Luxury Paint', 'PU Wood Polish', 'Waterproofing', 'Stencil Texture Wall', 'Airless Spray Painting'],
    availability: 'immediate',
    toolsEquipment: ['Airless Spray Machine', 'Wall Sander Machine', 'Scaffolding Stools', 'Drop Cloths'],
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Asian Paints Certified', 'Clean Site Promise', 'Aadhaar Verified'],
    availableNow: true,
    distanceKm: 4.1,
    reviews: [
      {
        id: 'rev-4',
        workerId: 'w2',
        hirerName: 'Dr. Vivek Mehra (GK-2, New Delhi)',
        rating: 5,
        title: 'Flawless Royale Paint and PU Polish Finish',
        comment: 'Imran and his team transformed our 3BHK flat within 6 days. Floor covering with drop sheets protected our Italian marble. The living room texture wall looks stunning.',
        createdAt: '1 week ago',
        projectTitle: '3BHK Royale Luxury Paint & Accent Wall',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      },
      {
        id: 'rev-5',
        workerId: 'w2',
        hirerName: 'Meenakshi Iyer (Gurugram Sec 56)',
        rating: 4.6,
        title: 'Very professional, no paint drops on floor',
        comment: 'Used wall sander machine with vacuum so dust was minimal. Prompt milestone updates.',
        createdAt: '2 weeks ago',
        projectTitle: 'Exterior Weatherproof Emulsion',
        qualityRating: 5,
        punctualityRating: 4,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w3',
    name: 'Suresh Sharma',
    nameHindi: 'सुरेश शर्मा',
    trade: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    city: 'Jaipur',
    area: 'Vaishali Nagar & Mansarovar',
    phone: '+91 94140 88765',
    rating: 4.9,
    reviewCount: 39,
    experienceYears: 11,
    dailyWage: 850,
    unitRate: '₹140 / point (Complete Conduit & Wiring)',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 97,
    completedProjects: 74,
    teamSize: 3,
    bio: 'Licensed wireman certified by State Electricity Board. Complete home wiring, MCB distribution board, inverter wiring, and smart switches.',
    bioHindi: 'सरकारी लाइसेंसी इलेक्ट्रीशियन। नई कोठी की वायरिंग, एमसीबी बॉक्स, इन्वर्टर और स्मार्ट स्विच इंस्टॉलेशन।',
    skills: ['Concealed Wiring', 'Smart Home Switches', 'MCB Distribution Board', 'Inverter Wiring', 'Earthing & Phase Balancing'],
    availability: 'immediate',
    toolsEquipment: ['Wall Chaser Machine', 'Digital Multimeter', 'Cable Puller', 'Drill & Core Cutter'],
    photos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Licensed Wireman', 'Safety Protocol Certified', 'Govt ID Verified'],
    availableNow: true,
    distanceKm: 1.8,
    reviews: [
      {
        id: 'rev-6',
        workerId: 'w3',
        hirerName: 'Sunil Choudhary (Mansarovar, Jaipur)',
        rating: 5,
        title: 'Master of concealed conduit wiring and DB balancing',
        comment: 'Suresh ji wired our whole newly built duplex house. Proper copper earthing and load segregation done. Very courteous person.',
        createdAt: '4 days ago',
        projectTitle: 'Complete Duplex Conduit & Smart Wiring',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w4',
    name: 'Santosh Badhai (Carpenter)',
    nameHindi: 'संतोष बढ़ई',
    trade: 'Carpenter / Badhai',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    city: 'Mumbai',
    area: 'Thane & Mulund',
    phone: '+91 98200 12987',
    rating: 4.7,
    reviewCount: 54,
    experienceYears: 16,
    dailyWage: 1100,
    unitRate: '₹1,200 - ₹1,600 / sq.ft (Modular Kitchen)',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 96,
    completedProjects: 93,
    teamSize: 5,
    bio: 'Modular kitchen specialist, bespoke wardrobe wardrobes, hydraulic bed frames, wooden door frames, and laminate press work.',
    bioHindi: 'मॉड्यूलर किचन, वार्डरोब, हाइड्रोलिक बेड और लैमिनेट फिनिशिंग का प्रीमियम काम।',
    skills: ['Modular Kitchen', 'Bespoke Wardrobes', 'Hydraulic Bed Fittings', 'PU Edge Banding', 'Laminate Press Work'],
    availability: 'this_week',
    toolsEquipment: ['Table Saw', 'Circular Saw', 'Router Machine', 'Edge Banding Machine', 'Air Nailer'],
    photos: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Modular Specialist', 'CenturyPly Partner', 'Verified Master Craftsman'],
    availableNow: false,
    distanceKm: 6.2,
    reviews: [
      {
        id: 'rev-7',
        workerId: 'w4',
        hirerName: 'Kunal Deshmukh (Thane West)',
        rating: 5,
        title: 'Superb acrylic modular kitchen with soft-close tandem boxes',
        comment: 'Santosh crafted an exceptional kitchen for our 2BHK flat. Precise laser alignment, quality hardware, and seamless laminate edges.',
        createdAt: '2 weeks ago',
        projectTitle: 'Modular Kitchen Acrylic Cabinets',
        qualityRating: 5,
        punctualityRating: 4,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w5',
    name: 'Balwinder Singh & Sons',
    nameHindi: 'बलविंदर सिंह ठेकेदार',
    trade: 'General Thekedaar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    city: 'Delhi NCR',
    area: 'West Delhi & Dwarka',
    phone: '+91 98100 55678',
    rating: 4.95,
    reviewCount: 78,
    experienceYears: 22,
    dailyWage: 1400,
    unitRate: '₹1,450 - ₹1,850 / sq.ft (Material + Labor Turnkey)',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 99,
    completedProjects: 140,
    teamSize: 24,
    bio: 'Full turnkey construction contractor. From soil testing and foundation to grey structure, roofing, and turnkey handover. Own concrete batching and shuttering sheets.',
    bioHindi: 'सम्पूर्ण मकान निर्माण का ठेका (सामग्री सहित अथवा लेबर रेट)। 24 कारीगरों व लेबर की मजबूत टीम।',
    skills: ['Turnkey Construction', 'Boundary Wall & RCC', 'Brickwork & Plaster', 'Shuttering & Concrete Slab', 'Structural Steel Framing'],
    availability: 'this_week',
    toolsEquipment: ['Shuttering Plates (10,000 sqft)', 'Concrete Lift', 'Total Station', 'Tower Hoist'],
    photos: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Class A Registered Thekedaar', 'Escrow Preferred', 'Turnkey Specialist'],
    availableNow: true,
    distanceKm: 5.0,
    reviews: [
      {
        id: 'rev-8',
        workerId: 'w5',
        hirerName: 'Harpreet Ahluwalia (Dwarka Sec 11)',
        rating: 5,
        title: 'Constructed our G+2 Kothi with unmatched integrity',
        comment: 'Balwinder ji completed our full home construction on time with zero budget surprises. The Escrow milestone system ensured full accountability for each floor slab casting.',
        createdAt: '3 weeks ago',
        projectTitle: 'Residential Kothi Turnkey Construction',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w6',
    name: 'Mahesh Plumber',
    nameHindi: 'महेश प्लंबर',
    trade: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    city: 'Bengaluru',
    area: 'Whitefield & Marathahalli',
    phone: '+91 97420 77112',
    rating: 4.85,
    reviewCount: 42,
    experienceYears: 8,
    dailyWage: 850,
    unitRate: '₹850 / day or ₹400 / fixture fitting',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 94,
    completedProjects: 65,
    teamSize: 2,
    bio: 'CPVC, UPVC pipe concealment, Jaguar & Kohler sanitary fittings, water tank connection, motor pump & pressure booster repair.',
    bioHindi: 'बाथरूम सैनिटरी फिटिंग, अंडरग्राउंड सीपीवीसी पाइपलाइन, वाटर पंप और लीकेज समाधान।',
    skills: ['Sanitary & Plumbing', 'CPVC Pipe Concealment', 'Pressure Pump & Tank', 'Leakage Diagnosis', 'Diverter & Wall Mixer'],
    availability: 'immediate',
    toolsEquipment: ['Pipe Threader', 'Fusion Welding Machine (PPR)', 'Pressure Test Pump', 'Drain Auger'],
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Aadhaar Verified', 'Emergency Service Ready', 'Jaguar Trained'],
    availableNow: true,
    distanceKm: 3.2,
    reviews: [
      {
        id: 'rev-9',
        workerId: 'w6',
        hirerName: 'Sridhar Rao (Whitefield, Bangalore)',
        rating: 5,
        title: 'Fixed major bathroom seepage and installed diverter perfectly',
        comment: 'Mahesh solved a persistent ceiling dampness problem that other plumbers couldn’t trace. Pressure tested the entire line before tile close-up.',
        createdAt: '1 month ago',
        projectTitle: 'Master Bathroom Piping & Diverter Renovation',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w7',
    name: 'Javed POP Specialist',
    nameHindi: 'जावेद फॉल्स सीलिंग',
    trade: 'POP & False Ceiling',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    city: 'Delhi NCR',
    area: 'Faridabad & Greater Noida',
    phone: '+91 99110 33221',
    rating: 4.75,
    reviewCount: 31,
    experienceYears: 7,
    dailyWage: 800,
    unitRate: '₹65 - ₹95 / sq.ft (Gypsum Board & POP Design)',
    isAadhaarVerified: true,
    isPoliceVerified: false,
    isSkillCertified: true,
    verificationScore: 89,
    completedProjects: 48,
    teamSize: 4,
    bio: 'Modern cove lighting ceiling, Saint-Gobain gypsum plaster, acoustic false ceiling, grid tiles for offices and modern living rooms.',
    bioHindi: 'डिजाइनर फॉल्स सीलिंग, कोव लाइट, जिप्सम बोर्ड और पी.ओ.पी. मोल्डिंग के एक्सपर्ट।',
    skills: ['False Ceiling Gypsum', 'Cove Lighting Design', 'Acoustic Grid Ceiling', 'POP Moulding', 'Saint-Gobain Channel Framing'],
    availability: 'next_15_days',
    toolsEquipment: ['Laser Level', 'Drywall Screw Gun', 'Ceiling Scaffolding'],
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['Gyproc Certified', 'Design Catalog Available'],
    availableNow: true,
    distanceKm: 7.5,
    reviews: [
      {
        id: 'rev-10',
        workerId: 'w7',
        hirerName: 'Rajesh Tyagi (Greater Noida West)',
        rating: 4.8,
        title: 'Beautiful indirect cove lighting false ceiling in hall',
        comment: 'Very sharp laser leveling, clean corners, and sturdy channel support. High quality work.',
        createdAt: '3 weeks ago',
        projectTitle: 'Drawing Room Cove Ceiling',
        qualityRating: 5,
        punctualityRating: 4,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  },
  {
    id: 'w8',
    name: 'Pappu Yadav Labor Supplier',
    nameHindi: 'पप्पू यादव लेबर सप्लायर',
    trade: 'Labor / Helper Supplier',
    avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=300&auto=format&fit=crop&q=80',
    city: 'Delhi NCR',
    area: 'Gurugram Cybercity & Manesar',
    phone: '+91 98990 11223',
    rating: 4.8,
    reviewCount: 57,
    experienceYears: 12,
    dailyWage: 550,
    unitRate: '₹550 / Beldar daily wage (On-demand 5 to 50 helpers)',
    isAadhaarVerified: true,
    isPoliceVerified: true,
    isSkillCertified: true,
    verificationScore: 96,
    completedProjects: 180,
    teamSize: 45,
    bio: 'Supplies disciplined construction helpers, beldars, concrete unloaders, site cleaning labor, and material shifting workforce at shortest notice.',
    bioHindi: 'कंस्ट्रक्शन लेबर, बेलदार, माल अनलोडिंग और साइट सफाई हेतु तत्काल 5 से 50 मजदूर उपलब्ध।',
    skills: ['Beldar & Helper Supply', 'Material Unloading', 'Concrete Batching Assistance', 'Site Debris Clearance', 'Excavation & Shifting'],
    availability: 'immediate',
    toolsEquipment: ['Wheelbarrows', 'Safety Helmets & Vests', 'Spades & Pickaxes'],
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
    ],
    badges: ['PF/ESIC Compliant', 'Bulk Labor Verified', 'Safety Gear Provided'],
    availableNow: true,
    distanceKm: 3.8,
    reviews: [
      {
        id: 'rev-11',
        workerId: 'w8',
        hirerName: 'Apex Infrastructure Ltd. (Manesar Site)',
        rating: 4.9,
        title: 'Provided 20 punctual beldars for slab casting',
        comment: 'All workers had Aadhaar and safety helmets. Worked hard all day without any hassle.',
        createdAt: '1 month ago',
        projectTitle: 'Commercial Slab Pouring Workforce',
        qualityRating: 5,
        punctualityRating: 5,
        behaviorRating: 5,
        verifiedHirer: true
      }
    ]
  }
];

export const INITIAL_JOBS: JobPost[] = [
  {
    id: 'job-101',
    title: '3BHK Interior Painting & Texture Wall Work',
    titleHindi: '3बीएचके फ्लैट पेंटिंग व टेक्सचर वर्क',
    trade: 'Painter & Polish',
    hirerName: 'Dr. Vivek Mehra',
    hirerPhone: '+91 98118 76543',
    city: 'Delhi NCR',
    area: 'Noida Sector 78 (Silicon City)',
    budget: 34000,
    budgetType: 'fixed',
    durationDays: 6,
    description: 'Require Asian Paints Royale luxury emulsion for 3 bedrooms + drawing hall. 1 accent wall needs stencil or velvet texture. Materials already purchased by owner; purely labor quote needed.',
    status: 'open',
    applicantsCount: 4,
    postedAt: '2 hours ago',
    urgent: true,
    escrowFunded: true,
    siteVisitRequired: true
  },
  {
    id: 'job-102',
    title: 'Boundary Wall Construction (120 running feet)',
    titleHindi: '120 फीट बाउंड्री वॉल निर्माण (चिनाई व कॉलम)',
    trade: 'Rajmistri / Mason',
    hirerName: 'Anil Agarwal',
    hirerPhone: '+91 99991 22334',
    city: 'Delhi NCR',
    area: 'Greater Noida West',
    budget: 48000,
    budgetType: 'fixed',
    durationDays: 9,
    description: 'Brickwork 9-inch wall with 6 RCC concrete pillars. Height 6 feet. Looking for an experienced mistri team with 2-3 beldars who can finish within 10 days with clean plastering.',
    status: 'open',
    applicantsCount: 6,
    postedAt: '5 hours ago',
    urgent: false,
    escrowFunded: true,
    siteVisitRequired: true
  },
  {
    id: 'job-103',
    title: 'Complete Villa Concealed Electrical Conduit & Wiring',
    titleHindi: 'नये विला की पूर्ण अंडरग्राउंड बिजली वायरिंग',
    trade: 'Electrician',
    hirerName: 'Sanjay Rawat',
    hirerPhone: '+91 98290 55443',
    city: 'Jaipur',
    area: 'Jagatpura Scheme',
    budget: 52000,
    budgetType: 'fixed',
    durationDays: 14,
    description: 'Ground + 1st floor independent villa wiring. 220 points approximate. Distribution boards with 8-way MCBs and earth pit connection. Need licensed wireman.',
    status: 'open',
    applicantsCount: 3,
    postedAt: 'Yesterday',
    urgent: false,
    escrowFunded: false,
    siteVisitRequired: true
  },
  {
    id: 'job-104',
    title: 'L-Shaped Modular Kitchen with Acrylic Shutters',
    titleHindi: 'एल-शेप मॉड्यूलर किचन लकड़ी व ऐक्रेलिक काम',
    trade: 'Carpenter / Badhai',
    hirerName: 'Pooja Kulkarni',
    hirerPhone: '+91 98210 99887',
    city: 'Mumbai',
    area: 'Kandivali West',
    budget: 85000,
    budgetType: 'fixed',
    durationDays: 8,
    description: 'Kitchen carcass using marine-grade BWP plywood, soft-close Ebco/Hettich tandem boxes, pantry pullout and acrylic finish shutters.',
    status: 'open',
    applicantsCount: 5,
    postedAt: '1 day ago',
    urgent: false,
    escrowFunded: true,
    siteVisitRequired: true
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    workerId: 'w1',
    hirerId: 'h1',
    workerName: 'Ramesh Kumar Mistri',
    workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    workerTrade: 'Rajmistri / Mason',
    hirerName: 'Anil Agarwal',
    hirerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    jobTitle: 'Boundary Wall Construction (120 ft)',
    lastMessage: 'Namaste sir, hum kal subah 10 baje site visit kr sakte hain inspection ke liye.',
    lastTimestamp: '10:45 AM',
    unreadCount: 1,
    status: 'inquiry'
  },
  {
    id: 'conv-2',
    workerId: 'w2',
    hirerId: 'h2',
    workerName: 'Mohd. Imran Khan',
    workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    workerTrade: 'Painter & Polish',
    hirerName: 'Dr. Vivek Mehra',
    hirerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    jobTitle: '3BHK Interior Painting & Texture Wall Work',
    lastMessage: 'Quotation estimate of ₹34,000 sent with 3-step Escrow safety lock.',
    lastTimestamp: '09:20 AM',
    unreadCount: 0,
    status: 'quote_sent'
  },
  {
    id: 'conv-3',
    workerId: 'w5',
    hirerId: 'h3',
    workerName: 'Balwinder Singh & Sons',
    workerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    workerTrade: 'General Thekedaar',
    hirerName: 'Rohit Bansal',
    hirerAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&auto=format&fit=crop&q=80',
    jobTitle: 'Duplex Home Turnkey Construction',
    lastMessage: 'First milestone of ₹1,50,000 released! Plinth beam casting underway.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    status: 'work_in_progress'
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm1',
      conversationId: 'conv-1',
      senderId: 'h1',
      senderName: 'Anil Agarwal',
      senderRole: 'hirer',
      text: 'Namaste Ramesh ji, maine aapki profile dekhi Digital Thekedaar par. Hume Greater Noida West me 120 running feet boundary wall banwani hai.',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 'm2',
      conversationId: 'conv-1',
      senderId: 'w1',
      senderName: 'Ramesh Kumar Mistri',
      senderRole: 'worker',
      text: 'Namaste Anil ji! Haan bilkul, humare paas 4 mistri aur 6 beldars ki ready team hai. Mitti ka level kaisa hai wahan?',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: 'm3',
      conversationId: 'conv-1',
      senderId: 'h1',
      senderName: 'Anil Agarwal',
      senderRole: 'hirer',
      text: 'Plot plain hai, boundary demarcation done hai. Aap kab aakar dekh sakte hain?',
      timestamp: '10:40 AM',
      type: 'text'
    },
    {
      id: 'm4',
      conversationId: 'conv-1',
      senderId: 'w1',
      senderName: 'Ramesh Kumar Mistri',
      senderRole: 'worker',
      text: 'Namaste sir, hum kal subah 10 baje site visit kr sakte hain inspection ke liye.',
      timestamp: '10:45 AM',
      type: 'site_visit',
      meta: {
        visitDate: '2026-09-22',
        visitTime: '10:00 AM',
        status: 'pending_confirmation'
      }
    }
  ],
  'conv-2': [
    {
      id: 'm10',
      conversationId: 'conv-2',
      senderId: 'h2',
      senderName: 'Dr. Vivek Mehra',
      senderRole: 'hirer',
      text: 'Imran ji, 3BHK Royale luxury paint ka total estimate kitna hoga? Paint maine Asian Paints se already order kr diya hai.',
      timestamp: '09:05 AM',
      type: 'text'
    },
    {
      id: 'm11',
      conversationId: 'conv-2',
      senderId: 'w2',
      senderName: 'Mohd. Imran Khan',
      senderRole: 'worker',
      text: 'Doctor sahab, labor + putty sanding + 1 accent wall texture ka standard ₹34,000 quote banega. 6 din me neat & clean hand over kar denge.',
      timestamp: '09:12 AM',
      type: 'text'
    },
    {
      id: 'm12',
      conversationId: 'conv-2',
      senderId: 'w2',
      senderName: 'Mohd. Imran Khan',
      senderRole: 'worker',
      text: 'Quotation estimate of ₹34,000 sent with 3-step Escrow safety lock.',
      timestamp: '09:20 AM',
      type: 'quote',
      meta: {
        amount: 34000,
        milestonesCount: 3,
        status: 'active'
      }
    }
  ]
};

export const INITIAL_ESCROWS: EscrowProject[] = [
  {
    id: 'escrow-901',
    jobTitle: '3BHK Flat Complete Painting & Texture Wall',
    workerName: 'Mohd. Imran Khan',
    workerTrade: 'Painter & Polish',
    workerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    hirerName: 'Dr. Vivek Mehra',
    totalAmount: 34000,
    fundedAmount: 34000,
    releasedAmount: 10000,
    status: 'in_progress',
    createdAt: '18 Sep 2026',
    transactionRef: 'DT-ESC-884920194',
    paymentMethod: 'UPI',
    milestones: [
      {
        id: 'ms-1',
        title: 'Milestone 1: Putty, Sanding & Wall Priming',
        percentage: 30,
        amount: 10200,
        status: 'released',
        description: 'Complete scraping of old paint, 2 coats Birla white putty and primer application.',
        dueDate: '20 Sep 2026',
        approvedAt: '20 Sep 2026, 02:15 PM'
      },
      {
        id: 'ms-2',
        title: 'Milestone 2: First Coat Royale Paint in All Rooms',
        percentage: 40,
        amount: 13600,
        status: 'in_progress',
        description: 'First coat application with clean masking tape on windows and switches.',
        dueDate: '23 Sep 2026'
      },
      {
        id: 'ms-3',
        title: 'Milestone 3: Final Finish, Texture Wall & Deep Cleaning',
        percentage: 30,
        amount: 10200,
        status: 'locked',
        description: 'Second coat, drawing room velvet texture pattern, floor cleanup and final inspection signoff.',
        dueDate: '25 Sep 2026'
      }
    ]
  },
  {
    id: 'escrow-902',
    jobTitle: 'Boundary Wall Construction & Pillar Casting',
    workerName: 'Ramesh Kumar Mistri',
    workerTrade: 'Rajmistri / Mason',
    workerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    hirerName: 'Anil Agarwal',
    totalAmount: 48000,
    fundedAmount: 48000,
    releasedAmount: 0,
    status: 'funded',
    createdAt: '19 Sep 2026',
    transactionRef: 'DT-ESC-773194022',
    paymentMethod: 'NetBanking',
    milestones: [
      {
        id: 'ms-21',
        title: 'Milestone 1: Trench Digging & Foundation Plinth Beam',
        percentage: 35,
        amount: 16800,
        status: 'in_progress',
        description: '3 feet excavation, PCC bed, steel binding and foundation pouring.',
        dueDate: '22 Sep 2026'
      },
      {
        id: 'ms-22',
        title: 'Milestone 2: 9-inch Brickwork up to 6 Feet Height',
        percentage: 40,
        amount: 19200,
        status: 'locked',
        description: 'Brick masonry with cement mortar 1:5 ratio and curing for 5 days.',
        dueDate: '26 Sep 2026'
      },
      {
        id: 'ms-23',
        title: 'Milestone 3: Sand Cement Plaster & Coping Finish',
        percentage: 25,
        amount: 12000,
        status: 'locked',
        description: '12mm smooth exterior plaster with water groove and site cleaning.',
        dueDate: '29 Sep 2026'
      }
    ]
  }
];

export const RATE_INDEX = [
  { item: 'Rajmistri (Mason) Daily Wage', rate: '₹900 - ₹1,200', unit: 'per day (8 hrs)', city: 'Delhi / NCR' },
  { item: 'Beldar / Helper (Unskilled Labor)', rate: '₹550 - ₹650', unit: 'per day (8 hrs)', city: 'Delhi / NCR' },
  { item: 'Interior Painting (Emulsion)', rate: '₹12 - ₹20', unit: 'per sq.ft (Labor only)', city: 'Pan India' },
  { item: 'Tile / Marble Flooring Laying', rate: '₹22 - ₹35', unit: 'per sq.ft (Labor only)', city: 'Metro Cities' },
  { item: 'Concealed Electrical Point', rate: '₹120 - ₹180', unit: 'per switch/socket point', city: 'North & West India' },
  { item: 'Plumbing Bathroom Rough-in', rate: '₹3,500 - ₹5,500', unit: 'per complete bathroom', city: 'Tier 1 & 2' },
  { item: 'POP False Ceiling (Gyproc)', rate: '₹75 - ₹110', unit: 'per sq.ft (Labor + Material)', city: 'Metro Cities' },
  { item: 'Modular Kitchen Carpentry', rate: '₹1,200 - ₹1,600', unit: 'per running sq.ft', city: 'Mumbai / Pune / Delhi' }
];

export const CITIES_LIST = [
  'All Cities',
  'Delhi NCR',
  'Mumbai',
  'Bengaluru',
  'Jaipur',
  'Lucknow',
  'Hyderabad',
  'Pune',
  'Patna',
  'Ahmedabad',
  'Chandigarh'
];

export const TRADE_CATEGORIES = [
  'All Trades',
  'Rajmistri / Mason',
  'Electrician',
  'Plumber',
  'Carpenter / Badhai',
  'Painter & Polish',
  'Tile & Marble Specialist',
  'Fabricator & Welder',
  'General Thekedaar',
  'POP & False Ceiling',
  'Labor / Helper Supplier'
];

export const SUPPORT_CONTACT_INFO = {
  primaryEmail: 'digitalthekedaar4@gmail.com',
  helplinePhone: '1800-THEKEDAAR (Toll-Free)',
  alternatePhone: '+91 11 4567 8900',
  supportHours: 'Monday - Saturday: 8:00 AM – 8:00 PM IST',
  emergencySupport: '24/7 Escrow & Site Dispute Assistance',
  headquarters: 'Digital Thekedaar Technologies Pvt. Ltd., Connaught Place, New Delhi 110001, India'
};

export const FAQS_LIST = [
  {
    id: 'faq-1',
    category: 'hiring',
    questionEn: 'How does Digital Thekedaar connect hirers with authentic craftsmen?',
    questionHi: 'डिजिटल ठेकेदार मकान मालिकों और असली कारीगरों को कैसे जोड़ता है?',
    answerEn: 'Digital Thekedaar eliminates middlemen and contractor cuts. You can directly browse verified Rajmistris, Carpenters, Plumbers, and Electricians, view their government-verified DigiLocker badges, check previous site photos, call or chat directly, and request a free on-site estimate.',
    answerHi: 'डिजिटल ठेकेदार बीच के दलालों और कमीशन को पूरी तरह खत्म करता है। आप सीधे डिजीलॉकर और पुलिस सत्यापित मिस्त्रियों की प्रोफाइल देख सकते हैं, पिछले काम की तस्वीरें देख सकते हैं, सीधे कॉल/चैट कर सकते हैं और मुफ्त साइट विजिट बुक कर सकते हैं।'
  },
  {
    id: 'faq-2',
    category: 'escrow',
    questionEn: 'What is Thekedaar Suraksha Escrow and how does it protect my funds?',
    questionHi: 'ठेकेदार सुरक्षा एस्क्रो क्या है और यह मेरे पैसों को कैसे सुरक्षित रखता है?',
    answerEn: 'Under Thekedaar Suraksha Escrow, your payment is held securely in an RBI-compliant escrow vault. It is NEVER released in advance. Money is only transferred to the craftsman when you inspect the finished work stage (e.g. 25% foundation, 50% brickwork, 25% final finish) and click "Approve Milestone".',
    answerHi: 'ठेकेदार सुरक्षा एस्क्रो के तहत आपका पैसा सुरक्षित बैंक एस्क्रो वॉलेट में सुरक्षित रहता है। कारीगर को कभी भी एडवांस नहीं जाता। जब आप खुद काम का निरीक्षण (जैसे 25% चिनाई, 50% प्लास्टर) करके "Approve Milestone" दबाते हैं, तभी पैसा रिलीज होता है।'
  },
  {
    id: 'faq-3',
    category: 'safety',
    questionEn: 'How are workers verified on the platform?',
    questionHi: 'प्लेटफ़ॉर्म पर कारीगरों का सत्यापन (KYC) कैसे किया जाता है?',
    answerEn: 'Every verified Thekedaar undergoes a multi-layer verification: 1) Aadhaar authentication via DigiLocker, 2) District Police Clearance Verification, 3) Technical Skill assessment, and 4) Mobile OTP linkage. Profiles with the blue shield badge are 100% authenticated.',
    answerHi: 'हर सत्यापित कारीगर का बहु-स्तरीय सत्यापन होता है: 1) डिजीलॉकर द्वारा आधार कार्ड प्रमाणीकरण, 2) स्थानीय पुलिस चरित्र सत्यापन, 3) हुनर व काम के पिछले रिकॉर्ड की जांच, 4) फोन नंबर वेरिफिकेशन। नीले शील्ड बैज वाले प्रोफाइल पूर्णतः प्रमाणित हैं।'
  },
  {
    id: 'faq-4',
    category: 'workers',
    questionEn: 'Are there any commission cuts taken from the worker\'s hard-earned daily wage?',
    questionHi: 'क्या कारीगर की मेहनत की दिहाड़ी में से कोई कमीशन काटा जाता है?',
    answerEn: 'Zero (0%) commission! Our core founding principle is that every rupee earned with physical labor belongs 100% to the mistri and laborer. We do not deduct any percentage from their wages or contract payouts.',
    answerHi: 'शून्य (0%) कमीशन! हमारे संस्थापक का स्पष्ट संकल्प है कि पसीने की कमाई का एक भी रुपया दलाली में नहीं कटना चाहिए। ठेकेदार या मजदूर की दिहाड़ी या एस्क्रो भुगतान से कोई कमीशन नहीं लिया जाता।'
  },
  {
    id: 'faq-5',
    category: 'escrow',
    questionEn: 'What happens if there is a delay or dispute regarding work quality?',
    questionHi: 'यदि काम की गुणवत्ता या समय पर पूरा होने में कोई विवाद हो तो क्या होगा?',
    answerEn: 'If work does not meet agreed specifications, the hirer can pause the milestone release. Our dedicated Dispute Resolution Team (reach out at digitalthekedaar4@gmail.com or helpline) will review site photos, dispatch a neutral site inspector if required, and fairly refund or re-align the contract.',
    answerHi: 'यदि काम तय मानकों के अनुसार नहीं है, तो आप माइलस्टोन पेमेंट रोक सकते हैं। हमारी विवाद निवारण टीम (digitalthekedaar4@gmail.com) साइट की तस्वीरें व एग्रीमेंट की समीक्षा कर निष्पक्ष मध्यस्थता और समाधान प्रदान करती है।'
  },
  {
    id: 'faq-6',
    category: 'general',
    questionEn: 'How can I contact the Founder or the Executive Support Team?',
    questionHi: 'मैं संस्थापक या सपोर्ट टीम से सीधे कैसे संपर्क कर सकता हूँ?',
    answerEn: 'You can email directly at digitalthekedaar4@gmail.com or raise a ticket through the Support Center. Founder Manav Arora and our operations cell review every inquiry within 2–4 hours.',
    answerHi: 'आप सीधे digitalthekedaar4@gmail.com पर ईमेल भेज सकते हैं या सपोर्ट पोर्टल पर टिकट दर्ज कर सकते हैं। संस्थापक मानव अरोड़ा और हमारी टीम 2-4 घंटे में हर प्रश्न का समाधान करती है।'
  }
];

export const INITIAL_SUPPORT_INQUIRIES = [
  {
    id: 'inq-101',
    senderName: 'Virender Sharma',
    email: 'virender.sharma@gmail.com',
    phone: '+91 98114 98210',
    category: 'Escrow & Payments' as const,
    subject: 'Requesting milestone 2 inspection clarification for Villa project',
    message: 'We funded ₹75,000 for tile flooring in Greater Noida. The tiles are installed and grouting is in progress. How do I split the final 10% polishing milestone?',
    createdAt: 'Today at 11:20 AM',
    status: 'new' as const,
    priority: 'high' as const,
    assignedTo: 'Manav Arora (Founder)'
  },
  {
    id: 'inq-102',
    senderName: 'Mohd. Farooq (Carpenter Thekedaar)',
    email: 'farooq.woodworks@gmail.com',
    phone: '+91 97182 44321',
    category: 'Worker KYC & Verification' as const,
    subject: 'Uploaded Police Verification certificate from Meerut district',
    message: 'I have uploaded my scanned police clearance certificate from Meerut. Please approve my golden verified shield so I can bid on commercial renovation contracts.',
    createdAt: 'Yesterday at 4:45 PM',
    status: 'in_progress' as const,
    priority: 'medium' as const,
    assignedTo: 'KYC Operations'
  },
  {
    id: 'inq-103',
    senderName: 'Pooja Singhania',
    email: 'pooja.singhania@yahoo.co.in',
    phone: '+91 99583 11290',
    category: 'Hiring Assistance' as const,
    subject: 'Need full turnkey team for 2BHK painting & false ceiling in Rohini',
    message: 'Looking for a reliable team with high quality Royale paint experience. Site visit requested for this coming Sunday at 11 AM.',
    createdAt: '18 Sep 2026',
    status: 'resolved' as const,
    priority: 'medium' as const,
    assignedTo: 'Lead Matching Desk'
  }
];

