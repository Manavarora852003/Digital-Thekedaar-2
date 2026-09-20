import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Phone, 
  User as UserIcon, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  HardHat, 
  KeyRound, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Building
} from 'lucide-react';
import { User, UserRole, Language, TradeCategory } from '../types';
import { TRADE_CATEGORIES } from '../data/mockData';

// Secret Master PIN for Administrator verification
export const ADMIN_SECURITY_PIN = 'THEKEDAAR2026';
export const ADMIN_MASTER_EMAIL = 'digitalthekedaar4@gmail.com';

// Pre-seeded users in the system
export const DEFAULT_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Manav Arora',
    email: 'digitalthekedaar4@gmail.com',
    phone: '+91 92128 55732',
    role: 'admin',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2026-01-01'
  },
  {
    id: 'usr-hirer-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@example.com',
    phone: '+91 98101 23456',
    role: 'hirer',
    city: 'New Delhi',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: '2026-02-15'
  },
  {
    id: 'usr-worker-1',
    name: 'Ram Prasad Mistri',
    email: 'ramprasad@example.com',
    phone: '+91 98765 43210',
    role: 'worker',
    trade: 'Rajmistri / Mason',
    city: 'Delhi NCR',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    createdAt: '2026-02-20'
  }
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (user: User) => void;
  initialMode?: 'login' | 'register' | 'admin_verify';
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
  initialMode = 'login',
  initialRole = 'hirer'
}) => {
  const isHindi = language === 'hi';

  const [mode, setMode] = useState<'login' | 'register' | 'admin_verify'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  
  // Form fields
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState(''); // Email or phone
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<TradeCategory>('Rajmistri / Mason');
  const [city, setCity] = useState('New Delhi');
  const [adminPin, setAdminPin] = useState('');
  
  // OTP simulation option
  const [loginWithOtp, setLoginWithOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');

  // Status and error handling
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Sync mode with initialMode when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(initialRole);
      setErrorMsg(null);
      setSuccessMsg(null);
      setPassword('');
      setAdminPin('');
      setEnteredOtp('');
      setOtpSent(false);
    }
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  // Helper to load registered users from localStorage
  const getUsersDb = (): User[] => {
    try {
      const saved = localStorage.getItem('dt_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...DEFAULT_USERS, ...parsed.filter((p: User) => !DEFAULT_USERS.some(u => u.id === p.id))];
      }
    } catch {
      // fallback
    }
    return DEFAULT_USERS;
  };

  const saveNewUser = (newUser: User) => {
    try {
      const existing = getUsersDb();
      const updated = [...existing.filter(u => u.id !== newUser.id), newUser];
      localStorage.setItem('dt_registered_users', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save user locally:', err);
    }
  };

  // Handle Send OTP
  const handleSendOtp = () => {
    if (!identifier.trim()) {
      setErrorMsg(isHindi ? 'कृपया मोबाइल नंबर या ईमेल दर्ज करें।' : 'Please enter your mobile number or email.');
      return;
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setErrorMsg(null);
    setSuccessMsg(
      isHindi 
        ? `वेरिफिकेशन कोड भेजा गया: ${code} (डेमो हेतु कोड स्वतः तैयार हुआ)` 
        : `Verification code generated: ${code} (Auto-generated for demo)`
    );
  };

  // Quick 1-click Demo Sign-in
  const handleQuickDemoLogin = (targetRole: UserRole) => {
    const demo = DEFAULT_USERS.find(u => u.role === targetRole) || DEFAULT_USERS[0];
    setSuccessMsg(
      isHindi 
        ? `${demo.name} (${demo.role.toUpperCase()}) के रूप में प्रवेश किया गया!` 
        : `Signed in as ${demo.name} (${demo.role.toUpperCase()})!`
    );
    setTimeout(() => {
      onLoginSuccess(demo);
      onClose();
    }, 400);
  };

  // Handle Standard Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanIdentifier = identifier.trim().toLowerCase();
    if (!cleanIdentifier) {
      setErrorMsg(isHindi ? 'कृपया अपना ईमेल या फोन नंबर दर्ज करें।' : 'Please enter your email or phone.');
      return;
    }

    if (loginWithOtp) {
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
        setErrorMsg(isHindi ? 'अमान्य OTP कोड। कृपया पुनः प्रयास करें।' : 'Invalid OTP code. Please enter the displayed 4-digit code.');
        return;
      }
    } else {
      if (!password) {
        setErrorMsg(isHindi ? 'कृपया पासवर्ड दर्ज करें।' : 'Please enter your password.');
        return;
      }
    }

    // Lookup user in DB
    const users = getUsersDb();
    let foundUser = users.find(
      u => u.email.toLowerCase() === cleanIdentifier || u.phone.replace(/\D/g, '').includes(cleanIdentifier.replace(/\D/g, ''))
    );

    // If user not found, auto-create a session account gracefully for instant access
    if (!foundUser) {
      const generatedName = cleanIdentifier.includes('@') 
        ? cleanIdentifier.split('@')[0] 
        : `User_${cleanIdentifier.slice(-4)}`;
      foundUser = {
        id: `usr-${Date.now()}`,
        name: generatedName.charAt(0).toUpperCase() + generatedName.slice(1),
        email: cleanIdentifier.includes('@') ? cleanIdentifier : `${cleanIdentifier}@user.digitalthekedaar.com`,
        phone: cleanIdentifier.includes('@') ? '+91 98000 00000' : cleanIdentifier,
        role: selectedRole,
        city: 'Delhi NCR',
        isVerified: true,
        createdAt: new Date().toISOString()
      };
      saveNewUser(foundUser);
    }

    setSuccessMsg(isHindi ? 'लॉग इन सफल रहा!' : 'Login successful!');
    setTimeout(() => {
      if (foundUser) {
        onLoginSuccess(foundUser);
      }
      onClose();
    }, 400);
  };

  // Handle Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg(isHindi ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }
    if (!identifier.trim()) {
      setErrorMsg(isHindi ? 'कृपया अपना मोबाइल नंबर या ईमेल दर्ज करें।' : 'Please enter mobile number or email.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg(isHindi ? 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए।' : 'Password must be at least 4 characters.');
      return;
    }

    // If Admin role is requested, verify organization PIN
    if (selectedRole === 'admin') {
      if (adminPin !== ADMIN_SECURITY_PIN && adminPin !== '921285') {
        setErrorMsg(
          isHindi 
            ? `एडमिन रजिस्ट्रेशन के लिए मान्य सिक्योरिटी पिन आवश्यक है (डेमो पिन: ${ADMIN_SECURITY_PIN})।` 
            : `Valid Organization Security PIN is required for Admin registration (Demo PIN: ${ADMIN_SECURITY_PIN}).`
        );
        return;
      }
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanIdentifier.includes('@') ? cleanIdentifier : `${cleanIdentifier.replace(/\D/g, '')}@digitalthekedaar.com`,
      phone: cleanIdentifier.includes('@') ? '+91 99999 88888' : cleanIdentifier,
      role: selectedRole,
      trade: selectedRole === 'worker' ? selectedTrade : undefined,
      city: city || 'New Delhi',
      isVerified: selectedRole === 'admin',
      createdAt: new Date().toISOString()
    };

    saveNewUser(newUser);
    setSuccessMsg(isHindi ? 'पंजीकरण सफल रहा! आपका स्वागत है।' : 'Registration successful! Welcome to Digital Thekedaar.');
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 500);
  };

  // Handle Dedicated Admin Verification
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPin = adminPin.trim();
    if (!cleanPin) {
      setErrorMsg(isHindi ? 'कृपया एडमिन सिक्योरिटी पिन या पासवर्ड दर्ज करें।' : 'Please enter Admin Security PIN or Master Password.');
      return;
    }

    // Verify against Master PIN or admin password
    if (cleanPin === ADMIN_SECURITY_PIN || cleanPin === '921285' || cleanPin === 'admin123') {
      const adminUser: User = DEFAULT_USERS[0]; // Manav Arora
      setSuccessMsg(isHindi ? 'एडमिन पहचान सत्यापित हो गई! एक्सेस स्वीकृत।' : 'Admin identity verified! Access granted.');
      setTimeout(() => {
        onLoginSuccess(adminUser);
        onClose();
      }, 400);
    } else {
      setErrorMsg(
        isHindi 
          ? `गलत सिक्योरिटी कोड! एक्सेस अस्वीकृत। (डेमो मास्टर कोड: ${ADMIN_SECURITY_PIN})` 
          : `Invalid Security PIN! Access denied. (Demo master code: ${ADMIN_SECURITY_PIN})`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#11223F] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              {mode === 'admin_verify' ? (
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              ) : selectedRole === 'worker' ? (
                <HardHat className="w-6 h-6 text-amber-400" />
              ) : selectedRole === 'admin' ? (
                <KeyRound className="w-6 h-6 text-amber-400" />
              ) : (
                <Briefcase className="w-6 h-6 text-amber-400" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight font-heading">
                {mode === 'admin_verify' 
                  ? (isHindi ? 'एडमिन सुरक्षा सत्यापन' : 'Admin Security Verification')
                  : mode === 'register'
                  ? (isHindi ? 'नया खाता बनाएं' : 'Create an Account')
                  : (isHindi ? 'डिजिटल ठेकेदार लॉगिन' : 'Digital Thekedaar Login')}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {mode === 'admin_verify'
                  ? (isHindi ? 'केवल अधिकृत एडमिन व प्रबंधन के लिए' : 'Restricted to authorized executives & founders')
                  : (isHindi ? 'भारत का भरोसेमंद लेबर व ठेका नेटवर्क' : 'India’s Verified Labor & Contractor Network')}
              </p>
            </div>
          </div>

          {/* Mode Switch Tabs (Login / Register) */}
          {mode !== 'admin_verify' && (
            <div className="mt-4 grid grid-cols-2 p-1 bg-slate-900/60 rounded-xl border border-slate-700/60">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(null); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isHindi ? 'लॉग इन (Login)' : 'Sign In (Login)'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMsg(null); }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isHindi ? 'नया पंजीकरण (Register)' : 'Register (Sign Up)'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Notification Banners */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div className="leading-snug">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* MODE 1: ADMIN SECURITY VERIFICATION */}
          {mode === 'admin_verify' && (
            <form onSubmit={handleAdminVerify} className="space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'प्रतिबंधित एडमिन क्षेत्र' : 'Restricted Area Notice'}</span>
                </div>
                {isHindi 
                  ? 'एडमिन पैनल में सभी कारीगरों का KYC, एस्क्रो फंड रिलीज और संपूर्ण डेटाबेस नियंत्रण शामिल है। कृपया संस्थापक / व्यवस्थापक सिक्योरिटी पिन दर्ज करें।' 
                  : 'The Admin Control Center manages KYC verifications, escrow releases, and platform data. Please authenticate with your Admin Security PIN.'}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isHindi ? 'एडमिन सिक्योरिटी पिन / मास्टर पासवर्ड:' : 'Admin Security PIN / Master Key:'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter Security PIN (e.g. THEKEDAAR2026)"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    autoFocus
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">
                    Demo PIN: <strong className="text-slate-800 font-mono">THEKEDAAR2026</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdminPin('THEKEDAAR2026')}
                    className="text-amber-700 font-bold hover:underline cursor-pointer"
                  >
                    Auto-fill PIN
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#11223F] hover:bg-slate-900 text-amber-400 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isHindi ? 'सत्यापित करें एवं एडमिन खोलें' : 'Verify & Open Admin Console'}</span>
              </button>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                >
                  ← {isHindi ? 'सामान्य लॉगिन पर लौटें' : 'Back to Standard Login'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setSelectedRole('admin');
                  }}
                  className="text-xs text-amber-700 hover:underline font-bold cursor-pointer"
                >
                  {isHindi ? 'नया एडमिन रजिस्टर करें' : 'Register New Admin'}
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Login Method Toggle: Password vs OTP */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-xs">
                <span className="text-slate-500">
                  {isHindi ? 'लॉगिन माध्यम:' : 'Login using:'}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setLoginWithOtp(false); setErrorMsg(null); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      !loginWithOtp ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isHindi ? 'पासवर्ड' : 'Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginWithOtp(true); setErrorMsg(null); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      loginWithOtp ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isHindi ? 'मोबाइल OTP' : 'OTP'}
                  </button>
                </div>
              </div>

              {/* Identifier (Email / Mobile) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'मोबाइल नंबर या ईमेल आईडी:' : 'Mobile Number or Email ID:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={loginWithOtp ? '+91 98765 43210' : 'email@example.com / 9876543210'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  {identifier.includes('@') ? (
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  ) : (
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  )}
                </div>
              </div>

              {/* Password or OTP input */}
              {!loginWithOtp ? (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      {isHindi ? 'पासवर्ड:' : 'Password:'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginWithOtp(true)}
                      className="text-[11px] text-amber-700 font-medium hover:underline"
                    >
                      {isHindi ? 'OTP से लॉगिन करें' : 'Sign in with OTP'}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      {isHindi ? '4-अंकीय OTP कोड:' : '4-Digit OTP Code:'}
                    </label>
                    {otpSent && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[11px] text-amber-700 font-bold hover:underline"
                      >
                        {isHindi ? 'पुनः भेजें (Resend)' : 'Resend'}
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="1234"
                      className="flex-1 py-2.5 px-4 text-center tracking-widest text-lg font-mono font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        {isHindi ? 'OTP भेजें' : 'Send OTP'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEnteredOtp(generatedOtp)}
                        className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                        title="Auto fill demo OTP"
                      >
                        Auto-fill
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isHindi ? 'लॉग इन करें' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick 1-Click Demo Profiles */}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                  {isHindi ? 'तुरंत परीक्षण के लिए डेमो अकाउंट्स:' : 'Instant 1-Click Demo Accounts:'}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('hirer')}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-center transition-all cursor-pointer"
                  >
                    <div className="text-[10px] text-slate-500">Rajesh</div>
                    <div className="text-[11px] font-bold text-slate-900">🏠 Hirer</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('worker')}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-center transition-all cursor-pointer"
                  >
                    <div className="text-[10px] text-slate-500">Ram Prasad</div>
                    <div className="text-[11px] font-bold text-slate-900">👷 Thekedaar</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-1.5 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-center transition-all cursor-pointer"
                  >
                    <div className="text-[10px] text-slate-500">Manav Arora</div>
                    <div className="text-[11px] font-bold text-amber-900">🛡️ Admin</div>
                  </button>
                </div>
              </div>

              {/* Admin Gate direct switch */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('admin_verify')}
                  className="text-xs text-slate-500 hover:text-amber-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'व्यवस्थापक / एडमिन सिक्योरिटी गेट' : 'Founder / Administrator Gate'}</span>
                </button>
              </div>

            </form>
          )}

          {/* MODE 3: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              
              {/* Account Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {isHindi ? 'खाता प्रकार चुनें (Account Type):' : 'Select Account Type:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('hirer')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedRole === 'hirer'
                        ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <div className="text-xs font-bold">{isHindi ? 'काम देना है' : 'Hirer'}</div>
                    <div className="text-[10px] text-slate-500">{isHindi ? 'ग्राहक / बिल्डर' : 'Client / Owner'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('worker')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedRole === 'worker'
                        ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <HardHat className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <div className="text-xs font-bold">{isHindi ? 'ठेकेदार / मिस्त्री' : 'Thekedaar'}</div>
                    <div className="text-[10px] text-slate-500">{isHindi ? 'कारीगर / लेबर' : 'Contractor'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                    <div className="text-xs font-bold">{isHindi ? 'प्रशासक' : 'Admin'}</div>
                    <div className="text-[10px] text-slate-500">{isHindi ? 'सिक्योरिटी पिन' : 'Staff / Exec'}</div>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'पूरा नाम (Full Name):' : 'Full Name:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                </div>
              </div>

              {/* Mobile / Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'मोबाइल नंबर या ईमेल:' : 'Mobile Number or Email:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="+91 98765 43210 or your@email.com"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                </div>
              </div>

              {/* Worker Trade Selection (if Worker role) */}
              {selectedRole === 'worker' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isHindi ? 'आपका मुख्य हुनर / काम (Trade):' : 'Primary Trade / Specialization:'}
                  </label>
                  <select
                    value={selectedTrade}
                    onChange={(e) => setSelectedTrade(e.target.value as TradeCategory)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {TRADE_CATEGORIES.map(trade => (
                      <option key={trade} value={trade}>{trade}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Admin Verification Code (if Admin role) */}
              {selectedRole === 'admin' && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-1.5">
                  <label className="block text-xs font-bold text-amber-950">
                    {isHindi ? 'संगठन सुरक्षा पिन (Organization Security PIN):' : 'Admin Security PIN:'}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="Enter master PIN"
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-lg border border-amber-300 text-sm font-mono focus:ring-2 focus:ring-amber-500"
                      required
                    />
                    <KeyRound className="w-4 h-4 text-amber-600 absolute left-3 top-2.5" />
                  </div>
                  <p className="text-[10px] text-amber-800">
                    Demo Master PIN: <strong className="font-mono">THEKEDAAR2026</strong>
                  </p>
                </div>
              )}

              {/* City / Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'शहर / स्थान (City / Area):' : 'City / Location:'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Delhi NCR, Noida, Gurgaon, Mumbai"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Create Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isHindi ? 'पासवर्ड बनाएं:' : 'Create Password:'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    className="w-full pl-10 pr-10 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Registration */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isHindi ? 'खाता बनाएं एवं जारी रखें' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
