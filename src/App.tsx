import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { WorkerDirectory } from './components/WorkerDirectory';
import { WorkerProfileModal } from './components/WorkerProfileModal';
import { ChatSystemModal } from './components/ChatSystemModal';
import { KycVerificationModal } from './components/KycVerificationModal';
import { EscrowPaymentModal } from './components/EscrowPaymentModal';
import { PostJobModal } from './components/PostJobModal';
import { JobLeadsBoard } from './components/JobLeadsBoard';
import { RateCalculatorModal } from './components/RateCalculatorModal';
import { SiteVisitModal } from './components/SiteVisitModal';
import { RateReviewModal } from './components/RateReviewModal';
import { FounderMessageSection } from './components/FounderMessageSection';
import { SupportAndFaqSection } from './components/SupportAndFaqSection';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

import { 
  Role, 
  UserRole,
  User,
  Language, 
  WorkerProfile, 
  JobPost, 
  Conversation, 
  ChatMessage, 
  EscrowProject,
  Review,
  SupportInquiry
} from './types';

import { 
  INITIAL_WORKERS, 
  INITIAL_JOBS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_ESCROWS,
  INITIAL_SUPPORT_INQUIRIES
} from './data/mockData';

import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  MessageSquare, 
  HardHat, 
  Briefcase,
  AlertCircle,
  Calculator
} from 'lucide-react';

