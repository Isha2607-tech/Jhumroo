import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight, BiUser, BiLockAlt, BiShieldAlt, BiBell, BiMoon, BiGlobe, BiQuestionMark, BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);

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
                { icon: <BiMoon size={20}/>, label: "Dark mode", isToggle: true },
                { icon: <BiGlobe size={20}/>, label: "Language", route: "/settings/language" }
            ]
        },
        {
            title: "Support & About",
            items: [
                { icon: <BiQuestionMark size={20}/>, label: "Help Center", route: "/settings/help-center" },
                { icon: <BiLogOut size={20}/>, label: "Log out", color: '#FF3B30' }
            ]
        }
    ];

    const handleItemClick = (item) => {
        if (item.isToggle) {
            setIsDarkMode(!isDarkMode);
        } else if (item.route) {
            navigate(item.route);
        }
    };

    return (
        <div className="page-container bg-[#161616] flex flex-col min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-6 pb-6 shrink-0 relative">
                <div 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-10"
                  onClick={() => navigate(-1)}
                >
                    <BiChevronLeft size={24} className="text-white opacity-80" />
                </div>
                <h2 className="text-[17px] font-bold text-white absolute left-0 right-0 text-center tracking-wide">Settings and privacy</h2>
                <div className="w-10"></div>
            </div>

            <div className="scrollable flex-1 px-4 pb-8">
                {/* User Profile Section */}
                <div className="bg-[#242424] rounded-[18px] p-4 flex items-center justify-between mb-8 cursor-pointer active:brightness-110 transition-all shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black/20">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=johnny_dance&style=circle" alt="Johnny Dance" className="w-full h-full object-cover scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white text-[15px] font-bold mb-0.5">Johnny Dance</h3>
                            <p className="text-white/40 text-[13px] font-medium">@johnny_dance</p>
                        </div>
                    </div>
                    <BiChevronRight size={22} className="text-white/40" />
                </div>

                {sections.map((section, idx) => (
                    <div key={idx} className="mb-6">
                        <h4 className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-3 ml-1">{section.title}</h4>
                        <div className="bg-[#242424] rounded-[18px] overflow-hidden shadow-sm">
                            {section.items.map((item, itemIdx) => {
                                const isLast = itemIdx === section.items.length - 1;
                                return (
                                    <div 
                                        key={itemIdx} 
                                        className={`flex justify-between items-center p-4 active:bg-white/5 transition-colors cursor-pointer ${!isLast ? 'border-b border-white border-opacity-[0.05]' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className="flex items-center gap-3.5 text-white/90" style={item.color ? { color: item.color } : {}}>
                                            <div className="opacity-90">{item.icon}</div>
                                            <span className="text-[15px] font-medium tracking-wide">{item.label}</span>
                                        </div>
                                        
                                        {item.isToggle ? (
                                            <div className={`w-[46px] h-6 rounded-full flex items-center shrink-0 transition-colors duration-300 ${isDarkMode ? 'bg-transparent border border-white/40' : 'bg-transparent border border-white/20'}`}>
                                                <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}></div>
                                            </div>
                                        ) : (
                                            <BiChevronRight size={22} className="text-white/30" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsPage;
