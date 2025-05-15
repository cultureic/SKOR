import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import CategoryDetail from './pages/CategoryDetail';
import ReportPage from './pages/ReportPage';
import EmptyState from './components/EmptyState';
import ModalContainer from './components/ModalContainer';
import { ModalType } from './types';
import { useSession } from './hooks/NebulaHook.jsx';


function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { session, createSession, loading, error } = useSession();

  useEffect(() => {
    // kick off a session on mount
    createSession({ title: 'My First Session' })
      .then(sess => console.log('session created', sess))
      .catch(console.error);
  }, []);
  
  useEffect(() => {
    // Check for user preference
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    
    // Apply theme class to html element
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Auto-login for demo purposes
      setIsLoggedIn(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [theme]);
  
  const handleSaveTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <EmptyState type="loading" message="Loading your Skor profile... ✨" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header theme={theme} setTheme={handleSaveTheme} openModal={openModal} />
        <main className="pt-16 pb-12 relative">
          <Routes>
            <Route path="/" element={<ProfilePage openModal={openModal} isLoggedIn={isLoggedIn} />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </main>
        
        <ModalContainer 
          modalType={activeModal}
          onClose={closeModal}
        />
      </div>
    </Router>
  );
}

export default App;
 