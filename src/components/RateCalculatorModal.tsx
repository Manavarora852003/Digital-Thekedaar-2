import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  MapPin, 
  HardHat, 
  IndianRupee, 
  Users, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { RATE_INDEX, CITIES_LIST } from '../data/mockData';

interface RateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const RateCalculatorModal: React.FC<RateCalculatorModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const isHindi = language === 'hi';

  const [selectedService, setSelectedService] = useState<'masonry' | 'painting' | 'tiles' | 'electrical' | 'pop'>('painting');
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [quantity, setQuantity] = useState<number>(1000); // e.g. 1000 sq ft

  if (!isOpen) return null;

  // Calculation logic based on standard Indian construction norms
  let ratePerUnit = 16;
  let unitLabel = 'sq.ft';
  let recommendedTeam = '2 Painters + 1 Helper';
  let daysEstimate = Math.ceil(quantity / 250);

  if (selectedService === 'painting') {
    ratePerUnit = 16; // ₹16/sqft labor
    unitLabel = 'sq.ft area';
    recommendedTeam = '2 Painters + 1 Sanding Helper';
    daysEstimate = Math.max(3, Math.ceil(quantity / 220));
  } else if (selectedService === 'masonry') {
    ratePerUnit = 28; // ₹28/sqft brickwork or plaster
    unitLabel = 'sq.ft wall / brickwork';
    recommendedTeam = '1 Head Mistri + 2 Beldars';
    daysEstimate = Math.max(4, Math.ceil(quantity / 150));
  } else if (selectedService === 'tiles') {
    ratePerUnit = 26; // ₹26/sqft tile laying
    unitLabel = 'sq.ft flooring';
    recommendedTeam = '1 Tile Specialist + 1 Laborer';
    daysEstimate = Math.max(3, Math.ceil(quantity / 180));
  } else if (selectedService === 'electrical') {
    ratePerUnit = 140; // ₹140/point
    unitLabel = 'switch / light points';
    recommendedTeam = '1 Licensed Wireman + 1 Helper';
    daysEstimate = Math.max(2, Math.ceil(quantity / 15));
  } else if (selectedService === 'pop') {
    ratePerUnit = 85; // ₹85/sqft POP false ceiling
    unitLabel = 'sq.ft ceiling';
    recommendedTeam = '2 POP Craftsmen';
    daysEstimate = Math.max(4, Math.ceil(quantity / 120));
  }

  const estimatedLaborCost = quantity * ratePerUnit;
  const estimatedMaterialCost = Math.round(estimatedLaborCost * 1.8);
  const totalTurnkeyEstimate = estimatedLaborCost + estimatedMaterialCost;

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
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Calculator className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-heading">
                  {isHindi ? 'डिजिटल ठेकेदार दर कैलकुलेटर' : 'Standard Rate Index & Cost Estimator'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  2026 Verified
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isHindi 
                  ? 'भारतीय निर्माण बाजार की वास्तविक दरों के आधार पर पारदर्शी लागत का अनुमान लगाएं'
                  : 'Transparent cost estimates based on ground Indian construction market norms'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Interactive Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isHindi ? 'काम का प्रकार' : 'Service Type'}
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="painting">Painting (पेंटिंग)</option>
                <option value="masonry">Masonry & Plaster (चिनाई व प्लास्टर)</option>
                <option value="tiles">Tile & Marble (टाइल्स फिटिंग)</option>
                <option value="electrical">Electrical Points (बिजली फिटिंग)</option>
                <option value="pop">POP False Ceiling (फॉल्स सीलिंग)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isHindi ? 'शहर' : 'City Benchmark'}
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
              >
                {CITIES_LIST.filter(c => c !== 'All Cities').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isHindi ? `मात्रा (${unitLabel})` : `Quantity (${unitLabel})`}
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                min={1}
                step={selectedService === 'electrical' ? 5 : 50}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold font-mono"
              />
            </div>

          </div>

          {/* Real-time Calculation Result Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-semibold text-slate-400">
                Estimated Labor Rate: <strong className="text-amber-400">₹{ratePerUnit}/{unitLabel}</strong>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                Market Standard
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Pure Labor Cost
                </span>
                <span className="text-xl font-extrabold text-amber-400">
                  ₹{estimatedLaborCost.toLocaleString('en-IN')}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Craftsmen wages</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Turnkey with Material
                </span>
                <span className="text-xl font-extrabold text-white">
                  ₹{totalTurnkeyEstimate.toLocaleString('en-IN')}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Labor + Standard material</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Time & Team
                </span>
                <span className="text-sm font-bold text-sky-400 block">
                  ~{daysEstimate} Days
                </span>
                <p className="text-[10px] text-slate-300 mt-0.5">{recommendedTeam}</p>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Brokerage through Digital Thekedaar
              </span>
              <span>100% Escrow Milestone Ready</span>
            </div>
          </div>

          {/* Official Indian Construction Benchmark Table */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              {isHindi ? 'वर्तमान बाजार मानक दर सूचकांक (Official Benchmark Table):' : 'Ground Labor Market Rate Index:'}
            </h3>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
              {RATE_INDEX.map((row, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <strong className="text-slate-800">{row.item}</strong>
                    <span className="text-slate-400 ml-2">({row.city})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{row.rate}</span>
                    <span className="text-[11px] text-slate-500 block">{row.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
