import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark text-gray-900 dark:text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[24px]">directions_bus</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">PMPML</h1>
            <p className="text-xs text-text-secondary font-medium">Pune Mahanagar Parivahan</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/notifications')}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-dark transition-colors relative"
        >
          <span className="material-symbols-outlined text-gray-700 dark:text-white">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </header>

      {/* Greeting & Search */}
      <section className="px-4 pt-6 pb-4">
        <h2 className="text-2xl font-bold mb-4">Where to go?</h2>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input 
            onClick={() => navigate('/plan')}
            className="block w-full pl-10 pr-4 py-3.5 bg-white dark:bg-surface-dark border-transparent focus:border-primary focus:ring-primary rounded-xl text-sm placeholder-text-secondary shadow-sm transition-all" 
            placeholder="Search destination, stop, or bus number" 
            type="text" 
            readOnly
          />
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="px-4 py-2">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate('/tracking')} className="relative flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden border border-transparent hover:border-primary/50 text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">location_on</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">my_location</span>
            </div>
            <h3 className="font-semibold text-base">Live Tracking</h3>
            <p className="text-xs text-text-secondary mt-1">Track your bus in real-time</p>
          </button>
          
          <button onClick={() => navigate('/plan')} className="relative flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden border border-transparent hover:border-primary/50 text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">alt_route</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">directions</span>
            </div>
            <h3 className="font-semibold text-base">Plan Journey</h3>
            <p className="text-xs text-text-secondary mt-1">Find the best route</p>
          </button>
          
          <button onClick={() => navigate('/timetable')} className="relative flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden border border-transparent hover:border-primary/50 text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">schedule</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
            <h3 className="font-semibold text-base">Bus Timetable</h3>
            <p className="text-xs text-text-secondary mt-1">Check full schedules</p>
          </button>
          
          <button onClick={() => navigate('/pass')} className="relative flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden border border-transparent hover:border-primary/50 text-left">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">confirmation_number</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">qr_code_2</span>
            </div>
            <h3 className="font-semibold text-base">Pass Services</h3>
            <p className="text-xs text-text-secondary mt-1">Buy digital passes</p>
          </button>
        </div>
      </section>

      {/* Nearby Stops Map Widget */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Nearby Bus Stops</h3>
          <button onClick={() => navigate('/tracking')} className="text-sm text-primary font-medium hover:underline">View Map</button>
        </div>
        <div onClick={() => navigate('/stop-details')} className="bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 cursor-pointer">
          <div className="h-32 w-full bg-gray-800 relative bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGN-evBci29h-mQQwwaGZ8YpZgMUKOFk6eOp-e47ayD-D1sIPErhVz3G0dvKxI0I8IwM2wg4TlwGp4DOW9ZS7pwsCQrSctl4iWzQ17rRJnRMQmo0e0IrKko22VBVPKPdeuvlFFVIEhCPgxU10LORXcHBciasv81FFH7B265HsrFbWeOaDqfJUtNJEXGsklVVDAkQmv0JV6MP-CqHyOJDStbRzeKzBfarIOg90jC9pb0OB6D5X3PK43hEfk8ez-AqHQMWEgxE78Tao')"}}>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/30 animate-pulse"></div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-md">
              Pune, MH
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined">signpost</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">Swargate Station</h4>
              <p className="text-xs text-text-secondary truncate">2 min walk • 150m away</p>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recent Trips */}
      <section className="px-4 pb-6">
        <h3 className="text-lg font-bold mb-3">Recent Trips</h3>
        <div className="flex flex-col gap-2">
          {[
            { from: 'Katraj Zoo to Deccan', route: '24', time: 'Yesterday' },
            { from: 'Shivajinagar to Pune Stn', route: '115', time: '2 days ago' },
            { from: 'Kothrud Stand to PMC', route: '98', time: '5 days ago' }
          ].map((trip, idx) => (
            <div key={idx} onClick={() => navigate('/tracking')} className="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-secondary shrink-0">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{trip.from}</h4>
                <p className="text-xs text-text-secondary mt-0.5">Route {trip.route} • {trip.time}</p>
              </div>
              <button className="text-primary text-xs font-bold px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-md transition-colors">
                Repeat
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <div className="h-10"></div>
    </div>
  );
};

export default Home;