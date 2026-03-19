import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BiUser, BiChevronLeft } from 'react-icons/bi';
import { FaFacebook, FaApple, FaGoogle, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import PhoneInput from './components/PhoneInput';
import OtpScreen from './components/OtpScreen';

// Import background image
import loginBg from '../../../../assets/loginPage/LoginPageImage.png';
import logo from '../../../../assets/loginPage/Logo.png';

/* ──────────────── Reusable UI Components ──────────────── */

const BackgroundWrapper = ({ children, blur = false }) => (
  <div className="relative h-full w-full overflow-hidden bg-black">
    <div
      className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${blur ? 'blur-[8px] scale-110' : 'blur-0 scale-100'}`}
      style={{ backgroundImage: `url(${loginBg})` }}
    />
    <div className="absolute inset-0 bg-black/75" />
    <div className="relative z-10 h-full w-full flex flex-col">
      {children}
    </div>
  </div>
);

const AuthCard = ({ children, title, subtitle }) => (
  <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 flex flex-col shadow-2xl animate-scale-in">
    {title && <h2 className="text-2xl font-black text-white mb-1 tracking-tight">{title}</h2>}
    {subtitle && <p className="text-sm text-gray-300 mb-8 leading-snug">{subtitle}</p>}
    {children}
  </div>
);

const PrimaryButton = ({ onClick, children, variant = 'solid', disabled = false, className = "" }) => {
  const baseStyles = "w-full py-4 rounded-full font-bold text-[16px] transition-all duration-200 active:scale-[0.96] flex items-center justify-center gap-3";
  const variants = {
    solid: "bg-[#fe2c55] text-white shadow-lg shadow-[#fe2c55]/30",
    outline: "bg-white/10 border border-white/30 text-white backdrop-blur-md",
    ghost: "bg-transparent text-white"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 grayscale' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

/* ──────────────── Scroll Picker Column ──────────────── */
const ITEM_H = 36;

const PickerColumn = ({ items, selectedIndex, onChange }) => {
  const ref = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (ref.current && !isScrolling.current) {
      ref.current.scrollTop = selectedIndex * ITEM_H;
    }
  }, [selectedIndex, items.length]);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    isScrolling.current = true;
    clearTimeout(ref.current._t);
    ref.current._t = setTimeout(() => {
      const idx = Math.round(ref.current.scrollTop / ITEM_H);
      const clamped = Math.max(0, Math.min(idx, items.length - 1));
      ref.current.scrollTop = clamped * ITEM_H;
      onChange(clamped);
      isScrolling.current = false;
    }, 80);
  }, [items.length, onChange]);

  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[36px] border-t border-b border-white/20 pointer-events-none z-10" />
      <div
        ref={ref}
        onScroll={handleScroll}
        className="h-full overflow-y-auto no-scrollbar"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <div style={{ height: `calc(50% - ${ITEM_H / 2}px)` }} />
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center justify-center text-[13px] transition-all cursor-pointer select-none ${i === selectedIndex ? 'text-white font-bold text-[15px]' : 'text-gray-500'
              }`}
            style={{ height: `${ITEM_H}px`, scrollSnapAlign: 'center' }}
            onClick={() => onChange(i)}
          >
            {item}
          </div>
        ))}
        <div style={{ height: `calc(50% - ${ITEM_H / 2}px)` }} />
      </div>
    </div>
  );
};

/* ──────────────── Auth Page ──────────────── */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 60 }, (_, i) => 2025 - i);

