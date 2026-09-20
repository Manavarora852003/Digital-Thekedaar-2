import React, { useState, useMemo } from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  Eye, 
  Wrench, 
  Users, 
  CreditCard,
  Check,
  Sparkles,
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { WorkerProfile, Language, SortOption } from '../types';
import { POPULAR_SKILLS, CITIES_LIST } from '../data/mockData';

interface WorkerDirectoryProps {
  workers: WorkerProfile[];
  language: Language;
  onSelectWorker: (worker: WorkerProfile, initialTab?: 'overview' | 'kyc' | 'photos' | 'reviews') => void;
  onStartChat: (worker: WorkerProfile) => void;
  onBookSiteVisit: (worker: WorkerProfile) => void;
  onStartEscrow: (worker: WorkerProfile) => void;
  onOpenRateReview?: (worker: WorkerProfile) => void;
}

export const WorkerDirectory: React.FC<WorkerDirectoryProps> = ({
  workers,
  language,
  onSelectWorker,
  onStartChat,
  onBookSiteVisit,
  onStartEscrow,
  onOpenRateReview
}) => {
  const isHindi = language === 'hi';

  // Comprehensive Search & Filter States
  const [keyword, setKeyword] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('rating_desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: isHindi ? 'सभी कारीगर' : 'All Categories' },
    { id: 'Rajmistri / Mason', label: isHindi ? 'राजमिस्त्री' : 'Mason (Rajmistri)' },
    { id: 'Painter & Polish', label: isHindi ? 'पेंटर' : 'Painter & Polish' },
    { id: 'Electrician', label: isHindi ? 'इलेक्ट्रीशियन' : 'Electrician' },
    { id: 'Carpenter / Badhai', label: isHindi ? 'बढ़ई' : 'Carpenter' },
    { id: 'General Thekedaar', label: isHindi ? 'जनरल ठेकेदार' : 'General Thekedaar' },
    { id: 'Plumber', label: isHindi ? 'प्लंबर' : 'Plumber' },
    { id: 'POP & False Ceiling', label: isHindi ? 'पीओपी / सीलिंग' : 'POP & False Ceiling' },
    { id: 'Labor / Helper Supplier', label: isHindi ? 'लेबर सप्लायर' : 'Labor Supplier' }
  ];

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedCity('all');
    setSelectedTrade('all');
    setSelectedSkills([]);
    setAvailabilityFilter('all');
    setMinRating(0);
    setSortBy('rating_desc');
  };

  const hasActiveFilters = 
    keyword.trim() !== '' || 
    selectedCity !== 'all' || 
    selectedTrade !== 'all' || 
    selectedSkills.length > 0 || 
    availabilityFilter !== 'all' || 
    minRating > 0;

  // Filter and Sort Worker List
  const filteredAndSortedWorkers = useMemo(() => {
    let result = workers.filter(worker => {
      // 1. Keyword search (name, nameHindi, trade, bio, tools, skills, area, city)
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchName = worker.name.toLowerCase().includes(q) || worker.nameHindi.includes(q);
        const matchTrade = worker.trade.toLowerCase().includes(q);
        const matchArea = worker.area.toLowerCase().includes(q) || worker.city.toLowerCase().includes(q);
        const matchBio = worker.bio.toLowerCase().includes(q) || (worker.bioHindi && worker.bioHindi.includes(q));
        const matchTools = worker.toolsEquipment?.some(t => t.toLowerCase().includes(q));
        const matchSkills = worker.skills?.some(s => s.toLowerCase().includes(q));

        if (!matchName && !matchTrade && !matchArea && !matchBio && !matchTools && !matchSkills) {
          return false;
        }
      }

      // 2. City filter
      if (selectedCity !== 'all') {
        if (!worker.city.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // 3. Trade category filter
      if (selectedTrade !== 'all') {
        if (worker.trade !== selectedTrade) {
          return false;
        }
      }

      // 4. Required Skills filter (must have all selected skills)
      if (selectedSkills.length > 0) {
        const workerSkillSet = new Set((worker.skills || []).map(s => s.toLowerCase()));
        const hasAllSkills = selectedSkills.every(reqSkill => 
          workerSkillSet.has(reqSkill.toLowerCase())
        );
        if (!hasAllSkills) {
          return false;
        }
      }

      // 5. Availability Dates / Window filter
      if (availabilityFilter !== 'all') {
        if (availabilityFilter === 'immediate') {
          if (!worker.availableNow && worker.availability !== 'immediate') return false;
        } else if (availabilityFilter === 'this_week') {
          if (worker.availability === 'next_15_days') return false;
        } else if (availabilityFilter === 'next_15_days') {
          // includes all
        }
      }

      // 6. Minimum User Rating
      if (minRating > 0) {
        if (worker.rating < minRating) {
          return false;
        }
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating_desc':
          return b.rating - a.rating;
        case 'experience_desc':
          return b.experienceYears - a.experienceYears;
        case 'wage_asc':
          return a.dailyWage - b.dailyWage;
        case 'wage_desc':
          return b.dailyWage - a.dailyWage;
        case 'completed_desc':
          return b.completedProjects - a.completedProjects;
        case 'reviews_desc':
          return (b.reviewCount || b.reviews?.length || 0) - (a.reviewCount || a.reviews?.length || 0);
        default:
          return b.rating - a.rating;
      }
    });

    return result;
  }, [workers, keyword, selectedCity, selectedTrade, selectedSkills, availabilityFilter, minRating, sortBy]);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Search & Filter Command Center */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
        
        {/* Top Title & Quick Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <span>{isHindi ? 'सत्यापित कारीगर व ठेकेदार खोजें' : 'Search & Filter Verified Thekedaars'}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                {filteredAndSortedWorkers.length} {isHindi ? 'उपलब्ध' : 'Found'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isHindi 
                ? 'कीवर्ड, लोकेशन, कौशल, रेटिंग और उपलब्धता के अनुसार सर्वोत्तम ठेकेदार चुनें।'
                : 'Filter craftsmen by trade keywords, location, skills, live availability, and client ratings.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                showAdvancedFilters || hasActiveFilters
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isHindi ? 'उन्नत फिल्टर' : 'Filters'}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isHindi ? 'रीसेट' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Filter Bar: Search Input + Location + Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-5">
          
          {/* 1. Keyword search (6 cols) */}
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={
                isHindi 
                  ? 'खोजें: प्लंबर, इलेक्ट्रीशियन, टाइल, मार्बल, फॉल्स सीलिंग...' 
                  : 'Search by keyword (e.g. plumber, electrician, marble, modular kitchen)...'
              }
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2. City Filter (3 cols) */}
          <div className="sm:col-span-3 relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">{isHindi ? 'सभी शहर (All Cities)' : 'All Cities'}</option>
              {CITIES_LIST.filter(c => c !== 'All Cities').map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* 3. Sort By Dropdown (3 cols) */}
          <div className="sm:col-span-3 relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer appearance-none font-medium"
            >
              <option value="rating_desc">⭐ {isHindi ? 'उच्चतम रेटिंग (Highest Rated)' : 'Highest Rated'}</option>
              <option value="experience_desc">🏆 {isHindi ? 'सर्वाधिक अनुभव (Most Exp.)' : 'Most Experienced'}</option>
              <option value="wage_asc">💰 {isHindi ? 'दैनिक दर: कम से ज्यादा' : 'Daily Wage: Low to High'}</option>
              <option value="wage_desc">💎 {isHindi ? 'दैनिक दर: ज्यादा से कम' : 'Daily Wage: High to Low'}</option>
              <option value="completed_desc">🏗️ {isHindi ? 'सर्वाधिक पूर्ण प्रोजेक्ट्स' : 'Most Completed Projects'}</option>
              <option value="reviews_desc">💬 {isHindi ? 'सर्वाधिक समीक्षाएं' : 'Most Customer Reviews'}</option>
            </select>
          </div>

        </div>

        {/* Category Quick Pills */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedTrade(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTrade === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Expandable Drawer (Skills, Rating, Availability) */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-4 animate-fadeIn">
            
            {/* Row: Availability & Minimum Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Availability Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isHindi ? 'उपलब्धता स्थिति (Availability Window)' : 'Availability Window'}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setAvailabilityFilter('all')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      availabilityFilter === 'all'
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'सभी' : 'Any Date'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvailabilityFilter('immediate')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      availabilityFilter === 'immediate'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isHindi ? 'तत्काल' : 'Immediate'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvailabilityFilter('this_week')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      availabilityFilter === 'this_week'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isHindi ? 'इस सप्ताह' : 'This Week'}
                  </button>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{isHindi ? 'न्यूनतम ग्राहक रेटिंग (Customer Rating)' : 'Minimum Client Rating'}</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { val: 0, label: isHindi ? 'सभी' : 'All' },
                    { val: 4.0, label: '4.0+ ★' },
                    { val: 4.5, label: '4.5+ ★' },
                    { val: 4.8, label: '4.8+ ★ Top' }
                  ].map(r => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setMinRating(r.val)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                        minRating === r.val
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Required Skills Multi-select Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isHindi ? 'आवश्यक विशिष्ट कौशल (Filter by Required Skills)' : 'Required Skills & Specializations'}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({selectedSkills.length} selected)
                </span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SKILLS.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : <span>+</span>}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Active Filters Display Row */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">
              {isHindi ? 'सक्रिय फिल्टर:' : 'Active Filters:'}
            </span>

            {keyword && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                Keyword: "{keyword}"
                <button onClick={() => setKeyword('')} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCity !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                City: {selectedCity}
                <button onClick={() => setSelectedCity('all')} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedTrade !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                Trade: {selectedTrade}
                <button onClick={() => setSelectedTrade('all')} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-medium">
                Rating: {minRating}+ ★
                <button onClick={() => setMinRating(0)} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {availabilityFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-medium">
                {availabilityFilter === 'immediate' ? 'Available Immediate' : 'Available This Week'}
                <button onClick={() => setAvailabilityFilter('all')} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSkills.map(skill => (
              <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-medium">
                Skill: {skill}
                <button onClick={() => handleToggleSkill(skill)} className="hover:text-rose-500 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Grid of Filtered Workers */}
      {filteredAndSortedWorkers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {isHindi ? 'कोई कारीगर आपके फिल्टर से मेल नहीं खाता' : 'No craftsmen match your specific criteria'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            {isHindi 
              ? 'कृपया कीवर्ड, शहर या कौशल फिल्टर बदलकर दोबारा खोजें या फिल्टर रीसेट करें।' 
              : 'Try broadening your search keyword, adjusting the city filter, or clearing the required skills.'}
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            {isHindi ? 'सभी फिल्टर रीसेट करें' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedWorkers.map(worker => (
            <div
              key={worker.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:border-amber-400"
            >
              {/* Card Header with Avatar & Core info */}
              <div className="p-5 pb-3">
                <div className="flex items-start gap-4">
                  {/* Avatar with verified check badge */}
                  <div className="relative shrink-0">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 group-hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => onSelectWorker(worker)}
                    />
                    {worker.availableNow ? (
                      <span 
                        className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-bold shadow-sm flex items-center gap-0.5"
                        title="Available for immediate work"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span 
                        className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold shadow-sm"
                        title="Available soon"
                      >
                        Booked
                      </span>
                    )}
                    {worker.isAadhaarVerified && (
                      <div 
                        className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white"
                        title="DigiLocker Aadhaar & Police Verified"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Worker Title, Trade and Rating */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 
                        onClick={() => onSelectWorker(worker)}
                        className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate cursor-pointer font-heading"
                      >
                        {isHindi ? worker.nameHindi : worker.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                      <p className="text-xs font-semibold text-amber-800 bg-amber-50 inline-block px-2 py-0.5 rounded-md">
                        {worker.trade}
                      </p>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {worker.availability === 'immediate' ? '🟢 Immediate' : '🟡 This Week'}
                      </span>
                    </div>

                    {/* Star Rating & Reviews (Clickable to open Reviews Tab) */}
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                      <button
                        onClick={() => onSelectWorker(worker, 'reviews')}
                        className="flex items-center text-amber-500 font-bold hover:underline cursor-pointer"
                        title="View client reviews"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-1" />
                        <span>{worker.rating}</span>
                        <span className="text-slate-400 text-[10px] ml-1">
                          ({worker.reviewCount || worker.reviews?.length || 0})
                        </span>
                      </button>
                      <span>•</span>
                      <span className="font-medium text-slate-700">
                        {worker.experienceYears} {isHindi ? 'वर्ष अनुभव' : 'yrs exp'}
                      </span>
                    </div>

                    {/* City & Area */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{worker.area}, {worker.city}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Verification Pill */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{worker.verificationScore}% KYC Trust</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>Team: {worker.teamSize} {isHindi ? 'कारीगर' : 'crew'}</span>
                  </div>
                </div>

                {/* Rate Card Highlight */}
                <div className="mt-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {isHindi ? 'दैनिक मजदूरी' : 'Standard Daily Wage'}
                    </span>
                    <p className="text-xs font-bold text-slate-800 truncate mt-0.5">
                      ₹{worker.dailyWage} / day
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Escrow Ready
                  </span>
                </div>

                {/* Skills Tags Preview */}
                {worker.skills && worker.skills.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {worker.skills.slice(0, 3).map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/60 text-amber-900 text-[10px] font-medium"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                    {worker.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{worker.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Bio snippet */}
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {isHindi ? worker.bioHindi : worker.bio}
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="mt-auto p-3 pt-2 bg-slate-50/80 border-t border-slate-100 grid grid-cols-4 gap-1.5">
                
                {/* 1. Direct Real-Time Chat */}
                <button
                  onClick={() => onStartChat(worker)}
                  className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
                  title="Chat directly"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isHindi ? 'चैट' : 'Chat'}</span>
                </button>

                {/* 2. Book Site Visit */}
                <button
                  onClick={() => onBookSiteVisit(worker)}
                  className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold hover:bg-slate-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
                  title="Request Site Inspection"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>{isHindi ? 'विजिट' : 'Visit'}</span>
                </button>

                {/* 3. Rate & Review Button */}
                {onOpenRateReview && (
                  <button
                    onClick={() => onOpenRateReview(worker)}
                    className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
                    title="Leave a review"
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{isHindi ? 'रेटिंग' : 'Rate'}</span>
                  </button>
                )}

                {/* 4. View Full Portfolio / Profile */}
                <button
                  onClick={() => onSelectWorker(worker)}
                  className="inline-flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold active:scale-95 transition-all shadow-sm cursor-pointer"
                  title="View complete KYC & past projects"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'प्रोफाइल' : 'Profile'}</span>
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
