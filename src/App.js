import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { Box, CssBaseline } from '@mui/material';
import CreateEventPage from './pages/CreateEventPage';

const AppContent = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Управление состоянием сайдбара

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: isSidebarOpen ? '240px' : '60px', // Сдвиг в зависимости от состояния сайдбара
                    transition: 'margin-left 0.3s',
                }}
            >
                <Routes>
                    {/* Публичные маршруты */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <RegisterPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/forgot-password"
                        element={
                            <PublicRoute>
                                <ForgotPasswordScreen />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/complete-registration"
                        element={
                            <PublicRoute>
                                <CompleteRegistrationPage />
                            </PublicRoute>
                        }
                    />

                    {/* Защищённые маршруты */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <ProtectedRoute>
                                <Events />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-event"
                        element={
                            <ProtectedRoute>
                                <CreateEventPage  />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
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
