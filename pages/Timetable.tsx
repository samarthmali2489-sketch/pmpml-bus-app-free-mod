import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timetable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white relative">
      <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background-light/90 dark:bg-background-dark/90 border-b border-slate-200 dark:border-slate-800">
         <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => navigate('/')} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
               <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <h1 className="text-lg font-bold tracking-tight flex-1 text-center pr-8">PMPML Timetables</h1>
         </div>
         
         <div className="px-4 pb-4">
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined">search</span>
               </div>
               <input className="block w-full p-3 pl-10 text-sm rounded-xl bg-slate-200 dark:bg-[#1C252E] border-transparent focus:border-primary focus:ring-1 focus:ring-primary placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white transition-all shadow-sm" placeholder="Search route (e.g. 101, 24)" type="text" />
               <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button className="p-1 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                     <span className="material-symbols-outlined text-base">tune</span>
                  </button>
               </div>
            </div>
         </div>
         
         <div className="flex px-4 gap-6 border-b border-slate-200 dark:border-slate-800">
            <button className="pb-3 border-b-2 border-primary text-primary font-semibold text-sm">All Routes</button>
            <button className="pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-200">Favorites</button>
            <button className="pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 font-medium text-sm hover:text-slate-700 dark:hover:text-slate-200">Nearby</button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
         <div className="p-4">
            <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 p-4 flex items-center justify-between border border-primary/20">
               <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Live Updates</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Metro feeder buses are running on schedule today.</p>
               </div>
               <span className="material-symbols-outlined text-primary text-3xl opacity-80">rss_feed</span>
            </div>
         </div>

         <div className="px-4 py-2 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Frequent Routes</h2>
            <button className="text-xs font-medium text-primary hover:text-primary/80">View All</button>
         </div>

         <div className="flex flex-col gap-1 px-4">
            <div className="rounded-xl bg-white dark:bg-[#1C252E] shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden mb-3">
               <div className="p-4 flex items-start justify-between bg-slate-50 dark:bg-[#232D38] border-b border-slate-100 dark:border-slate-700">
                  <div className="flex gap-3">
                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30">101</div>
                     <div>
                        <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Swargate <span className="text-slate-400 px-1">⇄</span> Katraj</h3>
                        <div className="flex items-center gap-1 mt-1">
                           <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">Live</span>
                           <span className="text-xs text-slate-500 dark:text-slate-400">• Every 10 min</span>
                        </div>
                     </div>
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors"><span className="material-symbols-outlined fill-current">star</span></button>
               </div>
               
               <div className="p-4">
                   <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Next Bus</span>
                      <div className="flex gap-2 text-xs">
                         <span className="font-medium text-primary">Swargate Depot</span>
                         <span className="material-symbols-outlined text-xs text-slate-400">arrow_right_alt</span>
                         <span className="text-slate-500 dark:text-slate-400">Katraj Zoo</span>
                      </div>
                   </div>
                   
                   <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                       <div className="flex-none flex flex-col items-center justify-center w-[72px] h-[64px] rounded-lg bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-[#1C252E]">
                          <span className="text-lg font-bold">10:45</span>
                          <span className="text-[10px] font-medium opacity-90">Now</span>
                       </div>
                       {[10, 20, 30].map((min, i) => (
                           <div key={i} className="flex-none flex flex-col items-center justify-center w-[72px] h-[64px] rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                              <span className="text-lg font-bold">10:55</span>
                              <span className="text-[10px] text-slate-500">{min} min</span>
                           </div>
                       ))}
                   </div>
                   
                   <div className="mt-4 relative pl-2 border-l-2 border-slate-200 dark:border-slate-700 ml-2 space-y-4">
                      <div className="relative">
                         <div className="absolute -left-[13px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-[#1C252E]"></div>
                         <p className="text-sm font-medium leading-none text-slate-900 dark:text-white ml-3">Swargate Depot</p>
                         <p className="text-xs text-slate-500 ml-3 mt-1">Departed 2 min ago</p>
                      </div>
                      <div className="relative">
                         <div className="absolute -left-[13px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-white dark:ring-[#1C252E]"></div>
                         <p className="text-sm font-medium leading-none text-slate-900 dark:text-white ml-3">Laxmi Narayan Theatre</p>
                         <p className="text-xs text-slate-500 ml-3 mt-1">Arriving in 4 min</p>
                      </div>
                   </div>

                   <button onClick={() => navigate('/tracking')} className="w-full mt-4 py-2.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-center gap-2">
                       View Full Schedule <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </button>
               </div>
            </div>

            {/* List Item */}
            <div onClick={() => navigate('/tracking')} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1C252E] transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800">
               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg group-hover:bg-white dark:group-hover:bg-[#232D38] group-hover:shadow-md transition-all">204</div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                     <h3 className="font-bold text-slate-900 dark:text-white truncate">Hadapsar <span className="text-slate-400 px-1">⇄</span> Chinchwad</h3>
                     <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-center">Via Station</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">Next bus in 12 min • Low crowding</p>
               </div>
               <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">star_border</span></button>
            </div>
         </div>
      </div>
      
      {/* Floating Bottom Nav */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[400px]">
         <nav className="flex items-center justify-around bg-[#1C252E]/90 dark:bg-[#1C252E]/90 backdrop-blur-md rounded-2xl shadow-xl shadow-black/20 border border-white/10 p-2">
            <button onClick={() => navigate('/timetable')} className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-primary bg-primary/10">
               <span className="material-symbols-outlined filled">schedule</span>
               <span className="text-[10px] font-medium mt-0.5">Time</span>
            </button>
            <button onClick={() => navigate('/tracking')} className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
               <span className="material-symbols-outlined">map</span>
               <span className="text-[10px] font-medium mt-0.5">Map</span>
            </button>
            <button onClick={() => navigate('/ticketing')} className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
               <span className="material-symbols-outlined">confirmation_number</span>
               <span className="text-[10px] font-medium mt-0.5">Ticket</span>
            </button>
            <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center w-14 h-14 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
               <span className="material-symbols-outlined">person</span>
               <span className="text-[10px] font-medium mt-0.5">Profile</span>
            </button>
         </nav>
      </div>
    </div>
  );
};

export default Timetable;