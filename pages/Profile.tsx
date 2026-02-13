import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased flex flex-col overflow-y-auto pb-20">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
         <div className="w-12"></div>
         <h1 className="text-lg font-bold tracking-tight">My Profile</h1>
         <div className="w-12 flex justify-end">
            <button onClick={() => navigate('/')} className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">Log Out</button>
         </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4 max-w-md mx-auto w-full">
         <section className="flex flex-col items-center gap-4 py-4">
            <div className="relative group cursor-pointer">
               <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-surface-dark bg-surface-dark" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB34E0cUNrshG37N-MgaD-7K-hnzUiGa5jal5OSstqvh6k1pRk1VAdKlyvppCu2cu-OnbUnytbjAhKoP4DwQf_yhUBnOVXdQodBkNz3IBIYDVpx2OFW4jbLQJwJR47lZ7YMEuZr_aYpvRh4Ei9XxNPBYYEjT-sfZU360C-SQMEV56HAkIOXK9A2r00oqiu2J92R3gPjIfreEIcrQBzrInpf6xjWCg_zrcGgvuR3EXzrDFhuv9G7AFkoh6phedcxuUZVbm5oHCIQD8I')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
               <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full shadow-lg border-2 border-background-dark flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">edit</span>
               </div>
            </div>
            <div className="text-center space-y-1">
               <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Rohan Patil</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium">+91 98765 43210</p>
            </div>
         </section>

         <section className="bg-surface-dark rounded-xl p-5 shadow-sm border border-slate-800/50 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-slate-400">
                     <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                     <span className="text-sm font-medium uppercase tracking-wider">PMPML Wallet</span>
                  </div>
               </div>
               <div className="flex flex-col gap-1 mb-6">
                  <span className="text-4xl font-bold tracking-tight">₹ 150.00</span>
                  <span className="text-xs text-slate-500">Available Balance</span>
               </div>
               <button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[20px]">add_card</span> Top Up Wallet
               </button>
            </div>
         </section>

         <nav className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-2">Account Settings</h3>
            <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/50 divide-y divide-slate-100 dark:divide-slate-800">
               <button className="flex items-center justify-between p-4 w-full hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors group text-left">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">credit_card</span>
                     </div>
                     <span className="font-medium text-slate-900 dark:text-slate-200">Payment Methods</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500">chevron_right</span>
               </button>
               <button className="flex items-center justify-between p-4 w-full hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors group text-left">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">history</span>
                     </div>
                     <span className="font-medium text-slate-900 dark:text-slate-200">Transaction History</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500">chevron_right</span>
               </button>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pl-2 mt-2">Support</h3>
            <div className="bg-white dark:bg-surface-dark rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800/50 divide-y divide-slate-100 dark:divide-slate-800">
               <button className="flex items-center justify-between p-4 w-full hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors group text-left">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">help</span>
                     </div>
                     <span className="font-medium text-slate-900 dark:text-slate-200">Help & Support</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500">chevron_right</span>
               </button>
               <button className="flex items-center justify-between p-4 w-full hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors group text-left">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined">emergency_home</span>
                     </div>
                     <span className="font-medium text-slate-900 dark:text-slate-200">Emergency Contacts</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-500">chevron_right</span>
               </button>
            </div>
         </nav>

         <div className="mt-4 mb-8 text-center">
            <p className="text-xs text-slate-600 dark:text-slate-500">PMPML Transit App v2.4.0</p>
         </div>
      </main>
    </div>
  );
};

export default Profile;