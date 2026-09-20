import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Language, SupportInquiry } from '../types';
import { FAQS_LIST, SUPPORT_CONTACT_INFO } from '../data/mockData';

interface SupportAndFaqSectionProps {
  language: Language;
  onSubmitInquiry: (inquiry: Omit<SupportInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const SupportAndFaqSection: React.FC<SupportAndFaqSectionProps> = ({
  language,
  onSubmitInquiry
}) => {
  const isHindi = language === 'hi';

  // FAQ state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<SupportInquiry['category']>('General Query');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Filter FAQs
  const filteredFaqs = FAQS_LIST.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchEn = faq.questionEn.toLowerCase().includes(q) || faq.answerEn.toLowerCase().includes(q);
      const matchHi = faq.questionHi.includes(q) || faq.answerHi.includes(q);
      return matchEn || matchHi;
    }
    return true;
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SUPPORT_CONTACT_INFO.primaryEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    onSubmitInquiry({
      senderName: name,
      email: email,
      phone: phone || undefined,
      category: category,
      subject: subject || `${category} Inquiry from ${name}`,
      message: message,
      priority: category === 'Dispute & Resolution' || category === 'Escrow & Payments' ? 'high' : 'medium'
    });

    setIsSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  return (
    <section id="support-faqs" className="py-16 md:py-24 bg-slate-100/70 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHindi ? 'मदद व समाधान केंद्र' : 'Support & Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-heading">
            {isHindi ? 'हम आपकी सेवा के लिए सदैव तत्पर हैं' : 'How Can We Help You Today?'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {isHindi 
              ? 'कारीगर खोजने, एस्क्रो भुगतान, डिजीलॉकर सत्यापन या साइट पर काम से जुड़े सभी सामान्य सवालों के जवाब यहाँ पाएं।' 
              : 'Find direct answers about craftsman hiring, escrow protection, KYC verification, or reach our executive support team directly.'}
          </p>
        </div>

        {/* 2-Column Layout: Left FAQs, Right Support Contact Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: FAQ Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Search and Category Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHindi ? 'सवाल खोजें... (जैसे: एस्क्रो, सुरक्षा, दर, सत्यापन)' : 'Search FAQs... (e.g. escrow, safety, payment, KYC)'}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {[
                  { id: 'all', labelEn: 'All Questions', labelHi: 'सभी प्रश्न' },
                  { id: 'hiring', labelEn: 'Hiring & Sites', labelHi: 'हायरिंग व साइट' },
                  { id: 'escrow', labelEn: 'Escrow & Pay', labelHi: 'एस्क्रो व पेमेंट' },
                  { id: 'safety', labelEn: 'Trust & KYC', labelHi: 'सत्यापन व सुरक्षा' },
                  { id: 'workers', labelEn: 'Worker Rules', labelHi: 'कारीगर नियम' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-950 text-amber-400 font-bold shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isHindi ? cat.labelHi : cat.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                  {isHindi ? 'कोई सवाल नहीं मिला। नीचे दिए गए सपोर्ट फॉर्म से सीधे पूछें।' : 'No FAQs matched your search. You can write directly to us via the support desk.'}
                </div>
              ) : (
                filteredFaqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id}
                      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen 
                          ? 'border-amber-400 shadow-md ring-1 ring-amber-400/20' 
                          : 'border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                          {isHindi ? faq.questionHi : faq.questionEn}
                        </span>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          <p>{isHindi ? faq.answerHi : faq.answerEn}</p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column: Dedicated Support Card & Contact Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Official Contact Box featuring digitalthekedaar4@gmail.com */}
            <div className="bg-slate-950 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {isHindi ? 'सीधा संपर्क व कार्यकारी सहायता' : 'Executive Support Helpdesk'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isHindi ? 'संस्थापक और ऑपरेशंस टीम से सीधा संपर्क' : 'Direct response from Operations & Founder Office'}
                  </p>
                </div>
              </div>

              {/* Primary Email Card with Copy Button */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-4">
                <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  {isHindi ? 'आधिकारिक सपोर्ट ईमेल' : 'Official Support Email'}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a 
                    href={`mailto:${SUPPORT_CONTACT_INFO.primaryEmail}`}
                    className="text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors break-all"
                  >
                    {SUPPORT_CONTACT_INFO.primaryEmail}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedEmail && (
                  <p className="text-[11px] text-emerald-400 font-medium mt-1">
                    ✓ {isHindi ? 'ईमेल कॉपी हो गया!' : 'Email copied to clipboard!'}
                  </p>
                )}
              </div>

              {/* Phone & Helpline details */}
              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    {isHindi ? 'हेल्पलाइन नंबर:' : 'Direct Helpline:'}
                  </span>
                  <a href={`tel:${SUPPORT_CONTACT_INFO.helplinePhone}`} className="font-bold text-white hover:text-amber-400">
                    {SUPPORT_CONTACT_INFO.helplinePhone}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    {isHindi ? 'कार्य समय:' : 'Working Hours:'}
                  </span>
                  <span className="font-medium text-slate-200">
                    Mon - Sat (8 AM - 8 PM)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {isHindi ? 'एस्क्रो विवाद निवारण:' : 'Escrow Resolution:'}
                  </span>
                  <span className="font-bold text-emerald-400">
                    Priority 24/7
                  </span>
                </div>
              </div>

              {/* Direct Email Action */}
              <div className="mt-5">
                <a
                  href={`mailto:${SUPPORT_CONTACT_INFO.primaryEmail}?subject=Support%20Inquiry%20-%20Digital%20Thekedaar`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isHindi ? 'ईमेल द्वारा तुरंत संपर्क करें' : `Email: ${SUPPORT_CONTACT_INFO.primaryEmail}`}</span>
                </a>
              </div>
            </div>

            {/* Interactive Support Ticket / Message Box */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-950 font-heading mb-1 flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-500" />
                <span>{isHindi ? 'सीधा सवाल या शिकायत भेजें' : 'Send Message / Raise Support Ticket'}</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {isHindi 
                  ? 'यह संदेश सीधा digitalthekedaar4@gmail.com व एडमिन डेस्क को भेजा जाएगा।' 
                  : 'Delivered instantly to digitalthekedaar4@gmail.com and the Admin Console.'}
              </p>

              {isSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900">
                    {isHindi ? 'संदेश सफलतापूर्वक भेजा गया!' : 'Support Ticket Created Successfully!'}
                  </h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    {isHindi 
                      ? 'हमारी टीम 2 से 4 घंटे के भीतर digitalthekedaar4@gmail.com से आपसे संपर्क करेगी।' 
                      : 'Our operations team has received your ticket and will reply shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isHindi ? 'आपका नाम *' : 'Your Name *'}
                      </label>
                      <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh / Rajesh"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isHindi ? 'ईमेल आईडी *' : 'Email Address *'}
                      </label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isHindi ? 'फोन नंबर' : 'Phone Number'}
                      </label>
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {isHindi ? 'विषय श्रेणी *' : 'Inquiry Category *'}
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as SupportInquiry['category'])}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
                      >
                        <option value="General Query">{isHindi ? 'सामान्य पूछताछ' : 'General Query'}</option>
                        <option value="Escrow & Payments">{isHindi ? 'एस्क्रो व भुगतान' : 'Escrow & Payments'}</option>
                        <option value="Worker KYC & Verification">{isHindi ? 'कारीगर सत्यापन व KYC' : 'Worker KYC & Verification'}</option>
                        <option value="Dispute & Resolution">{isHindi ? 'साइट विवाद व समाधान' : 'Dispute & Resolution'}</option>
                        <option value="Hiring Assistance">{isHindi ? 'काम के लिए मदद' : 'Hiring Assistance'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isHindi ? 'विस्तार से बताएं *' : 'Describe your query or issue *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isHindi ? 'अपना प्रश्न या विवरण लिखें...' : 'How can we help? Please provide project or inquiry details...'}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'सपोर्ट टीम को भेजें' : 'Submit Support Request'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
