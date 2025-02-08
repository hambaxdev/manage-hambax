import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import RegistrationReminder from "./RegistrationReminder";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setLoadingAuth(false);
    }, []);

    if (loadingAuth) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <RegistrationReminder />
            {children}
        </>
    );
};

export default ProtectedRoute;
