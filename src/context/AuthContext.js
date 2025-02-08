import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import ActionRestrictionModal from '../components/ActionRestrictionModal';
import useUserProfile from '../hooks/useUserProfile';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isBasicRegistrationComplete, setIsBasicRegistrationComplete] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [modalState, setModalState] = useState({
        isOpen: false,
        message: '',
    });

    // Подключаем хук профиля
    const { profileData, isLoading: isProfileLoading, error: profileError, updateUserProfile } = useUserProfile();

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
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsAuthenticated(false);
                setIsBasicRegistrationComplete(false);
            } finally {
                setLoadingAuth(false);
            }
        };

        fetchAuthData();
    }, [profileData]); // Следим за изменениями профиля

    const login = (token, basicComplete) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('isBasicRegistrationComplete', basicComplete);
        setIsAuthenticated(true);
        setIsBasicRegistrationComplete(basicComplete);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isBasicRegistrationComplete');
        setIsAuthenticated(false);
        setIsBasicRegistrationComplete(false);
    };

    const completeRegistration = () => {
        setIsBasicRegistrationComplete(true);
        localStorage.setItem('isBasicRegistrationComplete', 'true');
    };

    const showRestrictionModal = (message) => {
        setModalState({
            isOpen: true,
            message,
        });
    };

    const closeRestrictionModal = () => {
        setModalState({
            isOpen: false,
            message: '',
        });
    };

    if (loadingAuth || isProfileLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isBasicRegistrationComplete,
                profileData, // Данные профиля
                login,
                logout,
                completeRegistration,
                showRestrictionModal,
                updateUserProfile, // Метод обновления профиля
                profileError, // Ошибки профиля
            }}
        >
            <ActionRestrictionModal
                open={modalState.isOpen}
                onClose={closeRestrictionModal}
                message={modalState.message}
            />
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
