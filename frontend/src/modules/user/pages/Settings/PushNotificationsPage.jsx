import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiBell } from 'react-icons/bi';

const PushNotificationsPage = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Content",
            items: [
                { label: "New followers", default: true },
                { label: "Mentions", default: true },
                { label: "Comments", default: true },
                { label: "Likes", default: true }
            ]
        },
        {
            title: "Direct Messages",
            items: [
                { label: "Direct messages", default: true }
            ]
        },
        {
            title: "Video Updates",
            items: [
                { label: "Videos from accounts you follow", default: false },
                { label: "Videos you might like", default: true }
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
                <h2 className="text-[17px] font-bold text-white absolute left-0 right-0 text-center tracking-wide">Push notifications</h2>
                <div className="w-10"></div>
            </div>

            <div className="scrollable flex-1 px-4 pb-24 pt-6">
                {sections.map((section, idx) => (
                    <div key={idx} className="mb-8">
                        <h4 className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-3 ml-1">{section.title}</h4>
                        <div className="bg-[#242424] rounded-[18px] overflow-hidden shadow-sm">
                            {section.items.map((item, itemIdx) => {
                                const isLast = itemIdx === section.items.length - 1;
                                return (
                                    <div 
                                        key={itemIdx} 
                                        className={`flex justify-between items-center p-4 ${!isLast ? 'border-b border-white border-opacity-[0.05]' : ''}`}
                                    >
                                        <span className="text-[15px] font-medium text-white/90 tracking-wide">{item.label}</span>
                                        <div className={`w-[46px] h-6 rounded-full flex items-center shrink-0 transition-colors duration-300 ${item.default ? 'bg-[#FE2C55]' : 'bg-transparent border border-white/20'}`}>
                                            <div className={`w-[18px] h-[18px] rounded-full bg-white shadow-sm transform transition-transform duration-300 ${item.default ? 'translate-x-[24px]' : 'translate-x-[2px]'}`}></div>
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

export default PushNotificationsPage;
