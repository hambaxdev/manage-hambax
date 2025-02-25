import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import RegisterPage from './pages/RegisterPage';
import CompleteRegistrationPage from './pages/CompleteRegistrationPage';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Sidebar from './components/Sidebar';
import CreateEventPage from './pages/CreateEventPage';
import EventEditPage from './pages/EventEditPage';
import ScanQRPage from './pages/ScanQRPage';
import EmailVerificationNotice from "./pages/EmailVerificationNotice";
import ResendVerificationPage from "./pages/ResendVerificationPage";

const AppContent = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Маршруты, на которых НЕ должен отображаться Sidebar
    const authRoutes = ["/login", "/register", "/forgot-password"];
    const isAuthPage = authRoutes.includes(location.pathname);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <CssBaseline />
                {!isAuthPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        ml: !isAuthPage && !isMobile ? (isSidebarOpen ? "240px" : "60px") : "0px",
                        transition: "margin-left 0.3s",
                    }}
                >
                    <Routes>
                        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                        <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordScreen /></PublicRoute>} />
                        <Route path="/email-verification" element={<PublicRoute><EmailVerificationNotice /></PublicRoute>} />
                        <Route path="/resend-verification" element={<PublicRoute><ResendVerificationPage /></PublicRoute>} />

                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
                        <Route path="/events/:id" element={<ProtectedRoute><EventEditPage /></ProtectedRoute>} />
                        <Route path="/scan-qr" element={<ProtectedRoute><ScanQRPage /></ProtectedRoute>} />
                        <Route path="/complete-registration" element={<ProtectedRoute><CompleteRegistrationPage /></ProtectedRoute>} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;
