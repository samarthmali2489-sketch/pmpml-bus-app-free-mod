import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Ticketing: React.FC = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [source, setSource] = useState("Swargate Bus Stand");
  const [destination, setDestination] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [isAC, setIsAC] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');

  // Fare Calculation Configuration
  const FARE_PER_ADULT = 10;
  const FARE_PER_CHILD = 5;
  const AC_SURCHARGE = 5;

  const baseFare = (adultCount * FARE_PER_ADULT) + (childCount * FARE_PER_CHILD);
  const surcharge = isAC ? (adultCount + childCount) * AC_SURCHARGE : 0;
  const totalFare = baseFare + surcharge;

  const handlePay = () => {
    if (!destination) {
       alert("Please enter a destination");
       return;
    }
    if (!busNumber) {
       alert("Please enter the Bus Number");
       return;
    }

    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
       setPaymentStep('success');
       
       // Navigate after success animation
       setTimeout(() => {
          navigate('/active-ticket', {
             state: {
                source,
                destination,
                busNumber,
                fare: totalFare,
                adults: adultCount,
                children: childCount,
                isAC,
                timestamp: new Date().toISOString()
             }
          });
       }, 2000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-background-light dark:bg-background-dark font-display relative overflow-hidden">
       {/* Payment Overlay */}
       {paymentStep !== 'idle' && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-background-light dark:bg-background-dark transition-all duration-500">
             {paymentStep === 'processing' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                   <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 border-t-primary rounded-full animate-spin mb-6"></div>
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white">Processing Payment...</h2>
                   <p className="text-slate-500 mt-2">Securely connecting to gateway</p>
                </div>
             )}
             
             {paymentStep === 'success' && (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                   <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                      <span className="material-symbols-outlined text-white text-5xl animate-[bounce_1s_infinite]">check</span>
                   </div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Successful!</h2>
                   <p className="text-slate-500 mt-2">Redirecting to your ticket...</p>
                </div>
             )}
          </div>
       )}

       <header className="flex items-center justify-between p-4 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-white">
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
             </button>
             <h1 className="text-xl font-bold tracking-tight">Mobile Ticketing</h1>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-white">
             <span className="material-symbols-outlined text-2xl">more_vert</span>
          </button>
       </header>

       <main className="flex-1 overflow-y-auto pb-32">
          <div className="px-4 pt-2 sticky top-0 z-0 bg-background-light dark:bg-background-dark">
             <div className="flex border-b border-slate-300 dark:border-slate-700">
                <button className="flex-1 pb-3 text-center border-b-2 border-primary text-primary font-semibold transition-colors">Buy QR Ticket</button>
                <button onClick={() => navigate('/active-ticket')} className="flex-1 pb-3 text-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors">Active Tickets</button>
             </div>
          </div>

          <div className="p-4 space-y-6">
             {/* Route Selection */}
             <section className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 relative">
                <div className="absolute left-8 top-[3.25rem] bottom-[3.25rem] w-0.5 border-l-2 border-dashed border-slate-300 dark:border-slate-600 z-0"></div>
                <div className="flex items-start gap-4 relative z-10">
                   <div className="flex flex-col items-center pt-3">
                      <div className="w-3 h-3 rounded-full border-2 border-primary bg-background-light dark:bg-background-dark ring-4 ring-white dark:ring-surface-dark"></div>
                   </div>
                   <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Source</label>
                      <div className="relative group">
                         <input 
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-surface-highlight border-0 rounded-lg py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary font-medium transition-all" 
                            type="text" 
                         />
                         <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400">my_location</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex justify-end pr-4 -my-3 relative z-20 pointer-events-none">
                   <button 
                      onClick={() => {
                          const temp = source;
                          setSource(destination);
                          setDestination(temp);
                      }}
                      className="pointer-events-auto bg-white dark:bg-surface-highlight border border-slate-200 dark:border-slate-700 rounded-full w-8 h-8 flex items-center justify-center text-primary shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                   >
                      <span className="material-symbols-outlined text-lg">swap_vert</span>
                   </button>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                   <div className="flex flex-col items-center pt-3">
                      <span className="material-symbols-outlined text-red-500 text-[20px] bg-white dark:bg-surface-dark -mt-1">location_on</span>
                   </div>
                   <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Destination</label>
                      <div className="relative">
                         <input 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-surface-highlight border-0 rounded-lg py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary font-medium transition-all" 
                            placeholder="Enter destination" 
                         />
                         <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400">search</span>
                      </div>
                   </div>
                </div>
             </section>

             {/* Bus Details */}
             <section className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Bus Details</label>
                <div className="flex gap-4">
                    <div className="relative flex-1">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400">directions_bus</span>
                         </div>
                         <input 
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-surface-highlight border-0 rounded-lg py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary font-medium transition-all uppercase" 
                            placeholder="Bus Number (e.g. 24)" 
                         />
                    </div>
                </div>
             </section>

             {/* Recent Routes (Quick Fill) */}
             <section>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 px-1">Quick Select</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                   {[
                       { dest: 'Katraj', bus: '24' }, 
                       { dest: 'Shivajinagar', bus: '115' }, 
                       { dest: 'Hadapsar', bus: '204' }
                   ].map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => {
                            setDestination(item.dest);
                            setBusNumber(item.bus);
                        }}
                        className="shrink-0 flex items-center gap-2 bg-white dark:bg-surface-dark px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors shadow-sm active:bg-slate-50 dark:active:bg-slate-800"
                      >
                         <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{item.bus}</span>
                         <span className="w-px h-3 bg-slate-300 dark:bg-slate-600"></span>
                         <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{item.dest}</span>
                      </button>
                   ))}
                </div>
             </section>

             {/* Passengers */}
             <section className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Select Passengers</h3>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-base font-medium text-slate-900 dark:text-white">Adult</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Full Ticket (₹{FARE_PER_ADULT})</span>
                   </div>
                   <div className="flex items-center gap-4 bg-slate-50 dark:bg-surface-highlight rounded-lg p-1">
                      <button 
                        onClick={() => adultCount > 1 && setAdultCount(c => c - 1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-md bg-white dark:bg-surface-dark shadow-sm transition-colors ${adultCount <= 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-primary'}`}
                        disabled={adultCount <= 1}
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="text-lg font-bold w-4 text-center text-slate-900 dark:text-white">{adultCount}</span>
                      <button 
                        onClick={() => setAdultCount(c => c + 1)}
                        className="w-9 h-9 flex items-center justify-center rounded-md bg-primary text-white shadow-sm hover:bg-blue-600 active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                   </div>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-700 w-full"></div>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-base font-medium text-slate-900 dark:text-white">Child</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Half Ticket (₹{FARE_PER_CHILD})</span>
                   </div>
                   <div className="flex items-center gap-4 bg-slate-50 dark:bg-surface-highlight rounded-lg p-1">
                      <button 
                        onClick={() => childCount > 0 && setChildCount(c => c - 1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-md bg-white dark:bg-surface-dark shadow-sm transition-colors ${childCount <= 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-primary'}`}
                        disabled={childCount <= 0}
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="text-lg font-bold w-4 text-center text-slate-900 dark:text-white">{childCount}</span>
                      <button 
                        onClick={() => setChildCount(c => c + 1)}
                        className="w-9 h-9 flex items-center justify-center rounded-md bg-primary text-white shadow-sm hover:bg-blue-600 active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                   </div>
                </div>
             </section>
             
             {/* Ticket Type */}
             <section>
                 <div className="flex gap-4">
                     <label className="flex-1 cursor-pointer group">
                         <input 
                            type="radio" 
                            name="ticket_type" 
                            className="peer sr-only" 
                            checked={!isAC} 
                            onChange={() => setIsAC(false)} 
                         />
                         <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark p-4 flex flex-col items-center gap-2 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-primary/5 transition-all group-active:scale-[0.98]">
                             <span className="material-symbols-outlined text-slate-400 peer-checked:text-primary transition-colors">qr_code_2</span>
                             <span className="text-sm font-medium text-slate-900 dark:text-white">Standard</span>
                         </div>
                     </label>
                     <label className="flex-1 cursor-pointer group">
                         <input 
                            type="radio" 
                            name="ticket_type" 
                            className="peer sr-only" 
                            checked={isAC} 
                            onChange={() => setIsAC(true)} 
                         />
                         <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark p-4 flex flex-col items-center gap-2 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-primary/5 transition-all group-active:scale-[0.98]">
                             <span className="material-symbols-outlined text-slate-400 peer-checked:text-primary transition-colors">ac_unit</span>
                             <span className="text-sm font-medium text-slate-900 dark:text-white">AC Bus</span>
                             {isAC && <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">+₹{AC_SURCHARGE}/pax</span>}
                         </div>
                     </label>
                 </div>
             </section>
          </div>
       </main>

       {/* Pay Action */}
       <div className="fixed bottom-[60px] max-w-md w-full left-1/2 -translate-x-1/2 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-slate-800 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40">
           <div className="flex items-center justify-between mb-4">
               <div className="flex flex-col">
                   <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Total Fare</span>
                   <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalFare}.00</span>
               </div>
               <div className="flex items-center gap-2 text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                   <span className="material-symbols-outlined text-sm">groups</span>
                   <span className="text-xs font-bold">{adultCount + childCount} Passenger{adultCount + childCount !== 1 ? 's' : ''}</span>
               </div>
           </div>
           <button 
              onClick={handlePay}
              disabled={paymentStep !== 'idle' || !destination || !busNumber}
              className={`w-full text-white font-bold text-lg h-14 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] ${
                  paymentStep !== 'idle' || !destination || !busNumber
                      ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-70' 
                      : 'bg-primary hover:bg-blue-600'
              }`}
           >
               <span className="material-symbols-outlined">qr_code_scanner</span> Pay Now
           </button>
       </div>
    </div>
  );
};

export default Ticketing;