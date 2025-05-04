import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RegistrationReminder from "./RegistrationReminder";

const ProtectedRoute = ({ children }) => {
    const {
        isAuthenticated,
        isBasicRegistrationComplete,
        userRole,
    } = useAuth();

    const [loadingAuth, setLoadingAuth] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoadingAuth(false);
    }, []);

    if (loadingAuth) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isProfilePage = location.pathname === "/profile";
    const isCompleteRegistrationPage = location.pathname === "/complete-registration";

    if (!isBasicRegistrationComplete && isProfilePage) {
        return <Navigate to="/complete-registration" state={{ from: location }} replace />;
    }

    const allowedForScanner = ["/staff-dashboard", "/scan-qr"];

    if (userRole === "scanner") {
        if (location.pathname === "/") {
            return <Navigate to="/staff-dashboard" replace />;
        }

        if (!allowedForScanner.includes(location.pathname)) {
            return <Navigate to="/staff-dashboard" replace />;
        }
    }

    return (
        <>
            {!isCompleteRegistrationPage && <RegistrationReminder />}
            {children}
        </>
    );
};


export default ProtectedRoute;
