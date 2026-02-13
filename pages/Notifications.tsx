import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display h-full flex flex-col overflow-hidden relative">
        <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-[#2c3641] text-slate-500 dark:text-slate-400 transition-colors">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Notifications</h1>
                </div>
                <button className="text-primary text-sm font-semibold hover:opacity-80 active:scale-95 transition-all">Mark all as read</button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-3 pt-1">
                <button className="flex shrink-0 items-center justify-center h-8 px-4 rounded-full bg-primary text-white text-xs font-semibold shadow-md shadow-primary/20 transition-transform active:scale-95">All</button>
                <button className="flex shrink-0 items-center justify-center h-8 px-4 rounded-full bg-slate-200 dark:bg-[#2c3641] text-slate-600 dark:text-slate-300 text-xs font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-colors active:scale-95">Urgent</button>
                <button className="flex shrink-0 items-center justify-center h-8 px-4 rounded-full bg-slate-200 dark:bg-[#2c3641] text-slate-600 dark:text-slate-300 text-xs font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-colors active:scale-95">Route Updates</button>
                <button className="flex shrink-0 items-center justify-center h-8 px-4 rounded-full bg-slate-200 dark:bg-[#2c3641] text-slate-600 dark:text-slate-300 text-xs font-medium border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-colors active:scale-95">Offers</button>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Today</div>
            
            <article className="relative flex gap-4 p-4 rounded-xl bg-white dark:bg-[#1b252f] shadow-sm border-l-4 border-l-amber-500 overflow-hidden active:bg-slate-50 dark:active:bg-[#2c3641]/50 transition-colors group cursor-pointer">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">2h ago</span>
                </div>
                <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-500">
                        <span className="material-symbols-outlined">warning</span>
                    </div>
                </div>
                <div className="flex-1 pr-12">
                    <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight mb-1">Route 24 Diversion</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Due to emergency roadwork at Deccan Gymkhana, buses will take the FC Road route until 6 PM.</p>
                        <div className="mt-3 flex gap-3">
                            <button onClick={(e) => {e.stopPropagation(); navigate('/tracking')}} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1">View Map <span className="material-symbols-outlined text-[14px]">arrow_forward</span></button>
                        </div>
                    </div>
                </div>
            </article>

            <article className="relative flex gap-4 p-4 rounded-xl bg-white dark:bg-[#1b252f] shadow-sm overflow-hidden active:bg-slate-50 dark:active:bg-[#2c3641]/50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">5h ago</span>
                </div>
                <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-500">
                        <span className="material-symbols-outlined">local_activity</span>
                    </div>
                </div>
                <div className="flex-1 pr-8">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-tight mb-1">Student Pass Discount</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Get 10% off on monthly passes this week. Valid for all college students with a valid ID.</p>
                    <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Limited Time</span>
                    </div>
                </div>
            </article>

            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1 pt-2">Yesterday</div>
            
            <article className="relative flex gap-4 p-4 rounded-xl bg-white dark:bg-[#1b252f] shadow-sm overflow-hidden active:bg-slate-50 dark:active:bg-[#2c3641]/50 transition-colors group cursor-pointer opacity-90 hover:opacity-100">
                <div className="absolute top-4 right-4">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">1d ago</span>
                </div>
                <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500">
                        <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                </div>
                <div className="flex-1 pr-8">
                    <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 leading-tight mb-1">Holiday Schedule</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Sunday timetable will be applicable on Ganesh Chaturthi for all major city routes. Please plan accordingly.</p>
                </div>
            </article>

            <article className="relative flex gap-4 p-4 rounded-xl bg-white dark:bg-[#1b252f] shadow-sm overflow-hidden active:bg-slate-50 dark:active:bg-[#2c3641]/50 transition-colors group cursor-pointer opacity-90 hover:opacity-100">
                <div className="absolute top-4 right-4">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">2d ago</span>
                </div>
                <div className="shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-500">
                        <span className="material-symbols-outlined">directions_bus</span>
                    </div>
                </div>
                <div className="flex-1 pr-8">
                    <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 leading-tight mb-1">New AC Buses Added</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">5 new electric buses have been added to the Katraj - Swargate route to improve frequency during peak hours.</p>
                </div>
            </article>
            
            <div className="flex flex-col items-center justify-center py-8 text-center opacity-60">
                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-[#2c3641] flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">check</span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">You're all caught up!</p>
            </div>
        </main>
        
        {/* Contextual Bottom Nav for Notifications as seen in screenshot */}
        <nav className="fixed bottom-0 left-0 w-full bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex justify-around py-2 pb-6 z-20">
            <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 w-16 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors group">
                <span className="material-symbols-outlined text-[24px] group-active:scale-90 transition-transform">home</span>
                <span className="text-[10px] font-medium">Home</span>
            </button>
            <button onClick={() => navigate('/tracking')} className="flex flex-col items-center gap-1 w-16 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors group">
                <span className="material-symbols-outlined text-[24px] group-active:scale-90 transition-transform">map</span>
                <span className="text-[10px] font-medium">Map</span>
            </button>
            <button onClick={() => navigate('/ticketing')} className="flex flex-col items-center gap-1 w-16 text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors group">
                 <div className="relative">
                    <span className="material-symbols-outlined text-[24px] group-active:scale-90 transition-transform">confirmation_number</span>
                 </div>
                <span className="text-[10px] font-medium">Tickets</span>
            </button>
            <button className="flex flex-col items-center gap-1 w-16 text-primary dark:text-primary transition-colors group">
                 <div className="relative">
                    <span className="material-symbols-outlined text-[24px] group-active:scale-90 transition-transform filled">notifications</span>
                    <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background-light dark:border-background-dark"></span>
                 </div>
                <span className="text-[10px] font-medium">Alerts</span>
            </button>
        </nav>
    </div>
  );
};

export default Notifications;