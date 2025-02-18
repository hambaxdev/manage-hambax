import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
    const { isAuthenticated, isBasicRegistrationComplete } = useContext(AuthContext);

    if (isAuthenticated) {
        return isBasicRegistrationComplete ? <Navigate to="/" /> : <Navigate to="/complete-registration" />;
    }

    return children;
};

export default PublicRoute;
