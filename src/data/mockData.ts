import  { Category, TimelineEvent, Chain, Wallet, ConnectedWallet } from '../types';
import { format, subDays } from 'date-fns';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Basic On-chain',
    score: 78,
    maxScore: 100,
    color: '#3B82F6',
    icon: 'Activity',
    description: 'Measures transactions, volume, holdings, votes, proposals, and delegations.'
  },
  {
    id: 2,
    name: 'Gamification',
    score: 45,
    maxScore: 100,
    color: '#10B981',
    icon: 'Badge',
    description: 'Measures completed quests, badges/POAPs, and bounties in dApps.'
  },
  {
    id: 3,
    name: 'Code Contribution',
    score: 92,
    maxScore: 100,
    color: '#F59E0B',
    icon: 'GitPullRequest',
    description: 'Measures commits, pull requests, code reviews, issues, forum posts.'
  },
  {
    id: 4,
    name: 'Inter-DAO Collab',
    score: 65,
    maxScore: 100,
    color: '#EC4899',
    icon: 'Share2',
    description: 'Measures activity across multiple DAOs, cross-proposals, project references.'
  },
  {
    id: 5,
    name: 'Coordination',
    score: 85,
    maxScore: 100,
    color: '#6366F1',
    icon: 'Users',
    description: 'Measures multisig signatures, deadline adherence, and voting consistency.'
  },
  {
    id: 6,
    name: 'Knowledge Transfer',
    score: 70,
    maxScore: 100,
    color: '#8B5CF6',
    icon: 'BookOpen',
    description: 'Measures published tutorials/guides, mentorship endorsements, project forks.'
  },
  {
    id: 7,
    name: 'Social Impact',
    score: 50,
    maxScore: 100,
    color: '#EF4444',
    icon: 'Heart',
    description: 'Measures on-chain donations, donation NFTs, volunteer hours, external metrics.'
  },
  {
    id: 8,
    name: 'Responsible Privacy',
    score: 60,
    maxScore: 100,
    color: '#64748B',
    icon: 'Shield',
    description: 'Measures use of mixers, key rotation, and identity separation.'
  },
  {
    id: 9,
    name: 'Human Collaboration',
    score: 80,
    maxScore: 100,
    color: '#0EA5E9',
    icon: 'Users',
    description: 'Measures group collaboration certificates, signed deliverables, multimedia evidence.'
  }
];

export function getCategoryById(id: number): Category | undefined {
  return categories.find(category => category.id === id);
}

const now = new Date();

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Voted on Uniswap proposal',
    date: subDays(now, 2),
    category: 1,
    source: 'Ethereum',
    value: 10,
    link: 'https://app.uniswap.org'
  },
  {
    id: '2',
    title: 'Completed Galxe quest',
    date: subDays(now, 4),
    category: 2,
    source: 'Galxe',
    value: 15,
    link: 'https://galxe.com'
  },
  {
    id: '3',
    title: 'Made 2 pull requests to ethers.js',
    date: subDays(now, 5),
    category: 3,
    source: 'GitHub',
    value: 25,
    link: 'https://github.com/ethers-io/ethers.js'
  },
  {
    id: '4',
    title: 'Cross-posted proposal between Aave and Compound',
    date: subDays(now, 7),
    category: 4,
    source: 'Snapshot',
    value: 30,
    link: 'https://snapshot.org'
  },
  {
    id: '5',
    title: 'Signed multisig transaction',
    date: subDays(now, 9),
    category: 5,
    source: 'Safe',
    value: 20,
    link: 'https://safe.global'
  },
  {
    id: '6',
    title: 'Published guide on L2 bridging',
    date: subDays(now, 12),
    category: 6,
    source: 'Medium',
    value: 35,
    link: 'https://medium.com'
  },
  {
    id: '7',
    title: 'Donated to Gitcoin Grant',
    date: subDays(now, 14),
    category: 7,
    source: 'Gitcoin',
    value: 15,
    link: 'https://gitcoin.co'
  },
  {
    id: '8',
    title: 'Rotated keys using Account Abstraction',
    date: subDays(now, 16),
    category: 8,
    source: 'ZkSync',
    value: 40,
    link: 'https://zksync.io'
  },
  {
    id: '9',
    title: 'Signed collective statement with team',
    date: subDays(now, 18),
    category: 9,
    source: 'Ceramic',
    value: 25,
    link: 'https://ceramic.network'
  },
  {
    id: '10',
    title: 'High value NFT trade',
    date: subDays(now, 1),
    category: 1,
    source: 'OpenSea',
    value: 50,
    link: 'https://opensea.io'
  },
  {
    id: '11',
    title: 'Earned POAP from ETH Global',
    date: subDays(now, 3),
    category: 2,
    source: 'POAP',
    value: 20,
    link: 'https://poap.xyz'
  },
  {
    id: '12',
    title: 'Merged 3 PRs to OpenZeppelin',
    date: subDays(now, 6),
    category: 3,
    source: 'GitHub',
    value: 45,
    link: 'https://github.com/OpenZeppelin'
  }
];

export const chains: Chain[] = [
  { id: 'ethereum', name: 'Ethereum', group: 'evm' },
  { id: 'arbitrum', name: 'Arbitrum', group: 'evm' },
  { id: 'optimism', name: 'Optimism', group: 'evm' },
  { id: 'polygon', name: 'Polygon', group: 'evm' },
  { id: 'base', name: 'Base', group: 'evm' },
  { id: 'mantle', name: 'Mantle', group: 'evm' },
  { id: 'avalanche', name: 'Avalanche', group: 'evm' },
  { id: 'bnbchain', name: 'BNB Chain', group: 'evm' },
  { id: 'solana', name: 'Solana', group: 'l1' },
  { id: 'near', name: 'NEAR', group: 'l1' },
  { id: 'icp', name: 'Internet Computer', group: 'l1' }
];

export const evmWallets: Wallet[] = [
  { id: 'metamask', name: 'MetaMask', icon: 'metamask' },
  { id: 'walletconnect', name: 'WalletConnect', icon: 'walletconnect' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: 'coinbase' },
  { id: 'rainbow', name: 'Rainbow', icon: 'rainbow' },
  { id: 'zerion', name: 'Zerion', icon: 'zerion' }
];

export const l1Wallets: Wallet[] = [
  { id: 'phantom', name: 'Phantom', icon: 'phantom' },
  { id: 'solflare', name: 'Solflare', icon: 'solflare' },
  { id: 'near-wallet', name: 'NEAR Wallet', icon: 'near' },
  { id: 'icp-wallet', name: 'Internet Identity', icon: 'icp' }
];

export const connectedWallets: ConnectedWallet[] = [
  { address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', chainId: 'ethereum' },
  { address: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30', chainId: 'arbitrum' },
  { address: '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E', chainId: 'optimism' },
  { address: '5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAcYs9cKSRrxVse', chainId: 'solana' }
];

export const globalCredScore = categories.reduce((sum, category) => sum + category.score, 0) / categories.length;
 