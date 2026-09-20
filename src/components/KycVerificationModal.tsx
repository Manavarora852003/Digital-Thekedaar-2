import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  FileText, 
  Award, 
  Building2, 
  CreditCard, 
  Smartphone, 
  Lock, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';
import { Language, Role } from '../types';

interface KycVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentRole: Role;
  onVerificationComplete: () => void;
}

export const KycVerificationModal: React.FC<KycVerificationModalProps> = ({
  isOpen,
  onClose,
  language,
  currentRole,
  onVerificationComplete
}) => {
  const isHindi = language === 'hi';

  const [activeStep, setActiveStep] = useState<number>(1);
  const [aadhaarNumber, setAadhaarNumber] = useState('5482 9102 3847');
  const [otpValue, setOtpValue] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAadhaarDone, setIsAadhaarDone] = useState(true);

  const [tradeSelected, setTradeSelected] = useState('Rajmistri / Mason');
  const [experienceYears, setExperienceYears] = useState('12');
  const [skillCertificateUploaded, setSkillCertificateUploaded] = useState(true);

  const [policeCertNumber, setPoliceCertNumber] = useState('POL-DEL-2026-8841');
  const [policeCheckConsent, setPoliceCheckConsent] = useState(true);
  const [isPoliceDone, setIsPoliceDone] = useState(true);

  const [upiId, setUpiId] = useState('ramesh.mistri@oksbi');
  const [bankAccount, setBankAccount] = useState('50100492819284');
  const [ifscCode, setIfscCode] = useState('SBIN0004928');
  const [isBankDone, setIsBankDone] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate KYC score
  let completedCount = 0;
  if (isAadhaarDone) completedCount += 35;
  if (skillCertificateUploaded) completedCount += 25;
  if (isPoliceDone) completedCount += 25;
  if (isBankDone) completedCount += 15;

  const handleVerifyAadhaar = () => {
    if (!isOtpSent) {
      setIsOtpSent(true);
    } else {
      setIsAadhaarDone(true);
      setActiveStep(2);
    }
  };

  const handleCompleteAll = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onVerificationComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
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
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-heading">
                  {isHindi ? 'डिजिटल ठेकेदार सत्यापन केंद्र (KYC)' : 'Thekedaar Trust & KYC Verification'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  Govt Compliant
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isHindi 
                  ? 'सत्यापित प्रोफाइल वाले कारीगरों को 5 गुना अधिक सीधे काम और एस्क्रो भुगतान मिलते हैं'
                  : 'Verified profiles get 5x more direct hirer leads, higher rates & instant escrow payouts'}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
              <span className="text-slate-300">{isHindi ? 'सत्यापन प्रगति (KYC Score):' : 'Overall Verification Score:'}</span>
              <span className="text-emerald-400 font-bold">{completedCount}% {completedCount === 100 ? '✅ Gold Shield' : ''}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completedCount}%` }}
              />
            </div>
          </div>

          {/* Steps selector */}
          <div className="flex items-center justify-between gap-1 mt-4 text-xs font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveStep(1)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeStep === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>1. {isHindi ? 'आधार (UIDAI)' : 'Aadhaar ID'}</span>
              {isAadhaarDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeStep === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>2. {isHindi ? 'हुनर व अनुभव' : 'Trade Skill'}</span>
              {skillCertificateUploaded && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeStep === 3 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>3. {isHindi ? 'पुलिस सत्यापन' : 'Police Check'}</span>
              {isPoliceDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeStep === 4 ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>4. {isHindi ? 'बैंक खाता (UPI)' : 'Bank / UPI'}</span>
              {isBankDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                {isHindi ? 'बधाई! आपकी प्रोफाइल 100% सत्यापित हो गई है' : 'Congratulations! Your Profile is 100% Verified'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {isHindi
                  ? 'आपकी प्रोफाइल पर अब "Digital Thekedaar Verified Gold Shield" सक्रिय हो गया है। ग्राहक अब सीधे आपसे संपर्क कर सकते हैं।'
                  : 'Your "Digital Thekedaar Verified Gold Shield" is now active. Homeowners will see your verified badge on search results and chats.'}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs">
                <span>UIDAI DigiLocker Verified</span> • <span>Police Cleared</span> • <span>Escrow Ready</span>
              </div>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {isHindi ? 'डैशबोर्ड पर वापस जाएं' : 'Return to Dashboard'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              
              {/* STEP 1: AADHAAR */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                    <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <strong>UIDAI DigiLocker Integration:</strong> Instant Aadhaar e-KYC without manual paper submissions.
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isHindi ? '12-अंकों का आधार कार्ड नंबर' : '12-Digit Aadhaar Card Number'}
                    </label>
                    <input
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      placeholder="XXXX XXXX XXXX"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {isOtpSent && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
                      <label className="block text-xs font-bold text-slate-700">
                        {isHindi ? 'मोबाइल पर प्राप्त 6-अंकों का OTP दर्ज करें' : 'Enter 6-Digit OTP sent to linked mobile (+91 ********47)'}
                      </label>
                      <input
                        type="text"
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        placeholder="849201"
                        maxLength={6}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <p className="text-[11px] text-slate-500">
                        {isHindi ? 'सिमुलेशन मोड: कोई भी 6 अंक दर्ज करें या सीधा वेरीफाई पर क्लिक करें।' : 'Demo simulation: Enter any 6 digits or click confirm.'}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      256-bit Bank Grade Encryption
                    </span>
                    <button
                      onClick={handleVerifyAadhaar}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
                    >
                      {isOtpSent ? (isHindi ? 'OTP सत्यापित करें' : 'Confirm OTP & Proceed') : (isHindi ? 'OTP भेजें' : 'Send DigiLocker OTP')}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: TRADE SKILL */}
              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isHindi ? 'मुख्य हुनर / ट्रेड' : 'Primary Trade Skill'}
                      </label>
                      <select
                        value={tradeSelected}
                        onChange={(e) => setTradeSelected(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
                      >
                        <option>Rajmistri / Mason</option>
                        <option>Painter & Polish</option>
                        <option>Electrician</option>
                        <option>Carpenter / Badhai</option>
                        <option>General Thekedaar</option>
                        <option>Plumber</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isHindi ? 'कुल अनुभव (वर्ष)' : 'Experience in Years'}
                      </label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isHindi ? 'स्किल सर्टिफिकेट या पिछले काम का प्रमाण' : 'Upload ITI / Skill Certificate / Site Photo'}
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-amber-400 transition-colors bg-slate-50 cursor-pointer">
                      <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-800">
                        {isHindi ? 'फाइल चुनें या यहाँ ड्रैग करें' : 'Click to upload certificate or site photo'}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">JPG, PNG or PDF (Max 10MB)</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>CIDC_Skill_Certificate_Mason_L4.pdf (Attached)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
                    >
                      {isHindi ? 'आगे बढ़ें' : 'Next Step →'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: POLICE BACKGROUND */}
              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    <strong>Character & Police Background Clearance:</strong> Required to assure homeowners and secure high-value commercial jobs.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isHindi ? 'पुलिस सत्यापन प्रमाण पत्र नंबर' : 'Police Verification Certificate Reference No.'}
                    </label>
                    <input
                      type="text"
                      value={policeCertNumber}
                      onChange={(e) => setPoliceCertNumber(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={policeCheckConsent}
                        onChange={(e) => setPoliceCheckConsent(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 mt-0.5"
                      />
                      <span>
                        {isHindi
                          ? 'मैं प्रमाणित करता हूँ कि मेरे विरुद्ध किसी भी न्यायालय अथवा पुलिस थाने में कोई आपराधिक प्रकरण दर्ज नहीं है। दी गई सभी जानकारी पूर्णतः सत्य है।'
                          : 'I declare that I have no criminal record or pending legal cases in any court or police station across India. All provided credentials are authentic.'}
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm cursor-pointer"
                    >
                      {isHindi ? 'आगे बढ़ें' : 'Next Step →'}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: BANK ACCOUNT / UPI */}
              {activeStep === 4 && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <strong>Direct Escrow Milestone Payouts:</strong> Funds released by Hirer will be transferred directly to this account via IMPS/UPI.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isHindi ? 'UPI आईडी (PhonePe, GPay, Paytm, BHIM)' : 'Primary UPI ID for Instant Payouts'}
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@upi or name@oksbi"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isHindi ? 'बैंक खाता संख्या' : 'Bank Account Number'}
                      </label>
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isHindi ? 'IFSC कोड' : 'IFSC Code'}
                      </label>
                      <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Penny-Drop Verification: Account Holder Name Matched (Ramesh Kumar)
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleCompleteAll}
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Verifying Documents...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>{isHindi ? 'सत्यापन पूर्ण करें व बैज प्राप्त करें' : 'Submit & Activate Gold Shield'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
