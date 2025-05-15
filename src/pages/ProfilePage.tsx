//@ts-nocheck
import { useState } from 'react';
import {
  PlusCircle,
  Activity,
  BookOpen,
  Heart,
  GitPullRequest,
  Share2,
  Users,
  Shield
} from 'lucide-react';
import SkorGauge from '../components/SkorGauge';
import CircularProgress from '../components/CircularProgress';
import ChainSelector from '../components/ChainSelector';
import ChatInterface from '../components/ChatInterface';
import { categories, chains, connectedWallets, globalCredScore } from '../data/mockData';
import { PageProps } from '../types';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage({ openModal }: PageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();  // Remove the destructuring {}  // Get total score
  const totalScore = Math.round(globalCredScore);

  // Get connected wallets count
  const connectedWalletsCount = connectedWallets.length;

  // Icons mapping for categories
  const categoryIcons: Record<string, React.ReactNode> = {
    'Basic On-chain': <Activity size={20} />,
    'Gamification': <PlusCircle size={20} />,
    'Code Contribution': <GitPullRequest size={20} />,
    'Inter-DAO Collab': <Share2 size={20} />,
    'Coordination': <Users size={20} />,
    'Knowledge Transfer': <BookOpen size={20} />,
    'Social Impact': <Heart size={20} />,
    'Responsible Privacy': <Shield size={20} />,
    'Human Collaboration': <Users size={20} />
  };

  // Group chains by type
  const evmChains = chains.filter(chain => chain.group === 'evm');
  const l1Chains = chains.filter(chain => chain.group === 'l1');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile overview */}
        <div className="md:col-span-2">
          {/* Profile card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <SkorGauge value={totalScore} size={180} />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold mb-2">Alex Johnson</h1>
                <div className="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-400 mb-4">
                  <span>alex.eth</span>
                  {connectedWalletsCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                      +{connectedWalletsCount}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {categories.slice(0, 9).map(category => (
                    <div
                      key={category.id}
                      className="flex flex-col items-center"
                      title={category.description}
                    >
                      <CircularProgress
                        value={category.score}
                        max={category.maxScore}
                        color={category.color}
                        size={48}
                        className="mb-1"
                      >
                        {categoryIcons[category.name] || <Activity size={18} />}
                      </CircularProgress>
                      <span className="text-sm font-medium" style={{ color: category.color }}>
                        {category.score}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                  <button
                    onClick={() => openModal && openModal('mint-skor')}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Mint It
                  </button>
                  <button
                    onClick={() => navigate('/report')}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
                  >
                    Generate Report
                  </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat interface */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <ChatInterface />
        </div>
      </div>

      {/* Right column - Wallets */}
      <div>
        {/* Connected wallets */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold">Wallets Connected</h2>
            <button
              onClick={() => openModal && openModal('connect-account')}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              aria-label="Connect wallet"
            >
              <PlusCircle size={20} />
            </button>
          </div>

          <div className="p-4">
            {/* EVM chains */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">EVMs</h3>
              <div className="space-y-2">
                {evmChains.map(chain => (
                  <ChainSelector
                    key={chain.id}
                    chain={chain}
                    connectedWallets={connectedWallets}
                    onDeleteWallet={(address) => alert(`Removing ${address} from ${chain.name}`)}
                  />
                ))}
              </div>
            </div>

            {/* L1 chains */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">L1s</h3>
              <div className="space-y-2">
                {l1Chains.map(chain => (
                  <ChainSelector
                    key={chain.id}
                    chain={chain}
                    connectedWallets={connectedWallets}
                    onDeleteWallet={(address) => alert(`Removing ${address} from ${chain.name}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div >
  );
}
