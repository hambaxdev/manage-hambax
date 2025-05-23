import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';
import config from '../config';

const useUserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [organizationData, setOrganizationData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const authToken = localStorage.getItem('authToken');

    const fetchUserProfile = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [profileRes, organizationRes] = await Promise.all([
                axios.get(`${config.hambaxNewApiUrl}/user/profile`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                }),
                axios.get(`${config.hambaxNewApiUrl}/api/organization/my`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                })
            ]);

            setProfileData({
                ...profileRes.data,
                organization: organizationRes.data,
            });
            setOrganizationData(organizationRes.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при загрузке данных');
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const response = await axios.put(
                `${config.hambaxNewApiUrl}/user/update-profile`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setProfileData((prev) => ({
                ...response.data,
                organization: prev?.organization || null,
            }));

            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при обновлении профиля');
            return false;
        }
    };

    useEffect(() => {
        if (!authToken) {
            setIsLoading(false);
            return;
        }

        fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken]);

    return {
        profileData,
        organizationData,
        isLoading,
        error,
        updateUserProfile,
    };
};

export default useUserProfile;
