import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ThumbsUp, 
  Clock, 
  Award, 
  Check, 
  MessageSquare,
  Building
} from 'lucide-react';
import { WorkerProfile, Language, Review } from '../types';

interface RateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: WorkerProfile | null;
  projectTitle?: string;
  language: Language;
  onSubmitReview: (reviewData: {
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
  }) => void;
}

export const RateReviewModal: React.FC<RateReviewModalProps> = ({
  isOpen,
  onClose,
  worker,
  projectTitle = 'Civil & Construction Work',
  language,
  onSubmitReview
}) => {
  const isHindi = language === 'hi';

  const [overallRating, setOverallRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [punctualityRating, setPunctualityRating] = useState<number>(5);
  const [behaviorRating, setBehaviorRating] = useState<number>(5);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [hirerName, setHirerName] = useState<string>('Dr. Vivek Mehra');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !worker) return null;

  const ratingLabels = [
    '',
    isHindi ? 'असंतोषजनक (Needs Improvement)' : 'Poor Quality',
    isHindi ? 'औसत (Fair / Average)' : 'Fair',
    isHindi ? 'अच्छा काम (Good Work)' : 'Good Experience',
    isHindi ? 'बहुत बढ़िया (Very Good)' : 'Very Good & Recommended',
    isHindi ? 'उत्कृष्ट व भरोसेमंद (Master Craftsman)' : 'Excellent & Highly Recommended'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSuccess(true);
    setTimeout(() => {
      onSubmitReview({
        workerId: worker.id,
        hirerName: hirerName || 'Verified Homeowner',
        rating: overallRating,
        title: title || (overallRating === 5 ? 'Exceptional Workmanship' : 'Good Service'),
        comment,
        projectTitle: projectTitle || `${worker.trade} Project`,
        qualityRating,
        punctualityRating,
        behaviorRating,
        verifiedHirer: true
      });
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
              <Star className="w-7 h-7 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-heading">
                  {isHindi ? 'कारीगर को रेटिंग व रिव्यू दें' : 'Rate & Review Craftsman'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Verified Hirer
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isHindi 
                  ? 'काम पूरा होने के बाद अपनी निष्पक्ष प्रतिक्रिया साझा करें ताकि अन्य घर मालिक भी सही निर्णय ले सकें।'
                  : 'Share your honest feedback following project completion. This will be publicly visible on the worker\'s profile.'}
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
                {isHindi ? 'रिव्यू सफलतापूर्वक दर्ज किया गया!' : 'Review Submitted Successfully!'}
              </h3>
              <p className="text-xs text-slate-600">
                {isHindi 
                  ? `${worker.name} की प्रोफ़ाइल पर आपकी रेटिंग और समीक्षा लाइव अपडेट हो गई है।`
                  : `Your review and rating have been publicly attached to ${worker.name}'s verified profile.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Target Worker Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-slate-900 truncate">
                      {isHindi ? worker.nameHindi : worker.name}
                    </strong>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                      {worker.trade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Project: <strong className="text-slate-700">{projectTitle}</strong>
                  </p>
                </div>
              </div>

              {/* Primary 5-Star Interactive Rating */}
              <div className="text-center p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isHindi ? 'कुल अनुभव (Overall Rating)' : 'Overall Service Rating'}
                </label>

                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setOverallRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 active:scale-95 focus:outline-none"
                    >
                      <Star
                        className={`w-9 h-9 transition-colors ${
                          (hoverRating || overallRating) >= star
                            ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="text-xs font-bold text-amber-900 mt-2">
                  {ratingLabels[hoverRating || overallRating]}
                </p>
              </div>

              {/* Sub-Criteria Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    {isHindi ? 'काम की फिनिशिंग' : 'Work Quality'}
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        onClick={() => setQualityRating(star)}
                        className={`w-4 h-4 cursor-pointer ${
                          qualityRating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    {isHindi ? 'समय की पाबंदी' : 'Punctuality'}
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        onClick={() => setPunctualityRating(star)}
                        className={`w-4 h-4 cursor-pointer ${
                          punctualityRating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    {isHindi ? 'ईमानदार व्यवहार' : 'Behavior & Trust'}
                  </span>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        onClick={() => setBehaviorRating(star)}
                        className={`w-4 h-4 cursor-pointer ${
                          behaviorRating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Title & Comment */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'समीक्षा का मुख्य शीर्षक' : 'Review Headline / Title'}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Completed our boundary wall 2 days ahead of schedule"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'विस्तृत अनुभव व कार्य समीक्षा *' : 'Detailed Written Review & Experience *'}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Tell other homeowners about their work quality, cleanliness, punctuality, and tool readiness..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isHindi ? 'आपका नाम (क्लाइंट)' : 'Your Name (Homeowner / Hirer)'}
                    </label>
                    <input
                      type="text"
                      value={hirerName}
                      onChange={(e) => setHirerName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isHindi ? 'प्रोजेक्ट का प्रकार' : 'Work Project Category'}
                    </label>
                    <input
                      type="text"
                      value={projectTitle}
                      readOnly
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Escrow Badge Notice */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Escrow Verified Badge:</strong> This review will display a verified hire checkmark because funds were processed through Digital Thekedaar Escrow.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isHindi ? 'रिव्यू व रेटिंग पब्लिश करें' : 'Publish Rating & Review'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
