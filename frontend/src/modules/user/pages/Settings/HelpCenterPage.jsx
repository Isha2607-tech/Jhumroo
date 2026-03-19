import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiSearch, BiChevronRight, BiMessageDetail, BiShield, BiSolidLockAlt, BiQuestionMark } from 'react-icons/bi';

const HelpCenterPage = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Safety",
            items: [
                { icon: <BiShield size={20}/>, label: "Safety Center", route: "/settings/help-center/safety-center" },
                { icon: <BiSolidLockAlt size={20}/>, label: "Privacy and Security", route: "/settings/help-center/privacy-security" }
            ]
        },
        {
            title: "Support",
            items: [
                { icon: <BiQuestionMark size={20}/>, label: "Report a problem", route: "/settings/help-center/report-problem" },
                { icon: <BiMessageDetail size={20}/>, label: "Help center", route: "/settings/help-center/articles" }
            ]
        }
    ];

    return (
        <div className="page-container pb-0 theme-surface-page flex flex-col min-h-screen font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-6 pb-6 shrink-0 relative border-b border-white/5">
                <div 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-10"
                  onClick={() => navigate(-1)}
                >
                    <BiChevronLeft size={24} className="text-white" />
                </div>
                <h2 className="text-[17px] font-bold text-white absolute left-0 right-0 text-center tracking-wide">Help Center</h2>
                <div className="w-10"></div>
            </div>

            <div className="scrollable flex-1 px-4 pb-24 pt-6">
                <div className="bg-[#242424] rounded-[18px] p-4 flex items-center gap-2 mb-8 border border-white/5 focus-within:border-white/20 transition-all">
                    <BiSearch size={20} className="text-white/30" />
                    <input type="text" placeholder="Search" className="bg-transparent text-white text-[15px] outline-none font-medium w-full placeholder:text-white/20" />
                </div>

                {sections.map((section, idx) => (
                    <div key={idx} className="mb-8">
                        <h4 className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-3 ml-1">{section.title}</h4>
                        <div className="bg-[#242424] rounded-[18px] overflow-hidden shadow-sm">
                            {section.items.map((item, itemIdx) => {
                                const isLast = itemIdx === section.items.length - 1;
                                return (
                                    <div 
                                        key={itemIdx} 
                                        className={`flex justify-between items-center p-4 active:bg-white/5 transition-colors cursor-pointer ${!isLast ? 'border-b border-white border-opacity-[0.05]' : ''}`}
                                        onClick={() => navigate(item.route)}
                                    >
                                        <div className="flex items-center gap-3.5 text-white/90">
                                            <div className="opacity-70">{item.icon}</div>
                                            <span className="text-[15px] font-medium tracking-wide">{item.label}</span>
                                        </div>
                                        <BiChevronRight size={22} className="text-white/30" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <p className="text-center text-white/20 text-[12px] mt-12 mb-6 tracking-wide">Jhumroo v1.0.0</p>
            </div>
        </div>
    );
};

export default HelpCenterPage;
