import { useState } from 'react';

const useSubmitEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const endpoint = `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events`;

    const submitEvent = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem('authToken');

        if (!token) {
            setError('User is not authenticated. JWT token is missing.');
            setLoading(false);
            return;
        }

        console.log(data);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            setSuccess(true);
            return await response.json();
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return { submitEvent, loading, error, success };
};

export default useSubmitEvent;