const AuthPage = ({ onComplete, initialMode = 'signup' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Set mode based on current URL path
  const [mode, setMode] = useState(location.pathname === '/login' ? 'login' : initialMode);

  // Steps: 1=Welcome, 2=Methods, 3=Birthday, 4=PhoneInput, 5=OTP
  const [step, setStep] = useState(
    (location.pathname === '/signup' || location.pathname === '/login') ? 2 : 1
  );

  // Sync mode and step with URL changes
  useEffect(() => {
    const p = location.pathname;
    const currentMode = p === '/login' ? 'login' : 'signup';
    setMode(currentMode);

    // Explicitly set step based on route
    if (p === '/login' || p === '/signup') {
      setStep(2);
    } else if (p === '/' || p === '' || p === '/welcome' || p.includes('index.html')) {
      setStep(1); // Force welcome screen on root or /welcome
    } else {
      // For any other subroutes during auth, keep as welcome or default to methods
      setStep(1);
    }
  }, [location.pathname]);

  const [monthIdx, setMonthIdx] = useState(7);
  const [dayIdx, setDayIdx] = useState(22);
  const [yearIdx, setYearIdx] = useState(39);
  const [birthdaySelected, setBirthdaySelected] = useState(false);
  const [showBirthdayPrompt, setShowBirthdayPrompt] = useState(false);
  const [showAccountNotFound, setShowAccountNotFound] = useState(false);

  // Auth state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const selectedDate = `${DAYS[dayIdx]} ${MONTHS[monthIdx]} ${YEARS[yearIdx]}`;

  const handleNextBirthday = () => {
    if (!birthdaySelected) {
      setBirthdaySelected(true);
      return;
    }
    setShowBirthdayPrompt(true);
  };

  const handleConfirmBirthday = () => {
    setShowBirthdayPrompt(false);
    setStep(4);
  };

  const handleAuthSuccess = useCallback(() => {
    console.log('✅ Auth success triggered!');
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onComplete();
    navigate('/');
  }, [onComplete, navigate]);

  /* ─── Step 1: New Welcome Screen ─── */
  if (step === 1) {
    return (
      <BackgroundWrapper>
        <div className="flex-1 flex flex-col items-start justify-between px-8 py-16">
          {/* Logo Section */}
          <div className="flex flex-col items-start animate-fade-in mt-16">
            <p className="text-gray-300 text-2xl font-semibold tracking-wide mb-2">Welcome to</p>
            <h1
              className="text-white tracking-tight text-left"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.4rem, 10vw, 3.2rem)',
                fontWeight: 900,
                lineHeight: 1.1,
              }}
            >
              The Jhumroo App
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-[320px] flex flex-col gap-4 animate-slide-up">
            <PrimaryButton onClick={() => navigate('/login')}>
              Log in
            </PrimaryButton>
            <PrimaryButton variant="outline" onClick={() => navigate('/signup')}>
              Sign Up
            </PrimaryButton>
            <p className="text-[12px] text-gray-400 text-center px-4 mt-4 leading-snug">
              By continuing you agree to our <span className="text-white font-semibold">Terms</span> and <span className="text-white font-semibold">Privacy</span>
            </p>
          </div>
        </div>
      </BackgroundWrapper>
    );
  }

  /* ─── Step 2: Auth Methods ─── */
  if (step === 2) {
    const methods = [
      {
        id: 'phone',
        icon: <BiUser size={22} className="text-white shrink-0" />,
        label: "Use phone or email",
        onClick: () => setStep(mode === 'signup' ? 3 : 4)
      },
      {
        id: 'facebook',
        icon: <FaFacebook size={22} className="text-white shrink-0" />,
        label: "Continue with Facebook",
        className: "hover:bg-[#1877F2]/20"
      },
      {
        id: 'apple',
        icon: <FaApple size={22} className="text-white shrink-0" />,
        label: "Continue with Apple",
        className: "hover:bg-white/10"
      },
      {
        id: 'google',
        icon: <FcGoogle size={24} className="shrink-0" />,
        label: "Continue with Google",
        onClick: mode === 'login' ? () => setShowAccountNotFound(true) : undefined,
        className: "hover:bg-white/10"
      },
      {
        id: 'twitter',
        icon: <FaTwitter size={22} className="text-white shrink-0" />,
        label: "Continue with Twitter",
        className: "hover:bg-[#1DA1F2]/20"
      }
    ];

    const filteredMethods = mode === 'login'
      ? methods.filter(m => m.id === 'phone' || m.id === 'google')
      : methods;

    return (
      <BackgroundWrapper blur>
        <div className="flex-1 flex flex-col justify-end p-6">
          <AuthCard
            title={mode === 'signup' ? "Sign up" : "Log in"}
            subtitle="Choose a method to continue your journey"
          >
            <div className="flex flex-col gap-3">
              {filteredMethods.map((m, i) => (
                <button
                  key={i}
                  onClick={m.onClick}
                  className={`w-full h-[54px] flex items-center border border-white/10 rounded-2xl active:scale-[0.98] transition-all bg-white/5 relative group ${m.className || ''}`}
                >
                  <div className="absolute left-[16px] flex items-center justify-center">
                    {m.icon}
                  </div>
                  <span className="w-full text-center font-bold text-[15px] text-white">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[14px] text-center text-gray-300">
                {mode === 'signup' ? (
                  <>Already have an account? <span className="text-[#fe2c55] font-bold cursor-pointer hover:underline ml-1" onClick={() => navigate('/login')}>Log in</span></>
                ) : (
                  <>Don't have an account? <span className="text-[#fe2c55] font-bold cursor-pointer hover:underline ml-1" onClick={() => navigate('/signup')}>Sign up</span></>
                )}
              </p>
            </div>
          </AuthCard>

          <div className="h-8" /> {/* Spacer for bottom nav area if needed */}
        </div>

        {showAccountNotFound && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-8">
            <div className="w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-[32px] overflow-hidden animate-scale-in">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-[#fe2c55]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BiUser size={40} className="text-[#fe2c55]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Account not found</h3>
                <p className="text-gray-400 leading-relaxed px-2">
                  Please create an account first to join the community.
                </p>
              </div>
              <div className="p-6 bg-white/5 flex flex-col gap-3">
                <PrimaryButton onClick={() => { setShowAccountNotFound(false); navigate('/signup'); }}>
                  Create Account
                </PrimaryButton>
                <button onClick={() => setShowAccountNotFound(false)} className="py-3 text-sm font-bold text-gray-500 hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </BackgroundWrapper>
    );
  }

  /* ─── Step 3: Birthday ─── */
  if (step === 3) {
    return (
      <BackgroundWrapper blur>
        <div className="flex flex-col h-full">
          <div className="h-14 flex items-center px-4 shrink-0">
            <button onClick={() => setStep(2)} className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white">
              <BiChevronLeft size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-end p-6">
            <AuthCard title="When's your birthday?" subtitle="Your birthday won't be shown publicly.">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6">
                  <p className={`text-[17px] font-bold ${birthdaySelected ? 'text-white' : 'text-gray-500'}`}>
                    {birthdaySelected ? selectedDate : 'Birthday'}
                  </p>
                </div>
                <div className="w-14 h-14 bg-[#fe2c55]/10 rounded-2xl flex items-center justify-center text-3xl">🎂</div>
              </div>

              <PrimaryButton onClick={handleNextBirthday} disabled={!birthdaySelected}>
                Next Step
              </PrimaryButton>
            </AuthCard>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl px-4 pt-4 pb-8 rounded-t-[40px]">
            <div className="flex h-[180px]">
              <PickerColumn items={MONTHS} selectedIndex={monthIdx} onChange={(i) => { setMonthIdx(i); setBirthdaySelected(true); }} />
              <PickerColumn items={DAYS} selectedIndex={dayIdx} onChange={(i) => { setDayIdx(i); setBirthdaySelected(true); }} />
              <PickerColumn items={YEARS} selectedIndex={yearIdx} onChange={(i) => { setYearIdx(i); setBirthdaySelected(true); }} />
            </div>
          </div>
        </div>

        {showBirthdayPrompt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-end justify-center pb-12 px-6">
            <div className="w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-[32px] overflow-hidden animate-slide-up shadow-2xl">
              <div className="p-8 text-center text-white">
                <h3 className="text-xl font-bold mb-3">Add birthday to enjoy</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  This is required to give you the best experience on The Jhumroo App.
                </p>
              </div>
              <div className="flex border-t border-white/5 h-[70px]">
                <button onClick={() => setShowBirthdayPrompt(false)} className="flex-1 font-bold text-gray-500 hover:text-white transition-colors border-r border-white/5">
                  Go back
                </button>
                <button onClick={handleConfirmBirthday} className="flex-1 font-bold text-[#fe2c55] hover:text-[#ff4572] transition-colors">
                  Add birthday
                </button>
              </div>
            </div>
          </div>
        )}
      </BackgroundWrapper>
    );
  }

  /* ─── Step 4 & 5: Phone/OTP ─── */
  // Wrap existing sub-components in the new theme
  if (step === 4 || step === 5) {
    return (
      <BackgroundWrapper blur>
        <div className="flex-1 flex flex-col">
          <div className="h-14 flex items-center px-4 shrink-0">
            <button onClick={() => setStep(step === 4 ? (mode === 'signup' ? 3 : 2) : 4)} className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white">
              <BiChevronLeft size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="p-6">
              {step === 4 ? (
                <PhoneInput
                  mode={mode}
                  onNext={(phone, otp) => {
                    setPhoneNumber(phone);
                    setGeneratedOtp(otp);
                    setStep(5);
                  }}
                  onBack={() => setStep(mode === 'signup' ? 3 : 2)}
                  isThemed={true} // Hint for inner components to use dark theme
                />
              ) : (
                <OtpScreen
                  phoneNumber={phoneNumber}
                  generatedOtp={generatedOtp}
                  onVerifySuccess={handleAuthSuccess}
                  onBack={() => setStep(4)}
                  onRegenerateOtp={(newOtp) => setGeneratedOtp(newOtp)}
                  isThemed={true}
                />
              )}
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    );
  }

  return null;
};

export default AuthPage;
