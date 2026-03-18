import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockContacts = [
  { id: 1, username: 'user884998785164', sub: 'From your contacts' },
  { id: 2, username: 'Chloe_joy', sub: 'People you may know' },
  { id: 3, username: 'mike.tiktok99', sub: 'From your contacts' },
];

const FindFriends = ({ contacts, onDismiss }) => (
  <div className="px-4 pb-4">
    <div className="flex items-center gap-1 mb-3">
      <span className="text-[13px] font-semibold text-white">Find friends</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    </div>
    <div className="space-y-3">
      {contacts.map(c => (
        <div key={c.id} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white/10 border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.username}`} alt="" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-white truncate">{c.username}</p>
            <p className="text-[11px] text-white/40">{c.sub}</p>
          </div>
          <button className="px-4 py-1.5 bg-[#FE2C55] text-white text-[12px] font-bold rounded-sm shadow-sm active:brightness-90">Follow</button>
          <button onClick={() => onDismiss(c.id)} className="text-white/30 active:opacity-60 ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
);

const NewFollowersPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(mockContacts);

  return (
    <div className="page-container bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
        <button onClick={() => navigate(-1)} className="text-white active:opacity-60 w-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-[15px] font-bold text-white">New followers</h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h3 className="text-[16px] font-bold text-white mb-2">New followers</h3>
          <p className="text-[13px] text-white/40 leading-relaxed">
            When someone new follows you, you'll see it here
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mx-4 mb-4" />

        {/* Find Friends */}
        <FindFriends
          contacts={contacts}
          onDismiss={(id) => setContacts(prev => prev.filter(c => c.id !== id))}
        />
      </div>
    </div>
  );
};

export default NewFollowersPage;
