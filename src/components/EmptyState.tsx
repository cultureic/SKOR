import  { AlertCircle, Loader } from 'lucide-react';

interface EmptyStateProps {
  type: 'empty' | 'loading' | 'error';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ type, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 max-w-md mx-auto text-center">
      {type === 'loading' && (
        <div className="mb-4">
          <Loader size={40} className="animate-spin text-blue-500" />
        </div>
      )}
      
      {type === 'error' && (
        <div className="mb-4">
          <AlertCircle size={40} className="text-red-500" />
        </div>
      )}
      
      {type === 'empty' && (
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
        </div>
      )}
      
      <p className="text-lg font-medium mb-2">{message}</p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
 