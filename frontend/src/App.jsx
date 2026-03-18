import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import BottomNavBar from './modules/user/components/navigation/BottomNavBar';
import HomePage from './modules/user/pages/Home/HomePage';
import SearchPage from './modules/user/pages/Search/SearchPage';
import CreatePage from './modules/user/pages/Create/CreatePage';
import InboxPage from './modules/user/pages/Inbox/InboxPage';
import ProfilePage from './modules/user/pages/Profile/ProfilePage';
import SettingsPage from './modules/user/pages/Settings/SettingsPage';
import EditProfilePage from './modules/user/pages/Settings/EditProfilePage';
import PrivacyPage from './modules/user/pages/Settings/PrivacyPage';
import SecurityPage from './modules/user/pages/Settings/SecurityPage';
import PushNotificationsPage from './modules/user/pages/Settings/PushNotificationsPage';
import LanguagePage from './modules/user/pages/Settings/LanguagePage';
import HelpCenterPage from './modules/user/pages/Settings/HelpCenterPage';
import Splash from './modules/user/components/common/Splash';
import AuthPage from './modules/user/pages/Auth/AuthPage';
import OnboardingPage from './modules/user/pages/Auth/components/OnboardingPage';
import SoundPage from './modules/user/pages/Sound/SoundPage';
import FollowersPage from './modules/user/pages/Profile/FollowersPage';
import NewFollowersPage from './modules/user/pages/Inbox/NewFollowersPage';
import AllActivityPage from './modules/user/pages/Inbox/AllActivityPage';

const MainLayout = () => {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);

  // Hide nav on certain pages if needed, and handle theme
  useEffect(() => {
    // Dismiss keyboard on any tab/route change
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Hide bottom nav on sub-pages (Sound, User Profile sub-pages, Inbox sub-pages)
    const isSubPage = 
      location.pathname.includes('/sound/') || 
      location.pathname.includes('/user/') || 
      location.pathname.includes('/settings/') ||
      location.pathname === '/inbox/new-followers' || 
      location.pathname === '/inbox/activity';
    
    setShowNav(!isSubPage);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/inbox/new-followers" element={<NewFollowersPage />} />
        <Route path="/inbox/activity" element={<AllActivityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/edit-profile" element={<EditProfilePage />} />
        <Route path="/settings/privacy" element={<PrivacyPage />} />
        <Route path="/settings/security" element={<SecurityPage />} />
        <Route path="/settings/push-notifications" element={<PushNotificationsPage />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/help-center" element={<HelpCenterPage />} />
        <Route path="/sound/:musicName" element={<SoundPage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/user/:username/followers" element={<FollowersPage />} />
      </Routes>
      {showNav && <BottomNavBar isDarkTheme={location.pathname !== '/'} />}
    </>
  );
};


const AppContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [appState, setAppState] = useState('launch'); // launch, auth, onboarding, main

    useEffect(() => {
        if (appState === 'launch') {
            const timer = setTimeout(() => {
                setAppState('auth');
                // Force navigate to welcome after splash if at root
                if (location.pathname === '/') {
                  navigate('/welcome', { replace: true });
                }
            }, 1800); 
            return () => clearTimeout(timer);
        }
    }, [appState, navigate, location.pathname]);

    const handleAuthComplete = () => {
        setAppState('onboarding');
    };

    const handleOnboardingComplete = () => {
        setAppState('main');
        navigate('/', { replace: true });
    };

    return (
        <div className="relative w-full max-w-[450px] h-screen h-dvh mx-auto flex flex-col bg-black overflow-hidden shadow-2xl">
            {appState === 'launch' && <Splash />}
            {appState !== 'launch' && (
                <Routes>
                    {appState === 'auth' ? (
                        <>
                            <Route path="/welcome" element={<AuthPage onComplete={handleAuthComplete} initialMode="signup" />} />
                            <Route path="/login" element={<AuthPage onComplete={handleAuthComplete} initialMode="login" />} />
                            <Route path="/signup" element={<AuthPage onComplete={handleAuthComplete} initialMode="signup" />} />
                            <Route path="*" element={<Navigate to="/welcome" replace />} />
                        </>
                    ) : appState === 'onboarding' ? (
                        <Route path="/*" element={<OnboardingPage onComplete={handleOnboardingComplete} />} />
                    ) : (
                        <Route path="/*" element={<MainLayout />} />
                    )}
                </Routes>
            )}
        </div>
    );
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;
