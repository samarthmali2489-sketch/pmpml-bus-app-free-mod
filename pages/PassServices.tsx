import React from 'react';
import { useNavigate } from 'react-router-dom';

const PassServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-background-light dark:bg-background-dark font-display overflow-hidden">
      <div className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
         <div onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
         </div>
         <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Bus Pass Services</h1>
         <div className="flex size-10 items-center justify-center">
            <button className="flex items-center justify-center rounded-full size-10 bg-transparent text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
               <span className="material-symbols-outlined">help</span>
            </button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
         <div className="pt-6 px-4">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-4">Current Pass Status</h2>
            <div className="bg-gradient-to-br from-[#1a2634] to-[#121921] rounded-xl overflow-hidden shadow-lg border border-slate-700/50 relative group">
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400"></div>
               <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <span className="inline-block px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-semibold mb-2 border border-green-500/30">ACTIVE</span>
                        <h3 className="text-white text-xl font-bold">Monthly All Routes</h3>
                        <p className="text-slate-400 text-sm mt-1">ID: PMPML-882930</p>
                     </div>
                     <div className="bg-white p-1 rounded-lg shadow-sm">
                        <span className="material-symbols-outlined text-slate-900 text-3xl">qr_code_2</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <p className="text-slate-400 text-xs mb-1">Valid From</p>
                        <p className="text-white font-medium text-sm">25 Sep 2023</p>
                     </div>
                     <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <p className="text-slate-400 text-xs mb-1">Valid Until</p>
                        <p className="text-white font-medium text-sm">24 Oct 2023</p>
                     </div>
                  </div>
                  <button onClick={() => navigate('/active-ticket')} className="w-full flex items-center justify-center gap-2 h-10 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-primary/20">
                     <span className="material-symbols-outlined text-[18px]">visibility</span> Show QR Code
                  </button>
               </div>
            </div>
         </div>

         <div className="pt-8 px-4">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-4">Apply for New Pass</h2>
            <div className="grid grid-cols-2 gap-3">
               {[
                  { title: 'Daily', sub: '24 Hours Validity', icon: 'calendar_view_day', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByKz4wVkG6efDFqJy-5RKhjuvmgDP3BcTVE-KejRoJW5uSEIN-jLzWOS2-bz6dbrPIEsK5wiCgODWnDnl5kjz-_o5J2O7hAtlUrtHAwzEg1LE7gfmEio3JJ0UQ1-HSa_5K2cW7f4Q1LWb7XUc8WNhTY8evwngn4MIlH91MgQ8zR1Fk5f28-cv7gbUiHInYscNdOrVUrS_Lf7ez7tWoMBqCcCD_yWSZllDWJb16ay5DAUf-n22iVvP-mH-QDLy5fqJorWMiT7VekDw' },
                  { title: 'Monthly', sub: '30 Days Validity', icon: 'calendar_month', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu6ZjDzDCuk54HjH4k7CACcsYTZiVtP47fzYXmSL-pTEKDjYRHQltna2kI76g73wlhJsrbFjtagUbsA6b114oTidjdN8Wgy6-TH_A0V_JXBkt80Ej6CTVU1g7QTOG1eA_WrVcAmUB498ICFVx4J62m7exfLyADY42DmPl-MwXAco9J0PQjRPljtKpHCONJEcST5oaXP0-_moZa-DF88Ejm1roJZGcZTR0k3Ppiu_HyOMjXsjhDwC-DYAVXpkJENURLEDBfd60P0Dg' },
                  { title: 'Student', sub: 'Concession Rates', icon: 'school', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXr7uyy7Jy5yloLNRqi3gIJkZ7u1SJlTazWnD32r6sLK3yufZ0CEA800xUREW1lMTtJRwV6DNIM9gzNHk1v475Fk4X8swpTOJoeU8nrEtAhbIQps0KKG-Hf3wPc2oqiqu7K46jWBAc5TaXgPE_1wl7rjri5l1l3oiFUtanuy6RgqhaNFXHcUAzPx6cO5-jjIjImNCmzN-RwQVOLdb0Q33KGWQp6PN9Pf6fGLsd7yz7MJ9Ox8a11He8GT_ZedM3LSjg0QLkfFCl8vc' },
                  { title: 'Senior', sub: 'Special Benefits', icon: 'elderly', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUUI10OG-z7YV5gAKQSukXtxaFapw0nabxZ_lQliMdOFJ26LbRP2LHjHOMMkGG30qhmkFWP795oz2qkaGzJeMHalZTFnc9agvpOS0XbWI4sMS7uasxAEIcaQeD0u6TK1__NvYzogpyaMGaFfhPZMV_BUjhb-qLS77nL4XaJmH4dr7LSVtlxo6JOPd_LIkIJNNyKHehtrFhU0DhMb5OMKnlmHYHRwxKFgZ1CZbm8XsLyB6wGIfuJd0FheStgE594eaVrRJWxN3UAn0' }
               ].map((item, i) => (
                  <button key={i} className="relative flex flex-col items-start justify-end h-32 p-4 rounded-xl overflow-hidden group">
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: `url('${item.img}')`}}></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                     <span className="relative z-10 material-symbols-outlined text-white/80 text-2xl mb-auto">{item.icon}</span>
                     <div className="relative z-10 text-left">
                        <p className="text-white font-bold text-lg leading-tight">{item.title}</p>
                        <p className="text-slate-300 text-xs mt-0.5">{item.sub}</p>
                     </div>
                  </button>
               ))}
            </div>
         </div>

         <div className="pt-8 px-4 pb-4">
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-4">Manage Pass</h2>
            <div className="flex flex-col gap-3">
               <button className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-200 dark:bg-[#1a2634] border border-transparent dark:border-slate-700/50 hover:bg-slate-300 dark:hover:bg-[#233040] transition-all group">
                  <div className="flex items-center gap-4">
                     <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">autorenew</span>
                     </div>
                     <div className="text-left">
                        <p className="text-slate-900 dark:text-white font-bold">Renew Pass</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">Extend your current validity</p>
                     </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
               </button>
               <button className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-200 dark:bg-[#1a2634] border border-transparent dark:border-slate-700/50 hover:bg-slate-300 dark:hover:bg-[#233040] transition-all group">
                  <div className="flex items-center gap-4">
                     <div className="size-10 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center group-hover:bg-slate-400 dark:group-hover:bg-slate-600 transition-colors">
                        <span className="material-symbols-outlined">history</span>
                     </div>
                     <div className="text-left">
                        <p className="text-slate-900 dark:text-white font-bold">Pass History</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">View past transactions</p>
                     </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PassServices;