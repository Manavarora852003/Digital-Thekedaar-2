import React from 'react';
import { 
  HardHat, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { SUPPORT_CONTACT_INFO } from '../data/mockData';

interface FooterProps {
  language: Language;
  onOpenVerification: () => void;
  onOpenEscrow: () => void;
  onOpenCalculator: () => void;
  onOpenPostJob: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenVerification,
  onOpenEscrow,
  onOpenCalculator,
  onOpenPostJob,
  onOpenAdmin
}) => {
  const isHindi = language === 'hi';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 bg-slate-900/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHindi ? '100% सरकारी पहचान व पुलिस जांच' : '100% Verified Identity & Police KYC'}
              </h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                {isHindi 
                  ? 'डिजीलॉकर आधार प्रमाणीकरण और जिला पुलिस चरित्र सत्यापन के बाद ही प्रोफाइल लाइव होती है।' 
                  : 'Every thekedaar is vetted via DigiLocker Aadhaar e-KYC and local police verification before taking jobs.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <span className="text-base font-bold">₹</span>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHindi ? 'सुरक्षित माइलस्टोन एस्क्रो' : 'Thekedaar Suraksha Escrow'}
              </h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                {isHindi 
                  ? 'पैसा सुरक्षित बैंक एस्क्रो में रहता है। काम का मुआयना करने के बाद ही कारीगर को भुगतान रिलीज होता है।' 
                  : 'Funds held in RBI-compliant escrow vaults. Payout is only disbursed when you approve the milestone.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHindi ? 'निःशुल्क साइट विजिट व नाप-तौल' : 'Free Site Measurement & Estimate'}
              </h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                {isHindi 
                  ? 'कारीगर से सीधे बात करें, बिना किसी शुल्क के साइट का नाप कराएं और काम शुरू करने से पहले पक्का कोटेशन लें।' 
                  : 'Book a free visit. Inspect previous physical sites and agree on fair labor rates before deposit.'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand & Direct Email Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <HardHat className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Digital<span className="text-amber-500">Thekedaar</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {isHindi
                ? 'भारत का प्रमुख कुशल कारीगर व ठेकेदार मार्केटप्लेस। घर, दुकान या कोठी निर्माण हेतु विश्वसनीय मिस्त्री, बढ़ई, पेंटर व प्लंबर खोजें।'
                : 'India\'s unified construction platform connecting skilled mistris, thekedaars, and property owners with direct chat, transparent rate indexes, and escrow protection.'}
            </p>

            {/* Email & Phone */}
            <div className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800/80">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Official Mail: <a href={`mailto:${SUPPORT_CONTACT_INFO.primaryEmail}`} className="font-bold text-amber-400 hover:underline">{SUPPORT_CONTACT_INFO.primaryEmail}</a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Priority Helpline: <strong className="text-white">{SUPPORT_CONTACT_INFO.helplinePhone}</strong>
                </span>
              </p>
            </div>
          </div>

          {/* For Hirers */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {isHindi ? 'घर मालिकों / Hirers के लिए' : 'For Hirers & Clients'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenPostJob} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'काम पोस्ट करें (Post Tender)' : 'Post Work Requirement'}
                </button>
              </li>
              <li>
                <button onClick={onOpenEscrow} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'एस्क्रो कैसे काम करता है' : 'How Safe Escrow Works'}
                </button>
              </li>
              <li>
                <button onClick={onOpenCalculator} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'कंस्ट्रक्शन रेट कैलकुलेटर' : 'Construction Rate Index'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('support-faqs')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'सवाल-जवाब (FAQs)' : 'Frequently Asked Questions'}
                </button>
              </li>
            </ul>
          </div>

          {/* For Workers & Thekedaars */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {isHindi ? 'कारीगरों व ठेकेदारों के लिए' : 'For Thekedaars & Workers'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenVerification} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'आधार व डिजीलॉकर KYC' : 'Get Aadhaar Verified'}
                </button>
              </li>
              <li>
                <button onClick={onOpenVerification} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'पुलिस सत्यापन बैज' : 'Police Background Certificate'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('founder-message')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'संस्थापक का संदेश' : 'Founder & CEO Message'}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('support-faqs')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  {isHindi ? 'कारीगर सपोर्ट सहायता' : 'Worker Support Desk'}
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Admin Management */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              {isHindi ? 'सपोर्ट व प्रशासनिक केंद्र' : 'Support & Admin'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => scrollToSection('support-faqs')}
                  className="text-amber-400 hover:underline font-semibold cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'सपोर्ट डेस्क व FAQs' : 'Support Center & FAQs'}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('founder-message')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'मानव अरोड़ा (संस्थापक विजन)' : 'Manav Arora (Founder Vision)'}</span>
                </button>
              </li>
              <li>
                <a 
                  href={`mailto:${SUPPORT_CONTACT_INFO.primaryEmail}`}
                  className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[11px] font-mono">{SUPPORT_CONTACT_INFO.primaryEmail}</span>
                </a>
              </li>
              {onOpenAdmin && (
                <li className="pt-2">
                  <button 
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer group"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>{isHindi ? 'एडमिन पैनल खोलें' : 'Open Admin Panel ⚙️'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © 2026 Digital Thekedaar (डिजिटल ठेकेदार). Empowering skilled labor and fair construction across India.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => scrollToSection('founder-message')} className="hover:text-slate-300 cursor-pointer">
              Founder Vision
            </button>
            <span>•</span>
            <button onClick={() => scrollToSection('support-faqs')} className="hover:text-slate-300 cursor-pointer">
              Support & FAQs
            </button>
            <span>•</span>
            {onOpenAdmin && (
              <button onClick={onOpenAdmin} className="text-amber-400/90 hover:text-amber-300 font-semibold cursor-pointer">
                Admin Console
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
