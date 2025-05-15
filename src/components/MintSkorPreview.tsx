import  { userProfile } from '../data/mockData';
import { calculateSkorIndex } from '../data/mockData';
import SkorGauge from './SkorGauge';
import { Download, ArrowRight } from 'lucide-react';

interface MintSkorPreviewProps {
  openMintModal: () => void;
}

export default function MintSkorPreview({ openMintModal }: MintSkorPreviewProps) {
  const skorIndex = calculateSkorIndex();
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
          <SkorGauge 
            value={skorIndex} 
            size={140}
            profileImage={userProfile.avatar}
          />
        </div>
        
        <div className="w-full md:w-2/3 md:pl-8">
          <h2 className="text-xl font-bold mb-2">{userProfile.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {userProfile.handle}
          </p>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {userProfile.categories.slice(0, 6).map(category => (
              <div 
                key={category.id}
                className="flex items-center p-2 rounded-lg"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <span className="mr-1">{category.emoji}</span>
                <div className="min-w-0">
                  <div className="text-xs truncate opacity-70">{category.name}</div>
                  <div className="font-bold text-sm" style={{ color: category.color }}>{category.score}</div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={openMintModal}
            className="w-full py-2.5 rounded-lg flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            <Download size={18} className="mr-2" />
            Create Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
 