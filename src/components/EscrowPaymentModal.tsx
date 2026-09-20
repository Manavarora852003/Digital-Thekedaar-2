import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Building2, 
  Download, 
  Printer, 
  FileText, 
  AlertTriangle, 
  Clock, 
  Check, 
  ArrowRight, 
  Lock,
  Sparkles,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { EscrowProject, Milestone, Language } from '../types';

interface EscrowPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  escrowProjects: EscrowProject[];
  language: Language;
  onReleaseMilestone: (projectId: string, milestoneId: string) => void;
  onCreateEscrow: (project: Partial<EscrowProject>) => void;
  onOpenRateReview?: (workerName: string, jobTitle: string) => void;
  prefill?: {
    jobTitle?: string;
    workerName?: string;
    amount?: number;
  };
}

export const EscrowPaymentModal: React.FC<EscrowPaymentModalProps> = ({
  isOpen,
  onClose,
  escrowProjects,
  language,
  onReleaseMilestone,
  onCreateEscrow,
  onOpenRateReview,
  prefill
}) => {
  const isHindi = language === 'hi';

  const [activeTab, setActiveTab] = useState<'contracts' | 'new_payment' | 'invoice'>('contracts');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(escrowProjects[0]?.id || 'escrow-901');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedMilestoneForRelease, setSelectedMilestoneForRelease] = useState<Milestone | null>(null);
  const [otpConfirm, setOtpConfirm] = useState('');
  const [releaseSuccessMsg, setReleaseSuccessMsg] = useState('');

  // Form states for creating new escrow
  const [newJobTitle, setNewJobTitle] = useState(prefill?.jobTitle || 'House Civil Renovation & Tile Fitting');
  const [newWorkerName, setNewWorkerName] = useState(prefill?.workerName || 'Ramesh Kumar Mistri');
  const [newAmount, setNewAmount] = useState<number>(prefill?.amount || 45000);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProject = escrowProjects.find(p => p.id === selectedProjectId) || escrowProjects[0];

  const handleConfirmRelease = () => {
    if (!currentProject || !selectedMilestoneForRelease) return;
    onReleaseMilestone(currentProject.id, selectedMilestoneForRelease.id);
    setReleaseSuccessMsg(`₹${selectedMilestoneForRelease.amount.toLocaleString('en-IN')} successfully transferred to ${currentProject.workerName}'s bank account.`);
    setSelectedMilestoneForRelease(null);
    setTimeout(() => setReleaseSuccessMsg(''), 4000);
  };

  const handleDepositNewEscrow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);

      const m1 = Math.round(newAmount * 0.3);
      const m2 = Math.round(newAmount * 0.4);
      const m3 = newAmount - m1 - m2;

      onCreateEscrow({
        id: `escrow-${Date.now().toString().slice(-4)}`,
        jobTitle: newJobTitle,
        workerName: newWorkerName,
        totalAmount: newAmount,
        fundedAmount: newAmount,
        releasedAmount: 0,
        status: 'funded',
        createdAt: 'Today',
        transactionRef: `DT-ESC-${Math.floor(100000000 + Math.random() * 900000000)}`,
        paymentMethod: selectedPaymentMethod,
        milestones: [
          {
            id: `ms-${Date.now()}-1`,
            title: 'Milestone 1: Advance Material & Mobilization',
            percentage: 30,
            amount: m1,
            status: 'in_progress',
            description: 'Site preparation, material shifting, and kickoff.',
            dueDate: 'In 3 days'
          },
          {
            id: `ms-${Date.now()}-2`,
            title: 'Milestone 2: 50% Work Inspection Signoff',
            percentage: 40,
            amount: m2,
            status: 'locked',
            description: 'Mid-term civil progress review.',
            dueDate: 'In 7 days'
          },
          {
            id: `ms-${Date.now()}-3`,
            title: 'Milestone 3: Final Quality Check & Handover',
            percentage: 30,
            amount: m3,
            status: 'locked',
            description: 'Final touches, site clearing and keys handover.',
            dueDate: 'In 12 days'
          }
        ]
      });

      setTimeout(() => {
        setPaymentSuccess(false);
        setActiveTab('contracts');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-heading">
                  {isHindi ? 'ठेकेदार सुरक्षा एस्क्रो (Secure Escrow)' : 'Thekedaar Suraksha Escrow'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  RBI Compliant
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isHindi 
                  ? 'आपका पैसा बैंक एस्क्रो में सुरक्षित — काम की जांच के बाद ही कारीगर को पेमेंट रिलीज करें'
                  : 'Funds held in trust by Digital Thekedaar. Released to worker only when you approve work milestones.'}
              </p>
            </div>
          </div>

          {/* Navigation Sub-tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-800 pt-3 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('contracts')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'contracts' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {isHindi ? 'सक्रिय एस्क्रो प्रोजेक्ट्स' : 'Active Escrow Contracts'} ({escrowProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('new_payment')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'new_payment' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>+ {isHindi ? 'नया एस्क्रो फंड जमा करें' : 'Fund New Contract'}</span>
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'invoice' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isHindi ? 'डिजिटल एग्रीमेंट व जीएसटी रसीद' : 'Invoice & Digital Agreement'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {releaseSuccessMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{releaseSuccessMsg}</span>
            </div>
          )}

          {/* TAB 1: ACTIVE CONTRACTS */}
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              
              {/* Project selector dropdown if multiple */}
              {escrowProjects.length > 1 && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {isHindi ? 'प्रोजेक्ट चुनें:' : 'Select Active Contract:'}
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                  >
                    {escrowProjects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.jobTitle} — ₹{p.totalAmount.toLocaleString('en-IN')} ({p.workerName})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {currentProject && (
                <div className="space-y-5">
                  
                  {/* Summary Card */}
                  <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                          {currentProject.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400">Ref: {currentProject.transactionRef}</span>
                      </div>
                      <h3 className="text-base font-bold font-heading text-white mt-1">
                        {currentProject.jobTitle}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Worker: <strong className="text-amber-400">{currentProject.workerName}</strong> ({currentProject.workerTrade})
                      </p>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 shrink-0">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                        Total Escrow Locked
                      </span>
                      <span className="text-2xl font-extrabold text-amber-400">
                        ₹{currentProject.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                        Released: ₹{currentProject.releasedAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Review Prompt for Completed or Released Milestones */}
                  {onOpenRateReview && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-base shrink-0 shadow-xs">
                          ⭐
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {isHindi ? `कारीगर ${currentProject.workerName} के कार्य को रेटिंग व रिव्यू दें` : `Rate & Review ${currentProject.workerName}'s Service`}
                          </h4>
                          <p className="text-[11px] text-slate-600">
                            {isHindi 
                              ? 'काम पूरा होने पर 1-5 स्टार व फीडबैक दें। आपकी समीक्षा कारीगर के सार्वजनिक प्रोफाइल पर दिखेगी।'
                              : 'Leave a 1-5 star score and feedback. Your review will be published to the worker’s public profile.'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onOpenRateReview(currentProject.workerName, currentProject.jobTitle);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                      >
                        {isHindi ? '⭐ रेटिंग दें' : '⭐ Rate & Review Now'}
                      </button>
                    </div>
                  )}

                  {/* Escrow Mechanism Step by Step Explanation */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">1</div>
                      <span className="font-bold text-slate-800 block">Funds Held in Safe Trust</span>
                      <span className="text-[10px] text-slate-500">Worker knows money is reserved</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">2</div>
                      <span className="font-bold text-slate-800 block">On-Site Work Inspection</span>
                      <span className="text-[10px] text-slate-500">You inspect work quality</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">3</div>
                      <span className="font-bold text-slate-800 block">Instant Release to Worker</span>
                      <span className="text-[10px] text-slate-500">1-click bank transfer</span>
                    </div>
                  </div>

                  {/* Milestones List */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      {isHindi ? 'कार्य माइलस्टोन विवरण (Work Milestones):' : 'Work Milestone Stages:'}
                    </h4>

                    <div className="space-y-3">
                      {currentProject.milestones.map((ms, index) => {
                        const isReleased = ms.status === 'released';
                        const isInProgress = ms.status === 'in_progress';
                        const isLocked = ms.status === 'locked';

                        return (
                          <div
                            key={ms.id}
                            className={`p-4 rounded-2xl border transition-all ${
                              isReleased
                                ? 'bg-emerald-50/50 border-emerald-200'
                                : isInProgress
                                ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                                : 'bg-slate-50/60 border-slate-200 opacity-75'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-slate-900">
                                    {ms.title}
                                  </span>
                                  {isReleased && (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                                      <Check className="w-3 h-3" /> Paid & Released
                                    </span>
                                  )}
                                  {isInProgress && (
                                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> Work In Progress
                                    </span>
                                  )}
                                  {isLocked && (
                                    <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center gap-1">
                                      <Lock className="w-3 h-3" /> Locked in Escrow
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 mt-1">
                                  {ms.description}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  Target: {ms.dueDate} {ms.approvedAt && `• Approved: ${ms.approvedAt}`}
                                </p>
                              </div>

                              <div className="text-right flex sm:flex-col items-center sm:items-end justify-between gap-2">
                                <span className="text-base font-extrabold text-slate-900">
                                  ₹{ms.amount.toLocaleString('en-IN')}
                                </span>

                                {isInProgress && (
                                  <button
                                    onClick={() => setSelectedMilestoneForRelease(ms)}
                                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{isHindi ? 'पेमेंट रिलीज करें' : 'Inspect & Release'}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* Release Confirmation Prompt Modal */}
              {selectedMilestoneForRelease && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-950">
                        {isHindi ? 'क्या आपने साइट पर काम की जांच कर ली है?' : 'Confirm Work Quality & Release Payment'}
                      </h4>
                      <p className="text-xs text-amber-900 mt-0.5">
                        You are releasing <strong>₹{selectedMilestoneForRelease.amount.toLocaleString('en-IN')}</strong> to <strong>{currentProject?.workerName}</strong> for "{selectedMilestoneForRelease.title}". This action transfers money instantly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setSelectedMilestoneForRelease(null)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmRelease}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>Release ₹{selectedMilestoneForRelease.amount.toLocaleString('en-IN')} Now</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: FUND NEW ESCROW */}
          {activeTab === 'new_payment' && (
            <form onSubmit={handleDepositNewEscrow} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                <p className="text-xs text-slate-300">
                  {isHindi
                    ? 'डिजिटल ठेकेदार एस्क्रो में धनराशि सुरक्षित जमा करें। कारीगर को काम शुरू करने का भरोसा मिलता है और आपका पैसा सुरक्षित रहता है।'
                    : 'Lock contract amount in Escrow. Worker is assured of payment while you retain 100% control over fund release.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'कार्य का नाम / प्रोजेक्ट' : 'Work / Project Title'}
                </label>
                <input
                  type="text"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'कारीगर / ठेकेदार का नाम' : 'Thekedaar / Worker Name'}
                  </label>
                  <input
                    type="text"
                    value={newWorkerName}
                    onChange={(e) => setNewWorkerName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'कुल अनुबंध राशि (₹)' : 'Total Agreed Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    min={1000}
                    step={500}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold font-mono"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isHindi ? 'सुरक्षित भुगतान विधि चुनें' : 'Select Secure Payment Mode'}
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedPaymentMethod === 'UPI'
                        ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1 text-emerald-600" />
                    <span className="text-xs block">UPI / QR Code</span>
                    <span className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedPaymentMethod === 'Card'
                        ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-sky-600" />
                    <span className="text-xs block">Cards</span>
                    <span className="text-[10px] text-slate-400">Debit / Credit / RuPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('NetBanking')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedPaymentMethod === 'NetBanking'
                        ? 'border-amber-500 bg-amber-50/80 font-bold text-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-purple-600" />
                    <span className="text-xs block">NetBanking</span>
                    <span className="text-[10px] text-slate-400">SBI, HDFC, ICICI, Axis</span>
                  </button>
                </div>
              </div>

              {/* UPI QR Simulation */}
              {selectedPaymentMethod === 'UPI' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center shrink-0">
                    <QrCode className="w-20 h-20 text-slate-900" />
                  </div>
                  <div className="text-xs space-y-1 text-slate-600">
                    <p className="font-bold text-slate-900">Scan QR via any UPI App</p>
                    <p>UPI ID: <code className="text-amber-800 font-mono font-bold">digitalthekedaar.escrow@rbi</code></p>
                    <p className="text-[11px] text-slate-500">
                      Amount will be locked into Escrow Account Ref: <span className="font-mono">DT-ESC-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <span>Processing Escrow Lock...</span>
                  ) : paymentSuccess ? (
                    <span>✓ Escrow Funded Successfully!</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Lock ₹{newAmount.toLocaleString('en-IN')} in Escrow</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: INVOICE & DIGITAL AGREEMENT */}
          {activeTab === 'invoice' && (
            <div className="space-y-4">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-4 font-mono text-slate-800">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 font-sans">
                      DIGITAL THEKEDAAR ESCROW VOUCHER
                    </h4>
                    <p className="text-[11px] text-slate-500 font-sans">
                      Government Recognized Labor & Construction Contract Record
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-amber-600">ORIGINAL FOR RECIPIENT</span>
                    <p className="text-[10px] text-slate-400">Date: 20 Sep 2026</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-sans">Hirer / Client</span>
                    <strong className="text-slate-900 font-sans">Dr. Vivek Mehra</strong>
                    <p className="text-slate-600">Noida Sector 78, Uttar Pradesh</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-sans">Assigned Thekedaar</span>
                    <strong className="text-slate-900 font-sans">Mohd. Imran Khan (UIDAI Verified)</strong>
                    <p className="text-slate-600">Trade: Painter & Polish • Team of 4</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <span className="text-[10px] text-slate-400 uppercase block font-sans">Scope of Work</span>
                  <p className="font-sans text-slate-700">
                    3BHK Complete Royale Paint, Surface Putty, Accent Stencil Wall, and Final Cleanup.
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm font-sans font-bold">
                  <span>Total Escrow Deposited:</span>
                  <span className="text-lg text-slate-900">₹34,000.00</span>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-sans text-[11px] flex items-center justify-between">
                  <span>Trust Badge: Escrow Milestone Protection Active</span>
                  <span className="font-bold">100% Guaranteed</span>
                </div>

              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => alert('Digital Thekedaar Escrow Contract PDF generated and downloaded to device.')}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Signed Agreement (PDF)</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
