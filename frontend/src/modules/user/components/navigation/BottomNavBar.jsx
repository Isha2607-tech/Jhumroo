import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BiHomeAlt, BiSearch, BiMessageSquareDetail, BiUser } from 'react-icons/bi';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: BiHomeAlt, type: 'link' },
  { path: '/search', label: 'Discover', icon: BiSearch, type: 'link' },
  { path: '/create', label: 'Create', type: 'create' },
  { path: '/inbox', label: 'Inbox', icon: BiMessageSquareDetail, type: 'link', badge: 12 },
  { path: '/profile', label: 'Profile', icon: BiUser, type: 'link' },
];

const NavItem = ({ item, isActive }) => {
  if (item.type === 'create') {
    return (
      <NavLink to={item.path} className="flex-1 flex flex-col items-center justify-center pt-1 transition-transform active:scale-95 duration-200 will-change-transform">
         <div className="relative w-[45px] h-[28px] flex items-center justify-center">
            <div className="absolute left-0 w-[38px] h-full bg-tiktok-cyan rounded-[8px] z-[1]" />
            <div className="absolute right-0 w-[38px] h-full bg-tiktok-red rounded-[8px] z-[1]" />
            <div className="absolute w-[38px] h-full bg-white rounded-[8px] z-[2] flex items-center justify-center shadow-sm">
                <span className="text-black text-[22px] font-bold leading-none">+</span>
            </div>
         </div>
      </NavLink>
    );
  }

  const Icon = item.icon;

  return (
    <NavLink 
      to={item.path}
      className={`flex-1 flex flex-col items-center justify-center py-2 transition-opacity group ${!isActive ? 'active:opacity-70' : ''}`}
    >
      <div 
        className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-300 ease-in-out will-change-transform ${
          isActive ? 'scale-[1.2]' : 'group-active:scale-95'
        }`}
      >
        <Icon 
          size={22} 
          className={`transition-colors duration-300 ease-in-out ${
            isActive ? 'text-[#FE2C55] drop-shadow-[0_0_8px_rgba(254,44,85,0.4)]' : 'text-white/70'
          }`} 
        />
        {item.badge && (
          <span className={`absolute top-0 -right-1 bg-tiktok-red text-white text-[10px] font-bold px-1.5 h-3.5 min-w-[14px] rounded-full flex items-center justify-center border border-black z-10 transition-transform duration-300 ${isActive ? 'scale-[0.83]' : 'scale-100'}`}>
            {item.badge}
          </span>
        )}
      </div>
      <span className={`text-[10px] mt-0.5 transition-all duration-300 ease-in-out ${
        isActive ? 'text-white font-bold opacity-100 drop-shadow-md' : 'text-white/70 opacity-80'
      }`}>
        {item.label}
      </span>
    </NavLink>
  );
};

const BottomNavBar = ({ isDarkTheme = true }) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const index = NAV_ITEMS.findIndex(item => {
      if (item.path === '/') return location.pathname === '/';
      return location.pathname.startsWith(item.path);
    });
    
    // We update active index even if on a sub-route to keep the indicator there
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname]);

  const containerClasses = `absolute bottom-0 left-0 w-full h-[var(--bottom-nav-height)] z-[1000] flex justify-around items-center transition-all duration-300 pb-[var(--safe-area-bottom)] ${
    isDarkTheme 
      ? 'bg-black/85 backdrop-blur-md border-t border-white/10 text-white/70 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]' 
      : 'bg-gradient-to-t from-black via-black/80 to-transparent text-white/90 backdrop-blur-sm'
  }`;

  return (
    <nav className={containerClasses}>
      {/* Sliding Tab Indicator */}
      <div 
        className="absolute top-0 left-0 w-1/5 h-[3px] flex justify-center transition-transform duration-300 ease-in-out will-change-transform z-10"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      >
        <div className={`w-[20px] h-full rounded-b-full transition-all duration-300 ease-in-out ${
          activeIndex === 2 
            ? 'opacity-0 scale-0' 
            : 'opacity-100 scale-100 bg-[#FE2C55] shadow-[0_2px_8px_rgba(254,44,85,0.8)]'
        }`} />
      </div>

      {/* Nav Items */}
      {NAV_ITEMS.map((item, index) => (
        <NavItem 
          key={item.path}
          item={item}
          isActive={activeIndex === index}
        />
      ))}
    </nav>
  );
};

export default BottomNavBar;

