import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import AnimatedBackground from './AnimatedBackground';
import HamburgerMenu from './hamburgerMenu';
import Home from './home';
import Admin from './admin';
import CreateAccount from './createAccount';
import Profile from './profile';
import AdminHome from './adminHome';
import Signup from './Signup';
import ProtectedRoute from './ProtectedRoute'; 
import Verification from './verification';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedBackground />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/Signup" element={<Signup />} />
          <Route path="/admin/verify" element={<Verification />} />
          {/* Directly use Route for Home without ProtectedRoute to allow unrestricted access */}
          <Route path="/" element={<Home />} />
          {/* Use ProtectedRoute for routes that require authentication */}
          <Route path="/admin/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path="/admin/createAccount" element={<ProtectedRoute><CreateAccount /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <HamburgerMenu />
      </Router>
    </AuthProvider>
  );
}


// Create a separate component to conditionally render HamburgerMenu
// function HamburgerMenuWithCondition() {
//   const location = useLocation();

//   // Check if the current path is neither '/' nor '/admin', if yes, render HamburgerMenu
//   const shouldRenderHamburgerMenu = !['/', '/admin', '/admin/Signup'].includes(location.pathname);

//   return shouldRenderHamburgerMenu ? <HamburgerMenu /> : null;
// }


export default App;
