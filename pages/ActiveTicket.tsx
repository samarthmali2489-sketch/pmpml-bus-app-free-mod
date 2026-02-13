import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ActiveTicket: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Default fallback data mimicking the screenshot
  const ticketData = location.state || {
     source: "Hadapsar\nGadital Solapur\nRoad", // formatted to force wrap if needed
     destination: "Rangicha Odha",
     busNumber: "H9",
     fare: 10,
     adults: 1,
     children: 0,
     timestamp: new Date().toISOString()
  };

  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [logoSrc, setLogoSrc] = useState<string>("https://upload.wikimedia.org/wikipedia/commons/e/e6/PMPML_Logo.png");

  useEffect(() => {
    const interval = setInterval(() => {
       setTimeLeft((prev) => {
          if (prev <= 0) {
             clearInterval(interval);
             return 0;
          }
          return prev - 1;
       });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isExpired = timeLeft === 0;
  
  // Format timestamps
  const bookingDate = new Date(ticketData.timestamp);
  const validityDate = new Date(bookingDate.getTime() + 30 * 60000); // +30 mins

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${day} ${month}, ${year} | ${hours}:${minutes} ${ampm}`;
  };

  const formatTimeLeft = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoSrc(url);
    }
  };

  return (
    <div className="bg-[#e5e5e5] h-[100dvh] w-full font-display flex flex-col relative overflow-hidden">
       <style>{`
         @keyframes breathe {
           0% { transform: scale(0.9); }
           50% { transform: scale(1.1); }
           100% { transform: scale(0.9); }
         }
         .animate-logo-breathe {
           animation: breathe 3s ease-in-out infinite;
         }
       `}</style>

       {/* Top Bar - Fixed height, z-index to stay above scroll */}
       <div className="px-4 py-2 flex justify-between items-center shrink-0 z-20 bg-[#e5e5e5]">
          <button onClick={() => navigate('/ticketing')} className="text-slate-800 p-1 -ml-1 rounded-full hover:bg-slate-200/50 transition-colors">
             <span className="material-symbols-outlined text-[28px] font-light">close</span>
          </button>
          <div className="flex gap-4 text-[14px] font-medium text-[#444] decoration-slate-700 underline-offset-2">
             <button className="underline decoration-1 hover:text-slate-900">Need Help?</button>
             <button className="underline decoration-1 hover:text-slate-900">All tickets</button>
          </div>
       </div>

       {/* Main Content - Scrollable with center alignment */}
       <main className="flex-1 flex flex-col items-center px-4 w-full overflow-y-auto no-scrollbar pb-24">
          {/* Ticket Container - Auto margin Y centers it when space is available, otherwise it scrolls */}
          <div className="w-full max-w-[340px] bg-[#FFF5F5] rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] relative flex flex-col shrink-0 my-auto transform transition-all">
              
              {/* Red Header */}
              <div className="bg-[#c2392b] py-1.5 px-2 flex items-center justify-center text-center shrink-0">
                  <h1 className="text-white text-[12px] font-medium tracking-wide drop-shadow-sm truncate">
                      पुणे महानगर परिवहन महामंडळ लि.
                  </h1>
              </div>

              {/* Ticket Body */}
              <div className="flex flex-col">
                  
                  {/* Top Section */}
                  <div className="px-4 pt-3 pb-1">
                      {/* Row 1: Route, Count, Fare */}
                      <div className="grid grid-cols-3 mb-4">
                          {/* Route */}
                          <div className="flex flex-col items-start">
                              <span className="text-[#757575] text-[10px] font-normal mb-0.5">Route</span>
                              <span className="text-[#212121] text-[18px] font-bold leading-none">{ticketData.busNumber || 'H9'}</span>
                          </div>
                          
                          {/* Tickets count */}
                          <div className="flex flex-col items-center pt-0.5">
                              <span className="text-[#757575] text-[10px] font-normal mb-0.5">Tickets count</span>
                              <span className="text-[#212121] text-[15px] font-bold">{ticketData.adults + ticketData.children}</span>
                          </div>
                          
                          {/* Fare */}
                          <div className="flex flex-col items-end">
                              <span className="text-[#757575] text-[10px] font-normal mb-0.5">Fare</span>
                              <span className="text-[#212121] text-[18px] font-bold leading-none">₹{ticketData.fare}</span>
                          </div>
                      </div>

                      {/* Row 2: Journey */}
                      <div className="flex items-center justify-between mb-2 w-full">
                          {/* Source */}
                          <div className="w-[45%] text-left">
                              <p className="text-[12px] font-normal text-[#212121] leading-tight break-words line-clamp-2">
                                  {ticketData.source}
                              </p>
                          </div>
                          
                          {/* Arrow */}
                          <div className="w-[10%] flex items-center justify-center">
                              <span className="material-symbols-outlined text-black font-light text-[20px]">arrow_right_alt</span>
                          </div>

                          {/* Destination */}
                          <div className="w-[45%] text-right pl-1">
                              <p className="text-[12px] font-normal text-[#212121] leading-tight break-words line-clamp-2">
                                  {ticketData.destination}
                              </p>
                          </div>
                      </div>
                  </div>

                  {/* Perforation Line 1 */}
                  <div className="relative flex items-center w-full h-4 my-0.5">
                      <div className="absolute left-[-8px] w-4 h-4 bg-[#e5e5e5] rounded-full"></div>
                      <div className="flex-1 border-t-[1.5px] border-dashed border-[#d0d0d0] mx-2"></div>
                      <div className="absolute right-[-8px] w-4 h-4 bg-[#e5e5e5] rounded-full"></div>
                  </div>

                  {/* Middle Section: Timestamps & Code */}
                  <div className="px-4 pt-1 pb-1 flex flex-col items-center relative">
                      
                      {/* Invalid Stamp Overlay */}
                      {isExpired && (
                          <div className="absolute top-1 left-0 right-0 z-10 flex flex-col items-center justify-center pointer-events-none transform -rotate-12 mix-blend-multiply opacity-80">
                              <div className="border-[4px] border-[#d32f2f] px-3 py-0 rounded-sm bg-transparent">
                                <span className="text-[#d32f2f] text-[50px] font-black tracking-tighter leading-none" style={{fontFamily: 'Impact, sans-serif'}}>INVALID</span>
                              </div>
                              <div className="text-[#d32f2f] text-[10px] font-bold tracking-widest mt-0.5">
                                  2602061455X2CEOS
                              </div>
                          </div>
                      )}

                      {/* Timestamps */}
                      <div className="flex justify-between items-start w-full mb-2 relative z-0">
                          <div>
                              <p className="text-[9px] text-[#757575] mb-0.5">Booking Time</p>
                              <p className="text-[10px] font-bold text-[#212121] tracking-wide">{formatDate(bookingDate)}</p>
                          </div>
                          <div className="text-right">
                              <p className="text-[9px] text-[#757575] mb-0.5">Validity Time</p>
                              <p className="text-[10px] font-bold text-[#212121] tracking-wide pr-1">{formatDate(validityDate)}</p>
                          </div>
                      </div>
                      
                      {/* Ticket Code */}
                      <p className="text-[12px] font-medium text-[#212121] tracking-wider">2602131410TP2ALY</p>
                  </div>

                  {/* Perforation Line 2 */}
                  <div className="relative flex items-center w-full h-4 my-0.5">
                      <div className="flex-1 border-t-[1.5px] border-dashed border-[#d0d0d0] mx-2"></div>
                  </div>

                  {/* Bottom Section: Custom Logo Upload */}
                  <div className="px-4 pt-1 pb-4 flex flex-col items-center justify-center relative min-h-[140px]">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <div 
                        onClick={handleLogoClick}
                        className="relative cursor-pointer group flex items-center justify-center w-full h-full"
                        title="Tap to change logo"
                      >
                        <img 
                            src={logoSrc} 
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; 
                                target.src = "https://upload.wikimedia.org/wikipedia/commons/e/e6/PMPML_Logo.png";
                            }}
                            alt="Ticket Logo" 
                            className={`w-28 h-28 object-contain mix-blend-multiply ${isExpired ? 'grayscale opacity-50' : ''} animate-logo-breathe`}
                        />
                        {/* Overlay hint */}
                        <div className="absolute -bottom-2 bg-slate-200/50 backdrop-blur-sm px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-[8px] text-slate-600 font-medium">Tap to change</span>
                        </div>
                      </div>
                  </div>

                  {/* Timer Strip */}
                  <div className="w-full bg-[#eeeeee] py-1.5 flex items-center justify-center mt-auto border-t border-slate-100">
                    {!isExpired ? (
                        <p className="text-[10px] text-slate-700 font-mono font-medium tracking-wider">
                            {formatTimeLeft(timeLeft)}
                        </p>
                    ) : (
                        <span className="text-[#9e9e9e] font-medium text-[10px]">Expired</span>
                    )}
                  </div>
              </div>
          </div>
       </main>

       {/* Separate QR Code Button Container - Fixed at bottom */}
       <div className="absolute bottom-0 left-0 w-full p-4 pb-6 bg-[#e5e5e5]/95 backdrop-blur-sm z-30 flex justify-center border-t border-slate-200/30">
          <button className="w-full max-w-[340px] h-[48px] rounded-[4px] border border-[#388e3c] bg-[#e8f5e9] text-[#2e7d32] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#c8e6c9] active:bg-[#a5d6a7] transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              Show QR code
          </button>
       </div>
    </div>
  );
};

export default ActiveTicket;