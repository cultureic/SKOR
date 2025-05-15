import  { X, Twitter } from 'lucide-react';
import { useState } from 'react';

interface ConnectTwitterModalProps {
  onClose: () => void;
}

export default function ConnectTwitterModal({ onClose }: ConnectTwitterModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConnect = () => {
    setIsLoading(true);
    
    // Simulate connecting (in a real app, this would be OAuth)
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      
      // Show success notification (in a real app)
      alert('Successfully connected with Twitter!');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-xl relative animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Connect with Twitter</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#1DA1F2] flex items-center justify-center mb-4">
              <Twitter size={32} className="text-white" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Link Your Twitter Account</h4>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
              Connect your Twitter account to display your profile and enable sharing your Skor certificate.
            </p>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="flex items-center px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a94df] text-white rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <Twitter size={20} className="mr-2" />
                  Connect with Twitter
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
            By connecting, you allow Skor to read your Twitter profile.<br />
            We will never post anything without your permission.
          </div>
        </div>
      </div>
    </div>
  );
}
 