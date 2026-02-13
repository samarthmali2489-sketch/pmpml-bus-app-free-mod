import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LiveTracking from './pages/LiveTracking';
import PlanJourney from './pages/PlanJourney';
import Timetable from './pages/Timetable';
import Ticketing from './pages/Ticketing';
import ActiveTicket from './pages/ActiveTicket';
import PassServices from './pages/PassServices';
import StopDetails from './pages/StopDetails';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import BottomNav from './components/BottomNav';

const AppContent: React.FC = () => {
  const location = useLocation();
  // Pages that don't show the standard main bottom nav
  const hideBottomNavRoutes = [
    '/tracking', 
    '/active-ticket', 
    '/notifications', 
    '/stop-details', 
    '/plan',
    '/timetable' // Timetable has its own custom floating nav
  ];
  const shouldShowBottomNav = !hideBottomNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl relative overflow-hidden">
      <div className="flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/plan" element={<PlanJourney />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="/active-ticket" element={<ActiveTicket />} />
          <Route path="/pass" element={<PassServices />} />
          <Route path="/stop-details" element={<StopDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}