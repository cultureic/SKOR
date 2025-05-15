import  { useEffect } from 'react';
import ConnectTwitterModal from './ConnectTwitterModal';
import ConnectAccountModal from './ConnectAccountModal';
import MintSkorModal from './MintSkorModal';
import { ModalType } from '../types';

interface ModalContainerProps {
  modalType: ModalType;
  onClose: () => void;
}

export default function ModalContainer({ modalType, onClose }: ModalContainerProps) {
  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (modalType) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [modalType, onClose]);
  
  if (!modalType) return null;
  
  return (
    <>
      {modalType === 'connect-twitter' && <ConnectTwitterModal onClose={onClose} />}
      {modalType === 'connect-account' && <ConnectAccountModal onClose={onClose} />}
      {modalType === 'mint-skor' && <MintSkorModal onClose={onClose} />}
    </>
  );
}
 