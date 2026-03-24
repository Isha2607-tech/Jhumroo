import React, { useState, useEffect, useRef } from 'react';
import { BiChevronLeft } from 'react-icons/bi';

const OTP_LENGTH = 4;
const EXPIRY_TIME = 120; // 2 minutes

const OtpScreen = ({ phoneNumber, generatedOtp, onVerifySuccess, onBack, onRegenerateOtp, isThemed = false }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(EXPIRY_TIME);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  // Handle OTP digit entry
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = otp.split('');
    newOtp[index] = value.slice(-1);
    const joined = newOtp.join('').replace(/undefined/g, '');
    
    setOtp(joined);
    setError('');
    
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      console.log('🤖 NEW GENERATED OTP:', newOtp);
      onRegenerateOtp(newOtp);
      
      setTimer(EXPIRY_TIME);
      setOtp('');
      setLoading(false);
      inputRefs.current[0]?.focus();
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
  }, []);

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      console.log('🔍 Verifying OTP:', otp, 'vs', generatedOtp);
      if (timer === 0) {
        setError('OTP Expired. Please resend.');
      } else if (otp === generatedOtp) {
        console.log('✨ OTP Match! Completing auth...');
        inputRefs.current.forEach(ref => ref?.blur());
        onVerifySuccess();
      } else {
        console.log('❌ OTP Mismatch');
        setError('Incorrect code. Please try again.');
        setOtp('');
        inputRefs.current[0]?.focus();
      }
    }
  }, [otp, generatedOtp, timer, onVerifySuccess]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`h-full min-h-0 w-full flex flex-col overflow-hidden ${isThemed ? 'bg-transparent' : 'bg-white'}`}>
      {!isThemed && (
        <div className="h-11 flex items-center px-2 shrink-0">
          <button onClick={onBack} className="p-2">
            <BiChevronLeft size={26} className="text-black" />
          </button>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto no-scrollbar min-h-0 ${isThemed ? 'px-0 pt-4 sm:pt-6' : 'px-5 pt-3'}`}
        style={{ paddingBottom: isThemed ? 'max(0.25rem, env(safe-area-inset-bottom))' : undefined }}
      >
        <h2 className={`text-[22px] sm:text-[24px] font-black mb-1 leading-tight ${isThemed ? 'text-white' : 'text-black'}`}>Verify it's you</h2>
        <p className={`text-[13px] mb-6 sm:mb-8 leading-snug ${isThemed ? 'text-gray-400' : 'text-gray-500'}`}>
          Enter the 4-digit code sent to <span className={isThemed ? 'text-white font-bold' : 'text-black font-bold'}>+91 {phoneNumber}</span>
        </p>

        <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <div key={i} className="flex-1">
              <input
                ref={(el) => (inputRefs.current[i] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={otp[i] || ''}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoFocus={i === 0}
                className={`w-full h-14 sm:h-16 text-center text-[22px] sm:text-2xl font-black rounded-xl sm:rounded-2xl outline-none transition-all duration-200 ${
                  isThemed 
                    ? `bg-white/5 border-2 ${error ? 'border-[#fe2c55] text-[#fe2c55]' : 'border-white/10 focus:border-[#fe2c55] text-white'}`
                    : `bg-gray-50 border-2 ${error ? 'border-[#fe2c55] text-[#fe2c55]' : 'border-transparent focus:border-black text-black'}`
                }`}
                disabled={loading}
              />
            </div>
          ))}
        </div>

        <div className="min-h-[24px] mb-6 sm:mb-8">
           {error && <p className="text-[#fe2c55] text-sm font-bold animate-shake">{error}</p>}
           {!error && loading && (
             <div className="flex items-center gap-2 text-[#fe2c55] text-sm font-bold">
               <div className="w-5 h-5 border-[3px] border-white/30 border-t-[#fe2c55] rounded-full animate-spin" />
               Verifying Code...
             </div>
           )}
        </div>

        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <p className={`text-[13px] ${isThemed ? 'text-gray-500' : 'text-gray-400'}`}>
            Didn't receive code? {timer > 0 ? <span className="font-bold text-gray-300 ml-1">{formatTime(timer)}</span> : ''}
          </p>
          {(timer === 0 || timer <= (EXPIRY_TIME - 10)) && (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-[15px] font-black text-[#fe2c55] active:scale-95 transition-transform disabled:opacity-50"
            >
              Resend New Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
