import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Send, 
  Check, 
  Filter, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { JobPost, Language } from '../types';

interface JobLeadsBoardProps {
  jobs: JobPost[];
  language: Language;
  onApplyOrChat: (job: JobPost) => void;
  onOpenEscrow: (jobTitle: string, workerName: string, amount: number) => void;
}

export const JobLeadsBoard: React.FC<JobLeadsBoardProps> = ({
  jobs,
  language,
  onApplyOrChat,
  onOpenEscrow
}) => {
  const isHindi = language === 'hi';
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});
  const [selectedTrade, setSelectedTrade] = useState<string>('all');

  const handleApply = (job: JobPost) => {
    setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
    onApplyOrChat(job);
  };

  const filteredJobs = selectedTrade === 'all'
    ? jobs
    : jobs.filter(j => j.trade.includes(selectedTrade));

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
              {isHindi ? 'कारीगरों व ठेकेदारों हेतु काम के नए अवसर' : 'Direct Work Opportunities & Leads for Thekedaars'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              0% Commission
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {isHindi
              ? 'सीधे घर मालिकों से काम पाएं। कोई बिचौलिया नहीं, 100% सुरक्षित एस्क्रो भुगतान।'
              : 'Direct client requirements. Apply, chat directly, and lock guaranteed escrow milestones.'}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">{isHindi ? 'सभी ट्रेड्स' : 'All Trade Categories'}</option>
            <option value="Mason">Mason / Mistri</option>
            <option value="Painter">Painter</option>
            <option value="Electrician">Electrician</option>
            <option value="Carpenter">Carpenter</option>
          </select>
        </div>
      </div>

      {/* Grid of Leads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map(job => {
          const isApplied = appliedJobs[job.id];

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                
                {/* Top status line */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 text-xs font-bold">
                      {job.trade}
                    </span>
                    {job.urgent && (
                      <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                        Urgent
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    {job.postedAt}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {isHindi ? job.titleHindi : job.title}
                </h3>

                {/* Budget & Duration highlight */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Client Budget</span>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{job.budget.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Timeline</span>
                    <span className="text-xs font-bold text-slate-700">
                      {job.durationDays} {isHindi ? 'दिन' : 'Days Approx'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Payment Security</span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {job.escrowFunded ? 'Escrow Ready' : 'Verified Client'}
                    </span>
                  </div>
                </div>

                {/* Scope Description */}
                <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {job.description}
                </p>

                {/* Location & Client info */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="truncate">{job.area}, {job.city}</span>
                  </span>
                  <span className="shrink-0 font-medium text-slate-700">
                    Hirer: {job.hirerName}
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                
                <span className="text-xs text-slate-400">
                  {job.applicantsCount} {isHindi ? 'कारीगरों ने देखा' : 'proposals submitted'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApply(job)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isHindi ? 'सीधी बातचीत' : 'Chat with Hirer'}</span>
                  </button>

                  <button
                    onClick={() => handleApply(job)}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'प्रस्ताव भेजा गया' : 'Quote Submitted'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'कोटेशन / बोली लगाएं' : 'Submit Quotation'}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
