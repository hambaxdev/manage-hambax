import { useState, useEffect } from 'react';

const useFetchUserEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const endpoint = `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events`;

    const fetchUserEvents = async () => {
        setLoading(true);
        setError(null);
    
        const token = localStorage.getItem('authToken');
    
        if (!token) {
            setError('User is not authenticated. JWT token is missing.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                // Проверяем, есть ли тело ответа с ошибкой
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.error || response.statusText || 'Error fetching events';
                throw new Error(errorMessage);
            }
    
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserEvents();
    }, []);

    return { events, loading, error, fetchUserEvents };
};

export default useFetchUserEvents;
