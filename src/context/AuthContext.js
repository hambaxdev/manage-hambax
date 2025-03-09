import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ActionRestrictionModal from '../components/ActionRestrictionModal';
import useUserProfile from '../hooks/useUserProfile';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isBasicRegistrationComplete, setIsBasicRegistrationComplete] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [modalState, setModalState] = useState({ isOpen: false, message: '' });

    const { profileData, isLoading: isProfileLoading, error: profileError, updateUserProfile } = useUserProfile();

    const refreshTimeout = useRef(null);
    useEffect(() => {
        const fetchAuthData = async () => {
            setLoadingAuth(true);
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/user-status`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
    
                    setIsAuthenticated(true);
                    setIsBasicRegistrationComplete(response.data.user.isBasicRegistrationComplete);
                    scheduleTokenRefresh();
                }
            } catch (error) {
                console.error('Ошибка получения данных пользователя:', error);
                setIsAuthenticated(false);
                setIsBasicRegistrationComplete(false);
            } finally {
                setLoadingAuth(false);
            }
        };
    
        fetchAuthData();
    }, [profileData]);

    const login = (accessToken, refreshToken, basicComplete) => {
        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('isBasicRegistrationComplete', basicComplete);

        setIsAuthenticated(true);
        setIsBasicRegistrationComplete(basicComplete);

        scheduleTokenRefresh();
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, { token: refreshToken });
            }
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }

        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isBasicRegistrationComplete');

        setIsAuthenticated(false);
        setIsBasicRegistrationComplete(false);
        clearTimeout(refreshTimeout.current);
    };

    const refreshAccessToken = async () => {
        try {
            let refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.warn('🔴 Нет refreshToken, выполняем выход...');
                logout();
                return;
            }
    
            console.log('🔄 Попытка обновления токена с refreshToken:', refreshToken);
    
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, 
                { token: refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            if (response.data.accessToken && response.data.refreshToken) {
                console.log('✅ Сервер вернул новый accessToken и refreshToken:', response.data);
    
                // Обязательно сохраняем новый refreshToken!
                localStorage.setItem('authToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
    
                scheduleTokenRefresh();
            } else {
                console.warn('🔴 Сервер не вернул токены, выполняем выход...');
                logout();
            }
        } catch (error) {
            console.error('❌ Ошибка обновления токена:', error);
    
            if (error.response && error.response.status === 403) {
                console.warn('⚠️ Сервер отклонил refreshToken, выполняем полный выход...');
                logout();
            } else {
                console.warn('⚠️ Ошибка при обновлении токена, но refreshToken не удаляется.');
                localStorage.removeItem('authToken');
            }
        }
    };
    
    

    const scheduleTokenRefresh = () => {
        clearTimeout(refreshTimeout.current);

        const tokenExpiryTime = 15 * 60 * 1000;
        const refreshTime = tokenExpiryTime - 60 * 1000;

        refreshTimeout.current = setTimeout(refreshAccessToken, refreshTime);
    };

    useEffect(() => {
        scheduleTokenRefresh();
        return () => clearTimeout(refreshTimeout.current);
    }, []);

    if (loadingAuth || isProfileLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isBasicRegistrationComplete,
                setIsBasicRegistrationComplete,
                profileData,
                login,
                logout,
                showRestrictionModal: (message) => setModalState({ isOpen: true, message }),
                updateUserProfile,
                profileError,
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
