import  { useState } from 'react';
import { X, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { levels } from '../data/mockData';

interface AddFeedWizardProps {
  onClose: () => void;
}

export default function AddFeedWizard({ onClose }: AddFeedWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [apiKey, setApiKey] = useState('');
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form
      console.log('Form submitted:', { selectedLevel, apiKey });
      onClose();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const isNextDisabled = () => {
    if (step === 1) return selectedLevel === null;
    if (step === 2) return apiKey.trim() === '';
    return false;
  };
  
  // Chain logos mapping
  const chainLogos: Record<number, string[]> = {
    1: ['Ethereum', 'Arbitrum', 'Optimism'],
    2: ['Poap', 'Galxe', 'Zealy'],
    3: ['GitHub', 'GitLab', 'Discord'],
    4: ['Snapshot', 'Tally', 'Boardroom'],
    5: ['Safe', 'Gnosis'],
    6: ['Medium', 'Mirror', 'SubStack'],
    7: ['Gitcoin', 'Giveth'],
    8: ['Aztec', 'Railgun'],
    9: ['DEWORK', 'Aragon']
  };
  
  return (
    <div className="modal-content max-w-xl w-full mx-auto p-6 overflow-visible">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add Data Feed</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-opacity-80 transition-colors"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="relative h-2 mb-8 rounded overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div 
          className="absolute left-0 top-0 bottom-0 transition-all duration-300 ease-in-out"
          style={{ 
            width: `${(step / 3) * 100}%`,
            backgroundColor: selectedLevel ? levels.find(l => l.id === selectedLevel)?.color.replace('text-', 'bg-') || 'bg-blue-500' : 'bg-blue-500'
          }}
        />
      </div>
      
      <div className="steps-container">
        {/* Step 1: Select Module */}
        {step === 1 && (
          <div className="step-content">
            <h3 className="text-lg font-medium mb-4">Select Activity Module</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {levels.map(level => {
                const colorClass = level.color;
                let color = '#3B82F6';
                
                if (colorClass.includes('blue')) color = '#3B82F6';
                else if (colorClass.includes('amber')) color = '#F59E0B';
                else if (colorClass.includes('emerald')) color = '#10B981';
                else if (colorClass.includes('rose')) color = '#F43F5E';
                else if (colorClass.includes('orange')) color = '#F97316';
                else if (colorClass.includes('cyan')) color = '#06B6D4';
                else if (colorClass.includes('pink')) color = '#EC4899';
                else if (colorClass.includes('indigo')) color = '#6366F1';
                else if (colorClass.includes('violet')) color = '#8B5CF6';
                
                return (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`p-4 rounded-lg border transition-all flex flex-col items-center h-28 ${selectedLevel === level.id ? 'shadow-md' : 'hover:shadow-sm'}`}
                    style={{ 
                      borderColor: selectedLevel === level.id ? color : 'var(--border-color)',
                      backgroundColor: selectedLevel === level.id ? `${color}10` : 'transparent'
                    }}
                  >
                    <div className="flex space-x-1 mb-2">
                      {chainLogos[level.id]?.map((chain, idx) => (
                        <div 
                          key={idx} 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          {chain.charAt(0)}
                        </div>
                      ))}
                    </div>
                    <div className="font-medium text-center" style={{ color }}>
                      {level.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Step 2: API Key */}
        {step === 2 && (
          <div className="step-content">
            <h3 className="text-lg font-medium mb-4">
              Connect to {levels.find(l => l.id === selectedLevel)?.name}
            </h3>
            
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2 h-10 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Enter your API key"
              />
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
              <span className="px-2 text-sm" style={{ color: 'var(--text-secondary)' }}>OR</span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
            </div>
            
            <button 
              className="w-full p-3 rounded-lg font-medium flex items-center justify-center"
              style={{ 
                backgroundColor: levels.find(l => l.id === selectedLevel)?.color.replace('text-', 'bg-') || 'bg-blue-500',
                color: 'white'
              }}
            >
              Sign Transaction
            </button>
          </div>
        )}
        
        {/* Step 3: Preview */}
        {step === 3 && (
          <div className="step-content">
            <h3 className="text-lg font-medium mb-4">Preview Connected Data</h3>
            
            <div className="border rounded-lg p-4 mb-6" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="font-medium">
                  {levels.find(l => l.id === selectedLevel)?.name}
                </div>
                <div className="text-sm py-1 px-2 rounded-full" style={{ 
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)'
                }}>
                  Connected
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {levels.find(l => l.id === selectedLevel)?.metrics?.map((metric, idx) => (
                  <div key={idx} className="py-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {metric.name}
                    </div>
                    <div className="font-medium">
                      {metric.value} {metric.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border rounded-lg p-4" style={{ 
              borderColor: 'var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)'
            }}>
              <div className="text-sm mb-2 font-medium">Activity samples that will be displayed:</div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ 
                    backgroundColor: levels.find(l => l.id === selectedLevel)?.color.replace('text-', 'bg-') || 'bg-blue-500' 
                  }}></div>
                  <span className="text-sm">Recent transactions and activity</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ 
                    backgroundColor: levels.find(l => l.id === selectedLevel)?.color.replace('text-', 'bg-') || 'bg-blue-500'
                  }}></div>
                  <span className="text-sm">Historical data and trends</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-2" style={{ 
                    backgroundColor: levels.find(l => l.id === selectedLevel)?.color.replace('text-', 'bg-') || 'bg-blue-500'
                  }}></div>
                  <span className="text-sm">Comparative metrics with community</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-lg flex items-center"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        <button
          onClick={handleNext}
          disabled={isNextDisabled()}
          className="px-4 py-2 rounded-lg flex items-center text-white font-medium transition-colors disabled:opacity-50"
          style={{ 
            backgroundColor: isNextDisabled() ? 'var(--text-secondary)' : '#3B82F6'
          }}
        >
          {step === 3 ? 'Finish' : 'Next'}
          {step < 3 && <ChevronRight size={16} className="ml-1" />}
        </button>
      </div>
    </div>
  );
}
 