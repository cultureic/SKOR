import  { useState } from 'react';
import SkorGauge from './SkorGauge';
import TetriskScore from './TetriskScore';
import { userProfile } from '../data/mockData';
import { calculateSkorIndex } from '../data/mockData';

interface UnifiedSkorBlockProps {
  userName: string;
  userHandle: string;
  userAvatar: string;
  openMintModal: () => void;
}

export default function UnifiedSkorBlock({ 
  userName, 
  userHandle, 
  userAvatar,
  openMintModal 
}: UnifiedSkorBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const skorIndex = calculateSkorIndex();
  
  // Calculate connected wallets count
  const connectedWallets = userProfile.connectedChains.reduce((count, chain) => {
    return count + chain.connections.length;
  }, 0);
  
  const additionalWallets = connectedWallets > 1 ? `+${connectedWallets - 1}` : '';
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <img 
            src={userAvatar} 
            alt={userName} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-bold">{userName}</h2>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
              <span>{userHandle}</span>
              {additionalWallets && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md text-xs font-medium">
                  {additionalWallets}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row items-center mb-5">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <SkorGauge 
            value={skorIndex} 
            size={180}
            profileImage={userAvatar}
          />
        </div>
        
        <div className="w-full md:w-2/3 md:pl-8">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Your Skor Index is calculated as a weighted average across all 9 levels, reflecting your overall activity and impact in the Web3 ecosystem.
            Improve your score by connecting more data sources and increasing your engagement across different areas.
          </p>
          
          <TetriskScore categories={userProfile.categories} className="mb-4" />
          
          <button 
            onClick={openMintModal}
            className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            Mint Your Skor
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {userProfile.categories.map(category => (
              <div 
                key={category.id}
                className="flex flex-col items-center p-3 rounded-lg"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full mb-2"
                  style={{ backgroundColor: `${category.color}30` }}
                >
                  <span className="text-xl">{category.emoji}</span>
                </div>
                <div className="text-sm font-medium truncate text-center" style={{ color: category.color }}>
                  {category.name}
                </div>
                <div className="text-xl font-bold" style={{ color: category.color }}>
                  {category.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 