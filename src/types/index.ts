export  type ModalType = 'connect-twitter' | 'connect-account' | 'mint-skor' | null;

export interface Category {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  color: string;
  icon: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: Date;
  category: number;
  source: string;
  value: number;
  link?: string;
}

export interface Chain {
  id: string;
  name: string;
  group: 'evm' | 'l1';
}

export interface Wallet {
  id: string;
  name: string;
  icon: string;
}

export interface ConnectedWallet {
  address: string;
  chainId: string;
}

export interface PageProps {
  isLoggedIn?: boolean;
  openModal?: (type: ModalType) => void;
}
 