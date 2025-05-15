import  { useState } from 'react';
import { X } from 'lucide-react';
import ChainIcon from './ChainIcon';
import { evmWallets, l1Wallets } from '../data/mockData';

interface ConnectAccountModalProps {
  onClose: () => void;
}

export default function ConnectAccountModal({ onClose }: ConnectAccountModalProps) {
  const [selectedType, setSelectedType] = useState<'evm' | 'l1'>('evm');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-6 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-xl relative animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Connect Wallet</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                selectedType === 'evm' 
                  ? 'border-blue-500 text-blue-500 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setSelectedType('evm')}
            >
              EVMs
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                selectedType === 'l1' 
                  ? 'border-blue-500 text-blue-500 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setSelectedType('l1')}
            >
              L1s
            </button>
          </div>
          
          {/* Wallet list */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {selectedType === 'evm' ? (
              evmWallets.map(wallet => (
                <button
                  key={wallet.id}
                  className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  style={{ borderColor: 'var(--border-color)' }}
                  onClick={() => {
                    alert(`Connecting to ${wallet.name}...`);
                    // In a real app, you would implement wallet connection logic here
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 flex items-center justify-center">
                      <ChainIcon chainId={wallet.id === 'metamask' ? 'ethereum' : wallet.id} size={24} />
                    </div>
                    <span className="font-medium">{wallet.name}</span>
                  </div>
                </button>
              ))
            ) : (
              l1Wallets.map(wallet => {
                // Get chain icon based on wallet name
                let chainId = wallet.id;
                if (wallet.id === "phantom" || wallet.id === "solflare") chainId = "solana";
                else if (wallet.id === "near-wallet") chainId = "near";
                else if (wallet.id === "icp-wallet") chainId = "icp";
                
                return (
                  <button
                    key={wallet.id}
                    className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    style={{ borderColor: 'var(--border-color)' }}
                    onClick={() => {
                      alert(`Connecting to ${wallet.name}...`);
                      // In a real app, you would implement wallet connection logic here
                    }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-3 flex items-center justify-center">
                        <ChainIcon chainId={chainId} size={24} />
                      </div>
                      <span className="font-medium">{wallet.name}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              By connecting a wallet, you agree to Skor's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 