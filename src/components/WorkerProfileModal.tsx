import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  Award, 
  Check, 
  Phone, 
  Wrench, 
  Users, 
  Clock, 
  FileCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { WorkerProfile, Language } from '../types';

interface WorkerProfileModalProps {
  worker: WorkerProfile | null;
  onClose: () => void;
  language: Language;
  initialTab?: 'overview' | 'kyc' | 'photos' | 'reviews';
  onStartChat: (worker: WorkerProfile) => void;
  onBookSiteVisit: (worker: WorkerProfile) => void;
  onStartEscrow: (worker: WorkerProfile) => void;
  onOpenRateReview?: (worker: WorkerProfile) => void;
}

export const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({
  worker,
  onClose,
  language,
  initialTab = 'overview',
  onStartChat,
  onBookSiteVisit,
  onStartEscrow,
  onOpenRateReview
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'photos' | 'reviews'>(initialTab);
  const [showCallNotification, setShowCallNotification] = useState(false);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, worker?.id]);

  if (!worker) return null;
  const isHindi = language === 'hi';

  const handleCall = () => {
    setShowCallNotification(true);
    setTimeout(() => setShowCallNotification(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={worker.avatar}
                alt={worker.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
              />
              <div 
                className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-slate-900 shadow-sm"
                title="KYC Verified"
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold font-heading">
                  {isHindi ? worker.nameHindi : worker.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {worker.verificationScore}% KYC Verified
                </span>
              </div>

              <p className="text-sm font-semibold text-amber-400 mt-0.5">
                {worker.trade} • {worker.experienceYears} {isHindi ? 'वर्षों का ऑन-साइट अनुभव' : 'Years On-Site Experience'}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {worker.area}, {worker.city} ({worker.distanceKm} km away)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {worker.rating} ({worker.reviewCount} {isHindi ? 'रिव्यूज' : 'verified reviews'})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {worker.completedProjects} {isHindi ? 'प्रोजेक्ट पूर्ण' : 'Projects Completed'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-800 pt-3 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isHindi ? 'ओवरव्यू व रेट्स' : 'Overview & Rates'}
            </button>
            <button
              onClick={() => setActiveTab('kyc')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'kyc' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHindi ? 'KYC दस्तावेज व सत्यापन' : 'KYC & Verification'}</span>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'photos' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isHindi ? 'काम की तस्वीरें' : 'Work Photos'} ({worker.photos.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'reviews' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isHindi ? 'ग्राहक समीक्षा' : 'Reviews'} ({worker.reviewCount})
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Rate Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    {isHindi ? 'मानक दर (Standard Pricing)' : 'Official Rate Card'}
                  </span>
                  <p className="text-base font-extrabold text-slate-900 mt-0.5">
                    {worker.unitRate}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isHindi ? 'दैनिक मजदूरी:' : 'Daily Base Rate:'} ₹{worker.dailyWage} / {isHindi ? 'दिन (8 घंटे)' : 'Day (8 hours)'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    🛡️ {isHindi ? '100% एस्क्रो प्रोटेक्टेड' : '100% Escrow Protected'}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isHindi ? 'अनुभव व कार्य विवरण' : 'About & Experience'}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {isHindi ? worker.bioHindi : worker.bio}
                </p>
              </div>

              {/* Skills & Specializations */}
              {worker.skills && worker.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isHindi ? 'विशिष्ट कौशल व विशेषज्ञता' : 'Core Skills & Specializations'}</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {worker.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools & Machinery */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? 'उपलब्ध औजार व मशीनरी' : 'Tools & Equipment Owned'}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {worker.toolsEquipment.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
                    >
                      ⚡ {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Badges & Accreditations */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {isHindi ? 'सत्यापित बैज' : 'Accreditations & Badges'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {worker.badges.map((badge, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 font-semibold"
                    >
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: KYC & VERIFICATION DETAILS */}
          {activeTab === 'kyc' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    {isHindi ? 'डिजिटल ठेकेदार ट्रस्ट सील सत्यापित' : 'Digital Thekedaar Trust Seal Confirmed'}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    {isHindi
                      ? 'इस कारीगर के सरकारी पहचान पत्र, पुलिस प्रमाण और कौशल का सत्यापन हमारी बैकग्राउंड टीम द्वारा किया जा चुका है।'
                      : 'This worker has successfully passed physical & DigiLocker identity verification, local police verification, and trade skill assessment.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                
                {/* Aadhaar check */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      UID
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isHindi ? 'सरकारी आधार कार्ड (DigiLocker)' : 'Aadhaar Card (Govt UIDAI)'}
                      </p>
                      <p className="text-[11px] text-slate-500">ID: XXXX-XXXX-4912 • Name Matched 100%</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>

                {/* Police verification */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      POL
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isHindi ? 'पुलिस बैकग्राउंड व चरित्र प्रमाण पत्र' : 'Police Character Verification'}
                      </p>
                      <p className="text-[11px] text-slate-500">Zero Criminal Record • Verified by Local Station</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Clear
                  </span>
                </div>

                {/* Skill certificate */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                      NSDC
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isHindi ? 'कौशल प्रमाण पत्र (Skill India / ITI)' : 'Trade Certification (Skill India / CIDC)'}
                      </p>
                      <p className="text-[11px] text-slate-500">Master Level Civil Masonry / Grade A Certified</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Certified
                  </span>
                </div>

                {/* Escrow Bank Account */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isHindi ? 'सुरक्षित एस्क्रो बैंक खाता' : 'Bank Account for Escrow Payouts'}
                      </p>
                      <p className="text-[11px] text-slate-500">Penny Drop Tested • Ready for Milestone Transfers</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Active
                  </span>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: WORK PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                {isHindi ? 'हाल ही में पूरे किए गए साइट प्रोजेक्ट्स की तस्वीरें:' : 'Real on-site construction and craftsmanship pictures:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {worker.photos.map((photo, idx) => (
                  <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                    <img
                      src={photo}
                      alt={`Site photo ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 text-white text-xs font-medium">
                      <span>{isHindi ? 'सत्यापित ऑन-साइट काम #' : 'Verified On-Site Work #'}{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-5">
              
              {/* Overall Scorecard & Breakdown */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex flex-col items-center justify-center border border-amber-500/30">
                      <span className="text-2xl font-black">{worker.rating}</span>
                      <span className="text-[10px] uppercase font-bold text-amber-300">/ 5.0</span>
                    </div>

                    <div>
                      <div className="flex text-amber-400 gap-0.5 justify-center sm:justify-start">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-slate-200 mt-1">
                        {worker.reviewCount || worker.reviews?.length || 0} {isHindi ? 'सत्यापित गृहस्वामी समीक्षाएं' : 'Verified Client Reviews'}
                      </p>
                      <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>100% Escrow Milestone Verified</span>
                      </p>
                    </div>
                  </div>

                  {/* "Write a Review" Button */}
                  {onOpenRateReview && (
                    <button
                      onClick={() => onOpenRateReview(worker)}
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Star className="w-3.5 h-3.5 fill-slate-950" />
                      <span>{isHindi ? 'रिव्यू व रेटिंग दें' : 'Rate & Review Craftsman'}</span>
                    </button>
                  )}

                </div>

                {/* Sub-criteria summary pills */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-700/60 text-center">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">{isHindi ? 'काम की गुणवत्ता' : 'Work Quality'}</span>
                    <strong className="text-xs text-amber-400">4.9 / 5.0</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">{isHindi ? 'समय की पाबंदी' : 'Punctuality'}</span>
                    <strong className="text-xs text-amber-400">4.8 / 5.0</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">{isHindi ? 'ईमानदार दरें' : 'Fair Rates'}</span>
                    <strong className="text-xs text-emerald-400">100% Honest</strong>
                  </div>
                </div>
              </div>

              {/* Dynamic verified review entries list */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isHindi ? 'हाल की सत्यापित समीक्षाएं' : 'Recent Client Reviews & Feedback'}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {worker.reviews?.length || 0} {isHindi ? 'टिप्पणियां' : 'records'}
                  </span>
                </div>

                {worker.reviews && worker.reviews.length > 0 ? (
                  worker.reviews.map((rev) => (
                    <div 
                      key={rev.id} 
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-300 transition-colors text-xs space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{rev.hirerName}</span>
                            {rev.verifiedHirer && (
                              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                <ShieldCheck className="w-3 h-3" />
                                Verified Hirer
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Project: <strong className="text-slate-700">{rev.projectTitle}</strong>
                          </p>
                        </div>
                        <span className="text-slate-400 text-[11px] shrink-0">{rev.createdAt}</span>
                      </div>

                      {/* Stars & Title */}
                      <div className="flex items-center gap-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-slate-200'}`} 
                            />
                          ))}
                        </div>
                        {rev.title && (
                          <span className="font-bold text-slate-800">{rev.title}</span>
                        )}
                      </div>

                      {/* Comment text */}
                      <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        "{rev.comment}"
                      </p>

                      {/* Quality / Punctuality chips if available */}
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                        <span>Quality: <strong className="text-slate-700">{rev.qualityRating || 5}/5</strong></span>
                        <span>•</span>
                        <span>Punctuality: <strong className="text-slate-700">{rev.punctualityRating || 5}/5</strong></span>
                        <span>•</span>
                        <span>Behavior: <strong className="text-slate-700">{rev.behaviorRating || 5}/5</strong></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6">
                    <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">
                      {isHindi ? 'अभी कोई लिखित समीक्षा नहीं है' : 'No written reviews yet'}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {isHindi ? 'काम पूरा होने के बाद पहले समीक्षक बनें।' : 'Be the first client to submit a rating and review for this craftsman!'}
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCall}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{worker.phone}</span>
            </button>
            {showCallNotification && (
              <span className="text-xs text-emerald-600 font-semibold animate-pulse">
                {isHindi ? 'कॉलिंग कनेक्ट हो रही है...' : 'Initiating direct call...'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            
            {/* Live Chat */}
            <button
              onClick={() => { onClose(); onStartChat(worker); }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>{isHindi ? 'लाइव चैट करें' : 'Start Live Chat'}</span>
            </button>

            {/* Book Site Visit */}
            <button
              onClick={() => { onClose(); onBookSiteVisit(worker); }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{isHindi ? 'साइट विजिट बुक करें' : 'Book Site Visit'}</span>
            </button>

            {/* Direct Escrow Deposit */}
            <button
              onClick={() => { onClose(); onStartEscrow(worker); }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isHindi ? 'एस्क्रो में काम दें' : 'Hire with Escrow'}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
