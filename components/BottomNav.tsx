import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIconClass = (path: string) => {
    return location.pathname === path 
      ? "text-primary" 
      : "text-text-secondary hover:text-slate-700 dark:hover:text-white transition-colors";
  };

  const isFilled = (path: string) => location.pathname === path ? "filled" : "";

  return (
    <nav className="shrink-0 w-full bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-2 z-50">
      <div className="flex items-center justify-around h-14">
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${getIconClass('/')}`}
        >
          <span className={`material-symbols-outlined ${isFilled('/')}`}>home</span>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => navigate('/ticketing')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${getIconClass('/ticketing')}`}
        >
          <span className={`material-symbols-outlined ${isFilled('/ticketing')}`}>confirmation_number</span>
          <span className="text-[10px] font-medium">Tickets</span>
        </button>
        <button 
          onClick={() => navigate('/pass')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${getIconClass('/pass')}`}
        >
          <span className={`material-symbols-outlined ${isFilled('/pass')}`}>favorite</span>
          <span className="text-[10px] font-medium">Favorites</span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${getIconClass('/profile')}`}
        >
          <span className={`material-symbols-outlined ${isFilled('/profile')}`}>person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
      <div className="h-2 w-full"></div>
    </nav>
  );
};

export default BottomNav;