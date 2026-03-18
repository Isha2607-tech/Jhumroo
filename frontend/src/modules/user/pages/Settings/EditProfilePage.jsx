import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiChevronLeft, BiCamera } from 'react-icons/bi';

const EditProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container bg-[#161616] flex flex-col min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-6 pb-6 shrink-0 relative">
                <div 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform z-10"
                  onClick={() => navigate(-1)}
                >
                    <BiChevronLeft size={24} className="text-white" />
                </div>
                <h2 className="text-[17px] font-bold text-white absolute left-0 right-0 text-center tracking-wide">Edit profile</h2>
                <button className="text-[15px] font-bold text-[#FE2C55] active:opacity-70 z-10">Save</button>
            </div>

            <div className="scrollable flex-1 px-4 pb-24">
                {/* Profile Photo Section */}
                <div className="flex flex-col items-center py-8">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-black/20 relative">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=johnny_dance&style=circle" alt="Johnny Dance" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <BiCamera size={24} className="text-white" />
                            </div>
                        </div>
                        <div className="absolute -bottom-1 -right-0 w-8 h-8 rounded-full bg-[#FE2C55] flex items-center justify-center border-2 border-[#161616]">
                            <BiCamera size={16} className="text-white" />
                        </div>
                    </div>
                    <p className="text-white/60 text-[13px] font-medium mt-4">Change photo</p>
                </div>

                {/* Form Section */}
                <div className="space-y-6 mt-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[12px] font-bold uppercase tracking-widest ml-1">Name</label>
                        <div className="bg-[#242424] rounded-[14px] p-4 flex items-center border border-white/5 focus-within:border-white/20 transition-all">
                            <input type="text" defaultValue="Johnny Dance" className="bg-transparent text-white text-[15px] w-full outline-none font-medium" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[12px] font-bold uppercase tracking-widest ml-1">Username</label>
                        <div className="bg-[#242424] rounded-[14px] p-4 flex items-center border border-white/5 focus-within:border-white/20 transition-all">
                            <span className="text-white/30 text-[15px] mr-0.5">@</span>
                            <input type="text" defaultValue="johnny_dance" className="bg-transparent text-white text-[15px] w-full outline-none font-medium" />
                        </div>
                        <p className="text-white/30 text-[11px] ml-1">You can change your username once every 30 days.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[12px] font-bold uppercase tracking-widest ml-1">Bio</label>
                        <div className="bg-[#242424] rounded-[14px] p-4 border border-white/5 focus-within:border-white/20 transition-all">
                            <textarea 
                                defaultValue="Dancing through life! 🕺✨\nFor business inquiries: DM" 
                                className="bg-transparent text-white text-[15px] w-full outline-none font-medium resize-none h-24 pt-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
