import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  MapPin, 
  HardHat, 
  Calendar, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Check
} from 'lucide-react';
import { JobPost, TradeCategory, Language } from '../types';
import { CITIES_LIST, TRADE_CATEGORIES } from '../data/mockData';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onJobCreated: (job: JobPost) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  language,
  onJobCreated
}) => {
  const isHindi = language === 'hi';

  const [title, setTitle] = useState('');
  const [trade, setTrade] = useState<TradeCategory>('Rajmistri / Mason');
  const [city, setCity] = useState('Delhi NCR');
  const [area, setArea] = useState('');
  const [budget, setBudget] = useState<number>(35000);
  const [durationDays, setDurationDays] = useState<number>(7);
  const [description, setDescription] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [escrowFunded, setEscrowFunded] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newJob: JobPost = {
      id: `job-${Date.now()}`,
      title,
      titleHindi: title,
      trade,
      hirerName: 'You (Current Hirer)',
      hirerPhone: '+91 98100 12345',
      city,
      area: area || `${city} Central`,
      budget,
      budgetType: 'fixed',
      durationDays,
      description: description || 'Scope discussed directly with shortlisted verified craftsmen on Digital Thekedaar chat.',
      status: 'open',
      applicantsCount: 0,
      postedAt: 'Just now',
      urgent,
      escrowFunded,
      siteVisitRequired: true
    };

    setIsSuccess(true);
    setTimeout(() => {
      onJobCreated(newJob);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
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
              <PlusCircle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading">
                {isHindi ? 'नया काम / टेंडर पोस्ट करें' : 'Post Work Requirement'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {isHindi 
                  ? 'सत्यापित कारीगर व ठेकेदार तुरंत आपका काम देखकर कोटेशन देंगे'
                  : 'Verified nearby thekedaars will review your scope & send direct quotes'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                {isHindi ? 'काम सफलतापूर्वक पोस्ट हो गया!' : 'Work Requirement Posted Successfully!'}
              </h3>
              <p className="text-xs text-slate-600">
                {isHindi 
                  ? 'निकटवर्ती कारीगरों को नोटिफिकेशन भेज दिया गया है।' 
                  : 'Nearby verified craftsmen in your area have been alerted.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'काम का शीर्षक (उदा: 3BHK पेंटिंग या बाउंड्री वॉल)' : 'Job Title (e.g. 3BHK Painting or Boundary Wall)'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ground Floor Plaster & Exterior Painting"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'कारीगर की श्रेणी' : 'Trade Category'}
                  </label>
                  <select
                    value={trade}
                    onChange={(e) => setTrade(e.target.value as TradeCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  >
                    {TRADE_CATEGORIES.filter(t => t !== 'All Trades').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'शहर' : 'City'}
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  >
                    {CITIES_LIST.filter(c => c !== 'All Cities').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'लोकेशन / कॉलोनी / पिनकोड' : 'Area / Landmark / Pincode'}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Sector 62 Noida near Metro Station"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'अनुमानित बजट (₹)' : 'Estimated Budget (₹)'}
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    min={1000}
                    step={1000}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'कार्य अवधि (दिन)' : 'Expected Duration (Days)'}
                  </label>
                  <input
                    type="number"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'विस्तृत विवरण (Scope of Work)' : 'Detailed Scope of Work'}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Provide details about area in sq.ft, material status, special requirements..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={urgent}
                    onChange={(e) => setUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500"
                  />
                  <span>🚨 {isHindi ? 'तत्काल आवश्यकता (Urgent)' : 'Urgent Requirement (Start in 24 hrs)'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={escrowFunded}
                    onChange={(e) => setEscrowFunded(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span>🛡️ {isHindi ? 'एस्क्रो गारंटी सक्रिय' : 'Escrow Guarantee Badge'}</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {isHindi ? 'आवश्यकता पोस्ट करें' : 'Post Requirement Now'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
