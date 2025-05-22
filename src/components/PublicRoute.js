import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isBasicRegistrationComplete } = useContext(AuthContext);
    const location = useLocation();
    const path = location.pathname;

    // Allow access to privacy policy and data access request pages regardless of authentication status
    const alwaysAccessiblePaths = ['/privacy-policy', '/data-access-request'];

    if (isAuthenticated && !alwaysAccessiblePaths.includes(path)) {
        return isBasicRegistrationComplete ? <Navigate to="/" /> : <Navigate to="/complete-registration" />;
    }

    return children;
};

export default PublicRoute;
