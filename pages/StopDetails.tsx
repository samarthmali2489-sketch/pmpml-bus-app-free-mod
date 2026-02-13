import React from 'react';
import { useNavigate } from 'react-router-dom';

const StopDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden">
        <div className="flex flex-col bg-background-light dark:bg-background-dark p-4 pb-2 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigate('/')} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined" style={{fontSize: 24}}>arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight flex-1 text-center">Stop Details</h2>
                <div className="flex w-10 items-center justify-end">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-primary">
                        <span className="material-symbols-outlined fill-1" style={{fontVariationSettings: "'FILL' 1", fontSize: 24}}>favorite</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 px-1">
                <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">Pune Station</h1>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
                    <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-xs text-slate-700 dark:text-slate-300">#4205</span>
                    <span>•</span>
                    <span>Near Main Gate, Platform 4</span>
                </div>
            </div>

            <div className="flex gap-3 pt-6 pb-2">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-xl h-12 px-4 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined" style={{fontSize: 20}}>directions</span>
                    <span className="truncate">Get Directions</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl h-12 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold active:scale-95 transition-transform hover:bg-slate-300 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined" style={{fontSize: 20}}>refresh</span>
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6">
            <div onClick={() => navigate('/tracking')} className="mt-4 w-full h-32 rounded-xl overflow-hidden relative group cursor-pointer border border-gray-200 dark:border-gray-800">
                 <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGN-evBci29h-mQQwwaGZ8YpZgMUKOFk6eOp-e47ayD-D1sIPErhVz3G0dvKxI0I8IwM2wg4TlwGp4DOW9ZS7pwsCQrSctl4iWzQ17rRJnRMQmo0e0IrKko22VBVPKPdeuvlFFVIEhCPgxU10LORXcHBciasv81FFH7B265HsrFbWeOaDqfJUtNJEXGsklVVDAkQmv0JV6MP-CqHyOJDStbRzeKzBfarIOg90jC9pb0OB6D5X3PK43hEfk8ez-AqHQMWEgxE78Tao')"}}></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <div className="flex items-center gap-1 text-white text-xs font-bold">
                        <span className="material-symbols-outlined" style={{fontSize: 16}}>map</span> View on Map
                    </div>
                 </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Arrivals</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">All</button>
                        <button className="px-3 py-1.5 rounded-full bg-transparent text-slate-500 dark:text-slate-400 text-xs font-medium border border-slate-300 dark:border-slate-700">AC Buses</button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {[
                        { route: '24', dest: 'Katraj Zoo', meta: 'Via Swargate • Less Crowded', time: '2 min', live: true },
                        { route: '155', dest: 'Hinjewadi Ph 3', meta: 'Electric Bus • AC', time: '8 min', color: 'emerald', live: false },
                        { route: '305', dest: 'Nigdi', meta: 'Via Shivajinagar', time: '15 min', live: false },
                        { route: '11', dest: 'Marketyard', meta: 'Express', time: '22 min', live: false }
                    ].map((bus, i) => (
                        <div key={i} onClick={() => navigate('/tracking')} className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-[#1A2633] border-l-4 shadow-sm hover:bg-slate-50 dark:hover:bg-[#233040] transition-colors cursor-pointer group ${bus.color ? 'border-l-emerald-500' : (bus.live ? 'border-l-primary' : 'border-l-slate-300 dark:border-l-slate-600')}`}>
                             <div className="flex items-center gap-4">
                                <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border transition-colors ${bus.color ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30' : 'bg-slate-100 dark:bg-[#2A3B4D] border-slate-200 dark:border-slate-700'}`}>
                                    <span className={`text-lg font-black ${bus.color ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>{bus.route}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-bold text-slate-900 dark:text-white leading-tight">{bus.dest}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{bus.meta}</span>
                                </div>
                             </div>
                             <div className="flex flex-col items-end">
                                <span className={`text-lg font-bold flex items-center gap-1 ${bus.live ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                    {bus.live && <span className="material-symbols-outlined text-sm animate-pulse">rss_feed</span>} {bus.time}
                                </span>
                                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">10:4{2 + i * 6} AM</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                <div className="text-sm">
                    <p className="font-bold text-slate-900 dark:text-white">Schedule Change Alert</p>
                    <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">Routes towards Hinjewadi might experience delays due to construction work on University Road.</p>
                </div>
            </div>
            <div className="h-6"></div>
        </div>
    </div>
  );
};

export default StopDetails;