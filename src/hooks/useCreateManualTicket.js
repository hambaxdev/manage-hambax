import { useState, useCallback } from 'react';
import axios from '../services/axiosInstance';

const useCreateManualTicket = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const createTickets = useCallback(async (ticketData) => {
        setLoading(true);
        setError(null);
        setResponseData(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('Пользователь не авторизован.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/tickets/manual`,
                ticketData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResponseData(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при создании билета');
        } finally {
            setLoading(false);
        }
    }, []);

    return { createTickets, loading, error, responseData };
};

export default useCreateManualTicket;
