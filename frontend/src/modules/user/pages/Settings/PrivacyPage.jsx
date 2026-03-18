import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight, BiLock, BiAt, BiCommentDetail, BiArrowFromBottom, BiEnvelope, BiDownload, BiListUl } from 'react-icons/bi';

const PrivacyPage = () => {
    const navigate = useNavigate();
    const [isPrivate, setIsPrivate] = useState(false);

    const privacySections = [
        {
            title: "Interactions",
            items: [
                { icon: <BiCommentDetail size={20}/>, label: "Comments", value: "Everyone" },
                { icon: <BiAt size={20}/>, label: "Mentions and tags", value: "Friends" },
                { icon: <BiEnvelope size={20}/>, label: "Direct messages", value: "Friends" },
                { icon: <BiArrowFromBottom size={20}/>, label: "Duet", value: "Everyone" },
                { icon: <BiArrowFromBottom size={20} className="rotate-90"/>, label: "Stitch", value: "Everyone" },
                { icon: <BiDownload size={20}/>, label: "Downloads", value: "On" }
            ]
        },
        {
            title: "Safety",
            items: [
                { icon: <BiListUl size={20}/>, label: "Blocked accounts" },
                { icon: <BiLock size={20}/>, label: "Private account", isToggle: true }
            ]
        }
    ];

    return (
        <div className="page-container bg-[#161616] flex flex-col min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-6 pb-6 shrink-0 relative border-b border-white/5">
                <div 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-10"
                  onClick={() => navigate(-1)}
                >
                    <BiChevronLeft size={24} className="text-white" />
                </div>
                <h2 className="text-[17px] font-bold text-white absolute left-0 right-0 text-center tracking-wide">Privacy</h2>
                <div className="w-10"></div>
            </div>

            <div className="scrollable flex-1 px-4 pb-24 pt-6">
                {privacySections.map((section, idx) => (
                    <div key={idx} className="mb-8">
                        <h4 className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-3 ml-1">{section.title}</h4>
                        <div className="bg-[#242424] rounded-[18px] overflow-hidden shadow-sm">
                            {section.items.map((item, itemIdx) => {
                                const isLast = itemIdx === section.items.length - 1;
                                return (
                                    <div 
                                        key={itemIdx} 
                                        className={`flex justify-between items-center p-4 active:bg-white/5 transition-colors cursor-pointer ${!isLast ? 'border-b border-white border-opacity-[0.05]' : ''}`}
                                        onClick={item.isToggle ? () => setIsPrivate(!isPrivate) : undefined}
                                    >
                                        <div className="flex items-center gap-3.5 text-white/90">
                                            <div className="opacity-70">{item.icon}</div>
                                            <span className="text-[15px] font-medium tracking-wide">{item.label}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {item.value && <span className="text-white/30 text-[14px]">{item.value}</span>}
                                            {item.isToggle ? (
                                                <div className={`w-[46px] h-6 rounded-full flex items-center shrink-0 transition-colors duration-300 ${isPrivate ? 'bg-[#FE2C55]' : 'bg-transparent border border-white/20'}`}>
                                                    <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm transform transition-transform duration-300 ${isPrivate ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}></div>
                                                </div>
                                            ) : (
                                                <BiChevronRight size={22} className="text-white/30" />
                                            )}
                                        </div>
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

export default PrivacyPage;
