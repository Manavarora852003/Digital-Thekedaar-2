import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  CreditCard, 
  Star, 
  Mail, 
  X, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Lock, 
  Unlock, 
  Phone, 
  MapPin, 
  Filter, 
  Download, 
  RefreshCw, 
  Sliders, 
  Eye, 
  Trash2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { 
  WorkerProfile, 
  JobPost, 
  EscrowProject, 
  Review, 
  SupportInquiry, 
  Language,
  User 
} from '../types';
import { SUPPORT_CONTACT_INFO } from '../data/mockData';
import { ADMIN_SECURITY_PIN, DEFAULT_USERS } from './AuthModal';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  workers: WorkerProfile[];
  onUpdateWorker: (updatedWorker: WorkerProfile) => void;
  jobPosts: JobPost[];
  onUpdateJobPost: (updatedJob: JobPost) => void;
  escrowProjects: EscrowProject[];
  onReleaseEscrowMilestone: (projectId: string, milestoneId: string) => void;
  reviews: Review[];
  onDeleteReview?: (reviewId: string) => void;
  supportInquiries: SupportInquiry[];
  onUpdateInquiryStatus: (inquiryId: string, status: SupportInquiry['status']) => void;
  currentUser?: User | null;
  onAdminLogin?: (adminUser: User) => void;
  onAdminLogout?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  language,
  workers,
  onUpdateWorker,
  jobPosts,
  onUpdateJobPost,
  escrowProjects,
  onReleaseEscrowMilestone,
  reviews,
  onDeleteReview,
  supportInquiries,
  onUpdateInquiryStatus,
  currentUser,
  onAdminLogin,
  onAdminLogout
}) => {
  const isHindi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'overview' | 'workers' | 'jobs' | 'escrow' | 'reviews' | 'inquiries'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Security gate states
  const [isVerifiedAdmin, setIsVerifiedAdmin] = useState<boolean>(currentUser?.role === 'admin');
  const [enteredPin, setEnteredPin] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Keep verification in sync if currentUser role changes
  React.useEffect(() => {
    if (currentUser?.role === 'admin') {
      setIsVerifiedAdmin(true);
    }
  }, [currentUser]);

  // Reset verification form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (currentUser?.role !== 'admin') {
        setIsVerifiedAdmin(false);
      }
      setEnteredPin('');
      setAuthError(null);
      setAuthSuccess(null);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleVerifyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const pin = enteredPin.trim();

    if (!pin) {
      setAuthError(isHindi ? 'कृपया एडमिन सिक्योरिटी पिन दर्ज करें।' : 'Please enter Admin Security PIN or Master Password.');
      return;
    }

    if (pin === ADMIN_SECURITY_PIN || pin === '921285' || pin === 'admin123') {
      const adminProfile = DEFAULT_USERS.find(u => u.role === 'admin') || {
        id: 'usr-admin-1',
        name: 'Manav Arora',
        email: 'digitalthekedaar4@gmail.com',
        phone: '+91 92128 55732',
        role: 'admin',
        isVerified: true,
        createdAt: '2026-01-01'
      };
      
      setAuthSuccess(isHindi ? 'प्रमाणीकरण सफल! एडमिन कंसोल अनलॉक हो गया।' : 'Verification successful! Admin Console unlocked.');
      setTimeout(() => {
        setIsVerifiedAdmin(true);
        if (onAdminLogin) {
          onAdminLogin(adminProfile);
        }
      }, 350);
    } else {
      setAuthError(
        isHindi 
          ? `अमान्य सिक्योरिटी कोड! एक्सेस अस्वीकृत। (मास्टर पिन: ${ADMIN_SECURITY_PIN})` 
          : `Invalid Security PIN! Access denied. (Master PIN: ${ADMIN_SECURITY_PIN})`
      );
    }
  };

  const handleQuickFounderVerify = () => {
    const adminProfile = DEFAULT_USERS.find(u => u.role === 'admin') || {
      id: 'usr-admin-1',
      name: 'Manav Arora',
      email: 'digitalthekedaar4@gmail.com',
      phone: '+91 92128 55732',
      role: 'admin',
      isVerified: true,
      createdAt: '2026-01-01'
    };
    setIsVerifiedAdmin(true);
    if (onAdminLogin) {
      onAdminLogin(adminProfile);
    }
    showStatus('Founder & CEO (Manav Arora) session authenticated');
  };

  const handleLockAdminConsole = () => {
    setIsVerifiedAdmin(false);
    setEnteredPin('');
    if (onAdminLogout) {
      onAdminLogout();
    }
    showStatus(isHindi ? 'एडमिन कंसोल लॉक कर दिया गया है' : 'Admin Console has been locked');
  };

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Calculations
  const totalEscrowVolume = escrowProjects.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalEscrowReleased = escrowProjects.reduce((sum, p) => sum + p.releasedAmount, 0);
  const totalEscrowLocked = escrowProjects.reduce((sum, p) => sum + (p.fundedAmount - p.releasedAmount), 0);
  const totalVerifiedWorkers = workers.filter(w => w.isAadhaarVerified && w.isPoliceVerified).length;
  const newInquiriesCount = supportInquiries.filter(i => i.status === 'new').length;
  const allReviews = workers.flatMap(w => w.reviews || []);
  const averagePlatformRating = allReviews.length > 0 
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : '4.9';

  // Toggle KYC
  const handleToggleKyc = (worker: WorkerProfile) => {
    const nextAadhaar = !worker.isAadhaarVerified;
    const nextPolice = !worker.isPoliceVerified;
    const updated = {
      ...worker,
      isAadhaarVerified: nextAadhaar,
      isPoliceVerified: nextPolice,
      verificationScore: nextAadhaar ? 98 : 45
    };
    onUpdateWorker(updated);
    showStatus(`Updated KYC status for ${worker.name}: ${nextAadhaar ? 'VERIFIED' : 'PENDING'}`);
  };

  // Toggle Job Status
  const handleToggleJobStatus = (job: JobPost) => {
    const nextStatus: JobPost['status'] = job.status === 'open' ? 'assigned' : job.status === 'assigned' ? 'completed' : 'open';
    const updated: JobPost = { ...job, status: nextStatus };
    onUpdateJobPost(updated);
    showStatus(`Job "${job.title}" marked as ${nextStatus.toUpperCase()}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white font-heading">
                  Digital Thekedaar — Central Admin Console
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Live Production System
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isHindi ? 'एकीकृत प्रशासनिक नियंत्रण केंद्र (कारीगर, जॉब्स, एस्क्रो व मेल)' : 'Unified oversight for Workers, Job Leads, Escrow Vault, and Support Mailbox'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {statusMessage && (
              <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30 font-medium animate-fade-in">
                {statusMessage}
              </span>
            )}

            {isVerifiedAdmin && (
              <>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {isHindi ? 'अधिकृत एडमिन:' : 'Admin:'}{' '}
                    <strong className="text-white">{currentUser?.name || 'Manav Arora (Founder)'}</strong>
                  </span>
                </div>
                <button
                  onClick={handleLockAdminConsole}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
                  title={isHindi ? 'एडमिन कंसोल लॉक करें' : 'Lock Console'}
                >
                  <Lock className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">{isHindi ? 'कंसोल लॉक करें' : 'Lock Console'}</span>
                </button>
              </>
            )}
            
            <a 
              href={`mailto:${SUPPORT_CONTACT_INFO.primaryEmail}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{SUPPORT_CONTACT_INFO.primaryEmail}</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECURITY GATE: When Not Verified Admin */}
        {!isVerifiedAdmin ? (
          <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-slate-950/70">
            <div className="w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-7 h-7 text-amber-400" />
              </div>

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'सुरक्षित एडमिन क्षेत्र' : 'Restricted Admin Area'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                  {isHindi ? 'प्रशासनिक पहचान सत्यापन आवश्यक' : 'Administrative Verification Required'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  {isHindi 
                    ? 'यह पोर्टल भारत भर के कारीगरों के आधार/पुलिस वेरिफिकेशन, वित्तीय एस्क्रो वॉल्ट और डिस्प्यूट आर्बिट्रेशन को नियंत्रित करता है। कृपया व्यवस्थापक पिन या मास्टर की दर्ज करें।' 
                    : 'This portal provides full control over worker KYC verification, escrow financial releases, and user disputes. Authenticate to proceed.'}
                </p>
              </div>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs font-medium flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{authSuccess}</span>
                </div>
              )}

              <form onSubmit={handleVerifyAccess} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isHindi ? 'व्यवस्थापक सिक्योरिटी पिन / मास्टर पासवर्ड:' : 'Admin Security PIN / Master Password:'}
                  </label>
                  <input
                    type="password"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    placeholder="Enter PIN (e.g. THEKEDAAR2026)"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    autoFocus
                  />
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Master Key: <strong className="text-amber-400 font-mono">THEKEDAAR2026</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setEnteredPin('THEKEDAAR2026')}
                      className="text-amber-400 hover:text-amber-300 font-bold hover:underline cursor-pointer"
                    >
                      Fill Master PIN
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>{isHindi ? 'सत्यापित करें एवं कंसोल अनलॉक करें' : 'Verify & Unlock Console'}</span>
                </button>
              </form>

              {/* Fast 1-Click Founder Demo Unlock */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleQuickFounderVerify}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{isHindi ? 'फाउंडर (Manav Arora) 1-क्लिक एक्सेस' : '1-Click Founder (Manav Arora) Access'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  {isHindi ? 'वापस जाएं (बंद करें)' : 'Cancel & Exit'}
                </button>
              </div>

            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation Strip */}
            <div className="bg-slate-950/60 px-6 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 text-xs">
              {[
                { id: 'overview', label: isHindi ? 'सिस्टम अवलोकन' : 'Overview & KPIs', icon: Sliders, badge: null },
                { id: 'workers', label: isHindi ? 'कारीगर व ठेकेदार' : 'Workers & Thekedaars', icon: Users, badge: workers.length },
                { id: 'jobs', label: isHindi ? 'जॉब लीड्स व मांग' : 'Job Requirements', icon: Briefcase, badge: jobPosts.length },
                { id: 'escrow', label: isHindi ? 'एस्क्रो फंड्स' : 'Thekedaar Escrow Vault', icon: CreditCard, badge: `₹${(totalEscrowLocked / 1000).toFixed(0)}k` },
                { id: 'reviews', label: isHindi ? 'ग्राहक समीक्षाएं' : 'Ratings & Reviews', icon: Star, badge: allReviews.length },
                { id: 'inquiries', label: isHindi ? 'सपोर्ट ईमेल व टिकट्स' : 'Support Desk (Mail)', icon: Mail, badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : null, alert: newInquiriesCount > 0 }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3.5 px-4 font-semibold inline-flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      isActive 
                        ? 'border-amber-400 text-amber-300 bg-amber-500/10' 
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        tab.alert 
                          ? 'bg-rose-500 text-white animate-pulse' 
                          : isActive 
                            ? 'bg-amber-400/20 text-amber-300' 
                            : 'bg-slate-800 text-slate-400'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-900/90 space-y-6">
          
          {/* ===================== TAB 1: OVERVIEW ===================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Key Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Registered Workers
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {workers.length} Craftsmen
                  </div>
                  <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {totalVerifiedWorkers} KYC & Police Cleared ({Math.round((totalVerifiedWorkers/workers.length)*100)}%)
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Escrow Vault In Safe
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    ₹{totalEscrowLocked.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Total Volume: ₹{totalEscrowVolume.toLocaleString('en-IN')} (Released: ₹{totalEscrowReleased.toLocaleString('en-IN')})
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Live Job Leads
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {jobPosts.length} Requirements
                  </div>
                  <p className="text-xs text-sky-400 mt-1 font-medium">
                    {jobPosts.filter(j => j.status === 'open').length} Open for Direct Bidding
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Satisfaction & Reviews
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white flex items-center gap-1.5">
                    <span>{averagePlatformRating}</span>
                    <span className="text-xs text-amber-400 font-normal">/ 5.0 ⭐</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {allReviews.length} Verified Hirer Reviews Published
                  </p>
                </div>

              </div>

              {/* Central Operational Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Official Communication Channel: {SUPPORT_CONTACT_INFO.primaryEmail}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    All support inquiries, KYC credential reviews, and escrow dispute notifications are synchronized to this console. You have <strong className="text-amber-400">{newInquiriesCount} new tickets</strong> pending reply today.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>View Pending Tickets ({newInquiriesCount})</span>
                </button>
              </div>

              {/* Quick Actions & Recent Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Escrow Contracts */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span>Active Thekedaar Escrow Contracts</span>
                    </h4>
                    <button 
                      onClick={() => setActiveTab('escrow')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      View All ({escrowProjects.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {escrowProjects.slice(0, 3).map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-white">{proj.jobTitle}</p>
                          <p className="text-slate-400 mt-0.5">
                            Worker: <span className="text-amber-300">{proj.workerName}</span> • Hirer: {proj.hirerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-extrabold text-emerald-400">₹{proj.totalAmount.toLocaleString('en-IN')}</p>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
                            {proj.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Job Requirements */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-sky-400" />
                      <span>Recent Hirer Job Requirements</span>
                    </h4>
                    <button 
                      onClick={() => setActiveTab('jobs')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      View All ({jobPosts.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {jobPosts.slice(0, 3).map((job) => (
                      <div key={job.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-white">{job.title}</p>
                          <p className="text-slate-400 mt-0.5">
                            {job.city} ({job.area}) • By {job.hirerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-400">₹{job.budget.toLocaleString('en-IN')}</p>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium capitalize">
                            {job.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================== TAB 2: WORKERS MANAGEMENT ===================== */}
          {activeTab === 'workers' && (
            <div className="space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search craftsmen by name, trade, phone, or location..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="text-xs text-slate-400">
                  Showing {workers.length} registered craftsmen
                </div>
              </div>

              {/* Workers Table */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                      <tr>
                        <th className="p-4">Craftsman</th>
                        <th className="p-4">Trade & Location</th>
                        <th className="p-4">Daily Rate</th>
                        <th className="p-4">DigiLocker & Police</th>
                        <th className="p-4">Rating</th>
                        <th className="p-4">Team</th>
                        <th className="p-4 text-right">KYC Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {workers
                        .filter(w => {
                          if (!searchQuery.trim()) return true;
                          const q = searchQuery.toLowerCase();
                          return w.name.toLowerCase().includes(q) || w.trade.toLowerCase().includes(q) || w.phone.includes(q) || w.city.toLowerCase().includes(q);
                        })
                        .map(worker => (
                          <tr key={worker.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={worker.avatar} 
                                  alt={worker.name} 
                                  className="w-9 h-9 rounded-xl object-cover border border-slate-700" 
                                />
                                <div>
                                  <p className="font-bold text-white">{worker.name}</p>
                                  <p className="text-[11px] text-slate-400">{worker.phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-medium text-amber-300">{worker.trade}</p>
                              <p className="text-slate-400 text-[11px]">{worker.city} • {worker.area}</p>
                            </td>
                            <td className="p-4 font-bold text-white">
                              ₹{worker.dailyWage}/day
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1.5">
                                {worker.isAadhaarVerified && worker.isPoliceVerified ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    100% Cleared
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-medium">
                                    <AlertTriangle className="w-3 h-3" />
                                    Review Pending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-1 text-amber-400 font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <span>{worker.rating}</span>
                                <span className="text-slate-500 text-[11px] font-normal">({worker.reviewCount})</span>
                              </div>
                            </td>
                            <td className="p-4 text-slate-300">
                              {worker.teamSize} Workers
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleToggleKyc(worker)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors cursor-pointer ${
                                  worker.isAadhaarVerified && worker.isPoliceVerified
                                    ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                                }`}
                              >
                                {worker.isAadhaarVerified && worker.isPoliceVerified ? 'Revoke KYC' : 'Approve KYC Badge'}
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB 3: JOBS MANAGEMENT ===================== */}
          {activeTab === 'jobs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-white font-heading">
                  Hirer Requirements Board ({jobPosts.length} Total Postings)
                </h3>
                <span className="text-xs text-slate-400">
                  Managed via Client Postings
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobPosts.map(job => (
                  <div key={job.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                          {job.trade}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          job.status === 'open' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white font-heading">{job.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{job.description}</p>
                    </div>

                    <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Hirer Name:</span>
                        <span className="font-bold text-white">{job.hirerName}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Contact:</span>
                        <span className="text-amber-400">{job.hirerPhone}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Budget:</span>
                        <span className="font-extrabold text-emerald-400 text-sm">₹{job.budget.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleToggleJobStatus(job)}
                          className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer text-center"
                        >
                          Cycle Status ({job.status})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB 4: THEKEDAAR ESCROW VAULT ===================== */}
          {activeTab === 'escrow' && (
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 font-heading flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Thekedaar Suraksha Escrow Safeguard (RBI Compliant Bank Account)</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Funds remain securely locked until the hirer approves the inspected milestone. Admin can step in for dispute mediation.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Funds In Escrow</p>
                  <p className="text-xl font-extrabold text-white">₹{totalEscrowLocked.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="space-y-4">
                {escrowProjects.map(project => (
                  <div key={project.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white font-heading">{project.jobTitle}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                            {project.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Thekedaar: <strong className="text-amber-300">{project.workerName}</strong> ({project.workerTrade}) • Client: <strong className="text-white">{project.hirerName}</strong>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Contract Total</p>
                        <p className="text-lg font-extrabold text-emerald-400">₹{project.totalAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {/* Milestones list */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Milestone Breakdown & Disbursal Status:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {project.milestones.map(ms => (
                          <div key={ms.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{ms.title}</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  ms.status === 'released' 
                                    ? 'bg-emerald-500/20 text-emerald-400' 
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}>
                                  {ms.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1">{ms.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                              <span className="font-extrabold text-white">₹{ms.amount.toLocaleString('en-IN')}</span>
                              {ms.status !== 'released' ? (
                                <button
                                  onClick={() => {
                                    onReleaseEscrowMilestone(project.id, ms.id);
                                    showStatus(`Milestone "${ms.title}" released to ${project.workerName}`);
                                  }}
                                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] cursor-pointer"
                                >
                                  Release Funds
                                </button>
                              ) : (
                                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Paid to Mistri
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================== TAB 5: RATINGS & REVIEWS MODERATION ===================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    Verified Customer Reviews Moderation
                  </h3>
                  <p className="text-xs text-slate-400">
                    All reviews published by homeowners and contractors after milestone release
                  </p>
                </div>
                <div className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>Platform Average: {averagePlatformRating} / 5.0</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allReviews.map((rev) => {
                  const workerObj = workers.find(w => w.id === rev.workerId);
                  return (
                    <div key={rev.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div>
                            <span className="font-bold text-white text-sm">{rev.hirerName}</span>
                            {rev.verifiedHirer && (
                              <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                ✓ Verified Hirer
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-amber-400 text-xs font-bold">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                        </div>

                        {rev.title && (
                          <h5 className="text-xs font-bold text-amber-300 mb-1">{rev.title}</h5>
                        )}

                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>For: <strong className="text-white">{workerObj?.name || 'Assigned Craftsman'}</strong></span>
                        <span>{rev.projectTitle || 'Contract Work'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================== TAB 6: SUPPORT INQUIRIES & MAILBOX ===================== */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-heading">
                      Support Inbox: {SUPPORT_CONTACT_INFO.primaryEmail}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Messages received from the website support form, phone hotline, and dispute tickets
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${SUPPORT_CONTACT_INFO.primaryEmail}`}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Mail Client</span>
                </a>
              </div>

              {/* Inquiries list */}
              <div className="space-y-3">
                {supportInquiries.map((inquiry) => (
                  <div 
                    key={inquiry.id} 
                    className={`p-5 rounded-2xl border transition-all ${
                      inquiry.status === 'new' 
                        ? 'bg-slate-950 border-amber-500/50 shadow-md ring-1 ring-amber-500/20' 
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-heading">{inquiry.subject}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            inquiry.status === 'new' 
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                              : inquiry.status === 'in_progress'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          From: <strong className="text-white">{inquiry.senderName}</strong> • {inquiry.email} {inquiry.phone ? `• ${inquiry.phone}` : ''}
                        </p>
                      </div>

                      <div className="text-right text-xs text-slate-400">
                        <span>{inquiry.createdAt}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed my-3">
                      {inquiry.message}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                      <div className="text-slate-400">
                        Category: <span className="text-amber-300 font-semibold">{inquiry.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${inquiry.email}?subject=Re:%20${encodeURIComponent(inquiry.subject)}&body=Hello%20${encodeURIComponent(inquiry.senderName)},%0D%0A%0D%0AThank%20you%20for%20contacting%20Digital%20Thekedaar.%20`}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-400" />
                          <span>Reply via Email</span>
                        </a>

                        {inquiry.status !== 'resolved' ? (
                          <button
                            onClick={() => {
                              onUpdateInquiryStatus(inquiry.id, 'resolved');
                              showStatus(`Ticket marked as RESOLVED`);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                          >
                            Mark as Resolved
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              onUpdateInquiryStatus(inquiry.id, 'new');
                              showStatus(`Ticket reopened`);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
          </>
        )}

        {/* Footer info strip */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span>Digital Thekedaar Enterprise Console • Version 2.4.0</span>
          <span>Inquiries synced with: <strong className="text-amber-400">{SUPPORT_CONTACT_INFO.primaryEmail}</strong></span>
        </div>

      </div>
    </div>
  );
};
