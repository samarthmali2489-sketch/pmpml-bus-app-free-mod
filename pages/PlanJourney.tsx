import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlanJourney: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-surface-dark transition-colors text-gray-600 dark:text-gray-300"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-8">Plan Your Journey</h1>
        </div>
      </div>

      <main className="flex-1 p-4 flex flex-col gap-6 overflow-y-auto">
        {/* Input Section */}
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 relative">
          <div className="absolute left-[34px] top-[46px] bottom-[46px] w-[2px] flex flex-col justify-between items-center z-0">
             <div className="h-full w-full border-l-2 border-dotted border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="shrink-0 size-5 rounded-full border-[3px] border-primary/30 bg-primary flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-white"></div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Source</label>
                <input className="w-full bg-background-light dark:bg-surface-highlight border-none rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white" type="text" defaultValue="Swargate Bus Stand" />
              </div>
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
               <button className="bg-white dark:bg-surface-highlight border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-sm text-primary hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors">
                  <span className="material-symbols-outlined text-xl">swap_vert</span>
               </button>
            </div>

            <div className="flex items-center gap-3">
               <div className="shrink-0 size-5 flex items-center justify-center text-red-500">
                  <span className="material-symbols-outlined text-[22px] fill">location_on</span>
               </div>
               <div className="flex-1">
                 <label className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">Destination</label>
                 <input className="w-full bg-background-light dark:bg-surface-highlight border-none rounded-lg text-sm px-3 py-2.5 focus:ring-1 focus:ring-primary placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white" type="text" defaultValue="Phoenix Market City" />
               </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
             <button className="text-sm text-primary font-medium flex items-center gap-1 hover:opacity-80">
                <span className="material-symbols-outlined text-lg">add_circle</span> Add Stop
             </button>
             <button className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">schedule</span> Depart Now
             </button>
          </div>
        </div>

        {/* Filters */}
        <div>
          <div className="flex p-1 bg-gray-200 dark:bg-surface-dark rounded-xl">
             <button className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg bg-white dark:bg-primary shadow-sm text-xs font-semibold text-primary dark:text-white transition-all">Fastest</button>
             <button className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all">Cheapest</button>
             <button className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all">Min Walking</button>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between">
           <h3 className="text-base font-bold text-gray-900 dark:text-white">Suggested Routes</h3>
           <span className="text-xs text-gray-500 dark:text-gray-400">3 results found</span>
        </div>

        <div className="flex flex-col gap-4 pb-20">
           {/* Card 1 */}
           <div onClick={() => navigate('/tracking')} className="group bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                    <div className="bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-green-500/20">Fastest</div>
                    <div className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-primary/20">AC</div>
                 </div>
                 <span className="block text-lg font-bold text-gray-900 dark:text-white">₹25</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-gray-400 text-xl">directions_bus</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="bg-primary text-white text-sm font-bold px-2 py-0.5 rounded shadow-sm">24</span>
                       <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Hadapsar Gadital</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Direct Route</div>
                 </div>
                 <div className="text-right">
                    <div className="text-base font-bold text-gray-900 dark:text-white">45 min</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">10:15 AM - 11:00 AM</div>
                 </div>
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-sm">transfer_within_a_station</span>
                    <span>0 Transfers</span>
                 </div>
                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-sm">directions_walk</span>
                    <span>5 min walk</span>
                 </div>
                 <div className="ml-auto flex items-center gap-1 text-green-500 text-xs font-medium">
                    <span className="size-2 bg-green-500 rounded-full animate-pulse"></span> Live
                 </div>
              </div>
           </div>

           {/* Card 2 */}
           <div onClick={() => navigate('/tracking')} className="group bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-2">
                    <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-blue-500/20">Cheapest</div>
                 </div>
                 <span className="block text-lg font-bold text-gray-900 dark:text-white">₹15</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="flex-1 flex items-center gap-2 overflow-hidden">
                    <div className="flex items-center gap-2 shrink-0">
                       <span className="bg-gray-700 dark:bg-surface-highlight text-white text-xs font-bold px-2 py-1 rounded">10</span>
                       <span className="material-symbols-outlined text-gray-400 text-sm">arrow_forward</span>
                       <span className="bg-gray-700 dark:bg-surface-highlight text-white text-xs font-bold px-2 py-1 rounded">45</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 border-b border-dashed border-gray-400"></div>
                 </div>
                 <div className="text-right shrink-0">
                    <div className="text-base font-bold text-gray-900 dark:text-white">1h 05m</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">10:20 AM - 11:25 AM</div>
                 </div>
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                     <span className="material-symbols-outlined text-sm">transfer_within_a_station</span>
                     <span>1 Transfer</span>
                 </div>
                 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                     <span className="material-symbols-outlined text-sm">directions_walk</span>
                     <span>12 min walk</span>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Floating Map Button */}
      <div className="fixed bottom-6 right-6 z-50">
         <button onClick={() => navigate('/tracking')} className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined">map</span>
            <span className="font-medium">Map View</span>
         </button>
      </div>
    </div>
  );
};

export default PlanJourney;