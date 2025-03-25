import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/context/AuthContext';

// Auth Pages
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import ForgotPassword from './auth/pages/ForgotPassword';
import ProfilePage from './auth/pages/ProfilePage';
import SettingsPage from './auth/pages/SettingsPage';
import SubscriptionRouting from './auth/routing/subscriptionRouting';

// Application Pages
import LandingPage from './application/pages/LandingPage';
import HomePage from './application/pages/HomePage';
import ApplicationsPage from './application/pages/ApplicationsPage';
import ApplicationPage from './application/pages/ApplicationPage';
import DocumentationPage from './application/pages/DocumentationPage';
import AboutPage from './application/pages/AboutPage';

// Components
import Navigation from './application/components/Navigation';

// Styles
import './app.scss';

function App() {
  const { user } = useAuth();

  // Set document title
  useEffect(() => {
    document.title = "Access Tracker - Application Usage Analytics";
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Public Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/applications" element={user ? <ApplicationsPage /> : <Navigate to="/login" />} />
        <Route path="/application/:id" element={user ? <ApplicationPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/subscriptions/*" element={user ? <SubscriptionRouting /> : <Navigate to="/login" />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;