export default function App() {
  // Application Roles & Localization
  const [currentRole, setCurrentRole] = useState<Role>('hirer');
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('explore');

  // Core Data States
  const [workers, setWorkers] = useState<WorkerProfile[]>(INITIAL_WORKERS);
  const [jobs, setJobs] = useState<JobPost[]>(INITIAL_JOBS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [escrowProjects, setEscrowProjects] = useState<EscrowProject[]>(INITIAL_ESCROWS);

  // Search & Filter States
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedTrade, setSelectedTrade] = useState<string>('All Trades');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // Modals
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isEscrowOpen, setIsEscrowOpen] = useState<boolean>(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [selectedWorkerForProfile, setSelectedWorkerForProfile] = useState<WorkerProfile | null>(null);
  const [workerProfileInitialTab, setWorkerProfileInitialTab] = useState<'overview' | 'kyc' | 'photos' | 'reviews'>('overview');
  const [selectedWorkerForVisit, setSelectedWorkerForVisit] = useState<WorkerProfile | null>(null);
  const [escrowPrefill, setEscrowPrefill] = useState<{ jobTitle?: string; workerName?: string; amount?: number } | undefined>(undefined);

  // Rating & Review State
  const [isRateReviewOpen, setIsRateReviewOpen] = useState<boolean>(false);
  const [workerForRateReview, setWorkerForRateReview] = useState<WorkerProfile | null>(null);
  const [rateReviewProjectTitle, setRateReviewProjectTitle] = useState<string>('Civil & Construction Work');

  // Admin & Support Inquiries State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [supportInquiries, setSupportInquiries] = useState<SupportInquiry[]>(INITIAL_SUPPORT_INQUIRIES);

  // Authentication & User Session State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('dt_current_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading stored user', e);
    }
    return null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'admin_verify'>('login');
  const [authRole, setAuthRole] = useState<UserRole>('hirer');
  const [pendingActionAfterAuth, setPendingActionAfterAuth] = useState<(() => void) | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const isHindi = language === 'hi';

  // Filtered Workers list
  const filteredWorkers = workers.filter(worker => {
    // City filter
    if (selectedCity !== 'All Cities' && !worker.city.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    // Trade filter
    if (selectedTrade !== 'All Trades' && worker.trade !== selectedTrade) {
      return false;
    }
    // Search query (name, hindi name, area, city, trade, bio, tools, skills)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = worker.name.toLowerCase().includes(q) || worker.nameHindi.includes(q);
      const matchArea = worker.area.toLowerCase().includes(q) || worker.city.toLowerCase().includes(q);
      const matchTrade = worker.trade.toLowerCase().includes(q);
      const matchBio = worker.bio.toLowerCase().includes(q) || (worker.bioHindi && worker.bioHindi.includes(q));
      const matchSkills = worker.skills?.some(s => s.toLowerCase().includes(q));
      const matchTools = worker.toolsEquipment?.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchArea && !matchTrade && !matchBio && !matchSkills && !matchTools) {
        return false;
      }
    }
    // Verified only filter
    if (verifiedOnly && (!worker.isAadhaarVerified || !worker.isPoliceVerified)) {
      return false;
    }
    return true;
  });

  // Action Handlers
  const handleStartChatWithWorker = (worker: WorkerProfile) => {
    // Check if conversation exists
    let existing = conversations.find(c => c.workerId === worker.id);
    if (!existing) {
      const newConvId = `conv-${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        workerId: worker.id,
        hirerId: 'h1',
        workerName: worker.name,
        workerAvatar: worker.avatar,
        workerTrade: worker.trade,
        hirerName: 'You (Current Hirer)',
        hirerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
        jobTitle: `Enquiry for ${worker.trade}`,
        lastMessage: `Hello ${worker.name}, I am interested in your services.`,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        status: 'inquiry'
      };

      setConversations(prev => [newConv, ...prev]);
      setMessages(prev => ({
        ...prev,
        [newConvId]: [
          {
            id: `m-${Date.now()}`,
            conversationId: newConvId,
            senderId: 'h1',
            senderName: 'You',
            senderRole: 'hirer',
            text: `Namaste ${worker.name} ji, I saw your verified profile on Digital Thekedaar. Are you available for work?`,
            timestamp: 'Just now',
            type: 'text'
          }
        ]
      }));
      setActiveConversationId(newConvId);
    } else {
      setActiveConversationId(existing.id);
    }

    setIsChatOpen(true);
  };

  const handleSendMessage = (conversationId: string, text: string, type?: ChatMessage['type'], meta?: any) => {
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      conversationId,
      senderId: currentRole === 'hirer' ? 'h1' : 'w1',
      senderName: currentRole === 'hirer' ? 'You' : 'Thekedaar',
      senderRole: currentRole,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: type || 'text',
      meta
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    // Update last message in conversation list
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: text,
          lastTimestamp: 'Just now'
        };
      }
      return c;
    }));
  };

  const handleBookSiteVisit = (worker: WorkerProfile) => {
    setSelectedWorkerForVisit(worker);
  };

  const handleConfirmSiteVisit = (worker: WorkerProfile, date: string, time: string, notes: string) => {
    showToast(`Site inspection confirmed with ${worker.name} on ${date} at ${time}!`);
    // Add visit record into active chat
    handleStartChatWithWorker(worker);
  };

  // Authentication & Session Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('dt_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not store current user in localStorage', e);
    }
    if (user.role === 'hirer' || user.role === 'worker') {
      setCurrentRole(user.role);
    }
    showToast(
      isHindi 
        ? `स्वागत है, ${user.name}! (${user.role.toUpperCase()} मोड सक्रिय)` 
        : `Signed in as ${user.name} (${user.role.toUpperCase()} active)`
    );
    if (pendingActionAfterAuth) {
      const pendingAction = pendingActionAfterAuth;
      setPendingActionAfterAuth(null);
      setTimeout(() => {
        pendingAction();
      }, 150);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('dt_current_user');
    } catch (e) {
      console.warn('Could not clear user from localStorage', e);
    }
    showToast(isHindi ? 'आप सफलतापूर्वक लॉग आउट हो गए हैं।' : 'Signed out successfully.');
  };

  const handleOpenAuth = (mode: 'login' | 'register' | 'admin_verify' = 'login', role?: UserRole) => {
    setAuthMode(mode);
    setAuthRole(role || (currentRole as UserRole));
    setIsAuthOpen(true);
  };

  // Gated & Protected Actions
  const handleOpenAdmin = () => {
    if (currentUser?.role === 'admin') {
      setIsAdminOpen(true);
    } else {
      setPendingActionAfterAuth(() => () => setIsAdminOpen(true));
      handleOpenAuth('admin_verify', 'admin');
    }
  };

  const handleOpenPostJob = () => {
    if (!currentUser) {
      setPendingActionAfterAuth(() => () => setIsPostJobOpen(true));
      handleOpenAuth('login', 'hirer');
      showToast(isHindi ? 'काम पोस्ट करने के लिए कृपया पहले लॉगिन या रजिस्टर करें।' : 'Please sign in or register to post a work requirement.');
      return;
    }
    setIsPostJobOpen(true);
  };

  const handleOpenVerification = () => {
    if (!currentUser) {
      setPendingActionAfterAuth(() => () => setIsVerificationOpen(true));
      handleOpenAuth('register', 'worker');
      showToast(isHindi ? 'सत्यापन शुरू करने के लिए कृपया अपना कारीगर खाता बनाएं।' : 'Please create a Thekedaar profile to begin KYC verification.');
      return;
    }
    setIsVerificationOpen(true);
  };

  const handleOpenEscrow = (jobTitle?: string, workerName?: string, amount?: number) => {
    if (!currentUser) {
      setPendingActionAfterAuth(() => () => handleOpenEscrowForWorker(jobTitle, workerName, amount));
      handleOpenAuth('login', 'hirer');
      showToast(isHindi ? 'एस्क्रो सुरक्षित अनुबंध के लिए कृपया लॉगिन करें।' : 'Please sign in to access safe escrow contracts.');
      return;
    }
    handleOpenEscrowForWorker(jobTitle, workerName, amount);
  };

  const handleOpenEscrowForWorker = (jobTitle?: string, workerName?: string, amount?: number) => {
    setEscrowPrefill({ jobTitle, workerName, amount });
    setIsEscrowOpen(true);
  };

  const handleReleaseMilestone = (projectId: string, milestoneId: string) => {
    setEscrowProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedMilestones = p.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'released' as const,
              approvedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
          }
          return m;
        });

        const releasedSum = updatedMilestones
          .filter(m => m.status === 'released')
          .reduce((sum, m) => sum + m.amount, 0);

        return {
          ...p,
          releasedAmount: releasedSum,
          status: releasedSum >= p.totalAmount ? 'completed' : 'in_progress',
          milestones: updatedMilestones
        };
      }
      return p;
    }));

    showToast('Payment released successfully to worker bank account!');
  };

  const handleCreateEscrow = (newProject: Partial<EscrowProject>) => {
    setEscrowProjects(prev => [newProject as EscrowProject, ...prev]);
    showToast('New Escrow milestone contract funded and locked in trust!');
  };

  const handleJobCreated = (newJob: JobPost) => {
    setJobs(prev => [newJob, ...prev]);
    showToast('Work requirement posted successfully! Verified thekedaars alerted.');
  };

  const handleVerificationComplete = () => {
    showToast('Verification submitted! DigiLocker & Police badge approved.');
  };

  // Rating and Review Handlers
  const handleOpenRateReviewForWorker = (worker: WorkerProfile, projectTitle?: string) => {
    setWorkerForRateReview(worker);
    setRateReviewProjectTitle(projectTitle || `Service Contract with ${worker.name}`);
    setIsRateReviewOpen(true);
  };

  const handleOpenRateReviewByName = (workerName: string, projectTitle: string) => {
    const found = workers.find(w => w.name.toLowerCase() === workerName.toLowerCase()) || workers[0];
    handleOpenRateReviewForWorker(found, projectTitle);
  };

  const handleSubmitReview = (reviewData: {
    workerId: string;
    hirerName: string;
    rating: number;
    title: string;
    comment: string;
    projectTitle: string;
    qualityRating: number;
    punctualityRating: number;
    behaviorRating: number;
    verifiedHirer: boolean;
  }) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      workerId: reviewData.workerId,
      hirerName: reviewData.hirerName,
      hirerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      createdAt: 'Just now',
      projectTitle: reviewData.projectTitle,
      qualityRating: reviewData.qualityRating,
      punctualityRating: reviewData.punctualityRating,
      behaviorRating: reviewData.behaviorRating,
      verifiedHirer: reviewData.verifiedHirer
    };

    setWorkers(prevWorkers =>
      prevWorkers.map(w => {
        if (w.id === reviewData.workerId) {
          const existingReviews = w.reviews || [];
          const updatedReviews = [newReview, ...existingReviews];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAverage = Number((totalRating / updatedReviews.length).toFixed(1));
          return {
            ...w,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: newAverage
          };
        }
        return w;
      })
    );

    // Also synchronize selectedWorkerForProfile if currently open
    setSelectedWorkerForProfile(prev => {
      if (prev && prev.id === reviewData.workerId) {
        const existingReviews = prev.reviews || [];
        const updatedReviews = [newReview, ...existingReviews];
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAverage = Number((totalRating / updatedReviews.length).toFixed(1));
        return {
          ...prev,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: newAverage
        };
      }
      return prev;
    });

    showToast(isHindi ? 'धन्यवाद! आपकी समीक्षा और स्टार रेटिंग कारीगर के प्रोफाइल पर प्रकाशित हो गई है।' : 'Thank you! Your rating and review has been published to the worker profile.');
  };

  // Support Inquiry Submission Handler
  const handleSubmitInquiry = (inquiryData: Omit<SupportInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: SupportInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: 'Just now',
      status: 'new'
    };
    setSupportInquiries(prev => [newInquiry, ...prev]);
    showToast(isHindi ? 'सहायता अनुरोध दर्ज हो गया है! टिकट आईडी: ' + newInquiry.id : 'Support request logged! Ticket ID: ' + newInquiry.id);
  };

  // Admin Inquiry Status Updater
  const handleUpdateInquiryStatus = (id: string, newStatus: SupportInquiry['status']) => {
    setSupportInquiries(prev =>
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
    showToast(`Inquiry ${id} status updated to: ${newStatus}`);
  };

  // Admin Worker Record Updater (e.g. KYC approval, featured status)
  const handleUpdateWorker = (updatedWorker: WorkerProfile) => {
    setWorkers(prev => prev.map(w => w.id === updatedWorker.id ? updatedWorker : w));
    if (selectedWorkerForProfile && selectedWorkerForProfile.id === updatedWorker.id) {
      setSelectedWorkerForProfile(updatedWorker);
    }
    showToast(`Worker record for ${updatedWorker.name} updated successfully.`);
  };

  // Admin Job Record Updater (e.g. status change, bids)
  const handleUpdateJobPost = (updatedJob: JobPost) => {
    setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
    showToast(`Job post ${updatedJob.id} updated successfully.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* Toast notification popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideUp">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          showToast(role === 'hirer' ? 'Switched to Hirer Mode (Find Thekedaars)' : 'Switched to Thekedaar Mode (Find Work Leads)');
        }}
        language={language}
        onLanguageChange={setLanguage}
        onOpenPostJob={handleOpenPostJob}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenVerification={handleOpenVerification}
        onOpenEscrow={() => handleOpenEscrow()}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadChatCount={1}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Banner with search & filters */}
        <HeroBanner
          currentRole={currentRole}
          language={language}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          selectedTrade={selectedTrade}
          onSelectTrade={setSelectedTrade}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          verifiedOnly={verifiedOnly}
          onToggleVerifiedOnly={() => setVerifiedOnly(!verifiedOnly)}
          onOpenPostJob={handleOpenPostJob}
          onOpenVerification={handleOpenVerification}
          onOpenEscrow={() => handleOpenEscrow()}
        />

        {/* View Switcher: Hirer view (Search Workers) vs Thekedaar view (Job Leads) */}
        {currentRole === 'hirer' ? (
          <WorkerDirectory
            workers={filteredWorkers}
            language={language}
            onSelectWorker={(worker, initialTab) => {
              setSelectedWorkerForProfile(worker);
              setWorkerProfileInitialTab(initialTab || 'overview');
            }}
            onStartChat={handleStartChatWithWorker}
            onBookSiteVisit={handleBookSiteVisit}
            onStartEscrow={(worker) => handleOpenEscrowForWorker(`Work Contract with ${worker.name}`, worker.name, 35000)}
            onOpenRateReview={(worker) => handleOpenRateReviewForWorker(worker)}
          />
        ) : (
          <JobLeadsBoard
            jobs={jobs}
            language={language}
            onApplyOrChat={(job) => {
              showToast(`Applied for "${job.title}". Quote shared with client.`);
              setIsChatOpen(true);
            }}
            onOpenEscrow={(title, name, amount) => handleOpenEscrowForWorker(title, name, amount)}
          />
        )}

        {/* Interactive Feature Strip */}
        <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                {isHindi ? 'भरोसेमंद निर्माण तकनीक' : 'End-to-End Trust Architecture'}
              </span>
              <h2 className="text-2xl font-bold font-heading text-slate-900 mt-2">
                {isHindi 
                  ? 'डिजिटल ठेकेदार पर हर लेन-देन और कारीगर पूरी तरह सुरक्षित है' 
                  : 'Built with Government KYC Standards & Protected Escrow Milestone Releases'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div 
                onClick={() => setIsChatOpen(true)}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  {isHindi ? '1. रीयल-टाइम चैट व मोलभाव' : '1. Real-Time Chat & Direct Quotes'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isHindi 
                    ? 'बिना मोबाइल नंबर सार्वजनिक किए ऐप में सीधे बातचीत, साइट फोटो और कोटेशन शेयर करें।' 
                    : 'Exchange site photos, voice notes, and negotiated rates directly inside the platform.'}
                </p>
                <span className="text-xs font-bold text-amber-600 mt-3 inline-block group-hover:underline">
                  Open Live Chat →
                </span>
              </div>

              <div 
                onClick={() => setIsVerificationOpen(true)}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  {isHindi ? '2. डिजीलॉकर व पुलिस सत्यापन' : '2. DigiLocker KYC Verification'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isHindi 
                    ? 'आधार कार्ड ओटीपी चेक, स्थानीय पुलिस चरित्र प्रमाण पत्र और एनएसडीसी स्किल सर्टिफिकेशन।' 
                    : 'Mandatory Aadhaar UIDAI check, police background clearance, and trade skill verification.'}
                </p>
                <span className="text-xs font-bold text-emerald-600 mt-3 inline-block group-hover:underline">
                  View Verification Center →
                </span>
              </div>

              <div 
                onClick={() => handleOpenEscrowForWorker()}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  {isHindi ? '3. सुरक्षा एस्क्रो (सुरक्षित पैसा)' : '3. Thekedaar Suraksha Escrow'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isHindi 
                    ? 'पैसा एस्क्रो खाते में सुरक्षित रहता है। काम का निरीक्षण करने के बाद ही कारीगर को 1-क्लिक से रिलीज करें।' 
                    : 'Deposit funds into RBI-compliant escrow. Funds are transferred only when work milestones pass inspection.'}
                </p>
                <span className="text-xs font-bold text-sky-600 mt-3 inline-block group-hover:underline">
                  Manage Escrow Funds →
                </span>
              </div>

              <div 
                onClick={() => setIsCalculatorOpen(true)}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  {isHindi ? '4. निर्माण दर व बजट कैलकुलेटर' : '4. Construction Rate Index'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isHindi 
                    ? 'वर्तमान बाजार मजदूरी (दिहाड़ी व स्क्वायर फीट ठेका दर) जानें और अपने काम का बजट निकालें।' 
                    : 'Explore transparent daily & square-foot labor benchmarks before finalizing your contract.'}
                </p>
                <span className="text-xs font-bold text-amber-600 mt-3 inline-block group-hover:underline">
                  Check Rate Index →
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* Founder and CEO Message Section */}
        <FounderMessageSection
          language={language}
          onOpenSupportModal={() => {
            const el = document.getElementById('support-faqs');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Support and FAQs Section */}
        <SupportAndFaqSection
          language={language}
          onSubmitInquiry={handleSubmitInquiry}
        />

      </main>

      {/* Modals & Dialogs */}
      <WorkerProfileModal
        worker={selectedWorkerForProfile}
        onClose={() => setSelectedWorkerForProfile(null)}
        language={language}
        initialTab={workerProfileInitialTab}
        onStartChat={handleStartChatWithWorker}
        onBookSiteVisit={handleBookSiteVisit}
        onStartEscrow={(worker) => handleOpenEscrowForWorker(`Turnkey Project with ${worker.name}`, worker.name, 45000)}
        onOpenRateReview={(worker) => handleOpenRateReviewForWorker(worker)}
      />

      <RateReviewModal
        isOpen={isRateReviewOpen}
        onClose={() => {
          setIsRateReviewOpen(false);
          setWorkerForRateReview(null);
        }}
        worker={workerForRateReview}
        projectTitle={rateReviewProjectTitle}
        language={language}
        onSubmitReview={handleSubmitReview}
      />

      <ChatSystemModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        conversations={conversations}
        messages={messages}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onSendMessage={handleSendMessage}
        currentRole={currentRole}
        language={language}
        onOpenEscrow={(jobTitle, workerName, amount) => handleOpenEscrowForWorker(jobTitle, workerName, amount)}
        onBookSiteVisit={() => {
          if (workers[0]) handleBookSiteVisit(workers[0]);
        }}
      />

      <KycVerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        language={language}
        currentRole={currentRole}
        onVerificationComplete={handleVerificationComplete}
      />

      <EscrowPaymentModal
        isOpen={isEscrowOpen}
        onClose={() => setIsEscrowOpen(false)}
        escrowProjects={escrowProjects}
        language={language}
        onReleaseMilestone={handleReleaseMilestone}
        onCreateEscrow={handleCreateEscrow}
        onOpenRateReview={(workerName, jobTitle) => handleOpenRateReviewByName(workerName, jobTitle)}
        prefill={escrowPrefill}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        language={language}
        onJobCreated={handleJobCreated}
      />

      <RateCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        language={language}
      />

      <SiteVisitModal
        isOpen={!!selectedWorkerForVisit}
        onClose={() => setSelectedWorkerForVisit(null)}
        worker={selectedWorkerForVisit}
        language={language}
        onConfirmVisit={handleConfirmSiteVisit}
      />

      {/* Integrated Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
        workers={workers}
        jobPosts={jobs}
        escrowProjects={escrowProjects}
        reviews={workers.flatMap(w => w.reviews || [])}
        supportInquiries={supportInquiries}
        currentUser={currentUser}
        onAdminLogin={handleLoginSuccess}
        onAdminLogout={handleLogout}
        onUpdateWorker={handleUpdateWorker}
        onUpdateJobPost={handleUpdateJobPost}
        onReleaseEscrowMilestone={handleReleaseMilestone}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
      />

      {/* Universal Authentication Modal (Login, Registration, Admin Gate) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        initialRole={authRole}
        language={language}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer
        language={language}
        onOpenVerification={handleOpenVerification}
        onOpenEscrow={() => handleOpenEscrow()}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenPostJob={handleOpenPostJob}
        onOpenAdmin={handleOpenAdmin}
      />

    </div>
  );
}
