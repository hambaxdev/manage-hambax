import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RegistrationReminder from "./RegistrationReminder";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoadingAuth(false);
    }, []);

    if (loadingAuth) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const isCompleteRegistrationPage = location.pathname === "/complete-registration";

    return (
        <>
            {!isCompleteRegistrationPage && <RegistrationReminder />}
            {children}
        </>
    );
};

export default ProtectedRoute;
