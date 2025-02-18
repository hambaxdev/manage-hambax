import { useState, useCallback } from 'react';

const useFetchEventDetails = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEventDetails = useCallback(async (eventId) => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setError('User is not authenticated.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || 'Error fetching event details');
            }

            const data = await response.json();

            console.log(data);
            setEventDetails(data);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { eventDetails, loading, error, fetchEventDetails };
};

export default useFetchEventDetails;
