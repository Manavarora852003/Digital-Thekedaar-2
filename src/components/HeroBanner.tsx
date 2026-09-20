import React from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  HardHat, 
  Users, 
  Clock, 
  Award,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Role, Language } from '../types';
import { CITIES_LIST, TRADE_CATEGORIES } from '../data/mockData';

interface HeroBannerProps {
  currentRole: Role;
  language: Language;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  selectedTrade: string;
  onSelectTrade: (trade: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  verifiedOnly: boolean;
  onToggleVerifiedOnly: () => void;
  onOpenPostJob: () => void;
  onOpenVerification: () => void;
  onOpenEscrow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  currentRole,
  language,
  selectedCity,
  onSelectCity,
  selectedTrade,
  onSelectTrade,
  searchQuery,
  onSearchChange,
  verifiedOnly,
  onToggleVerifiedOnly,
  onOpenPostJob,
  onOpenVerification,
  onOpenEscrow
}) => {
  const isHindi = language === 'hi';

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-700/60">
      {/* Subtle blueprint grid pattern background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px'
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/90 border border-amber-500/30 text-xs sm:text-sm text-slate-200 shadow-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
            <span className="text-amber-400 font-semibold">
              {isHindi ? 'नया अपडेट:' : 'India First:'}
            </span>
            <span>
              {isHindi 
                ? 'डिजिटल एस्क्रो से पैसा सुरक्षित — काम पूरा होने पर ही भुगतान' 
                : 'Escrow Milestone Guarantee — Pay only when work is approved'}
            </span>
            <button
              onClick={onOpenEscrow}
              className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer ml-1"
            >
              {isHindi ? 'नियम देखें' : 'Learn How'}
            </button>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-tight text-white">
            {currentRole === 'hirer' ? (
              isHindi ? (
                <>
                  सत्यापित <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">मिस्त्री व ठेकेदार</span> सीधे अपने शहर में खोजें
                </>
              ) : (
                <>
                  Hire Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Thekedaars & Labor</span> With 100% Escrow Safety
                </>
              )
            ) : (
              isHindi ? (
                <>
                  अपने हुनर का <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">सही दाम पाएं</span> — सीधे ग्राहक से जुड़ें
                </>
              ) : (
                <>
                  Get Direct Contracts & Work Leads With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Guaranteed Payments</span>
                </>
              )
            )}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {currentRole === 'hirer' ? (
              isHindi 
                ? 'राजमिस्त्री, बिजली मिस्त्री, पेंटर, बढ़ई, प्लंबर और फुल होम कंस्ट्रक्शन ठेकेदार। आधार वेरीफाइड प्रोफाइल, लाइव चैट, और माइलस्टोन आधारित पेमेंट।'
                : 'Connect directly with background-checked masons, painters, electricians, carpenters, and civil contractors. Chat live, review portfolios, and pay milestone-by-milestone.'
            ) : (
              isHindi
                ? 'बिना किसी दलाल के सीधे घर मालिकों से काम पाएं। अपना आधार व अनुभव वेरीफाई कराएं और सुरक्षित बैंक भुगतान पाएं।'
                : 'Zero commission for workers. Upload your Aadhaar & trade certificate, chat directly with homeowners, and get advance escrow payments into your bank.'
            )}
          </p>
        </div>

        {/* Primary Search / Filter Widget */}
        <div className="max-w-4xl mx-auto bg-slate-800/95 border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Trade Selector */}
            <div className="sm:col-span-4 relative">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
                {isHindi ? 'कारीगर / काम का प्रकार' : 'Trade / Skill Required'}
              </label>
              <div className="relative">
                <HardHat className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none" />
                <select
                  value={selectedTrade}
                  onChange={(e) => onSelectTrade(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
                >
                  {TRADE_CATEGORIES.map((trade) => (
                    <option key={trade} value={trade} className="bg-slate-900 text-white">
                      {trade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Selector */}
            <div className="sm:col-span-3 relative">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
                {isHindi ? 'शहर / लोकेशन' : 'City / Location'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sky-400 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => onSelectCity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city} className="bg-slate-900 text-white">
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword / Area Search */}
            <div className="sm:col-span-5 relative">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 px-1">
                {isHindi ? 'क्षेत्र या कीवर्ड खोजें' : 'Search by Area or Keyword'}
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={isHindi ? 'उदा: नोएडा सेक्टर 62, टाइल, पुट्टी...' : 'e.g. Noida 62, Plaster, Modular...'}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

          </div>

          {/* Sub-row: Quick filters and actions */}
          <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={onToggleVerifiedOnly}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 border-slate-600 bg-slate-900"
                />
                <span className="flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {isHindi ? 'केवल आधार व पुलिस सत्यापित (Verified)' : 'Show Verified Only ✅'}
                </span>
              </label>
            </div>

            {/* Direct Contextual CTA */}
            <div className="flex items-center gap-2">
              {currentRole === 'hirer' ? (
                <button
                  onClick={onOpenPostJob}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <span>{isHindi ? '+ नया टेंडर / काम पोस्ट करें' : '+ Post Custom Requirement'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onOpenVerification}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'वेरीफाइड बैच प्राप्त करें' : 'Get Verified Badge'}</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Trust Badges Ribbon */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {isHindi ? 'आधार व पुलिस जांच' : '100% KYC Verified'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isHindi ? 'डिजिलॉकर से प्रमाणीकरण' : 'DigiLocker Certified'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {isHindi ? 'एस्क्रो सुरक्षित पेमेंट' : 'Escrow Protected'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isHindi ? 'काम पूरा होने पर ही रिलीज' : 'Pay after work approval'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {isHindi ? 'लाइव चैट व साइट विजिट' : 'Live Chat & Site Visit'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isHindi ? 'सीधे बातचीत व मोलभाव' : 'Direct interaction'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {isHindi ? '0% दलाली कमीशन' : 'Zero Middleman Fee'}
              </p>
              <p className="text-[11px] text-slate-400">
                {isHindi ? 'कारीगरों को पूरा मेहनताना' : 'Full earnings to workers'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
