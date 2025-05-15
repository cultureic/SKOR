import  { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import ChainIcon from './ChainIcon';
import { Chain, ConnectedWallet } from '../types';

interface ChainSelectorProps {
  chain: Chain;
  connectedWallets: ConnectedWallet[];
  onDeleteWallet?: (address: string) => void;
}

export default function ChainSelector({ chain, connectedWallets, onDeleteWallet }: ChainSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter wallets for the current chain
  const wallets = connectedWallets.filter(wallet => wallet.chainId === chain.id);
  
  if (wallets.length === 0) return null;

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-xl border transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-primary)' }}
      >
        <div className="flex items-center">
          <ChainIcon chainId={chain.id} size={20} className="mr-3" />
          <span className="font-medium">{chain.name}</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isExpanded && wallets.length > 0 && (
        <div className="mt-1 mb-3 pl-10 pr-2 space-y-2 animate-fadeIn">
          {wallets.map(wallet => (
            <div 
              key={wallet.address}
              className="flex items-center justify-between p-2 rounded-lg text-sm"
            >
              <a 
                href={`https://etherscan.io/address/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline truncate max-w-[70%]"
              >
                {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
              </a>
              
              {onDeleteWallet && (
                <button
                  onClick={() => onDeleteWallet(wallet.address)}
                  className="p-1.5 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800"
                  aria-label="Delete wallet"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 