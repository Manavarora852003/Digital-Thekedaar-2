import React, { useState } from 'react';
import { 
  HardHat, 
  ShieldCheck, 
  MessageSquare, 
  CreditCard, 
  PlusCircle, 
  Calculator, 
  Globe, 
  UserCheck, 
  Briefcase, 
  CheckCircle2, 
  Menu, 
  X,
  Sparkles,
  PhoneCall,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  User as UserIcon,
  KeyRound
} from 'lucide-react';
import { Role, Language, User } from '../types';

interface NavbarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPostJob: () => void;
  onOpenChat: () => void;
  onOpenVerification: () => void;
  onOpenEscrow: () => void;
  onOpenCalculator: () => void;
  onOpenAdmin?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadChatCount: number;
  currentUser?: User | null;
  onOpenAuth: (mode?: 'login' | 'register' | 'admin_verify') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  language,
  onLanguageChange,
  onOpenPostJob,
  onOpenChat,
  onOpenVerification,
  onOpenEscrow,
  onOpenCalculator,
  onOpenAdmin,
  activeTab,
  setActiveTab,
  unreadChatCount,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isHindi = language === 'hi';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-lg backdrop-blur-md bg-opacity-95">
      {/* Top micro-bar: Trust & Support info */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-1 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isHindi ? '100% आधार व पुलिस सत्यापित ठेकेदार' : '100% Aadhaar & Police Verified Thekedaars'}
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isHindi ? 'ठेकेदार सुरक्षा एस्क्रो (पैसा सुरक्षित)' : 'Thekedaar Suraksha Escrow Protected'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <button 
              onClick={() => scrollToSection('founder-message')}
              className="hidden md:inline-block text-slate-400 hover:text-amber-400 transition-colors"
            >
              {isHindi ? 'संस्थापक संदेश' : 'Founder Note'}
            </button>
            <span className="hidden md:inline text-slate-700">•</span>
            <button 
              onClick={() => scrollToSection('support-faqs')}
              className="hidden md:inline-block text-slate-400 hover:text-amber-400 transition-colors"
            >
              {isHindi ? 'सपोर्ट व FAQs' : 'Support & FAQs'}
            </button>
            <span className="hidden md:inline text-slate-700">•</span>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer shadow-sm ${
                  currentUser?.role === 'admin'
                    ? 'bg-amber-500 text-slate-950 border border-amber-400 font-black'
                    : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40'
                }`}
                title={currentUser?.role === 'admin' ? 'Open Admin Console (Authenticated)' : 'Open Admin Portal (Security Verification Required)'}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentUser?.role === 'admin' ? (isHindi ? 'व्यवस्थापक 🛡️' : 'Admin 🛡️') : (isHindi ? 'एडमिन 🔒' : 'Admin 🔒')}</span>
              </button>
            )}

            <button
              onClick={() => onLanguageChange(isHindi ? 'en' : 'hi')}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3 h-3" />
              <span>{isHindi ? 'English' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <HardHat className="w-6 h-6 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Digital<span className="text-amber-500">Thekedaar</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">
                {isHindi ? 'भरोसा भी, काम भी' : 'India\'s Trusted Labor & Contract Network'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'explore'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {currentRole === 'hirer' 
                ? (isHindi ? 'कारीगर खोजें' : 'Find Thekedaars') 
                : (isHindi ? 'काम के अवसर' : 'Job Leads')}
            </button>

            <button
              onClick={onOpenChat}
              className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-slate-800 text-amber-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isHindi ? 'लाइव चैट' : 'Live Chat'}</span>
              {unreadChatCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {unreadChatCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenEscrow}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-all"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? 'सुरक्षित एस्क्रो' : 'Escrow Payments'}</span>
            </button>

            <button
              onClick={onOpenVerification}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-all"
            >
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span>{isHindi ? 'प्रोफाइल वेरिफिकेशन (KYC)' : 'KYC Verification'}</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1.5 transition-all"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'रेट कैलकुलेटर' : 'Rate Index'}</span>
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => onRoleChange('hirer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentRole === 'hirer'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{isHindi ? 'काम देना है (Hirer)' : 'I Want to Hire'}</span>
              </button>
              <button
                onClick={() => onRoleChange('worker')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentRole === 'worker'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>{isHindi ? 'काम चाहिए (Worker)' : 'I am Thekedaar'}</span>
              </button>
            </div>

            {/* Primary Action Button based on Role */}
            {currentRole === 'hirer' ? (
              <button
                onClick={onOpenPostJob}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isHindi ? 'काम पोस्ट करें' : 'Post Requirement'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenVerification}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isHindi ? 'KYC पूरा करें' : 'Get Verified ✅'}</span>
              </button>
            )}

            {/* Authentication & User Profile Section */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 transition-all cursor-pointer group"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center overflow-hidden">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{currentUser.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold leading-tight flex items-center gap-1">
                      <span>{currentUser.name.split(' ')[0]}</span>
                      {currentUser.role === 'admin' && <span className="text-[10px] text-amber-400">🛡️</span>}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize">
                      {currentUser.role === 'admin' ? 'Admin' : currentUser.role}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 text-slate-100 animate-in fade-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{currentUser.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          currentUser.role === 'admin' 
                            ? 'bg-amber-500 text-slate-950' 
                            : currentUser.role === 'worker'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email || currentUser.phone}</p>
                      {currentUser.trade && (
                        <p className="text-[11px] text-amber-400 mt-1 font-medium">🛠️ {currentUser.trade}</p>
                      )}
                    </div>

                    <div className="space-y-1 text-xs">
                      {currentUser.role === 'admin' && onOpenAdmin && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenAdmin();
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            <span>{isHindi ? 'सेंट्रल एडमिन कंसोल' : 'Admin Control Center'}</span>
                          </span>
                          <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">Live</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onRoleChange(currentRole === 'hirer' ? 'worker' : 'hirer');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        {currentRole === 'hirer' ? <HardHat className="w-4 h-4 text-amber-400" /> : <Briefcase className="w-4 h-4 text-amber-400" />}
                        <span>{isHindi ? 'मोड बदलें' : 'Switch Mode'}: {currentRole === 'hirer' ? 'Worker Mode' : 'Hirer Mode'}</span>
                      </button>

                      {currentRole === 'hirer' ? (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenPostJob();
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <PlusCircle className="w-4 h-4 text-amber-400" />
                          <span>{isHindi ? 'नया काम पोस्ट करें' : 'Post Requirement'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenVerification();
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span>{isHindi ? 'मेरी वेरिफिकेशन (KYC)' : 'My KYC Verification'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenEscrow();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <CreditCard className="w-4 h-4 text-sky-400" />
                        <span>{isHindi ? 'मेरे एस्क्रो अनुबंध' : 'My Escrow Contracts'}</span>
                      </button>

                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{isHindi ? 'लॉग आउट (Sign Out)' : 'Sign Out'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'लॉग इन' : 'Sign In'}</span>
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'रजिस्टर' : 'Register'}</span>
                </button>
              </div>
            )}

          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            {!currentUser ? (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold shadow-sm"
              >
                {isHindi ? 'लॉगिन' : 'Login'}
              </button>
            ) : (
              <div 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center cursor-pointer"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            <button
              onClick={() => onRoleChange(currentRole === 'hirer' ? 'worker' : 'hirer')}
              className="px-2 py-1 rounded-lg bg-slate-800 text-amber-400 text-xs font-medium border border-slate-700"
            >
              {currentRole === 'hirer' ? 'Hirer' : 'Worker'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3 animate-in fade-in">
          
          {/* Mobile User Profile or Auth Prompt */}
          {currentUser ? (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{currentUser.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                      {currentUser.role.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{currentUser.email || currentUser.phone}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
                className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-950/60"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="py-2 text-center text-xs font-bold rounded-lg bg-amber-500 text-slate-950 shadow-sm"
              >
                {isHindi ? 'लॉग इन (Login)' : 'Sign In'}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="py-2 text-center text-xs font-bold rounded-lg bg-slate-800 text-amber-300 border border-slate-700"
              >
                {isHindi ? 'रजिस्टर (Register)' : 'Register'}
              </button>
            </div>
          )}

          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400">
              {isHindi ? 'आपकी भूमिका चुनें:' : 'Select Your Mode:'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { onRoleChange('hirer'); setIsMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  currentRole === 'hirer' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Hirer
              </button>
              <button
                onClick={() => { onRoleChange('worker'); setIsMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  currentRole === 'worker' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Worker
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setActiveTab('explore'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-sm font-medium text-slate-200"
            >
              {currentRole === 'hirer' ? '🔍 Find Workers' : '💼 Job Leads'}
            </button>
            <button
              onClick={() => { onOpenChat(); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-sm font-medium text-slate-200 flex items-center justify-between"
            >
              <span>💬 Live Chat</span>
              {unreadChatCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {unreadChatCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { onOpenEscrow(); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-sm font-medium text-slate-200"
            >
              🛡️ Safe Escrow
            </button>
            <button
              onClick={() => { onOpenVerification(); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-sm font-medium text-slate-200"
            >
              ✅ KYC Badges
            </button>
            <button
              onClick={() => { onOpenCalculator(); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-sm font-medium text-slate-200"
            >
              📐 Rate Index
            </button>
            <button
              onClick={() => { scrollToSection('support-faqs'); setIsMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-left text-sm font-medium text-amber-400"
            >
              ❓ Support & FAQs
            </button>
            {onOpenAdmin && (
              <button
                onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }}
                className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/40 text-left text-sm font-bold text-amber-300 col-span-2 flex items-center justify-between"
              >
                <span>⚙️ Central Admin Panel</span>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-400">
                  {currentUser?.role === 'admin' ? 'Authorized 🛡️' : 'Protected 🔒'}
                </span>
              </button>
            )}
          </div>

          <div className="pt-2">
            {currentRole === 'hirer' ? (
              <button
                onClick={() => { onOpenPostJob(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-center font-bold bg-amber-500 text-slate-950"
              >
                + {isHindi ? 'नया काम पोस्ट करें' : 'Post Work Requirement'}
              </button>
            ) : (
              <button
                onClick={() => { onOpenVerification(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-center font-bold bg-emerald-500 text-slate-950"
              >
                {isHindi ? 'आधार व स्किल वेरिफिकेशन' : 'Get Verified Badge ✅'}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
