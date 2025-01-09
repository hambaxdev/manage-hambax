import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserProfile = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const accessToken = localStorage.getItem('authToken');
            const response = await axios.get(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setProfileData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при загрузке профиля');
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const accessToken = localStorage.getItem('authToken');

            console.log(accessToken);
            const response = await axios.put(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/user/update-profile`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setProfileData(response.data);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при обновлении профиля');
            return false;
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return { profileData, isLoading, error, updateUserProfile };
};

export default useUserProfile;
