import { useState, useCallback } from 'react';
import axios from '../services/axiosInstance';

const useStaffManagement = () => {
    const [staff, setStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Новое состояние для ошибок
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    const fetchStaff = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/staff-members`);
            setStaff(data.staff);
        } catch (error) {
            console.error('Failed to fetch staff:', error);
            setError(error?.response?.data?.message || 'Failed to fetch staff.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createStaff = useCallback(async ({ email, validFrom, validTo }) => {
        setError(null);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/registration/staff/create`, { email, validFrom, validTo });
            await fetchStaff();
        } catch (error) {
            console.error('Failed to create staff:', error);
            setError(error?.response?.data?.message || 'Failed to create staff.');
        }
    }, [fetchStaff]);

    return {
        staff,
        isLoading,
        error, // Возвращаем ошибку в хук
        openCreateDialog,
        setOpenCreateDialog,
        fetchStaff,
        createStaff,
    };
};

export default useStaffManagement;
