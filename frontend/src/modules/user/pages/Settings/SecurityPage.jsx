import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiChevronRight, BiShieldAlt, BiKey, BiShield } from 'react-icons/bi';
import {
  getDevicesSummary,
  getPasswordSummary,
  getSecurityAlertsSummary,
  getTwoStepSummary,
} from '../../../../utils/securitySettings';

const SecurityPage = () => {
    const navigate = useNavigate();
    const securityAlertsSummary = getSecurityAlertsSummary();

    const securitySections = [
        {
            title: "Security Status",
            items: [
                {
                  icon: <BiShieldAlt size={20}/>,
                  label: "Security alerts",
                  value: securityAlertsSummary.value,
                  color: securityAlertsSummary.color,
                  route: "/settings/security/alerts",
                },
                {
                  icon: <BiShield size={20}/>,
                  label: "Your devices",
                  value: getDevicesSummary(),
                  route: "/settings/security/devices",
                }
            ]
        },
        {
            title: "Login Security",
            items: [
                {
                  icon: <BiKey size={20}/>,
                  label: "Password",
                  value: getPasswordSummary(),
                  route: "/settings/security/password",
                },
                {
                  icon: <BiShield size={20}/>,
                  label: "2-step verification",
                  value: getTwoStepSummary(),
                  route: "/settings/security/two-step-verification",
                }
            ]
        }
    ];

    const handleItemClick = (item) => {
        if (item.route) {
            navigate(item.route);
        }
    };

    return (
        <div className="page-container pb-0 theme-surface-page flex flex-col min-h-screen">
            {/* Header */}
            <div className="theme-page-header flex items-center justify-between px-4 pt-6 pb-6 shrink-0 relative">
                <div 
                  className="theme-icon-button w-10 h-10 rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-10"
                  onClick={() => navigate(-1)}
                >
                    <BiChevronLeft size={24} className="theme-text-primary" />
                </div>
                <h2 className="theme-text-primary text-[17px] font-bold absolute left-0 right-0 text-center tracking-wide">Security</h2>
                <div className="w-10"></div>
            </div>

            <div className="scrollable flex-1 px-4 pb-24 pt-6">
                {securitySections.map((section, idx) => (
                    <div key={idx} className="mb-8">
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
                                        <div className="flex items-center gap-3.5 theme-text-primary">
                                            <div className="opacity-70">{item.icon}</div>
                                            <span className="text-[15px] font-medium tracking-wide">{item.label}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {item.value && (
                                                <span 
                                                    className="theme-text-faint text-[14px] font-medium" 
                                                    style={item.color ? { color: item.color } : undefined}
                                                >
                                                    {item.value}
                                                </span>
                                            )}
                                            <BiChevronRight size={22} className="theme-text-faint" />
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

export default SecurityPage;
