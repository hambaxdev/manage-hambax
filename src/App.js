import React, { useState, useCallback, useMemo, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery, CircularProgress } from '@mui/material';

import AuthProvider from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { allRoutes, authRoutes } from './routes';
import { trackPageView } from './utils/analytics';

// Loading component for Suspense
const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const AppContent = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Track page views
    useEffect(() => {
        trackPageView(location.pathname);
    }, [location]);

    // Memoize isAuthPage check
    const isAuthPage = useMemo(() => {
        return authRoutes.includes(location.pathname);
    }, [location.pathname]);

    // Memoize toggleSidebar function
    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    // Memoize main content styles
    const mainContentStyles = useMemo(() => ({
        flexGrow: 1,
        p: 3,
        ml: !isAuthPage 
            ? (isMobile 
                ? "0px" // Mobile: no margin (overlay)
                : (isSidebarOpen ? "240px" : "60px")) // Desktop: margin based on sidebar state
            : "0px", // Auth pages: no margin
        transition: "margin-left 0.3s",
    }), [isAuthPage, isMobile, isSidebarOpen]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <CssBaseline />
                {!isAuthPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
                <Box
                    component="main"
                    sx={mainContentStyles}
                >
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingFallback />}>
                            <Routes>
                                {allRoutes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={<route.wrapper>{route.element}</route.wrapper>}
                                    />
                                ))}
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
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
