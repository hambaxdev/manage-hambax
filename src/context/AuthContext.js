import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from '../services/axiosInstance';
import ActionRestrictionModal from '../components/ActionRestrictionModal';
import useUserProfile from '../hooks/useUserProfile';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isBasicRegistrationComplete, setIsBasicRegistrationComplete] = useState(() => {
        const stored = localStorage.getItem('isBasicRegistrationComplete');
        return stored === 'true';
    });
    const [userRole, setUserRole] = useState(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.role;
            } catch {
                return null;
            }
        }
        return null;
    });
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [modalState, setModalState] = useState({ isOpen: false, message: '' });
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [isInitialLogin, setIsInitialLogin] = useState(false);

    const {
        profileData,
        isLoading: isProfileLoading,
        error: profileError,
        updateUserProfile
    } = useUserProfile();

    useEffect(() => {
        const fetchAuthData = async () => {
            setLoadingAuth(true);
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const decoded = jwtDecode(token);
                    setUserRole(decoded.role);

                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user-status`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setIsAuthenticated(true);
                    setIsBasicRegistrationComplete(response.data.user.isBasicRegistrationComplete);
                }
            } catch (error) {
                console.error('Ошибка получения данных пользователя:', error);
                setIsAuthenticated(false);
                setIsBasicRegistrationComplete(false);
                setUserRole(null);
            } finally {
                setLoadingAuth(false);
            }
        };

        if (!isInitialLogin) {
            fetchAuthData();
        } else {
            setIsInitialLogin(false);
        }
    }, [authToken, profileData, isInitialLogin]);

    const login = (accessToken, refreshToken, basicComplete) => {
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('isBasicRegistrationComplete', basicComplete);

        try {
            const decoded = jwtDecode(accessToken);
            setUserRole(decoded.role);
        } catch {
            setUserRole(null);
        }

        setAuthToken(accessToken);
        setIsAuthenticated(true);
        setIsBasicRegistrationComplete(basicComplete);
        setIsInitialLogin(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isBasicRegistrationComplete');

        setIsAuthenticated(false);
        setIsBasicRegistrationComplete(false);
        setUserRole(null);
    };

    if (loadingAuth || isProfileLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isBasicRegistrationComplete,
                userRole,
                setIsBasicRegistrationComplete,
                profileData,
                login,
                logout,
                showRestrictionModal: (message) => setModalState({ isOpen: true, message }),
                updateUserProfile,
                profileError,
                loading: loadingAuth || isProfileLoading,
            }}
        >
            <ActionRestrictionModal
                open={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, message: '' })}
                message={modalState.message}
            />
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
