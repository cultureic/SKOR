import  React from 'react';

interface ChainIconProps {
  chainId: string;
  className?: string;
  size?: number;
}

export default function ChainIcon({ chainId, className = '', size = 24 }: ChainIconProps) {
  const getIcon = () => {
    switch (chainId.toLowerCase()) {
      case 'ethereum':
        return (
          <svg viewBox="0 0 784.37 1277.39" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
            <g>
              <polygon fill="#343434" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"/>
              <polygon fill="#8C8C8C" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"/>
              <polygon fill="#3C3C3B" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"/>
              <polygon fill="#8C8C8C" points="392.07,1277.38 392.07,956.52 -0,724.89"/>
              <polygon fill="#141414" points="392.07,882.29 784.13,650.54 392.07,472.33"/>
              <polygon fill="#393939" points="0,650.54 392.07,882.29 392.07,472.33"/>
            </g>
          </svg>
        );
      case 'arbitrum':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className={className} width={size} height={size}>
            <circle cx="512" cy="512" r="512" fill="#28A0F0"/>
            <path d="M392 400.5V784l112 64V464.5l176 323 112-64-248-387h-152z" fill="#fff"/>
          </svg>
        );
      case 'optimism':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className={className} width={size} height={size}>
            <circle cx="14" cy="14" r="14" fill="#FF0420"/>
            <path d="M8.47 18.07v-8.56l6.99 6.66v-6.66h2.8v8.56L11.26 11.5v6.57z" fill="#fff"/>
          </svg>
        );
      case 'polygon':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.4 33.5" className={className} width={size} height={size}>
            <path fill="#8247E5" d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3
              c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7
              c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
              c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1
              L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7
              c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"/>
          </svg>
        );
      case 'mantle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} width={size} height={size}>
            <circle cx="20" cy="20" r="20" fill="#000"/>
            <path d="M27.97 10H12.03L8 20l4.03 10h15.94L32 20l-4.03-10zm-7.97 16.46c-3.57 0-6.46-2.89-6.46-6.46s2.89-6.46 6.46-6.46 6.46 2.89 6.46 6.46-2.89 6.46-6.46 6.46z" fill="#fff"/>
          </svg>
        );
      case 'base':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={className} width={size} height={size}>
            <circle cx="20" cy="20" r="20" fill="#0052FF"/>
            <path d="M20 32c-6.627 0-12-5.373-12-12S13.373 8 20 8s12 5.373 12 12-5.373 12-12 12zm0-5.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" fill="#fff"/>
          </svg>
        );
      case 'avalanche':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className={className} width={size} height={size}>
            <circle cx="512" cy="512" r="512" fill="#E84142"/>
            <path d="M681.48 402.76L585.15 540.95h142.91l-222.42 271.23 96.33-138.19H458.39l223.09-271.23z" fill="#fff"/>
          </svg>
        );
      case 'bnbchain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" className={className} width={size} height={size}>
            <circle cx="1250" cy="1250" r="1250" fill="#F3BA2F"/>
            <path d="M1250 524.4l454.9 263.1-169.4 98-285.5-165.6-285.5 165.6-169.4-98L1250 524.4z" fill="#fff"/>
            <path d="M795.1 983.3L964.5 1081v302.2l285.5 165.6 285.5-165.6V1081l169.4-97.7v392l-454.9 262.5-454.9-262.5v-392z" fill="#fff"/>
            <path d="M1250 885.5l285.5 165-285.5 165-285.5-165 285.5-165z" fill="#fff"/>
          </svg>
        );
      case 'solana':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.7 311.7" className={className} width={size} height={size}>
            <linearGradient id="solana-gradient" gradientUnits="userSpaceOnUse" x1="360.8791" y1="351.4553" x2="141.213" y2="-69.2936" gradientTransform="matrix(1 0 0 -1 0 314)">
              <stop offset="0" stopColor="#00FFA3"/>
              <stop offset="1" stopColor="#DC1FFF"/>
            </linearGradient>
            <path fill="url(#solana-gradient)" d="M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z"/>
            <path fill="url(#solana-gradient)" d="M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z"/>
            <path fill="url(#solana-gradient)" d="M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4 c5.8,0,8.7-7,4.6-11.1L333.1,120.1z"/>
          </svg>
        );
      case 'near':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.1 90" className={className} width={size} height={size}>
            <path d="M72.2,4.6L53.4,32.5c-1.3,1.9,1.2,4.2,3,2.6L74.9,19c0.5-0.4,1.2-0.1,1.2,0.6v50.3c0,0.7-0.9,1-1.3,0.5l-56-67
              C17,1.2,14.4,0,11.5,0h-2C4.3,0,0,4.3,0,9.6v70.8C0,85.7,4.3,90,9.6,90c3.3,0,6.4-1.7,8.2-4.6l18.8-27.9c1.3-1.9-1.2-4.2-3-2.6
              l-18.5,16c-0.5,0.4-1.2,0.1-1.2-0.6V20.1c0-0.7,0.9-1,1.3-0.5l56,67c1.8,2.2,4.5,3.4,7.3,3.4h2c5.3,0,9.6-4.3,9.6-9.6V9.6
              c0-5.3-4.3-9.6-9.6-9.6C77.1,0,74,1.7,72.2,4.6z" fill="#000"/>
          </svg>
        );
      case 'icp':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className} width={size} height={size}>
            <circle cx="32" cy="32" r="32" fill="#29ABE2"/>
            <path d="M32 10.7c-11.8 0-21.3 9.6-21.3 21.3 0 11.8 9.6 21.3 21.3 21.3 11.8 0 21.3-9.6 21.3-21.3 0-11.8-9.6-21.3-21.3-21.3zm0 32.4c-6.1 0-11.1-5-11.1-11.1 0-6.1 5-11.1 11.1-11.1 6.1 0 11.1 5 11.1 11.1 0 6.1-5 11.1-11.1 11.1z" fill="#fff"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        );
    }
  };

  return getIcon();
}
 