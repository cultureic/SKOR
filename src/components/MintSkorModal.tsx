import  { useState, useRef } from 'react';
import { X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { categories } from '../data/mockData';

interface MintSkorModalProps {
  onClose: () => void;
}

export default function MintSkorModal({ onClose }: MintSkorModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = async () => {
    if (certificateRef.current) {
      setIsProcessing(true);
      try {
        const canvas = await html2canvas(certificateRef.current);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'skor-certificate.png';
        link.click();
      } catch (error) {
        console.error('Failed to generate image:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  // Calculate total score
  const totalScore = Math.round(categories.reduce((sum, category) => sum + category.score, 0) / categories.length);
  
  // Current date for certificate
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Generate verification hash
  const verificationHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Mint Your Skor Certificate</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <div 
            ref={certificateRef}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skor Certificate</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Alex Johnson (alex.eth)</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                  {totalScore}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {categories.map(category => (
                <div 
                  key={category.id}
                  className="p-3 rounded-lg relative"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <div className="flex items-center mb-1">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center mr-2 text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.id}
                    </div>
                    <h4 className="text-xs font-medium truncate" style={{ color: category.color }}>
                      {category.name}
                    </h4>
                  </div>
                  <div className="text-lg font-bold" style={{ color: category.color }}>
                    {category.score}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between items-center">
                <div>Generated on: {currentDate}</div>
                <div className="truncate max-w-[50%]">Verification: {verificationHash}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              {isProcessing ? 'Processing...' : (
                <>
                  <Download size={16} className="mr-2" />
                  Download
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 