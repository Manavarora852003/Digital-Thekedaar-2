import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  Handshake, 
  TrendingUp, 
  Camera, 
  Upload, 
  RotateCcw,
  Check,
  Sparkles,
  Sliders,
  Maximize2,
  Sun,
  Eye
} from 'lucide-react';
import { Language } from '../types';

interface FounderMessageSectionProps {
  language: Language;
  onOpenSupportModal?: () => void;
}

// High quality fallback portrait with blazer and glasses
const DEFAULT_FOUNDER_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=85';

export const FounderMessageSection: React.FC<FounderMessageSectionProps> = ({
  language
}) => {
  const isHindi = language === 'hi';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load photo from localStorage or fallback
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('dt_founder_photo');
      return saved || '';
    } catch {
      return '';
    }
  });

  // Studio enhancements state
  const [isStudioEnhanced, setIsStudioEnhanced] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('dt_founder_enhanced');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [zoomLevel, setZoomLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dt_founder_zoom');
      return saved ? parseFloat(saved) : 1.18; // Default 1.18x crops stage mic cleanly
    } catch {
      return 1.18;
    }
  });

  const [verticalShift, setVerticalShift] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('dt_founder_shift_y');
      return saved ? parseFloat(saved) : 18; // Default 18% focuses on face and glasses
    } catch {
      return 18;
    }
  });

  const [showControls, setShowControls] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Process file upload
  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        try {
          localStorage.setItem('dt_founder_photo', result);
          localStorage.setItem('dt_founder_enhanced', 'true');
        } catch (err) {
          console.warn('Could not save to localStorage:', err);
        }
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl('');
    try {
      localStorage.removeItem('dt_founder_photo');
      localStorage.removeItem('dt_founder_enhanced');
      localStorage.removeItem('dt_founder_zoom');
      localStorage.removeItem('dt_founder_shift_y');
    } catch {
      // ignore
    }
    setZoomLevel(1.18);
    setVerticalShift(18);
  };

  const activePhoto = photoUrl || DEFAULT_FOUNDER_PHOTO;
  const isCustomUserPhoto = Boolean(photoUrl);

  return (
    <section 
      id="founder-message" 
      className="py-14 sm:py-20 bg-[#FAF8F5] relative overflow-hidden border-t border-[#F2EDE4]"
    >
      {/* Background Soft Amber Accents matching screenshot */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#FFF2D6]/80 via-[#FFF8EB]/40 to-transparent rounded-full blur-3xl pointer-events-none -mr-28 -mt-24" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Layout matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Letter, Vision & Signature (7 Cols) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-start">
            
            {/* Top Badge matching screenshot: FROM THE FOUNDER */}
            <div className="self-start inline-block px-3 py-1 bg-[#FEF3C7] text-[#B45309] font-bold text-xs rounded tracking-wider uppercase mb-4">
              {isHindi ? 'संस्थापक का संदेश' : 'FROM THE FOUNDER'}
            </div>

            {/* Main Heading matching screenshot */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0F172A] tracking-tight leading-[1.15] mb-6 font-heading">
              {isHindi ? (
                <>
                  एक कदम <br />
                  <span className="text-[#0F172A]">अधिक </span>
                  <span className="text-[#E68814]">समावेशी कल की ओर</span>
                </>
              ) : (
                <>
                  A Step Towards <br />
                  <span className="text-[#0F172A]">A More </span>
                  <span className="text-[#E68814]">Inclusive Tomorrow</span>
                </>
              )}
            </h2>

            {/* Three Body Paragraphs exactly as in reference */}
            <div className="space-y-4 text-[#334155] text-[15px] sm:text-[16.5px] leading-relaxed">
              {isHindi ? (
                <>
                  <p>
                    डिजिटल ठेकेदार में, हमारा दृढ़ विश्वास है कि प्रत्येक कारीगर और श्रमिक सम्मान, निरंतर काम और अपने जीवन में आगे बढ़ने के निष्पक्ष अवसर का हकदार है। साथ ही, हर व्यक्ति या व्यवसाय को बिना दलालों की चिंता के, सही और कुशल हुनर तक पहुंचने का एक आसान और पारदर्शी माध्यम मिलना चाहिए।
                  </p>
                  <p>
                    हमारा उद्देश्य तकनीक के माध्यम से कारीगरों और काम देने वालों के बीच की दूरी को मिटाना है, ताकि एक पारदर्शी, कुशल और भरोसेमंद प्रणाली तैयार की जा सके।
                  </p>
                  <p>
                    यह प्लेटफ़ॉर्म केवल एक वेबसाइट नहीं है, यह एक बड़े बदलाव की ओर एक छोटा कदम है — एक ऐसा भविष्य जहां किसी भी मजदूर को लेबर चौक पर अनिश्चितता में खड़ा न रहना पड़े, और न ही किसी को सही काम और कारीगर ढूंढने में भटकना पड़े।
                  </p>
                  <p className="text-[#0F172A] font-bold text-[16px] sm:text-[17.5px] pt-1">
                    आइए, मिलकर एक अधिक संगठित, सशक्त और समावेशी भारत का निर्माण करें।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    At Digital Thekedaar, we believe that every worker deserves respect, opportunities and a fair chance to grow, and every individual or business deserves an easy and reliable way to find the right talent. Our goal is to bridge the gap between workers and those who need them, using technology to create a more transparent, efficient and trustworthy system.
                  </p>
                  <p>
                    This platform is not just a website, it’s a small step towards a bigger change — a future where no worker has to wait uncertainly at a labour chowk, and no one has to struggle to find the right help.
                  </p>
                  <p className="text-[#0F172A] font-bold text-[16px] sm:text-[17.5px] pt-1">
                    Let’s build a more connected, empowered and inclusive India together.
                  </p>
                </>
              )}
            </div>

            {/* Handwritten Signature Block matching screenshot */}
            <div className="mt-8 pt-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className="text-[38px] sm:text-[44px] text-[#0F172A] leading-none select-none tracking-wide font-bold"
                    style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                  >
                    Manav Arora
                  </div>
                  {/* Graceful cursive underline */}
                  <div className="w-48 h-[2px] bg-[#0F172A] rounded-full mt-0.5 opacity-80" />
                </div>
              </div>

              {/* Founder Title Details */}
              <div className="mt-3.5 space-y-0.5">
                <div className="text-xs font-black tracking-[0.16em] text-[#0F172A] uppercase">
                  MANAV ARORA
                </div>
                <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                  {isHindi ? 'सीईओ एवं संस्थापक' : 'CEO & FOUNDER'}
                </div>
                <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  DIGITAL THEKEDAAR
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Photo Card, Quote & Pillars matching screenshot (5/6 Cols) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center lg:items-start gap-6">
            
            {/* Upper Row: Photo Card + Quote */}
            <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8">
              
              {/* Photo Card of Manav Arora with Dark Navy Bottom Pill */}
              <div className="flex flex-col items-center">
                <div 
                  className={`relative group w-[280px] sm:w-[295px] shrink-0 rounded-2xl overflow-hidden shadow-xl border ${
                    isDragging ? 'border-amber-500 ring-4 ring-amber-500/20' : 'border-slate-200/90'
                  } bg-[#F4EFE6] transition-all duration-300 hover:shadow-2xl`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Hidden File Input for Custom Photo */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoUpload} 
                  />

                  {/* Portrait Photo Container with Studio Framing */}
                  <div className="relative w-full h-[360px] bg-[#EFE9DF] overflow-hidden">
                    
                    {/* Studio Warm Backlight Gradient (Gives stage photos a clean studio fill) */}
                    {isStudioEnhanced && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#E2D7C3]/50 via-transparent to-[#FFF9EE]/40 z-[1] pointer-events-none mix-blend-overlay" />
                    )}

                    {/* The Photo Image */}
                    <img 
                      src={activePhoto} 
                      alt="Manav Arora, CEO & Founder of Digital Thekedaar" 
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isStudioEnhanced 
                          ? 'contrast-[1.07] brightness-[1.03] saturate-[1.03]' 
                          : ''
                      }`}
                      style={{
                        transform: `scale(${zoomLevel}) translateY(${verticalShift}px)`,
                        transformOrigin: 'center 20%'
                      }}
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle Studio Vignette Frame */}
                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.06)] z-[2] pointer-events-none" />

                    {/* Prompt Badge if user hasn't loaded Photo.jpeg yet */}
                    {!isCustomUserPhoto && (
                      <div className="absolute inset-x-3 top-3 z-10 bg-slate-900/85 backdrop-blur-sm text-white p-2.5 rounded-xl text-center shadow-lg border border-amber-400/40">
                        <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{isHindi ? 'अपनी फोटो (Photo.jpeg) जोड़ें' : 'Attach Photo.jpeg'}</span>
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-1.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-lg shadow cursor-pointer transition-all active:scale-95"
                        >
                          {isHindi ? 'फ़ाइल चुनें या यहाँ खींचें' : 'Select Photo.jpeg / Drag here'}
                        </button>
                      </div>
                    )}

                    {/* Quick Action Overlay on Hover/Touch */}
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-4 text-center z-20">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-amber-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Upload className="w-4 h-4 text-amber-600" />
                        <span>{isHindi ? 'Photo.jpeg बदलें / अपलोड करें' : 'Upload / Replace Photo'}</span>
                      </button>

                      <button
                        onClick={() => setShowControls(!showControls)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>{showControls ? 'Close Adjustments' : 'Fine-Tune Framing'}</span>
                      </button>

                      {isCustomUserPhoto && (
                        <button
                          onClick={handleResetPhoto}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-rose-900/80 text-slate-300 text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{isHindi ? 'रीसेट करें' : 'Reset'}</span>
                        </button>
                      )}
                    </div>

                    {/* Upload Success Toast */}
                    {uploadSuccess && (
                      <div className="absolute top-3 inset-x-3 bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xl flex items-center justify-center gap-1.5 z-30 animate-fade-in">
                        <Check className="w-4 h-4" />
                        <span>{isHindi ? 'Manav Arora की फोटो अपडेट हो गई!' : 'Photo Updated & Studio-Enhanced!'}</span>
                      </div>
                    )}
                  </div>

                  {/* Navy Blue Bottom Banner matching screenshot */}
                  <div className="bg-[#11223F] px-5 py-3.5 text-center">
                    <h3 className="text-[19px] font-bold text-white tracking-wide leading-tight">
                      Manav Arora
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-[0.2em] mt-1">
                      {isHindi ? 'सीईओ एवं संस्थापक' : 'CEO & FOUNDER'}
                    </p>
                  </div>
                </div>

                {/* Studio Enhancement Controls Panel */}
                {showControls && (
                  <div className="w-[280px] sm:w-[295px] mt-2 bg-white rounded-xl p-3 border border-slate-200 shadow-md text-xs space-y-2.5 z-30">
                    <div className="flex items-center justify-between font-bold text-slate-900 pb-1 border-b border-slate-100">
                      <span className="flex items-center gap-1.5 text-amber-600">
                        <Sparkles className="w-3.5 h-3.5" /> Studio Clarity
                      </span>
                      <button 
                        onClick={() => {
                          const next = !isStudioEnhanced;
                          setIsStudioEnhanced(next);
                          localStorage.setItem('dt_founder_enhanced', String(next));
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          isStudioEnhanced ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isStudioEnhanced ? 'Enhanced ON' : 'Original'}
                      </button>
                    </div>

                    {/* Zoom framing */}
                    <div>
                      <div className="flex justify-between text-slate-600 text-[11px] mb-1">
                        <span>Crop / Zoom (hides mic):</span>
                        <span className="font-bold">{Math.round(zoomLevel * 100)}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="1.5" 
                        step="0.02" 
                        value={zoomLevel} 
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setZoomLevel(val);
                          localStorage.setItem('dt_founder_zoom', String(val));
                        }}
                        className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded cursor-pointer" 
                      />
                    </div>

                    {/* Shift Vertical */}
                    <div>
                      <div className="flex justify-between text-slate-600 text-[11px] mb-1">
                        <span>Center Face Position:</span>
                        <span className="font-bold">{verticalShift}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="-20" 
                        max="50" 
                        step="2" 
                        value={verticalShift} 
                        onChange={(e) => {
                          const val = parseFloat(e.target.value);
                          setVerticalShift(val);
                          localStorage.setItem('dt_founder_shift_y', String(val));
                        }}
                        className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded cursor-pointer" 
                      />
                    </div>

                    <div className="text-[10px] text-slate-500 italic text-center pt-0.5">
                      {isHindi 
                        ? 'चेहरे के मूल फीचर्स को बदले बिना पेशेवर स्पष्टता और स्टूडियो फ्रेमिंग।' 
                        : 'Clean studio framing without altering natural facial features.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Quote to the right of the photo (Matching screenshot) */}
              <div className="sm:pt-6 flex-1 text-center sm:text-left max-w-[240px]">
                <p 
                  className="text-2xl sm:text-[28px] text-[#1E293B] leading-snug select-none"
                  style={{ fontFamily: "'Caveat', 'Dancing Script', cursive" }}
                >
                  {isHindi ? (
                    '“आज बेहतर अवसर, कल एक मजबूत भारत।”'
                  ) : (
                    '“Better opportunities today, a stronger India tomorrow.”'
                  )}
                </p>
                {/* Golden Orange Accent Dash Line matching screenshot */}
                <div className="w-12 h-1 bg-[#E68814] rounded-full mt-3 mx-auto sm:mx-0" />
              </div>

            </div>

            {/* Bottom 3-Pillars Card matching screenshot */}
            <div className="w-full bg-[#FFFDF8] border border-[#FED7AA]/80 rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="grid grid-cols-3 gap-2 divide-x divide-amber-200/80">
                
                {/* Item 1: Empower Workers */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-2 first:pl-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#E68814]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E293B] leading-tight">
                    {isHindi ? (
                      <>कारीगरों का<br />सशक्तिकरण</>
                    ) : (
                      <>Empower<br />Workers</>
                    )}
                  </div>
                </div>

                {/* Item 2: Simplify Hiring */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Handshake className="w-5 h-5 text-[#E68814]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E293B] leading-tight">
                    {isHindi ? (
                      <>भर्ती प्रक्रिया<br />आसान</>
                    ) : (
                      <>Simplify<br />Hiring</>
                    )}
                  </div>
                </div>

                {/* Item 3: Build a Stronger India */}
                <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-4 last:pr-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#E68814]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E293B] leading-tight">
                    {isHindi ? (
                      <>मजबूत<br />भारत</>
                    ) : (
                      <>Build a<br />Stronger India</>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
