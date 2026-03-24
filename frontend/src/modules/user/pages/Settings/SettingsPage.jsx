import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiUser, BiLockAlt, BiShieldAlt, BiBell, BiMoon, BiGlobe, BiQuestionMark, BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../context/ThemeContext';

const SettingsPage = ({ onLogout }) => {
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const sections = [
        {
            title: "Account",
            items: [
                { icon: <BiUser size={20}/>, label: "Edit profile", route: "/settings/edit-profile" },
                { icon: <BiLockAlt size={20}/>, label: "Privacy", route: "/settings/privacy" },
                { icon: <BiShieldAlt size={20}/>, label: "Security", route: "/settings/security" }
            ]
        },
        {
            title: "Content & Display",
            items: [
                { icon: <BiBell size={20}/>, label: "Push notifications", route: "/settings/push-notifications" },
                { icon: <BiMoon size={20}/>, label: isDarkMode ? "Dark mode" : "Light mode", isToggle: true },
                { icon: <BiGlobe size={20}/>, label: "Language", route: "/settings/language" }
            ]
        },
        {
            title: "Support & About",
            items: [
                { icon: <BiQuestionMark size={20}/>, label: "Help Center", route: "/settings/help-center" },
                { icon: <BiLogOut size={20}/>, label: "Log out", color: '#FF3B30', isLogout: true }
            ]
        }
    ];

    const handleItemClick = (item) => {
        if (item.isToggle) {
            toggleTheme();
        } else if (item.isLogout) {
            setShowLogoutModal(true);
        } else if (item.route) {
            navigate(item.route);
        }
    };

    return (
        <div className="page-container pb-0 theme-surface-page flex flex-col min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-6 pb-6 shrink-0 relative">
                <div 
                  className="theme-icon-button w-10 h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-10"
                  onClick={() => navigate(-1)}
                >
                    <BiChevronLeft size={24} className="theme-text-primary opacity-80" />
                </div>
                <h2 className="theme-text-primary text-[17px] font-bold absolute left-0 right-0 text-center tracking-wide">Settings and privacy</h2>
                <div className="w-10"></div>
            </div>

            <div className={`scrollable flex-1 px-4 pb-8 ${showLogoutModal ? 'overflow-hidden' : ''}`}>
                {/* User Profile Section */}
                <div className="theme-panel-card rounded-[18px] p-4 flex items-center justify-between mb-8 cursor-pointer active:opacity-90 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black/20">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=johnny_dance&style=circle" alt="Johnny Dance" className="w-full h-full object-cover scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="theme-text-primary text-[15px] font-bold mb-0.5">Johnny Dance</h3>
                            <p className="theme-text-muted text-[13px] font-medium">@johnny_dance</p>
                        </div>
                    </div>
                    <BiChevronRight size={22} className="theme-text-faint" />
                </div>

                {sections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                        <h4 className="theme-section-title text-[11px] font-bold uppercase tracking-widest mb-3 ml-1">{section.title}</h4>
                        <div className="theme-panel-card rounded-[18px] overflow-hidden shadow-sm">
                            {section.items.map((item, itemIdx) => {
                                const isLast = itemIdx === section.items.length - 1;
                                return (
                                    <div 
                                        key={itemIdx} 
                                        className={`theme-panel-row flex justify-between items-center p-4 transition-colors cursor-pointer ${!isLast ? 'border-b theme-panel-divider' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="flex items-center gap-3.5 theme-text-primary" style={item.color ? { color: item.color } : {}}>
                                            <div className="opacity-90">{item.icon}</div>
                                            <span className="text-[15px] font-medium tracking-wide">{item.label}</span>
                                        </div>
                                        
                                        {item.isToggle ? (
                                            <div className={`w-[46px] h-6 rounded-full flex items-center shrink-0 transition-colors duration-300 ${
                                              isDarkMode
                                                ? 'bg-[#FE2C55]/12 border border-white/35'
                                                : 'bg-black/[0.08] border border-black/12'
                                            }`}>
                                                <div className={`w-[18px] h-[18px] rounded-full transform transition-transform duration-300 ${
                                                  isDarkMode
                                                    ? 'translate-x-[24px] bg-white shadow-sm'
                                                    : 'translate-x-[2px] bg-white border border-black/10 shadow-[0_1px_3px_rgba(15,23,42,0.16)]'
                                                }`}></div>
                                            </div>
                                        ) : (
                                            <BiChevronRight size={22} className="theme-text-faint" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {showLogoutModal && (
                <div
                  className="absolute inset-0 z-[1200] flex items-center justify-center bg-black/50 backdrop-blur-[2px] px-5"
                  onClick={() => setShowLogoutModal(false)}
                >
                    <div
                      className={`w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl ${
                        isDarkMode ? 'bg-[#1b1f31] border border-white/10' : 'bg-white border border-black/[0.08]'
                      }`}
                      onClick={(event) => event.stopPropagation()}
                    >
                        <div className="px-6 pt-7 pb-5 text-center">
                            <h3 className={`text-[18px] font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Log out?</h3>
                            <p className={`text-[13px] leading-relaxed ${isDarkMode ? 'text-white/55' : 'text-black/55'}`}>
                                You will be returned to the welcome screen and can sign in again anytime.
                            </p>
                        </div>

                        <div className={`h-px ${isDarkMode ? 'bg-white/8' : 'bg-black/[0.08]'}`} />

                        <div className="flex p-4 gap-3">
                            <button
                              type="button"
                              onClick={() => setShowLogoutModal(false)}
                              className={`flex-1 min-h-[52px] rounded-[14px] border text-[15px] font-semibold transition-all active:scale-[0.98] ${
                                isDarkMode
                                  ? 'border-white/12 bg-white/6 text-white/75 active:bg-white/10'
                                  : 'border-[#d1d5db] bg-[#f7f8fb] text-black/65 active:bg-black/[0.04]'
                              }`}
                            >
                                Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowLogoutModal(false);
                                onLogout?.();
                              }}
                              className="flex-1 min-h-[52px] rounded-[14px] text-[15px] font-bold text-white transition-all active:scale-[0.98] active:brightness-95"
                              style={{
                                background: 'linear-gradient(180deg, #ff4d73 0%, #FE2C55 100%)',
                                boxShadow: '0 12px 24px rgba(254, 44, 85, 0.22)',
                              }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
