I'll  continue developing the website with the image provided. Let me implement the changes to create a cleaner interface with improved navigation and updated wallet connections display.

<doodleArtifact id="skor-web3-visual-updates-2" title="Skor Web3 Visual Updates - Part 2">
<doodleAction type="file" filePath="src/App.tsx">
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import LevelDetail from './pages/LevelDetail';
import EmptyState from './components/EmptyState';
import ModalContainer from './components/ModalContainer';
import { ModalType } from './types';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
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
    
    // Apply theme to document
    document.documentElement.classList.toggle('light-mode', theme === 'light');
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [theme]);
  
  const handleSaveTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light-mode', newTheme === 'light');
  };

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4 bg-image-overlay">
        <div className="absolute inset-0 z-[-1]">
          <img 
            src="https://images.unsplash.com/photo-1487260211189-670c54da558d?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwbWluaW1hbCUyMGNyeXB0byUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDB8fHx8MTc0NzE1OTA3N3ww&ixlib=rb-4.1.0&fit=fillmax&h=600&w=800" 
            alt="Person walking on snowfield" 
            className="object-cover w-full h-full opacity-30"
          />
        </div>
        <EmptyState type="loading" message="Loading your Skor profile... ✨" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Header theme={theme} setTheme={handleSaveTheme} openModal={openModal} />
        <main className="pt-16 relative">
          <Routes>
            <Route path="/" element={<ProfilePage openModal={openModal} />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/level/:id" element={<LevelDetail />} />
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
 