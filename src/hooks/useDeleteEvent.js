import { useState } from 'react';
import axios from '../services/axiosInstance';

const useDeleteEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteEvent = async (eventId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('User is not authenticated. JWT token is missing.');
            setLoading(false);
            return false;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSuccess(true);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при удалении мероприятия');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { deleteEvent, loading, error, success };
};

export default useDeleteEvent;
