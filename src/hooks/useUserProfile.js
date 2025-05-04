import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

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
                axios.get(`${process.env.REACT_APP_HAMBAX_NEW_API_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                }),
                axios.get(`${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/organization/my`, {
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
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/user/update-profile`,
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
