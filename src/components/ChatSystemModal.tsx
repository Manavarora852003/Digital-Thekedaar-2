import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Image as ImageIcon, 
  Mic, 
  Paperclip, 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  CheckCheck, 
  Clock, 
  ChevronLeft, 
  User, 
  Sparkles,
  PhoneCall,
  HardHat
} from 'lucide-react';
import { Conversation, ChatMessage, Role, Language } from '../types';

interface ChatSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string, type?: ChatMessage['type'], meta?: any) => void;
  currentRole: Role;
  language: Language;
  onOpenEscrow: (jobTitle?: string, workerName?: string, amount?: number) => void;
  onBookSiteVisit: (workerName?: string) => void;
}

export const ChatSystemModal: React.FC<ChatSystemModalProps> = ({
  isOpen,
  onClose,
  conversations,
  messages,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  currentRole,
  language,
  onOpenEscrow,
  onBookSiteVisit
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isHindi = language === 'hi';

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConv ? (messages[activeConv.id] || []) : [];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text || !activeConv) return;

    onSendMessage(activeConv.id, text, 'text');
    setInputText('');

    // Simulate real-time worker reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const sampleReplies = [
        'Namaste! Maine aapka message dekh liya hai. Kaam bilkul samay par aur saaf-safai se hoga.',
        'Ji bilkul, kal subah 10 baje hum site par aakar inspection kar sakte hain.',
        'Rates market ke hisaab se bilkul sahi hain sir, aur Digital Thekedaar Escrow me aapka paisa 100% safe rahega.',
        'Material quality hum premium standard use karenge. Shuttering aur level tube sab humara hoga.'
      ];
      const randomReply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
      onSendMessage(activeConv.id, randomReply, 'text');
    }, 1800);
  };

  const handleSendQuickChip = (chipText: string) => {
    handleSend(chipText);
  };

  const handleSendQuotationRequest = () => {
    if (!activeConv) return;
    onSendMessage(
      activeConv.id,
      'Formal Quotation Estimate: ₹36,000 for Complete Labor & Site Supervision (3 Milestones)',
      'quote',
      { amount: 36000, milestonesCount: 3, status: 'active' }
    );
  };

  const handleSendSiteVisitRequest = () => {
    if (!activeConv) return;
    onSendMessage(
      activeConv.id,
      'Site Visit Inspection Requested for Tomorrow at 10:30 AM.',
      'site_visit',
      { visitDate: 'Tomorrow', visitTime: '10:30 AM', status: 'confirmed' }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT PANE: Conversations list */}
        <div className={`w-full md:w-80 bg-slate-50 border-r border-slate-200 flex flex-col ${showMobileList ? 'flex' : 'hidden md:flex'}`}>
          
          {/* List Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm font-heading">
                {isHindi ? 'बातचीत (Live Chats)' : 'Messages & Enquiries'}
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-amber-400 font-bold border border-slate-700">
              Real-Time
            </span>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
            {conversations.map(conv => {
              const isCurrent = conv.id === activeConv?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    setShowMobileList(false);
                  }}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isCurrent ? 'bg-amber-50/80 border-l-4 border-amber-500' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={currentRole === 'hirer' ? conv.workerAvatar : conv.hirerAvatar}
                      alt={conv.workerName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {currentRole === 'hirer' ? conv.workerName : conv.hirerName}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{conv.lastTimestamp}</span>
                    </div>

                    <p className="text-[11px] font-semibold text-amber-700 truncate">
                      {conv.workerTrade}
                    </p>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Pane bottom info */}
          <div className="p-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              End-to-End Escrow Guarded
            </span>
          </div>

        </div>

        {/* RIGHT PANE: Active Chat Thread */}
        <div className={`flex-1 flex flex-col bg-white ${showMobileList ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Active Chat Header */}
          {activeConv && (
            <div className="p-3.5 sm:p-4 bg-white border-b border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img
                    src={currentRole === 'hirer' ? activeConv.workerAvatar : activeConv.hirerAvatar}
                    alt={activeConv.workerName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">
                      {currentRole === 'hirer' ? activeConv.workerName : activeConv.hirerName}
                    </h3>
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Aadhaar Verified ✅
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <span className="text-amber-700 font-semibold">{activeConv.workerTrade}</span>
                    <span>•</span>
                    <span className="truncate max-w-[140px] sm:max-w-xs">{activeConv.jobTitle}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-1.5">
                
                {/* Book Site Visit button */}
                <button
                  onClick={handleSendSiteVisitRequest}
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold border border-sky-200 transition-colors cursor-pointer"
                  title="Schedule site visit"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'साइट विजिट' : 'Site Visit'}</span>
                </button>

                {/* Create Escrow Milestone directly */}
                <button
                  onClick={() => onOpenEscrow(activeConv.jobTitle, activeConv.workerName, 34000)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                  title="Pay with Escrow guarantee"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'एस्क्रो पेमेंट' : 'Pay Escrow'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors ml-1 cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            
            {/* Safety banner */}
            <div className="text-center my-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-medium border border-amber-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                {isHindi 
                  ? 'सुरक्षा टिप: कभी भी सीधा कैश न दें। डिजिटल ठेकेदार एस्क्रो से भुगतान करें।'
                  : 'Safety Tip: Never pay cash in advance. Lock payments safely in Escrow.'}
              </span>
            </div>

            {/* Render messages */}
            {activeMessages.map(msg => {
              const isMe = msg.senderRole === currentRole;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-1.5 max-w-[85%] sm:max-w-[70%]">
                    
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                        isMe
                          ? 'bg-slate-900 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                      }`}
                    >
                      {/* Special message types */}
                      {msg.type === 'quote' && (
                        <div className="mb-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-900">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                              Official Work Estimate
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              ₹{msg.meta?.amount?.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-2">
                            {msg.meta?.milestonesCount || 3} Milestone stages with 100% Escrow Protection.
                          </p>
                          <button
                            onClick={() => onOpenEscrow(activeConv?.jobTitle, activeConv?.workerName, msg.meta?.amount || 34000)}
                            className="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Accept & Fund Escrow</span>
                          </button>
                        </div>
                      )}

                      {msg.type === 'site_visit' && (
                        <div className="mb-2 p-3 rounded-xl bg-sky-50 border border-sky-200 text-slate-900">
                          <div className="flex items-center gap-2 mb-1 text-sky-800 font-bold text-xs">
                            <Calendar className="w-4 h-4" />
                            <span>Site Inspection Scheduled</span>
                          </div>
                          <p className="text-xs text-slate-700 mb-2">
                            Date: <strong>{msg.meta?.visitDate || 'Tomorrow'}</strong> at <strong>{msg.meta?.visitTime || '10:00 AM'}</strong>
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              Confirmed Free Visit
                            </span>
                          </div>
                        </div>
                      )}

                      <p>{msg.text}</p>

                      <div className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${isMe ? 'text-slate-400' : 'text-slate-400'}`}>
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Real-time typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-2 rounded-2xl border border-slate-200 w-fit">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>{activeConv?.workerName} {isHindi ? 'टाइप कर रहे हैं...' : 'is typing...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">
              {isHindi ? 'त्वरित प्रश्न:' : 'Quick Prompts:'}
            </span>
            <button
              onClick={() => handleSendQuickChip('Kal subah 10 baje site visit possible hai inspection ke liye?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs whitespace-nowrap cursor-pointer transition-colors"
            >
              📅 {isHindi ? 'कल साइट विजिट?' : 'Book Visit Tomorrow?'}
            </button>
            <button
              onClick={() => handleSendQuickChip('Aapka per sq.ft labor rate thoda negotiate ho sakta hai kya?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs whitespace-nowrap cursor-pointer transition-colors"
            >
              💰 {isHindi ? 'रेट में कुछ गुंजाइश?' : 'Negotiate Rate?'}
            </button>
            <button
              onClick={handleSendQuotationRequest}
              className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs whitespace-nowrap cursor-pointer transition-colors"
            >
              📑 {isHindi ? 'कोटेशन भेजें' : 'Send Formal Quote'}
            </button>
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={() => handleSend('📷 [Work Site Photo Shared: Wall Plaster Progress Inspection]')}
                  className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Attach Photo"
                >
                  <ImageIcon className="w-5 h-5 text-slate-500" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSend('🎤 [Voice Note 0:18: "Bhaiya humne kal ka material unload karwa diya hai"]') }
                  className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Send Voice Note"
                >
                  <Mic className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isHindi ? 'यहाँ संदेश लिखें (उदा: रेट, साइट पता, समय)...' : 'Type message (e.g. rate, site address, time)...'}
                className="flex-1 px-4 py-2.5 bg-slate-100 border border-transparent focus:border-amber-400 focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
