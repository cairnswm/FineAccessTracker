import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/context/AuthContext';

// Auth Pages
import LoginPage from './auth/pages/Login';
import RegisterPage from './auth/pages/Register';
import ForgotPasswordPage from './auth/pages/ForgotPassword';
import ProfilePage from './auth/pages/ProfilePage';
import SettingsPage from './auth/pages/SettingsPage';
import SubscriptionsPage from './auth/pages/subscriptionsPage';

// Application Pages
import LandingPage from './application/pages/LandingPage';
import HomePage from './application/pages/HomePage';
import ApplicationsPage from './application/pages/ApplicationsPage';
import ApplicationPage from './application/pages/ApplicationPage';
import DashboardPage from './application/pages/DashboardPage';

// Components
import Navigation from './application/components/Navigation';


import "./app.scss";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/applications" element={user ? <ApplicationsPage /> : <Navigate to="/login" />} />
        <Route path="/application/:id" element={user ? <ApplicationPage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/subscriptions" element={user ? <SubscriptionsPage /> : <Navigate to="/login" />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;