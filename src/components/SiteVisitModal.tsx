import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  Check
} from 'lucide-react';
import { WorkerProfile, Language } from '../types';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: WorkerProfile | null;
  language: Language;
  onConfirmVisit: (worker: WorkerProfile, date: string, time: string, notes: string) => void;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({
  isOpen,
  onClose,
  worker,
  language,
  onConfirmVisit
}) => {
  const isHindi = language === 'hi';

  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 12:00 PM');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !worker) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmVisit(worker, selectedDate, selectedSlot, notes);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
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
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">
                {isHindi ? 'साइट विजिट व निरीक्षण बुक करें' : 'Schedule Free Site Inspection'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                With <strong className="text-amber-400">{worker.name}</strong> ({worker.trade})
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isHindi ? 'साइट विजिट स्लॉट बुक हो गया!' : 'Site Visit Confirmed!'}
              </h3>
              <p className="text-xs text-slate-600">
                {worker.name} has been notified and message added to your live chat.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Zero Inspection Fee Guarantee • No Obligation to Hire</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isHindi ? 'विजिट की तारीख' : 'Inspection Date'}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isHindi ? 'समय का स्लॉट' : 'Preferred Time Slot'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10:00 AM - 12:00 PM', '02:00 PM - 04:00 PM', '05:00 PM - 07:00 PM'].map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {slot.split(' - ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isHindi ? 'साइट का पता व लैंडमार्क' : 'Site Address & Landmark'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 402, Block C, Royal Towers or Plot 14"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {isHindi ? 'कोई विशेष निर्देश (वैकल्पिक)' : 'Special Notes for Thekedaar (Optional)'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Please bring measuring tape and catalog..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  {isHindi ? 'साइट विजिट निश्चित करें' : 'Confirm Free Site Inspection'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
